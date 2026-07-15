import { PrismaClient } from "@prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";

const globalForPrisma = globalThis as unknown as { prisma_v6: PrismaClient };

function getPrismaClient() {
    const connectionString = process.env.DATABASE_URL || "postgresql://neondb_owner:npg_XsB9rm7MqgAJ@ep-patient-wave-aoi1j2a5.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require";
    const adapter = new PrismaNeon({ connectionString });
    return new PrismaClient({ adapter });
}

export const prisma = globalForPrisma.prisma_v6 || getPrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma_v6 = prisma;
