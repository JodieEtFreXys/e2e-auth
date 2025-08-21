import prisma from "../../global/prisma";
import bcrypt from "bcrypt"
import {v4 as uuidv4} from "uuid"

class AuthService {
    public async register(password: string, email: string,) {
        const isUserExist = await prisma.user.findUnique({
      where: {
        email,
      },
    })
       
    if (isUserExist) {
      throw new Error('email already exist');
    }


    const hashedPassword = await bcrypt.hash(password, 3);
    const createUser = await prisma.$transaction([
        prisma.user.create({
            data: {
                id: uuidv4(),
                name: 'placeholder123',
                password: hashedPassword,
                email: email,
                forgot_password_token: '12345'
            }
        })
    ])
        return createUser;
    }
}

export const authService = new AuthService();