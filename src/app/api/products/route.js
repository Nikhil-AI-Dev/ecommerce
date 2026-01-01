import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const category = searchParams.get('category');
        const featured = searchParams.get('featured');

        let where = {};
        if (category && category !== 'All') {
            where.category = { equals: category, mode: 'insensitive' };
        }
        if (featured === 'true') {
            where.isFeatured = true;
        }

        const products = await prisma.product.findMany({
            where,
            orderBy: { createdAt: 'desc' }
        });

        const response = NextResponse.json(products);

        // Add Edge Caching headers: 
        // s-maxage=60: Cache on CDN for 60 seconds
        // stale-while-revalidate=3600: Serve stale content while updating in background for up to 1 hour
        response.headers.set('Cache-Control', 's-maxage=60, stale-while-revalidate=3600');

        return response;
    } catch (error) {
        console.error("Fetch products error:", error);
        return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
    }
}

export async function POST(request) {
    try {
        const body = await request.json();
        const { name, description, price, category, imageUrl, stockQuantity, isFeatured, discountedPrice } = body;

        const product = await prisma.product.create({
            data: {
                name,
                description,
                price: parseFloat(price),
                discountedPrice: discountedPrice ? parseFloat(discountedPrice) : null,
                category,
                imageUrl,
                stockQuantity: parseInt(stockQuantity),
                isFeatured: !!isFeatured
            }
        });

        return NextResponse.json(product);
    } catch (error) {
        console.error("Create product error:", error);
        return NextResponse.json({ error: "Failed to create product" }, { status: 500 });
    }
}
