import { Router } from "express";
import AuthController from "../controller/auth.controller";

const router = Router();
const controller = new AuthController();

router.post("/login", (req, res, next) => controller.login(req, res, next));

export default router;
