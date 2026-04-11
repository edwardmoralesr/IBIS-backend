import { loginUser } from "../services/auth.service.js";

export const login = async (req, res) => {
    try {
        const result = await loginUser(req.body);
        res.json(result);
    } catch (err) {
        res.status(401).json({ error: err.message });
    }
};