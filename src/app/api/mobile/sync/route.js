import { NextResponse } from "next/server";
import { getPrisma } from "@/lib/db";

export const dynamic = 'force-dynamic';

export async function POST(req) {
    const prisma = await getPrisma();
    try {
        const body = await req.json();
        const { email, type, items } = body;

        if (!email || !type || !items) {
            return NextResponse.json({ message: "Missing required fields." }, { status: 400 });
        }

        if (items) {
            console.log(`Syncing ${type} for user ${email}:`, items.length, "items.");

            // Actual database write
            await prisma.user.update({
                where: { email },
                data: { [type]: items }
            });

            // For "realtime" feel, we could also create a notification
            await prisma.notification.create({
                data: {
                    userId: (await prisma.user.findUnique({ where: { email } })).id,
                    title: `${type.charAt(0).toUpperCase() + type.slice(1)} Updated`,
                    message: `Your ${type} has been synced across your devices.`,
                }
            });
        }

        return NextResponse.json({
            success: true,
            message: `${type} synced successfully.`,
            syncedAt: new Date().toISOString(),
            realtime: true // Flag to show we are in realtime mode
        });

    } catch (error) {
        console.error("Sync API Error Detail:", {
            message: error.message,
            stack: error.stack,
            name: error.name,
            code: error.code
        });
        return NextResponse.json(
            { message: "Failed to sync data." },
            { status: 500 }
        );
    }
}
