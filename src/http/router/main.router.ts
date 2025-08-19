import { Router } from "express";
import authRouter from "./auth.router";

const router = Router();

// Gabungkan semua route di sini
router.use("/auth", authRouter);

export default router;
