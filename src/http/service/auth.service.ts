import prisma from "../../global/prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid"; 

class AuthService {
  public async login(email: string, password: string) {
    const users = await prisma.user.findMany({
     where: { email },
    });

    const user = users[0];
    console.log(users);
    console.log(user);
    if (!user) {
      throw { message: "Invalid credentials", status: 401 };
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw { message: "Invalid credentials sdf", status: 401 };
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

  public async register(email: string, password: string,) {
        const isUserExist = await prisma.user.findUnique({
      where: {
        email,
      },
    })
       console.log(isUserExist);
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

    private async sendEmail() {
        console.log('Email sent!');
    }

    public async generateForgotPassword(email: string) {
        const user = await prisma.user.findFirst({
            where: {
                name: email,
            }
        });

        const resetMessage = "Your reset token has been sent"
        if (!user) {
            return {
                "message": resetMessage,
            };
        }

        const resetPasswordToken = Math.random();
        await prisma.$transaction([
            prisma.user.update({
                where: {
                    id: user.id
                },
                data: {
                    forgot_password_token: String(resetPasswordToken),
                }
            }),
        ]);
        
        await this.sendEmail();

        return {
            "message": resetMessage,
        };
    }

    public async resetPassword(token: string, email: string) {
        const user = await prisma.user.findFirst({
            where: {
                email,
            }
        });

        if (!user) {
            throw new Error('Token not provided');
        }
        console.log(token);
        console.log(user);
        if (token !== user.forgot_password_token) {
            throw new Error('Token not provided');
        }

        await prisma.$transaction([
            prisma.user.update({
                where: {
                    id: user.id,
                },
                data: {
                    forgot_password_token: 'not reset',
                }
            }),
        ]);

        return 'reset success';
    }
}

export const authService = new AuthService();
