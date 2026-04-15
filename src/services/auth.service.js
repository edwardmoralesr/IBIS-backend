import { prisma } from "../db/prisma.js";
import { comparePassword } from "../utils/password.js";
import { generateToken } from "../utils/jwt.js";
import { getMenusByRole } from "./menu.service.js";

export const loginUser = async ({ Documento, Password, Role }) => {

  const user = await prisma.RUsuario.findFirst({
    where: {
      Documento,
      IdRole: Role ? { not: 3 } : 3
    },
  });

  if (!user) {
    throw new Error("Usuario no registrado en el sistema");
  }

  if (!user.Activo) {
    throw new Error("Usuario inactivo en el sistema");
  }

  const validPassword = await comparePassword(Password, user.Password);

  if (!validPassword) {
    throw new Error("Contraseña incorrecta");
  }

  const token = generateToken(user);
  const menus = await getMenusByRole(user.IdRole);

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
    menus
  };
};