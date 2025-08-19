import prisma from "../../global/prisma";
import bcrypt from "bcrypt"

class AuthService {
    public async login(username: string, password: string) {
        const user = await prisma.user.findFirst({
            where: {
                email: username,
            }
        }); // -> Manggil Database pake Prisma

        if (!user) {
            throw new Error('Login Failed, please check your credential')
        }

        const userPassword = user.password;
        if (!await bcrypt.compare(password, userPassword)) {
            throw new Error('Login Failed, please check your credential')
        }

        const token = `${username}@${user.nik}`

        return token;
    }
}

export const authService = new AuthService();