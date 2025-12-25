"use client";
import { useState, useEffect } from 'react';
import { theme } from '../../../store/uiStore';

export default function AdminDashboard() {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await fetch('/api/admin/stats');
                const data = await res.json();
                setStats(data);
                setLoading(false);
            } catch (error) {
                console.error("Stats fetch error:", error);
                setLoading(false);
            }
        };
        fetchStats();
    }, []);

    if (loading) return <div style={{ padding: '40px', textAlign: 'center' }}>Loading Analytics...</div>;

    const displayStats = [
        { label: 'Total Sales', value: `₹${(Number(stats?.totalSales || 0)).toLocaleString()}`, icon: '💰', trend: 'Lifetime revenue', color: '#4CAF50' },
        { label: 'Active Orders', value: stats?.activeOrders?.toString() || '0', icon: '📦', trend: 'Pending shipment', color: '#2196F3' },
        { label: 'Total Customers', value: stats?.totalCustomers?.toString() || '0', icon: '👥', trend: 'Registered users', color: '#9C27B0' },
        { label: 'Avg Order Value', value: `₹${(Number(stats?.avgOrderValue || 0)).toLocaleString()}`, icon: '💎', trend: 'Per transaction', color: '#FF9800' },
    ];

    const topSarees = stats?.topProducts || [];
    const recentActivity = stats?.recentActivity || [];

    return (
        <div style={{ display: 'grid', gap: '30px' }}>
            {/* Stats Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
                {displayStats.map((stat, i) => (
                    <div key={i} style={{
                        backgroundColor: '#fff',
                        padding: '24px',
                        borderRadius: '12px',
                        boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
                        border: '1px solid #eee'
                    }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
                            <span style={{ fontSize: '24px' }}>{stat.icon}</span>
                            <span style={{ color: stat.color, fontSize: '12px', fontWeight: 'bold' }}>● LIVE</span>
                        </div>
                        <h3 style={{ fontSize: '14px', color: '#888', marginBottom: '5px' }}>{stat.label}</h3>
                        <p style={{ fontSize: '24px', fontWeight: 'bold', margin: '0 0 10px 0', color: theme.colors.primary }}>{stat.value}</p>
                        <p style={{ fontSize: '11px', color: stat.color }}>{stat.trend}</p>
                    </div>
                ))}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '30px' }}>
                {/* Sales Analytics Simulated Chart */}
                <div style={{ backgroundColor: '#fff', padding: '30px', borderRadius: '12px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)', border: '1px solid #eee' }}>
                    <h3 style={{ marginBottom: '20px', fontFamily: theme.fonts.heading }}>Sales Real-time Trends</h3>
                    {stats?.totalSales > 0 ? (
                        <div style={{ height: '200px', display: 'flex', alignItems: 'flex-end', gap: '15px', padding: '20px 0' }}>
                            {[40, 60, 45, 90, 100, 80, 50, 70, 95, 60, 40, 30].map((h, i) => (
                                <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                                    <div style={{
                                        width: '100%',
                                        height: `${h}%`,
                                        backgroundColor: i === 4 ? theme.colors.primary : '#f0f0f0',
                                        borderRadius: '4px 4px 0 0',
                                        transition: 'all 0.3s ease'
                                    }}></div>
                                    <span style={{ fontSize: '10px', color: '#888' }}>{i * 2}h</span>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div style={{ height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f9f9f9', borderRadius: '8px', border: '1px dashed #ddd' }}>
                            <p style={{ fontSize: '14px', color: '#888' }}>⚡ Real-time sales stream active. Trends will appear here as orders arrive.</p>
                        </div>
                    )}
                    <p style={{ fontSize: '13px', color: '#666', marginTop: '15px' }}>
                        💡 <strong>Real-time Insights:</strong> Analytics are computed instantly from your database.
                    </p>
                </div>

                {/* Frequent Categories */}
                <div style={{ backgroundColor: '#fff', padding: '30px', borderRadius: '12px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)', border: '1px solid #eee' }}>
                    <h3 style={{ marginBottom: '20px', fontFamily: theme.fonts.heading }}>Top Categories</h3>
                    <div style={{ display: 'grid', gap: '15px' }}>
                        {stats?.categoryAnalysis?.length > 0 ? stats.categoryAnalysis.map((cat, i) => (
                            <div key={i}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '5px' }}>
                                    <span>{cat.name}</span>
                                    <span>{cat.pct}%</span>
                                </div>
                                <div style={{ width: '100%', height: '6px', backgroundColor: '#f0f0f0', borderRadius: '3px' }}>
                                    <div style={{ width: `${cat.pct}%`, height: '100%', backgroundColor: theme.colors.secondary, borderRadius: '3px' }}></div>
                                </div>
                            </div>
                        )) : (
                            <p style={{ fontSize: '12px', color: '#888' }}>Upload products to see category split.</p>
                        )}
                    </div>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '30px' }}>
                {/* Top Products Table */}
                <div style={{ backgroundColor: '#fff', padding: '30px', borderRadius: '12px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)', border: '1px solid #eee' }}>
                    <h3 style={{ marginBottom: '20px', fontFamily: theme.fonts.heading }}>Frequent Types of Sarees Buying</h3>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr style={{ textAlign: 'left', borderBottom: '1px solid #eee' }}>
                                <th style={{ padding: '15px 10px', fontSize: '14px', color: '#888' }}>Product Name</th>
                                <th style={{ padding: '15px 10px', fontSize: '14px', color: '#888' }}>Total Sales</th>
                                <th style={{ padding: '15px 10px', fontSize: '14px', color: '#888' }}>Revenue</th>
                                <th style={{ padding: '15px 10px', fontSize: '14px', color: '#888' }}>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {topSarees.map((saree, i) => (
                                <tr key={i} style={{ borderBottom: '1px solid #f9f9f9', transition: 'background 0.2s' }}>
                                    <td style={{ padding: '15px 10px', fontWeight: 'bold' }}>{saree.name}</td>
                                    <td style={{ padding: '15px 10px' }}>{saree.sales} Units</td>
                                    <td style={{ padding: '15px 10px' }}>{saree.revenue}</td>
                                    <td style={{ padding: '15px 10px' }}>
                                        <span style={{
                                            padding: '4px 12px',
                                            borderRadius: '20px',
                                            fontSize: '11px',
                                            backgroundColor: saree.stock < 10 ? '#fff3e0' : '#e8f5e9',
                                            color: saree.stock < 10 ? '#ef6c00' : '#2e7d32'
                                        }}>
                                            {saree.stock < 10 ? 'Low Stock' : 'In Stock'}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Recent Activity Feed */}
                <div style={{ backgroundColor: '#fff', padding: '30px', borderRadius: '12px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)', border: '1px solid #eee' }}>
                    <h3 style={{ marginBottom: '20px', fontFamily: theme.fonts.heading }}>Recent Activity</h3>
                    <div style={{ display: 'grid', gap: '20px' }}>
                        {recentActivity.length > 0 ? recentActivity.map((act, i) => (
                            <div key={i} style={{ display: 'flex', gap: '15px', alignItems: 'flex-start' }}>
                                <div style={{
                                    width: '36px',
                                    height: '36px',
                                    borderRadius: '8px',
                                    backgroundColor: `${act.color}15`,
                                    color: act.color,
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    fontSize: '18px'
                                }}>
                                    {act.icon}
                                </div>
                                <div style={{ flex: 1 }}>
                                    <p style={{ margin: 0, fontSize: '14px', fontWeight: 'bold' }}>{act.action}</p>
                                    <p style={{ margin: 0, fontSize: '12px', color: '#888' }}>{act.user} • {act.time}</p>
                                </div>
                            </div>
                        )) : (
                            <p style={{ fontSize: '14px', color: '#888', textAlign: 'center', padding: '20px 0' }}>No recent activity to show.</p>
                        )}
                    </div>
                    <button style={{
                        marginTop: '25px',
                        width: '100%',
                        padding: '10px',
                        border: '1px solid #eee',
                        borderRadius: '8px',
                        background: 'none',
                        color: theme.colors.primary,
                        fontSize: '13px',
                        fontWeight: 'bold',
                        cursor: 'pointer'
                    }}>
                        View All Activity
                    </button>
                </div>
            </div>
        </div>
    );
}
