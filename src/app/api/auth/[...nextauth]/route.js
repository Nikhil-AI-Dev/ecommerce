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

                // Check against Real DB
                try {
                    const user = await prisma.user.findUnique({ where: { email: credentials.email } });
                    if (!user) return null;

                    const isPasswordValid = await bcrypt.compare(credentials.password, user.passwordHash);
                    if (!isPasswordValid) return null;

                    return {
                        id: user.id,
                        name: user.name,
                        email: user.email,
                    };
                } catch (error) {
                    console.error("Auth error:", error);
                    return null;
                }

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
