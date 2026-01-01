import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import bcrypt from "bcryptjs";
import { sendWelcomeEmail } from "@/lib/email";

export async function POST(req) {
    try {
        const { name, email, password } = await req.json();
        const hashedPassword = await bcrypt.hash(password, 10);

        // Use our safe prisma wrapper or mock logic
        if (prisma && prisma.user && prisma.user.create) {
            await prisma.user.create({
                data: {
                    name,
                    email,
                    passwordHash: hashedPassword,
                },
            });
        }

        // Send thank you email (non-blocking for better UX)
        sendWelcomeEmail(email, name).catch(err => console.error("Email error:", err));

        return NextResponse.json({ message: "User registered." }, { status: 201 });
    } catch (error) {
        console.error("Registration error:", error);
        return NextResponse.json(
            { message: "An error occurred while registering the user." },
            { status: 500 }
        );
    }
}
