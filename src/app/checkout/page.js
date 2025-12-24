'use client';

import { useCart } from '../../context/CartContext';
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Navbar from '../../components/Navbar';

export default function CheckoutPage() {
    const { cart, cartTotal } = useCart();
    const { data: session, status } = useSession();
    const router = useRouter();
    const [isProcessing, setIsProcessing] = useState(false);
    const [orderPlaced, setOrderPlaced] = useState(false);
    const [orderDetails, setOrderDetails] = useState(null);

    useEffect(() => {
        if (status === 'unauthenticated') {
            router.push('/login?callbackUrl=/checkout');
        }
    }, [status, router]);

    if (status === 'loading') {
        return <div className="container" style={{ marginTop: '100px', textAlign: 'center' }}>Loading...</div>;
    }

    const handlePayment = async (e) => {
        e.preventDefault();
        setIsProcessing(true);

        try {
            const formData = new FormData(e.target);
            const userDetails = Object.fromEntries(formData.entries());

            // 1. Call our internal API to create order
            const response = await fetch('/api/create-order', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    items: cart,
                    totalAmount: cartTotal,
                    userDetails,
                }),
            });

            const data = await response.json();

            if (data.success) {
                // In a real flow, here we would open Razorpay:
                // const options = { 
                //    key: data.keyId, 
                //    amount: data.amount, 
                //    order_id: data.paymentOrderId,
                //    handler: function (response) { ... } 
                // }
                // const rzp = new window.Razorpay(options);
                // rzp.open();

                // For prototype, we simulate successful mock payment

                // 2. Simulate Shipping Label Generation
                const shippingResponse = await fetch('/api/shiprocket', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ orderId: data.orderId, address: userDetails })
                });
                const shippingData = await shippingResponse.json();

                setOrderDetails({ ...data, shipping: shippingData });
                setOrderPlaced(true);
            } else {
                alert('Order creation failed!');
            }

        } catch (err) {
            console.error(err);
            alert('Something went wrong!');
        } finally {
            setIsProcessing(false);
        }
    };

    if (orderPlaced) {
        return (
            <main style={{ backgroundColor: '#fcfcfc', minHeight: '100vh' }}>
                <Navbar />
                <div className="container text-center" style={{ paddingTop: '100px', maxWidth: '600px' }}>
                    <div style={{
                        width: '100px',
                        height: '100px',
                        borderRadius: '50%',
                        backgroundColor: '#f0fdf4',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 30px',
                        border: '2px solid #22c55e'
                    }}>
                        <span style={{ fontSize: '50px', color: '#22c55e' }}>✓</span>
                    </div>
                    <h1 style={{ marginBottom: '15px', fontFamily: 'var(--font-family-heading)', fontSize: '42px' }}>Heartfelt Thanks!</h1>
                    <p style={{ marginBottom: '40px', fontSize: '18px', color: '#666', lineHeight: '1.6' }}>
                        Your elegant selection from Sri Lakshmi Narayana Handlooms is now being prepared with the utmost care.
                    </p>

                    <div style={{ backgroundColor: '#fff', padding: '30px', borderRadius: '12px', border: '1px solid #eee', textAlign: 'left', boxShadow: '0 4px 15px rgba(0,0,0,0.05)', marginBottom: '40px' }}>
                        <h3 style={{ marginBottom: '20px', fontSize: '18px', borderBottom: '1px solid #eee', paddingBottom: '10px' }}>Order Confirmation</h3>
                        <p style={{ marginBottom: '10px' }}><strong>Order Number:</strong> <span style={{ fontFamily: 'monospace' }}>#ORD-{orderDetails?.orderId}</span></p>
                        <p style={{ marginBottom: '10px' }}><strong>Tracking Number:</strong> {orderDetails?.shipping?.trackingId}</p>
                        <p style={{ marginBottom: '10px' }}><strong>Estimated Delivery:</strong> {orderDetails?.shipping?.estimatedDelivery}</p>
                        <p style={{ fontSize: '13px', color: '#888', marginTop: '20px' }}>* A confirmation email has been sent to {session?.user?.email}.</p>
                    </div>

                    <div style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
                        <a href="/" className="btn btn-primary" style={{ padding: '15px 40px' }}>Continue Shopping</a>
                        <Link href="/shop" style={{ padding: '15px 40px', border: '1px solid #ddd', borderRadius: '8px', textDecoration: 'none', color: '#333', fontWeight: 'bold' }}>View Catalog</Link>
                    </div>
                </div>
            </main>
        );
    }

    return (
        <main style={{ backgroundColor: '#fcfcfc', minHeight: '100vh' }}>
            <Navbar />
            <div className="container mt-lg mb-lg">
                <h1 className="text-center" style={{ marginBottom: '50px', fontFamily: 'var(--font-family-heading)', fontSize: '42px' }}>Finalize Your Order</h1>

                <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.2fr) minmax(0, 0.8fr)', gap: '60px' }}>
                    {/* Shipping Form */}
                    <div style={{ backgroundColor: '#fff', padding: '40px', borderRadius: '16px', border: '1px solid #eee', boxShadow: '0 4px 20px rgba(0,0,0,0.02)' }}>
                        <h2 style={{ marginBottom: '30px', fontSize: '24px', fontFamily: 'var(--font-family-heading)' }}>Shipping Address</h2>
                        <form onSubmit={handlePayment} id="checkout-form">
                            <div style={{ display: 'grid', gap: '20px' }}>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                                    <div style={{ display: 'grid', gap: '8px' }}>
                                        <label style={{ fontSize: '13px', fontWeight: 'bold', color: '#666' }}>Full Name</label>
                                        <input name="fullName" type="text" defaultValue={session?.user?.name || ''} required style={{ width: '100%', padding: '14px', borderRadius: '8px', border: '1px solid #ddd', backgroundColor: '#f9f9f9' }} />
                                    </div>
                                    <div style={{ display: 'grid', gap: '8px' }}>
                                        <label style={{ fontSize: '13px', fontWeight: 'bold', color: '#666' }}>Email Address</label>
                                        <input name="email" type="email" defaultValue={session?.user?.email || ''} required style={{ width: '100%', padding: '14px', borderRadius: '8px', border: '1px solid #ddd', backgroundColor: '#f9f9f9' }} />
                                    </div>
                                </div>
                                <div style={{ display: 'grid', gap: '8px' }}>
                                    <label style={{ fontSize: '13px', fontWeight: 'bold', color: '#666' }}>Address Line 1</label>
                                    <input name="address" type="text" placeholder="House No, Street Name" required style={{ width: '100%', padding: '14px', borderRadius: '8px', border: '1px solid #ddd' }} />
                                </div>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px' }}>
                                    <div style={{ display: 'grid', gap: '8px' }}>
                                        <label style={{ fontSize: '13px', fontWeight: 'bold', color: '#666' }}>City</label>
                                        <input name="city" type="text" required style={{ width: '100%', padding: '14px', borderRadius: '8px', border: '1px solid #ddd' }} />
                                    </div>
                                    <div style={{ display: 'grid', gap: '8px' }}>
                                        <label style={{ fontSize: '13px', fontWeight: 'bold', color: '#666' }}>State</label>
                                        <input name="state" type="text" required style={{ width: '100%', padding: '14px', borderRadius: '8px', border: '1px solid #ddd' }} />
                                    </div>
                                    <div style={{ display: 'grid', gap: '8px' }}>
                                        <label style={{ fontSize: '13px', fontWeight: 'bold', color: '#666' }}>Pincode</label>
                                        <input name="pincode" type="text" required style={{ width: '100%', padding: '14px', borderRadius: '8px', border: '1px solid #ddd' }} />
                                    </div>
                                </div>
                                <div style={{ display: 'grid', gap: '8px' }}>
                                    <label style={{ fontSize: '13px', fontWeight: 'bold', color: '#666' }}>Phone Number</label>
                                    <input name="phone" type="tel" placeholder="+91" required style={{ width: '100%', padding: '14px', borderRadius: '8px', border: '1px solid #ddd' }} />
                                </div>
                            </div>
                        </form>
                    </div>

                    {/* Payment Summary */}
                    <div style={{ backgroundColor: '#f9f9f9', padding: '30px', borderRadius: '8px', height: 'fit-content' }}>
                        <h2 style={{ marginBottom: '20px' }}>Order Summary</h2>
                        {cart.map(item => (
                            <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', fontSize: '14px' }}>
                                <span>{item.name} x {item.quantity}</span>
                                <span>₹{(item.price * item.quantity).toLocaleString('en-IN')}</span>
                            </div>
                        ))}
                        <hr style={{ margin: '20px 0', border: 'none', borderTop: '1px solid #ddd' }} />
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', fontSize: '18px', marginBottom: '30px' }}>
                            <span>Total Amount</span>
                            <span>₹{cartTotal.toLocaleString('en-IN')}</span>
                        </div>

                        <button
                            type="submit"
                            form="checkout-form"
                            disabled={isProcessing}
                            className="btn btn-primary"
                            style={{ width: '100%', opacity: isProcessing ? 0.7 : 1 }}
                        >
                            {isProcessing ? 'Processing Payment...' : 'Pay with Razorpay'}
                        </button>
                        <p style={{ marginTop: '15px', fontSize: '12px', color: '#666', textAlign: 'center' }}>
                            Secure Payment via Razorpay (Mock Mode)
                        </p>
                    </div>
                </div>
            </div>
        </main>
    );
}
