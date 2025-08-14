import prisma from "../../global/prisma";
import bcrypt from "bcrypt";
import {v4 as uuidv4} from "uuid"

class AuthService {
    public async register(email: string, password: string) {
        const isUserExist = await prisma.user.findFirst({
            where: {
                email,
            }
        });

        if (isUserExist) {
            throw new Error('User already registered');
        }

        const hashedPassword = await bcrypt.hash(password, 3);
        const createUser = await prisma.$transaction([
            prisma.user.create({
                data: {
                    id: uuidv4(),
                    name: 'placeholder123',
                    password: hashedPassword,
                    email: email,
                    forgot_password_token: '123456',
                }
            }),
        ]);

        return createUser;
    }
}

export const authService = new AuthService();