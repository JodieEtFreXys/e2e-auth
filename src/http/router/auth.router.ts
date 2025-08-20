import { Router, Request, Response, NextFunction } from "express";
import AuthController from "../controller/auth.controller";

const router = Router();
const controller = new AuthController();

router.post(
  "/auth/register",
  (req: Request, res: Response, next: NextFunction) =>
    controller.register(req, res, next) 
);

export default router;