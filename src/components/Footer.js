"use client";
import Link from 'next/link';
import { theme } from '../store/uiStore';

export default function Footer() {
    return (
        <footer style={{
            backgroundColor: theme.colors.backgroundDark,
            color: theme.colors.secondary,
            padding: '60px 20px',
            marginTop: 'auto'
        }}>
            <div className="container" style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '40px'
            }}>

                {/* Brand Column */}
                <div>
                    <h3 style={{
                        fontFamily: theme.fonts.heading,
                        fontSize: theme.fontSize['2xl'],
                        marginBottom: '20px',
                        color: theme.colors.white
                    }}>
                        Sri Lakshmi Narayana Handlooms
                    </h3>
                    <p style={{
                        lineHeight: '1.6',
                        fontSize: theme.fontSize.sm,
                        color: '#ccc',
                        marginBottom: '10px'
                    }}>
                        Weaving traditions since 1995. <br />
                        Authentic handlooms directly from weavers to your wardrobe.
                    </p>
                    <p style={{ fontSize: theme.fontSize.sm, color: '#ccc', marginBottom: '5px' }}>
                        📞 +91 9440923421
                    </p>
                    <p style={{ fontSize: theme.fontSize.sm, color: '#ccc', marginBottom: '20px' }}>
                        📧 nikhilprince18@gmail.com
                    </p>
                    <div style={{
                        marginTop: '20px',
                        display: 'flex',
                        gap: '15px',
                        color: theme.colors.secondary,
                        fontSize: '14px'
                    }}>
                        <span>Instagram (Coming soon)</span>
                        <span>YouTube (Coming soon)</span>
                    </div>
                </div>

                {/* Quick Links */}
                <div>
                    <h4 style={{
                        color: theme.colors.white,
                        marginBottom: '15px',
                        textTransform: 'uppercase',
                        letterSpacing: '1px',
                        fontSize: theme.fontSize.sm
                    }}>
                        Shop
                    </h4>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '10px',
                        fontSize: theme.fontSize.sm
                    }}>
                        <Link href="/shop?category=Silk" style={{ color: '#ccc', textDecoration: 'none' }}>Silk Sarees</Link>
                        <Link href="/shop?category=Cotton" style={{ color: '#ccc', textDecoration: 'none' }}>Cotton Comforts</Link>
                        <Link href="/shop?category=Handloom" style={{ color: '#ccc', textDecoration: 'none' }}>Handloom Specials</Link>
                        <Link href="/shop" style={{ color: '#ccc', textDecoration: 'none' }}>New Arrivals</Link>
                    </div>
                </div>

                {/* Customer Care */}
                <div>
                    <h4 style={{
                        color: theme.colors.white,
                        marginBottom: '15px',
                        textTransform: 'uppercase',
                        letterSpacing: '1px',
                        fontSize: theme.fontSize.sm
                    }}>
                        Support
                    </h4>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '10px',
                        fontSize: theme.fontSize.sm
                    }}>
                        <Link href="/contact" style={{ color: '#ccc', textDecoration: 'none' }}>Contact Us</Link>
                        <Link href="/about" style={{ color: '#ccc', textDecoration: 'none' }}>About Us</Link>
                        <a href="#" style={{ color: '#ccc', textDecoration: 'none' }}>Shipping Policy</a>
                        <a href="#" style={{ color: '#ccc', textDecoration: 'none' }}>Returns & Exchanges</a>
                    </div>
                </div>

                {/* Newsletter */}
                <div>
                    <h4 style={{
                        color: theme.colors.white,
                        marginBottom: '15px',
                        textTransform: 'uppercase',
                        letterSpacing: '1px',
                        fontSize: theme.fontSize.sm
                    }}>
                        Stay to date
                    </h4>
                    <p style={{
                        fontSize: theme.fontSize.sm,
                        color: '#ccc',
                        marginBottom: '15px'
                    }}>
                        Subscribe to get special offers and once-in-a-lifetime deals.
                    </p>
                    <div style={{ display: 'flex' }}>
                        <input
                            type="email"
                            placeholder="Your User email"
                            style={{
                                padding: '10px',
                                borderRadius: theme.borderRadius.sm + ' 0 0 ' + theme.borderRadius.sm,
                                border: 'none',
                                width: '100%',
                                outline: 'none'
                            }}
                        />
                        <button style={{
                            padding: '10px 20px',
                            backgroundColor: theme.colors.primary,
                            color: theme.colors.white,
                            border: 'none',
                            borderRadius: '0 ' + theme.borderRadius.sm + ' ' + theme.borderRadius.sm + ' 0',
                            cursor: 'pointer'
                        }}>
                            Join
                        </button>
                    </div>
                </div>
            </div>

            <div className="container" style={{
                borderTop: '1px solid rgba(255,255,255,0.1)',
                marginTop: '40px',
                paddingTop: '20px',
                textAlign: 'center',
                fontSize: theme.fontSize.xs,
                color: '#888'
            }}>
                © {new Date().getFullYear()} Sri Lakshmi Narayana Handlooms. All rights reserved.
            </div>
        </footer>
    );
}
