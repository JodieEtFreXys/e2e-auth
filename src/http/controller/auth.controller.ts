import { NextFunction, Request, Response } from "express";
import { authService } from "../service/auth.service";

class AuthController {
    public async register (req: Request, res: Response, next: NextFunction) {
        try {
            const {
                email,
                password,  
            } = req.body; // <- Akses ke Request Body
 
            if (!email){
               return res.status(400).json({ message: "Email is mandatory" });
            }

            if (typeof email !== 'string'){ 
                return res.status(400).json({ message: "Email must be a string" });
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                return res.status(400).json({ message: "Invalid email format" });
            }

            if (!password){
                return res.status(400).json({ message: "Password is mandatory" });
            }
                
            if (password.length < 8){
               return res
                 .status(400)
                 .json({ message: "Password must be at least 8 characters" });
            }

            const token = await authService.login(email, password); // <- Panggil Service buat login

            if (!token) {
              return res
                .status(401)
                .json({ message: "Invalid email or password" });
            }
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