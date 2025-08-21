import { NextFunction, Request, Response } from "express";
import { authService } from "../service/auth.service";

class AuthController {
    public async generateForgotPasswordToken (req: Request, res: Response, next: NextFunction) {
        try {
            const {
                email,
                
            } = req.body; // <- Akses ke Request Body
            
            if (!email) {
                throw new Error('Username is mandatory')
            }

            if (typeof(email) !== 'string' && email.length > 35) {
                throw new Error('Username must be astring');
            }

            const result = await authService.generateForgotPassword(email); // <- Panggil Service buat login

            res.status(200).json({
                message: result.message,
            });
        } catch  (error: any) {
            const err: string[] = error.message.split('#');
            res.status(Number(err[1]) || 500).json({
                message: err[0] || 'Internal server error',
            }); // <- Ngasih Error ke Frontend
        }
    }

    public async resetPassword (req: Request, res: Response, next: NextFunction) {
        try {
            const {
                token,
                email,
            } = req.body;

            if (!token) {
                throw new Error('token not provided');
            }

            const result = await authService.resetPassword(token, email);

            res.status(200).json({
                message: result,
            });
        } catch (error: any) {
            const err: string[] = error.message.split('#');
            res.status(Number(err[1]) || 500).json({
                message: err[0] || 'Internal server error',
            }); // <- Ngasih Error ke Frontend
        }
    }
}

export default AuthController;