import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
    try {
        // In a real app, these would be complex queries
        const totalSales = await prisma.order.aggregate({
            _sum: { totalAmount: true }
        });

        const activeOrders = await prisma.order.count({
            where: { status: 'pending' }
        });

        const totalCustomers = await prisma.user.count();

        // Get popular categories
        const products = await prisma.product.findMany({
            include: {
                _count: {
                    select: { orderItems: true }
                }
            }
        });

        // Dummy historical data for charts
        const salesTrend = [
            { date: 'Mon', revenue: 45000 },
            { date: 'Tue', revenue: 52000 },
            { date: 'Wed', revenue: 48000 },
            { date: 'Thu', revenue: 61000 },
            { date: 'Fri', revenue: 55000 },
            { date: 'Sat', revenue: 72000 },
            { date: 'Sun', revenue: 68000 },
        ];

        return NextResponse.json({
            totalSales: totalSales._sum.totalAmount || 0,
            activeOrders,
            totalCustomers,
            peakTime: "4 PM - 8 PM",
            salesTrend,
            categoryAnalysis: [
                { name: 'Banarasi Silk', percentage: 40, revenue: 1250000 },
                { name: 'Handloom Cotton', percentage: 25, revenue: 145000 },
                { name: 'Kanchipuram', percentage: 20, revenue: 950000 },
                { name: 'Others', percentage: 15, revenue: 520000 }
            ]
        });
    } catch (error) {
        console.error("Stats API error:", error);
        return NextResponse.json({ error: "Failed to fetch stats" }, { status: 500 });
    }
}
