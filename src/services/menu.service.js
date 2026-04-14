import { prisma } from "../db/prisma.js";

export const getMenusByRole = async (roleId) => {
    const menus = await prisma.rMenu.findMany();

    return menus
        .map(menu => ({
            id: menu.IdMenu,
            titulo: menu.Nombre,
            ruta: `/${menu.Pagina}`,
            icono: menu.Icono,
            permisos: menu.Permisos.split("|").map(Number),
        }))
        .filter(menu => menu.permisos.includes(roleId));
};