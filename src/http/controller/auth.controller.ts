import { NextFunction, Request, Response } from "express";
import { authService } from "../service/auth.service";

class AuthController {
    public async login (req: Request, res: Response, next: NextFunction) {
        try {
            const {
                email,
                password,  
            } = req.body; // <- Akses ke Request Body

            if (!email){
                throw new Error('Email is mandatory');
            }

            if (typeof email !== 'string'){ 
                throw new Error('Email must be a string');
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                throw { message: 'Invalid email format', status: 400 };
            }

            if (!password){
                throw new Error('Password is mandatory');
            }
                
            if (password.length < 6){
                throw new Error('Password must be at least 6 characters');
            }

            const token = await authService.login(email, password); // <- Panggil Service buat login

            res.status(200).json({
                message: "login success!",
                token: token,
            });
        } catch  (error: any) {
            const err: string[] = error.message.split('#');
            res.status(Number(err[1]) || 500).json({
                message: err[0] || 'Internal server error',
            }); // <- Ngasih Error ke Frontend
        }
    }
}

export default AuthController;