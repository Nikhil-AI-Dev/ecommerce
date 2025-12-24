const { PrismaClient } = require('@prisma/client');

let prisma;

if (process.env.DATABASE_URL) {
    if (process.env.NODE_ENV === 'production') {
        prisma = new PrismaClient();
    } else {
        if (!global.prisma) {
            global.prisma = new PrismaClient();
        }
        prisma = global.prisma;
    }
} else {
    throw new Error("DATABASE_URL is missing. Production database connection required for the platform to function.");
}

export default prisma;
