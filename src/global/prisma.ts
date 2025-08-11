import { PrismaClient } from "../generated/prisma";

class PrismaService {
    private static instance: PrismaClient;

    constructor () {
        PrismaService.instance = new PrismaClient();
    }

    public static getInstance(): PrismaClient {
        if (!PrismaService.instance) {
            new PrismaService();
        }

        return PrismaService.instance;
    }
}

const prisma = PrismaService.getInstance();
export default prisma;