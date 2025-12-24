"use client";
import { useState, useEffect } from 'react';
import { theme } from '../../../store/uiStore';

export default function AdminOrders() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            // In a real app, this would be /api/admin/orders
            // For now, we simulate with a timeout and mock data
            setTimeout(() => {
                setOrders([
                    { id: 'ORD-7721', customer: 'Anjali Sharma', date: '2023-12-23', amount: 45000, status: 'Processing', item: 'Royal Banarasi Silk' },
                    { id: 'ORD-7722', customer: 'Vikram Singh', date: '2023-12-22', amount: 32000, status: 'Shipped', item: 'Cream & Gold Kanchipuram' },
                    { id: 'ORD-7723', customer: 'Priya Reddy', date: '2023-12-21', amount: 12500, status: 'Delivered', item: 'Gadwal Silk Traditional' },
                    { id: 'ORD-7724', customer: 'Suresh Kumar', date: '2023-12-20', amount: 2500, status: 'Pending', item: 'Handloom Cotton Special' },
                    { id: 'ORD-7725', customer: 'Meena Iyer', date: '2023-12-19', amount: 55000, status: 'Delivered', item: 'Designer Bridal Silk' },
                ]);
                setLoading(false);
            }, 500);
        };
        fetchOrders();
    }, []);

    const getStatusColor = (status) => {
        switch (status) {
            case 'Delivered': return { bg: '#e8f5e9', text: '#2e7d32' };
            case 'Shipped': return { bg: '#e3f2fd', text: '#1565c0' };
            case 'Processing': return { bg: '#fff3e0', text: '#ef6c00' };
            case 'Pending': return { bg: '#fafafa', text: '#616161' };
            default: return { bg: '#eee', text: '#333' };
        }
    };

    if (loading) return <div style={{ padding: '40px', textAlign: 'center' }}>Loading Orders...</div>;

    return (
        <div style={{ display: 'grid', gap: '30px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <p style={{ color: '#666' }}>Review and manage customer orders and their fulfillment status.</p>
                <div style={{ display: 'flex', gap: '10px' }}>
                    <button style={{ padding: '10px 20px', backgroundColor: '#fff', border: '1px solid #ddd', borderRadius: '8px', cursor: 'pointer' }}>Filter</button>
                    <button style={{ padding: '10px 20px', backgroundColor: '#fff', border: '1px solid #ddd', borderRadius: '8px', cursor: 'pointer' }}>Export</button>
                </div>
            </div>

            <div style={{ backgroundColor: '#fff', borderRadius: '12px', overflow: 'hidden', border: '1px solid #eee' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead style={{ backgroundColor: '#f9f9f9' }}>
                        <tr style={{ textAlign: 'left', borderBottom: '1px solid #eee' }}>
                            <th style={{ padding: '15px 20px', fontSize: '14px', color: '#888' }}>Order ID</th>
                            <th style={{ padding: '15px 20px', fontSize: '14px', color: '#888' }}>Customer</th>
                            <th style={{ padding: '15px 20px', fontSize: '14px', color: '#888' }}>Product</th>
                            <th style={{ padding: '15px 20px', fontSize: '14px', color: '#888' }}>Amount</th>
                            <th style={{ padding: '15px 20px', fontSize: '14px', color: '#888' }}>Status</th>
                            <th style={{ padding: '15px 20px', fontSize: '14px', color: '#888' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order) => {
                            const colors = getStatusColor(order.status);
                            return (
                                <tr key={order.id} style={{ borderBottom: '1px solid #f9f9f9' }}>
                                    <td style={{ padding: '20px', fontWeight: 'bold' }}>#{order.id}</td>
                                    <td style={{ padding: '20px' }}>
                                        <div style={{ fontSize: '14px', fontWeight: 'bold' }}>{order.customer}</div>
                                        <div style={{ fontSize: '12px', color: '#888' }}>{order.date}</div>
                                    </td>
                                    <td style={{ padding: '20px' }}>{order.item}</td>
                                    <td style={{ padding: '20px', fontWeight: 'bold' }}>₹{order.amount.toLocaleString()}</td>
                                    <td style={{ padding: '20px' }}>
                                        <span style={{
                                            padding: '4px 12px',
                                            borderRadius: '20px',
                                            fontSize: '11px',
                                            fontWeight: 'bold',
                                            backgroundColor: colors.bg,
                                            color: colors.text
                                        }}>
                                            {order.status}
                                        </span>
                                    </td>
                                    <td style={{ padding: '20px' }}>
                                        <button style={{ color: theme.colors.primary, border: 'none', background: 'none', cursor: 'pointer', fontSize: '14px' }}>View Details</button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
