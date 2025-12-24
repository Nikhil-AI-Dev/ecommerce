import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req) {
    try {
        const { email } = await req.json();

        // Check against prisma or mock
        let user = null;
        if (prisma && prisma.user && prisma.user.findUnique) {
            user = await prisma.user.findUnique({
                where: { email },
            });
        }

        // For demo purposes, check hardcoded demo user too
        if (email === "demo@srilakshmi.com") {
            user = { email: "demo@srilakshmi.com" };
        }

        return NextResponse.json({ user });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ user: null });
    }
}
