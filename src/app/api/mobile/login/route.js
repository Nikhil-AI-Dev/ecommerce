import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(req) {
    try {
        const { email, password } = await req.json();

        if (!email || !password) {
            return NextResponse.json({ message: "Email and password are required." }, { status: 400 });
        }

        // 1. Find user in database
        let user;
        if (prisma && prisma.user && prisma.user.findUnique) {
            user = await prisma.user.findUnique({
                where: { email },
            });
        }

        // 2. Validate password
        if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
            return NextResponse.json({ message: "Invalid credentials." }, { status: 401 });
        }

        // 3. Return user profile (exclude sensitive data)
        const { passwordHash, ...userProfile } = user;

        return NextResponse.json({
            success: true,
            user: userProfile,
            token: `mock_jwt_${Date.now()}` // In production, use real JWT
        });

    } catch (error) {
        console.error("Mobile Login Error:", error);
        return NextResponse.json(
            { message: "Server error during login." },
            { status: 500 }
        );
    }
}
