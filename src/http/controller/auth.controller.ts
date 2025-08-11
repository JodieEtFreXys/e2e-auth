import { NextFunction, Request, Response } from "express";
import { authService } from "../service/auth.service";

class AuthController {
    public async login (req: Request, res: Response, next: NextFunction) {
        try {
            const {
                
            } = req.body; // <- Akses ke Request Body

            if (!username) {
                throw new Error('Username is mandatory')
            }

            if (typeof(username) !== 'string' && username.length > 35) {
                throw new Error('Username must be astring');
            }

            const user = authService.login(username, password); // <- Panggil Service buat login

            res.status(200).json({
                message: "login success!",
                meta: user,
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