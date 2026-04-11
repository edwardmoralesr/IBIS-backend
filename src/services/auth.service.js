import { prisma } from "../db/prisma.js";
import { comparePassword, hashPassword } from "../utils/password.js";
import { generateToken } from "../utils/jwt.js";

export const loginUser = async ({ Documento, Password }) => {
  // 1. buscar usuario
  const user = await prisma.RUsuario.findFirst({
    where: { Documento },
  });
  //console.log(Password);
  //var test = await hashPassword(Password);
  //console.log(test);

  if (!user) {
    throw new Error("Usuario no existe");
  }

  // 2. validar estado
  if (!user.Activo) {
    throw new Error("Usuario inactivo");
  }

  // 3. validar contraseña
  const validPassword = await comparePassword(Password, user.Password);

  if (!validPassword) {
    throw new Error("Password incorrecta");
  }

  // 4. generar token
  const token = generateToken(user);

  // 5. devolver respuesta limpia
  return {
    message: "Login correcto",
    token,
    user: {
      id: user.id,
      email: user.email,
      role: user.role,
    },
  };
};