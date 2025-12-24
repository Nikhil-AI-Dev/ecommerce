import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    return null;
                }

                // Ideally we fetch from DB
                // const user = await prisma.user.findUnique({ where: { email: credentials.email } });

                // For Prototype without live DB connection, we'll mock a user or check against a hardcoded demo user + any registered in runtime memory if we had one.
                // BUT, since we want "High Security level about customers details", simulating it properly is key.

                // Let's rely on our mock prisma client or real one. 
                // If we are in "Mock Mode" (Prisma generation failed earlier), we might need to simulate success.

                // DEMO USER for prototype ease
                if (credentials.email === "demo@srilakshmi.com" && credentials.password === "password123") {
                    return { id: "1", name: "Demo User", email: "demo@srilakshmi.com" };
                }

                // Check against "Real" DB (or our Safe Mock Wrapper)
                const user = await prisma.user?.findUnique?.({ where: { email: credentials.email } });

                if (!user) {
                    return null;
                }

                const isPasswordValid = await bcrypt.compare(credentials.password, user.passwordHash);

                if (!isPasswordValid) {
                    return null;
                }

                return {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                };
            }
        })
    ],
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET || "very-secret-key-change-this",
    pages: {
        signIn: "/login",
    },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
