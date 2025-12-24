'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Navbar from '../../components/Navbar';

export default function OrdersPage() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (status === 'unauthenticated') {
            router.push('/login?callbackUrl=/orders');
        } else if (status === 'authenticated') {
            fetchOrders();
        }
    }, [status]);

    const fetchOrders = async () => {
        try {
            const res = await fetch(`/api/mobile/orders?email=${session.user.email}`);
            const data = await res.json();
            if (data.success) {
                setOrders(data.orders);
            }
        } catch (error) {
            console.error("Orders fetch error:", error);
        } finally {
            setLoading(false);
        }
    };

    if (status === 'loading' || loading) {
        return <div style={{ minHeight: '60vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>Loading your elegant history...</div>;
    }

    return (
        <main style={{ backgroundColor: '#fcfcfc', minHeight: '100vh' }}>
            <Navbar />
            <div className="container mt-lg mb-lg">
                <h1 style={{ fontFamily: 'var(--font-family-heading)', fontSize: '42px', marginBottom: '10px' }}>Your Heritage Collection</h1>
                <p style={{ color: '#666', marginBottom: '50px' }}>Past purchases and order tracking.</p>

                {orders.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '100px 0', backgroundColor: '#fff', borderRadius: '12px', border: '1px solid #eee' }}>
                        <p style={{ fontSize: '18px', color: '#888' }}>You haven't placed any orders yet.</p>
                        <a href="/shop" className="btn btn-primary" style={{ marginTop: '20px' }}>Start Exploring</a>
                    </div>
                ) : (
                    <div style={{ display: 'grid', gap: '30px' }}>
                        {orders.map(order => (
                            <div key={order.id} style={{ backgroundColor: '#fff', borderRadius: '16px', border: '1px solid #eee', overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.02)' }}>
                                <div style={{ padding: '24px', backgroundColor: '#fdfbf7', borderBottom: '1px solid #eee', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <div>
                                        <p style={{ fontSize: '12px', color: '#888', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '5px' }}>Order Placed</p>
                                        <p style={{ fontWeight: '600' }}>{new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                                    </div>
                                    <div>
                                        <p style={{ fontSize: '12px', color: '#888', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '5px' }}>Total Amount</p>
                                        <p style={{ fontWeight: '600', color: 'var(--color-primary)' }}>₹{order.totalAmount.toLocaleString('en-IN')}</p>
                                    </div>
                                    <div>
                                        <p style={{ fontSize: '12px', color: '#888', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '5px' }}>Status</p>
                                        <span style={{
                                            padding: '4px 12px',
                                            borderRadius: '20px',
                                            fontSize: '12px',
                                            fontWeight: 'bold',
                                            backgroundColor: order.status === 'Delivered' ? '#f0fdf4' : '#fefce8',
                                            color: order.status === 'Delivered' ? '#15803d' : '#854d0e'
                                        }}>
                                            {order.status}
                                        </span>
                                    </div>
                                    <div>
                                        <p style={{ fontSize: '12px', color: '#888', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '5px' }}>Order ID</p>
                                        <p style={{ fontFamily: 'monospace' }}>#{order.id}</p>
                                    </div>
                                </div>
                                <div style={{ padding: '30px' }}>
                                    {order.items?.map((item, idx) => (
                                        <div key={idx} style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                                            <div style={{ width: '60px', height: '80px', backgroundColor: '#eee', borderRadius: '4px' }}></div>
                                            <div>
                                                <h4 style={{ fontSize: '16px', marginBottom: '5px' }}>{item.name}</h4>
                                                <p style={{ fontSize: '14px', color: '#666' }}>Standard Heritage Wrap • Quantity: {item.qty || 1}</p>
                                            </div>
                                        </div>
                                    ))}
                                    <div style={{ marginTop: '30px', borderTop: '1px solid #f9f9f9', paddingTop: '20px', display: 'flex', gap: '20px' }}>
                                        <button style={{ padding: '10px 20px', borderRadius: '8px', border: '1px solid #ddd', backgroundColor: '#fff', fontSize: '14px', cursor: 'pointer' }}>Track Package</button>
                                        <button style={{ padding: '10px 20px', borderRadius: '8px', border: '1px solid #ddd', backgroundColor: '#fff', fontSize: '14px', cursor: 'pointer' }}>Download Invoice</button>
                                        <a href="/contact" style={{ padding: '10px 20px', borderRadius: '8px', border: '1px solid #ddd', backgroundColor: '#fff', fontSize: '14px', cursor: 'pointer', textDecoration: 'none', color: 'inherit' }}>Get Support</a>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </main>
    );
}
