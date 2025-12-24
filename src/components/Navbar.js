"use client";
import Link from 'next/link';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useSession, signOut } from "next-auth/react";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { theme } from '../store/uiStore';

export default function Navbar() {
    const { cartCount } = useCart();
    const { wishlistCount } = useWishlist();
    const { data: session } = useSession();
    const [searchQuery, setSearchQuery] = useState('');
    const router = useRouter();

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            router.push('/search?q=' + encodeURIComponent(searchQuery));
        }
    };

    return (
        <nav style={{ width: '100%', zIndex: 1000, position: 'relative' }}>
            {/* Top Tier: Branding and Icons */}
            <div style={{
                backgroundColor: '#5E0B15', // Deep Maroon
                color: '#D4AF37', // Gold
                padding: '20px 0',
                borderBottom: '1px solid rgba(212, 175, 55, 0.2)'
            }}>
                <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    {/* Left: Spacer to center logo */}
                    <div style={{ flex: 1, display: 'flex', gap: '20px' }}>
                        {/* Optional Search icon here for mobile */}
                    </div>

                    {/* Center: Branding */}
                    <Link href="/" style={{ textDecoration: 'none', textAlign: 'center', flex: 2 }}>
                        <div style={{
                            fontSize: '28px',
                            fontFamily: 'var(--font-family-heading)',
                            fontWeight: 'bold',
                            letterSpacing: '1px',
                            lineHeight: '1.2'
                        }}>
                            Sri Lakshmi Narayana<br />
                            <span style={{ fontSize: '18px', fontWeight: 'normal', letterSpacing: '4px', textTransform: 'uppercase' }}>Handlooms</span>
                        </div>
                    </Link>

                    {/* Right: Icons and Auth */}
                    <div style={{ flex: 1, display: 'flex', gap: '25px', justifyContent: 'flex-end', alignItems: 'center' }}>
                        <form onSubmit={handleSearch} style={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
                            <input
                                type="text"
                                placeholder="Search..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                style={{
                                    padding: '6px 15px',
                                    borderRadius: '20px',
                                    border: 'none',
                                    fontSize: '13px',
                                    backgroundColor: 'rgba(255,255,255,0.1)',
                                    color: '#fff',
                                    outline: 'none',
                                    width: '120px'
                                }}
                            />
                            <span style={{ position: 'absolute', right: '10px', fontSize: '14px', cursor: 'pointer', opacity: 0.7 }} onClick={handleSearch}>🔍</span>
                        </form>

                        <Link href="/wishlist" style={{ textDecoration: 'none', color: 'inherit', position: 'relative' }}>
                            <span style={{ fontSize: '20px' }}>❤️</span>
                            {wishlistCount > 0 && (
                                <span style={{
                                    position: 'absolute',
                                    top: '-8px',
                                    right: '-10px',
                                    backgroundColor: '#D4AF37',
                                    color: '#5E0B15',
                                    borderRadius: '50%',
                                    width: '18px',
                                    height: '18px',
                                    fontSize: '10px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontWeight: 'bold'
                                }}>
                                    {wishlistCount}
                                </span>
                            )}
                        </Link>

                        <Link href="/cart" style={{ textDecoration: 'none', color: 'inherit', position: 'relative' }}>
                            <span style={{ fontSize: '22px' }}>🛒</span>
                            {cartCount > 0 && (
                                <span style={{
                                    position: 'absolute',
                                    top: '-8px',
                                    right: '-10px',
                                    backgroundColor: '#fff',
                                    color: '#5E0B15',
                                    borderRadius: '50%',
                                    width: '18px',
                                    height: '18px',
                                    fontSize: '10px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontWeight: 'bold'
                                }}>
                                    {cartCount}
                                </span>
                            )}
                        </Link>

                        {session ? (
                            <div style={{ position: 'relative' }} className="user-menu-container">
                                <button
                                    style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#D4AF37', fontSize: '20px' }}
                                    title="Account"
                                >
                                    👤
                                </button>
                                <div className="user-dropdown" style={{
                                    position: 'absolute',
                                    top: '40px',
                                    right: '0',
                                    backgroundColor: '#fff',
                                    minWidth: '160px',
                                    boxShadow: '0 8px 30px rgba(0,0,0,0.15)',
                                    borderRadius: '8px',
                                    zIndex: 1001,
                                    padding: '10px 0',
                                    textAlign: 'left'
                                }}>
                                    <div style={{ padding: '10px 20px', borderBottom: '1px solid #eee', marginBottom: '5px' }}>
                                        <p style={{ fontSize: '12px', color: '#888', marginBottom: '2px' }}>Welcome,</p>
                                        <p style={{ fontSize: '14px', fontWeight: 'bold', color: '#333' }}>{session.user.name?.split(' ')[0]}</p>
                                    </div>
                                    <Link href="/orders" style={{ display: 'block', padding: '10px 20px', color: '#333', textDecoration: 'none', fontSize: '14px' }} className="dropdown-link">My Orders</Link>
                                    <Link href="/wishlist" style={{ display: 'block', padding: '10px 20px', color: '#333', textDecoration: 'none', fontSize: '14px' }} className="dropdown-link">Wishlist</Link>
                                    <button
                                        onClick={() => signOut()}
                                        style={{ display: 'block', width: '100%', padding: '10px 20px', color: '#F44336', border: 'none', background: 'none', textAlign: 'left', cursor: 'pointer', fontSize: '14px', borderTop: '1px solid #eee', marginTop: '5px' }}
                                    >
                                        Logout
                                    </button>
                                </div>
                                <style jsx>{`
                                    .user-menu-container .user-dropdown {
                                        opacity: 0;
                                        visibility: hidden;
                                        transform: translateY(10px);
                                        transition: all 0.2s ease;
                                    }
                                    .user-menu-container:hover .user-dropdown {
                                        opacity: 1;
                                        visibility: visible;
                                        transform: translateY(0);
                                    }
                                    .dropdown-link:hover {
                                        background-color: #f9f9f9;
                                        color: var(--color-primary) !important;
                                    }
                                `}</style>
                            </div>
                        ) : (
                            <Link href="/login" style={{ textDecoration: 'none', color: '#D4AF37', fontSize: '20px' }} title="Login">
                                👤
                            </Link>
                        )}
                    </div>
                </div>
            </div>

            {/* Bottom Tier: Navigation menu */}
            <div style={{
                backgroundColor: '#2C1810', // Darker Sub-nav
                color: '#fff',
                padding: '12px 0',
                boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
            }}>
                <div className="container" style={{ display: 'flex', justifyContent: 'center', gap: '40px' }}>
                    {['SILK', 'COTTON', 'HANDLOOM', 'NEW ARRIVALS', 'OUR STORY', 'CONTACT'].map((item) => (
                        <Link
                            key={item}
                            href={
                                item === 'OUR STORY' ? '/about' :
                                    item === 'CONTACT' ? '/contact' :
                                        `/shop?category=${item.toLowerCase().replace(' ', '-')}`
                            }
                            style={{
                                color: 'rgba(255,255,255,0.9)',
                                textDecoration: 'none',
                                fontSize: '12px',
                                fontWeight: '600',
                                letterSpacing: '1.5px',
                                transition: 'color 0.2s ease'
                            }}
                            onMouseEnter={(e) => e.target.style.color = '#D4AF37'}
                            onMouseLeave={(e) => e.target.style.color = 'rgba(255,255,255,0.9)'}
                        >
                            {item}
                        </Link>
                    ))}
                </div>
            </div>
        </nav>
    );
}
