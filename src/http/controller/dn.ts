import { NextFunction, Request, Response } from "express";
import { authService } from "../service/auth.service";

class AuthController {
    public async register (req: Request, res: Response, next: NextFunction) {
        try {
            const {
                confirm_password,
                password,
                email,
                
            } = req.body; // <- Akses ke Request Body

            //email validation
            if (!email) {
            throw new Error("Email is required#400");
            }

            if (typeof(email) !== 'string' && email.length > 35) {
                throw new Error('Username must be astring');
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
             if (!emailRegex.test(email)) {
                throw new Error("must be email format");
            }

            //password validation
             if (password !== confirm_password) {
                throw new Error('Password mismatch')
            }

            if (!password) {
                 throw new Error("Password is required#400");
             }

            if (password.length < 8) {
                throw new Error("Password must be at least 8 characters#400");
            }
            const user = authService.register(email, password); // <- Panggil Service buat login

            res.status(200).json({
                message: "Create an account success, please login to your account!",
                meta: user,
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