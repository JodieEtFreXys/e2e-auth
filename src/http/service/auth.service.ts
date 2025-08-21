import prisma from "../../global/prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

class AuthService {
  public async login(email: string, password: string) {
    const users = await prisma.user.findMany({
     where: { email },
    });

    const user = users[0];

    if (!user) {
      throw { message: "Invalid credentials", status: 401 };
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw { message: "Invalid credentials", status: 401 };
    }

   
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET || "default_secret",
      { expiresIn: "1h" }
    );

     return {
       message: "Login success",
       user: {
         id: user.id,
         email: user.email,
         name: user.name,
       },
       token,
     };
  }
}

export const authService = new AuthService();
