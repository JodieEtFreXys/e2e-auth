import { Router, NextFunction, Request, Response } from 'express';
import AuthController from '../controller/auth.controller';

const router = Router(); 
const controller = new AuthController();

router.post(
    '/auth/forgot_password',
    (req: Request, res: Response, next: NextFunction) => controller.generateForgotPasswordToken(req, res, next),
);

router.post(
    '/user/reset_password',
    (req: Request, res: Response) => {
        
    }
);

export default router; 
