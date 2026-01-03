import { NextResponse } from "next/server";
import { getPrisma } from "@/lib/db";

export const dynamic = 'force-dynamic';

export async function POST(req) {
    const prisma = await getPrisma();
    try {
        const { email } = await req.json();

        // Check against prisma or mock
        let user = null;
        if (prisma && prisma.user && prisma.user.findUnique) {
            user = await prisma.user.findUnique({
                where: { email },
            });
        }

        return NextResponse.json({ user });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ user: null });
    }
}
