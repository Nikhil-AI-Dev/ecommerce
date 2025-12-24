import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const { name, email, message } = await req.json();

        // In a real app, you might save this to a 'ContactMessage' table in Prisma
        // or send an internal notification email to the store owner.

        console.log("CONTACT FORM SUBMISSION:", { name, email, message });

        // For now, we simulate success
        return NextResponse.json({ message: "Message received." }, { status: 200 });
    } catch (error) {
        console.error("Contact API error:", error);
        return NextResponse.json(
            { message: "Failed to send message." },
            { status: 500 }
        );
    }
}
