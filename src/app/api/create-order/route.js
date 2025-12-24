import { NextResponse } from 'next/server';
import Razorpay from 'razorpay';
import prisma from '@/lib/prisma';

// Initialize Razorpay (will work only if keys are present, otherwise mock)
const razorpay = process.env.RAZORPAY_KEY_ID
    ? new Razorpay({
        key_id: process.env.RAZORPAY_KEY_ID,
        key_secret: process.env.RAZORPAY_KEY_SECRET,
    })
    : null;

export async function POST(request) {
    try {
        const body = await request.json();
        const { items, totalAmount, userDetails } = body;

        // 1. Create Order in Database (Pending State)
        // Note: In a real app, we would authenticate the user here.
        // For now, we create a 'guest' user order or link if we had auth.

        // Simulating database operation for prototype (since DB might not be connected yet)
        let dbOrder;
        // Check if prisma is the real client or our mock
        if (prisma && prisma.order && prisma.order.create) {
            try {
                dbOrder = await prisma.order.create({
                    data: {
                        totalAmount: totalAmount,
                        status: 'pending'
                    }
                });
            } catch (e) {
                // Fallback if DB connection fails even if client exists
                dbOrder = { id: `ORDER_ERR_${Date.now()}`, status: 'pending', amount: totalAmount };
            }
        } else {
            // Fallback for mock client or no client
            dbOrder = { id: `ORDER_MOCK_${Date.now()}`, status: 'pending', amount: totalAmount };
        }

        // 2. Create Razorpay Order
        let paymentOrderId = `mock_rpay_${Date.now()}`;

        if (razorpay) {
            const options = {
                amount: totalAmount * 100, // Razorpay takes amount in paise
                currency: 'INR',
                receipt: dbOrder.id,
            };
            const order = await razorpay.orders.create(options);
            paymentOrderId = order.id;
        }

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
