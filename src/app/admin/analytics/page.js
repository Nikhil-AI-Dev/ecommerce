"use client";
import { useState, useEffect } from 'react';
import { theme } from '../../../store/uiStore';

export default function AdminAnalytics() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch('/api/admin/stats');
                const stats = await res.json();
                setData(stats);
                setLoading(false);
            } catch (error) {
                console.error("Analytics fetch error:", error);
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) return <div style={{ padding: '40px', textAlign: 'center' }}>Loading Business Insights...</div>;

    const maxRevenue = Math.max(...(data?.salesTrend?.map(t => t.revenue) || [100000]));

    return (
        <div style={{ display: 'grid', gap: '30px' }}>
            {/* Revenue Trend Chart */}
            <div style={{ backgroundColor: '#fff', padding: '30px', borderRadius: '12px', border: '1px solid #eee', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
                <h3 style={{ marginBottom: '25px', fontFamily: theme.fonts.heading }}>Weekly Revenue Forecast</h3>
                <div style={{ height: '300px', display: 'flex', alignItems: 'flex-end', gap: '20px', padding: '20px 0', borderLeft: '1px solid #eee', borderBottom: '1px solid #eee' }}>
                    {data?.salesTrend?.map((t, i) => (
                        <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
                            <div style={{
                                width: '100%',
                                height: `${(t.revenue / maxRevenue) * 100}%`,
                                backgroundColor: theme.colors.primary,
                                borderRadius: '4px 4px 0 0',
                                position: 'relative',
                                transition: 'height 1s ease-in-out'
                            }}>
                                <span style={{ position: 'absolute', top: '-25px', width: '100%', textAlign: 'center', fontSize: '10px', fontWeight: 'bold' }}>₹{(t.revenue / 1000).toFixed(0)}k</span>
                            </div>
                            <span style={{ fontSize: '12px', color: '#888' }}>{t.date}</span>
                        </div>
                    ))}
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
                {/* Category Performance */}
                <div style={{ backgroundColor: '#fff', padding: '30px', borderRadius: '12px', border: '1px solid #eee', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
                    <h3 style={{ marginBottom: '20px', fontFamily: theme.fonts.heading }}>Revenue by Category</h3>
                    <div style={{ display: 'grid', gap: '20px' }}>
                        {data?.categoryAnalysis?.map((cat, i) => (
                            <div key={i}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '14px' }}>
                                    <span style={{ fontWeight: '500' }}>{cat.name}</span>
                                    <span style={{ fontWeight: 'bold', color: theme.colors.primary }}>₹{cat.revenue.toLocaleString()}</span>
                                </div>
                                <div style={{ width: '100%', height: '10px', backgroundColor: '#f5f5f5', borderRadius: '5px' }}>
                                    <div style={{ width: `${cat.percentage}%`, height: '100%', backgroundColor: theme.colors.secondary, borderRadius: '5px' }}></div>
                                </div>
                                <p style={{ fontSize: '11px', color: '#888', marginTop: '4px' }}>{cat.percentage}% of total volume</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Growth Metrics */}
                <div style={{ backgroundColor: '#fff', padding: '30px', borderRadius: '12px', border: '1px solid #eee', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
                    <h3 style={{ marginBottom: '20px', fontFamily: theme.fonts.heading }}>Efficiency Metrics</h3>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                        <div style={{ padding: '20px', backgroundColor: '#fcfcfc', borderRadius: '10px', textAlign: 'center' }}>
                            <p style={{ fontSize: '12px', color: '#888', margin: 0 }}>Avg. Fulfillment</p>
                            <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#4CAF50', margin: '10px 0' }}>1.2 Days</p>
                            <span style={{ fontSize: '10px', color: '#4CAF50' }}>↑ 15% Faster</span>
                        </div>
                        <div style={{ padding: '20px', backgroundColor: '#fcfcfc', borderRadius: '10px', textAlign: 'center' }}>
                            <p style={{ fontSize: '12px', color: '#888', margin: 0 }}>Repeat Rate</p>
                            <p style={{ fontSize: '24px', fontWeight: 'bold', color: theme.colors.primary, margin: '10px 0' }}>32%</p>
                            <span style={{ fontSize: '10px', color: '#888' }}>Standard: 20%</span>
                        </div>
                        <div style={{ padding: '20px', backgroundColor: '#fcfcfc', borderRadius: '10px', textAlign: 'center' }}>
                            <p style={{ fontSize: '12px', color: '#888', margin: 0 }}>Return Rate</p>
                            <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#F44336', margin: '10px 0' }}>2.4%</p>
                            <span style={{ fontSize: '10px', color: '#F44336' }}>↓ 0.5% Decrease</span>
                        </div>
                        <div style={{ padding: '20px', backgroundColor: '#fcfcfc', borderRadius: '10px', textAlign: 'center' }}>
                            <p style={{ fontSize: '12px', color: '#888', margin: 0 }}>Store Conversion</p>
                            <p style={{ fontSize: '24px', fontWeight: 'bold', color: theme.colors.secondary, margin: '10px 0' }}>4.8%</p>
                            <span style={{ fontSize: '10px', color: theme.colors.secondary }}>Industry Avg: 3%</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
