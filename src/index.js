import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { pool } from "./db/connection.js";
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);

app.get("/", (req, res) => {
    res.send("<h1>IBIS WORKS!</h1>");
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
});

app.get("/test-db", async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT NOW()");
        res.json({ ok: true, rows });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});