import { NextResponse } from "next/server";
import { getPrisma } from "@/lib/db";

export const dynamic = 'force-dynamic';

export async function GET(req) {
    const prisma = await getPrisma();
    try {
        const { searchParams } = new URL(req.url);
        const email = searchParams.get('email');

        if (!email) {
            return NextResponse.json({ message: "User email is required." }, { status: 400 });
        }

        // Fetch orders for this user
        let orders = [];
        if (prisma && prisma.order && prisma.order.findMany) {
            orders = await prisma.order.findMany({
                where: { userEmail: email }, // Assuming schema has this or links to user
                orderBy: { createdAt: 'desc' }
            });
        }

        // If no orders found, return empty array
        return NextResponse.json({ success: true, orders });

        return NextResponse.json({ success: true, orders });

    } catch (error) {
        console.error("Mobile Orders API Error Detail:", {
            message: error.message,
            stack: error.stack,
            name: error.name,
            code: error.code
        });
        return NextResponse.json(
            { message: "Failed to fetch orders." },
            { status: 500 }
        );
    }
}
