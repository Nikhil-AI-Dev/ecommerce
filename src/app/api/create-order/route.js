import { NextResponse } from 'next/server';
import Razorpay from 'razorpay';
import prisma from '@/lib/db';

// Initialize Razorpay (will work only if keys are present, otherwise mock)
const razorpay = process.env.RAZORPAY_KEY_ID
    ? new Razorpay({
        key_id: process.env.RAZORPAY_KEY_ID,
        key_secret: process.env.RAZORPAY_KEY_SECRET,
    })
    : null;

import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";
import { sendOrderConfirmationEmail } from "@/lib/email";

export async function POST(request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
        }

        const body = await request.json();
        const { items, totalAmount, userDetails } = body;

        // Create Order and OrderItems in a Transaction
        const dbOrder = await prisma.$transaction(async (tx) => {
            const order = await tx.order.create({
                data: {
                    userId: session.user.id,
                    totalAmount: totalAmount,
                    status: 'pending',
                    shippingAddress: userDetails,
                }
            });

            // Create Order items
            const orderItemsData = items.map(item => ({
                orderId: order.id,
                productId: item.id,
                quantity: item.quantity,
                price: item.price
            }));

            await tx.orderItem.createMany({
                data: orderItemsData
            });

            return order;
        });

        // 2. Create Razorpay Order
        let paymentOrderId = `mock_rpay_${Date.now()}`;

        if (razorpay) {
            const options = {
                amount: Math.round(totalAmount * 100), // Razorpay takes amount in paise
                currency: 'INR',
                receipt: dbOrder.id,
            };
            const order = await razorpay.orders.create(options);
            paymentOrderId = order.id;
        }

        // Send confirmation email (non-blocking)
        sendOrderConfirmationEmail(session.user.email, dbOrder.id, totalAmount)
            .catch(err => console.error("Email error:", err));

        return NextResponse.json({
            success: true,
            orderId: dbOrder.id,
            paymentOrderId: paymentOrderId,
            amount: totalAmount,
            currency: 'INR',
            keyId: process.env.RAZORPAY_KEY_ID || 'test_key',
        });

    } catch (error) {
        console.error('Error creating order:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to create order' },
            { status: 500 }
        );
    }
}
