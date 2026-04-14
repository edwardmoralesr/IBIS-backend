import { getMenusByRole } from "../services/menu.service.js";

export const getMenus = async (req, res) => {
    try {
        const user = req.user;

        const menus = await getMenusByRole(user.IdRole);
        res.json(menus);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error obteniendo menús" });
    }
};