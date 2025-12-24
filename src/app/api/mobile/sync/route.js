import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req) {
    try {
        const body = await req.json();
        const { email, type, items } = body;

        if (!email || !type || !items) {
            return NextResponse.json({ message: "Missing required fields." }, { status: 400 });
        }

        // In a real production app with a real database:
        // 1. You would identify the user by email/token.
        // 2. You would update a 'cart' or 'wishlist' column in the User table (or a separate related table).

        console.log(`Syncing ${type} for user ${email}:`, items.length, "items.");

        // For this prototype, we simulate a successful database write.
        // If we had a real User model with a Json field for cart/wishlist, we'd do:
        /*
        await prisma.user.update({
            where: { email },
            data: { [type]: items }
        });
        */

        return NextResponse.json({
            success: true,
            message: `${type} synced successfully.`,
            syncedAt: new Date().toISOString()
        });

    } catch (error) {
        console.error("Sync API Error:", error);
        return NextResponse.json(
            { message: "Failed to sync data." },
            { status: 500 }
        );
    }
}
