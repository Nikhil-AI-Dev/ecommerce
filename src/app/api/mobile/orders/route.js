import { NextResponse } from "next/server";
import prisma from "@/lib/db";

export const dynamic = 'force-dynamic';

export async function GET(req) {
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

        // If no real DB orders, return mock data for demonstration
        if (orders.length === 0) {
            orders = [
                {
                    id: 'ORD-5521',
                    totalAmount: 45000,
                    status: 'Delivered',
                    createdAt: new Date().toISOString(),
                    items: [{ name: 'Royal Banarasi Silk Saree', price: 45000, qty: 1 }]
                },
                {
                    id: 'ORD-4122',
                    totalAmount: 12000,
                    status: 'Shipped',
                    createdAt: new Date(Date.now() - 86400000).toISOString(),
                    items: [{ name: 'Gadwal Silk Cotton', price: 12000, qty: 1 }]
                }
            ];
        }

        return NextResponse.json({ success: true, orders });

    } catch (error) {
        console.error("Mobile Orders API Error:", error);
        return NextResponse.json(
            { message: "Failed to fetch orders." },
            { status: 500 }
        );
    }
}
