import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
    try {
        // Real data queries
        const totalSales = await prisma.order.aggregate({
            _sum: { totalAmount: true }
        });

        const activeOrders = await prisma.order.count({
            where: { status: 'pending' }
        });

        const totalCustomers = await prisma.user.count();

        // Real Top Products by Sales
        const topSarees = await prisma.product.findMany({
            take: 5,
            include: {
                _count: {
                    select: { orderItems: true }
                }
            },
            orderBy: {
                orderItems: { _count: 'desc' }
            }
        });

        // Recent Activity (Mixed feed)
        const recentOrders = await prisma.order.findMany({
            take: 3,
            orderBy: { createdAt: 'desc' },
            include: { user: { select: { name: true } } }
        });

        const recentUsers = await prisma.user.findMany({
            take: 2,
            orderBy: { createdAt: 'desc' }
        });

        const recentActivity = [
            ...recentOrders.map(o => ({ action: 'New Order', user: o.user?.name || 'Guest', time: 'Recently', icon: '🛒', color: '#4CAF50' })),
            ...recentUsers.map(u => ({ action: 'New User Joined', user: u.name, time: 'Recently', icon: '👤', color: '#2196F3' }))
        ].slice(0, 5);

        // Real Category Analysis
        const totalProducts = await prisma.product.count();
        const categoryData = await prisma.product.groupBy({
            by: ['category'],
            _count: { id: true },
        });

        const categoryAnalysis = categoryData.map(c => ({
            name: c.category,
            pct: totalProducts > 0 ? Math.round((c._count.id / totalProducts) * 100) : 0
        }));


        return NextResponse.json({
            totalSales: totalSales._sum.totalAmount || 0,
            activeOrders,
            totalCustomers,
            avgOrderValue: totalSales._sum.totalAmount ? (Number(totalSales._sum.totalAmount) / (await prisma.order.count() || 1)) : 0,
            recentActivity,
            categoryAnalysis,
            topProducts: topSarees.map(s => ({
                name: s.name,
                sales: s._count.orderItems,
                revenue: `₹${(Number(s.price) * s._count.orderItems).toLocaleString()}`,
                stock: s.stockQuantity
            }))
        });
    } catch (error) {
        console.error("Stats API error:", error);
        return NextResponse.json({ error: "Failed to fetch stats" }, { status: 500 });
    }
}
