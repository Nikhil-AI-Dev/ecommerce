"use client";
import { useState } from 'react';
import { theme } from '../../../store/uiStore';

export default function AdminSettings() {
    const [settings, setSettings] = useState({
        storeName: 'Sri Lakshmi Narayana Handlooms',
        email: 'contact@srilakshmi.com',
        phone: '+91 98765 43210',
        currency: 'INR (₹)',
        timezone: 'IST (UTC+5:30)',
        maintenanceMode: false,
        freeShippingThreshold: 5000,
        address: 'Main St, Handloom District, India'
    });

    const [saving, setSaving] = useState(false);

    const handleSave = () => {
        setSaving(true);
        setTimeout(() => {
            setSaving(false);
            alert('Settings saved successfully!');
        }, 1000);
    };

    return (
        <div style={{ display: 'grid', gap: '30px', maxWidth: '800px' }}>
            {/* General Settings */}
            <div style={{ backgroundColor: '#fff', padding: '30px', borderRadius: '12px', border: '1px solid #eee', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
                <h3 style={{ marginBottom: '24px', color: theme.colors.primary, borderBottom: '1px solid #eee', paddingBottom: '12px' }}>General Store Profile</h3>
                <div style={{ display: 'grid', gap: '20px' }}>
                    <div style={{ display: 'grid', gap: '8px' }}>
                        <label style={{ fontSize: '13px', fontWeight: 'bold', color: '#666' }}>Store Name</label>
                        <input
                            value={settings.storeName}
                            onChange={(e) => setSettings({ ...settings, storeName: e.target.value })}
                            style={{ padding: '12px', borderRadius: '8px', border: '1px solid #ddd' }}
                        />
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                        <div style={{ display: 'grid', gap: '8px' }}>
                            <label style={{ fontSize: '13px', fontWeight: 'bold', color: '#666' }}>Contact Email</label>
                            <input
                                value={settings.email}
                                onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                                style={{ padding: '12px', borderRadius: '8px', border: '1px solid #ddd' }}
                            />
                        </div>
                        <div style={{ display: 'grid', gap: '8px' }}>
                            <label style={{ fontSize: '13px', fontWeight: 'bold', color: '#666' }}>Phone Number</label>
                            <input
                                value={settings.phone}
                                onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                                style={{ padding: '12px', borderRadius: '8px', border: '1px solid #ddd' }}
                            />
                        </div>
                    </div>
                    <div style={{ display: 'grid', gap: '8px' }}>
                        <label style={{ fontSize: '13px', fontWeight: 'bold', color: '#666' }}>Store Address</label>
                        <textarea
                            value={settings.address}
                            onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                            style={{ padding: '12px', borderRadius: '8px', border: '1px solid #ddd', minHeight: '80px' }}
                        />
                    </div>
                </div>
            </div>

            {/* Operational Settings */}
            <div style={{ backgroundColor: '#fff', padding: '30px', borderRadius: '12px', border: '1px solid #eee', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
                <h3 style={{ marginBottom: '24px', color: theme.colors.primary, borderBottom: '1px solid #eee', paddingBottom: '12px' }}>Operations & Fulfillment</h3>
                <div style={{ display: 'grid', gap: '20px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px', backgroundColor: '#f9f9f9', borderRadius: '8px' }}>
                        <div>
                            <p style={{ margin: 0, fontWeight: 'bold' }}>Maintenance Mode</p>
                            <p style={{ margin: 0, fontSize: '12px', color: '#888' }}>Temporarily disable the storefront for customers.</p>
                        </div>
                        <button
                            onClick={() => setSettings({ ...settings, maintenanceMode: !settings.maintenanceMode })}
                            style={{
                                padding: '8px 20px',
                                borderRadius: '20px',
                                border: 'none',
                                backgroundColor: settings.maintenanceMode ? '#F44336' : '#eee',
                                color: settings.maintenanceMode ? '#fff' : '#333',
                                cursor: 'pointer',
                                fontWeight: 'bold'
                            }}
                        >
                            {settings.maintenanceMode ? 'Enabled' : 'Disabled'}
                        </button>
                    </div>
                    <div style={{ display: 'grid', gap: '8px' }}>
                        <label style={{ fontSize: '13px', fontWeight: 'bold', color: '#666' }}>Free Shipping Threshold (₹)</label>
                        <input
                            type="number"
                            value={settings.freeShippingThreshold}
                            onChange={(e) => setSettings({ ...settings, freeShippingThreshold: parseInt(e.target.value) })}
                            style={{ padding: '12px', borderRadius: '8px', border: '1px solid #ddd' }}
                        />
                    </div>
                </div>
            </div>

            <button
                onClick={handleSave}
                disabled={saving}
                style={{
                    padding: '15px 40px',
                    backgroundColor: theme.colors.primary,
                    color: theme.colors.secondary,
                    border: 'none',
                    borderRadius: '8px',
                    fontWeight: 'bold',
                    fontSize: '16px',
                    cursor: saving ? 'not-allowed' : 'pointer',
                    opacity: saving ? 0.7 : 1,
                    boxShadow: '0 4px 10px rgba(94, 11, 21, 0.2)'
                }}
            >
                {saving ? 'Saving...' : 'Save All Changes'}
            </button>
        </div>
    );
}
