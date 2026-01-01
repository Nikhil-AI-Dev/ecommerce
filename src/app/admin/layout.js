"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { theme } from '../../store/uiStore';

export default function AdminLayout({ children }) {
    const pathname = usePathname();

    const menuItems = [
        { name: 'Dashboard', path: '/admin/dashboard', icon: '📊' },
        { name: 'Products', path: '/admin/products', icon: '👗' },
        { name: 'Orders', path: '/admin/orders', icon: '📦' },
        { name: 'Analytics', path: '/admin/analytics', icon: '📈' },
        { name: 'Settings', path: '/admin/settings', icon: '⚙️' },
    ];

    return (
        <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
            {/* Sidebar */}
            <aside style={{
                width: '260px',
                backgroundColor: theme.colors.backgroundDark,
                color: '#fff',
                padding: '30px 20px',
                display: 'flex',
                flexDirection: 'column',
                position: 'fixed',
                height: '100vh',
                zIndex: 100
            }}>
                <div style={{ marginBottom: '40px', padding: '0 10px' }}>
                    <h2 style={{
                        fontFamily: theme.fonts.heading,
                        color: theme.colors.secondary,
                        fontSize: '20px',
                        marginBottom: '5px'
                    }}>
                        SLNH Admin
                    </h2>
                    <p style={{ fontSize: '10px', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '1px' }}>
                        Control Center
                    </p>
                </div>

                <nav style={{ flex: 1 }}>
                    {menuItems.map((item) => {
                        const isActive = pathname === item.path;
                        return (
                            <Link
                                key={item.path}
                                href={item.path}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    padding: '12px 15px',
                                    marginBottom: '8px',
                                    borderRadius: '8px',
                                    textDecoration: 'none',
                                    color: isActive ? theme.colors.secondary : 'rgba(255,255,255,0.7)',
                                    backgroundColor: isActive ? 'rgba(255,255,255,0.1)' : 'transparent',
                                    transition: 'all 0.2s ease',
                                    fontWeight: isActive ? 'bold' : 'normal'
                                }}
                            >
                                <span style={{ marginRight: '12px', fontSize: '18px' }}>{item.icon}</span>
                                {item.name}
                            </Link>
                        );
                    })}
                </nav>

                <div style={{ marginTop: 'auto', padding: '20px 0', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                    <Link href="/" style={{ color: 'rgba(255,255,255,0.5)', textDecoration: 'none', fontSize: '14px' }}>
                        ← Back to Store
                    </Link>
                </div>
            </aside>

            {/* Main Content */}
            <main style={{
                flex: 1,
                marginLeft: '260px',
                padding: '40px',
                width: 'calc(100% - 260px)'
            }}>
                <header style={{
                    marginBottom: '30px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                    <h1 style={{ fontSize: '28px', color: theme.colors.primary, fontFamily: theme.fonts.heading }}>
                        {menuItems.find(m => m.path === pathname)?.name || 'Admin'}
                    </h1>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                        <div style={{ textAlign: 'right' }}>
                            <p style={{ fontWeight: 'bold', fontSize: '14px', margin: 0 }}>Nikhil Admin</p>
                            <p style={{ fontSize: '12px', color: '#888', margin: 0 }}>nikhilprince18@gmail.com</p>
                        </div>
                        <div style={{
                            width: '40px',
                            height: '40px',
                            borderRadius: '50%',
                            backgroundColor: theme.colors.primary,
                            color: theme.colors.secondary,
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            fontWeight: 'bold'
                        }}>
                            NA
                        </div>
                    </div>
                </header>
                {children}
            </main>
        </div>
    );
}
