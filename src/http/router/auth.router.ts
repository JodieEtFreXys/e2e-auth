import { NextFunction, Request, Response, Router } from "express";
import AuthController from "../controller/auth.controller";

const router = Router();
const controller = new AuthController();

router.post("/login", (req, res, next) => controller.login(req, res, next));

router.post(
  "/register",
  (req: Request, res: Response, next: NextFunction) =>
    controller.register(req, res, next) 
);

router.post(
    '/auth/forgot_password',
    (req: Request, res: Response, next: NextFunction) => controller.generateForgotPasswordToken(req, res, next),
);

router.post(
    '/user/reset_password',
    (req: Request, res: Response, next: NextFunction) => controller.resetPassword(req, res, next)
);



export default router;
