import prisma from "../../global/prisma";

class AuthService {
    public async login(username: string, password: string) {
        const user = await prisma.user.findFirst(); // -> Manggil Database pake Prisma

        if (!user) {
            throw new Error('User not found')
        }

        const token = 'abc123';

        return user;
    }
}

export const authService = new AuthService();