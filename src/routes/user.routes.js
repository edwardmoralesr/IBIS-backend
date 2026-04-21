import express from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { getUsers } from "../controllers/user.controller.js";

const router = express.Router();

router.get("/", authMiddleware, getUsers, (req, res) => {
    res.json({
        message: "Acceso permitido",
        user: req.user,
    });
});

export default router;