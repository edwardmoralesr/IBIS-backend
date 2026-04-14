import express from "express";
import { getMenus } from "../controllers/menu.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
const router = express.Router();

router.get("/", authMiddleware, getMenus);

export default router;