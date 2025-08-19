import{ Router, Request, Response, NextFunction } from 'express';
import AuthController from "../controller/auth.controller";


const router = Router();
const controller = new AuthController()

router.post(
    '/auth/login',
    (req: Request, res: Response, next: NextFunction) =>  controller.login(req, res, next)
);
export default router;