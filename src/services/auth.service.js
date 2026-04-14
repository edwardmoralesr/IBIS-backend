import { prisma } from "../db/prisma.js";
import { comparePassword, hashPassword } from "../utils/password.js";
import { generateToken } from "../utils/jwt.js";

export const loginUser = async ({ Documento, Password, Role }) => {
  // 1. buscar usuario
  const user = await prisma.RUsuario.findFirst({
    where: {
      Documento,
      IdRole: Role ? { not: 3 } : 3
    },
  });
  //console.log(Password);
  //var test = await hashPassword(Password);
  //console.log(test);

  if (!user) {
    throw new Error("Usuario no registrado en el sistema");
  }

  // 2. validar estado
  if (!user.Activo) {
    throw new Error("Usuario inactivo en el sistema");
  }

  // 3. validar contraseña
  const validPassword = await comparePassword(Password, user.Password);

  if (!validPassword) {
    throw new Error("Contraseña incorrecta");
  }

  // 4. generar token
  const token = generateToken(user);

  // 5. devolver respuesta limpia
  return {
    message: "Autenticación realizada con éxito",
    token,
    user: {
      IdUsurio: user.IdUsuario.toString(),
      IdEntidad: user.IdEntidad,
      Documento: user.Documento,
      Nombre: user.Nombre,
      IdRole: user.IdRole,
    },
  };
};