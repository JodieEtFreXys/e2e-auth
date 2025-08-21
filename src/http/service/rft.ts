import prisma from "../../global/prisma";

class AuthService {
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
        };;
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

        if (token !== user.forgot_password_token) {
            throw new Error('Token not provided');
        }

        await prisma.$transaction([
            prisma.user.update({
                where: {
                    email
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