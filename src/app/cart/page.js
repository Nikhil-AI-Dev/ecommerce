'use client';

import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import { useState, useEffect } from 'react';

export default function CartPage() {
    const { cart, removeFromCart, updateQuantity, cartTotal } = useCart();
    const { addToWishlist } = useWishlist();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <main style={{ backgroundColor: '#fcfcfc', minHeight: '100vh' }}>
            <Navbar />

            <div className="container mt-lg mb-lg">
                <h1 className="text-center" style={{ marginBottom: '40px', fontFamily: 'var(--font-family-heading)', fontSize: '42px' }}>
                    Shopping Bag
                </h1>

                {cart.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '100px 0', backgroundColor: '#fff', borderRadius: '12px', border: '1px solid #eee' }}>
                        <div style={{ fontSize: '60px', marginBottom: '20px' }}>🛒</div>
                        <p style={{ marginBottom: '30px', fontSize: '20px', color: '#666' }}>Your collection is currently empty.</p>
                        <Link href="/shop" className="btn btn-primary" style={{ padding: '12px 40px' }}>
                            Begin Exploring
                        </Link>
                    </div>
                ) : (
                    <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '40px' }}>
                        {/* Cart Items */}
                        <div style={{ display: 'grid', gap: '20px' }}>
                            {cart.map((item) => (
                                <div key={item.id} style={{
                                    display: 'flex',
                                    gap: '24px',
                                    backgroundColor: '#fff',
                                    padding: '24px',
                                    borderRadius: '12px',
                                    border: '1px solid #eee',
                                    position: 'relative'
                                }}>
                                    <div style={{ width: '140px', height: '180px', backgroundColor: '#f9f9f9', borderRadius: '8px', overflow: 'hidden', border: '1px solid #eee' }}>
                                        <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#eee', color: '#888', fontSize: '12px', textAlign: 'center' }}>
                                            [Image: {item.name}]
                                        </div>
                                    </div>

                                    <div style={{ flex: 1 }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                                            <h3 style={{ fontSize: '20px', fontFamily: 'var(--font-family-heading)', color: 'var(--color-primary)' }}>{item.name}</h3>
                                            <p style={{ fontWeight: 'bold', fontSize: '18px' }}>₹{Number(item.price).toLocaleString('en-IN')}</p>
                                        </div>

                                        <p style={{ color: '#666', fontSize: '14px', marginBottom: '20px' }}>{item.category} • {item.fabric || 'Silk'}</p>

                                        <div style={{ display: 'flex', alignItems: 'center', gap: '25px', position: 'absolute', bottom: '24px' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #ddd', borderRadius: '6px', backgroundColor: '#fff' }}>
                                                <button onClick={() => updateQuantity(item.id, item.quantity - 1)} style={{ padding: '8px 15px', background: 'none', border: 'none', cursor: 'pointer', fontSize: '18px' }}>-</button>
                                                <span style={{ padding: '0 5px', minWidth: '30px', textAlign: 'center', fontWeight: 'bold' }}>{item.quantity}</span>
                                                <button onClick={() => updateQuantity(item.id, item.quantity + 1)} style={{ padding: '8px 15px', background: 'none', border: 'none', cursor: 'pointer', fontSize: '18px' }}>+</button>
                                            </div>

                                            <button
                                                onClick={() => {
                                                    addToWishlist(item);
                                                    removeFromCart(item.id);
                                                }}
                                                style={{ color: 'var(--color-primary)', border: 'none', background: 'none', cursor: 'pointer', fontSize: '14px', fontWeight: '500' }}
                                            >
                                                Save to Wishlist
                                            </button>

                                            <button onClick={() => removeFromCart(item.id)} style={{ color: '#999', border: 'none', background: 'none', cursor: 'pointer', fontSize: '14px' }}>
                                                Remove
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}

                            <div style={{ marginTop: '10px', padding: '20px', backgroundColor: '#fdf3f5', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '15px' }}>
                                <input type="checkbox" id="gift-wrap" style={{ width: '20px', height: '20px', accentColor: 'var(--color-primary)' }} />
                                <label htmlFor="gift-wrap" style={{ cursor: 'pointer', fontSize: '15px', color: '#5E0B15' }}>
                                    <strong>Make it a Gift (+₹50)</strong> - Add premium gold-foil gift wrapping and a personalized note card.
                                </label>
                            </div>
                        </div>

                        {/* Order Summary */}
                        <div style={{ padding: '30px', backgroundColor: '#fff', borderRadius: '12px', height: 'fit-content', border: '1px solid #eee', boxShadow: '0 4px 15px rgba(0,0,0,0.02)', position: 'sticky', top: '100px' }}>
                            <h2 style={{ marginBottom: '25px', fontSize: '22px', fontFamily: 'var(--font-family-heading)' }}>Order Summary</h2>
                            <div style={{ display: 'grid', gap: '15px', marginBottom: '25px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#666' }}>
                                    <span>Bag Subtotal</span>
                                    <span>₹{Number(cartTotal).toLocaleString('en-IN')}</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#666' }}>
                                    <span>Shipping</span>
                                    <span style={{ color: '#15803d', fontWeight: '600' }}>Complementary</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#666' }}>
                                    <span>GST (12%)</span>
                                    <span>Included</span>
                                </div>
                            </div>

                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '30px', fontWeight: 'bold', fontSize: '20px', borderTop: '1px solid #eee', paddingTop: '20px' }}>
                                <span>Grand Total</span>
                                <span style={{ color: 'var(--color-primary)' }}>₹{Number(cartTotal).toLocaleString('en-IN')}</span>
                            </div>

                            <Link href="/checkout">
                                <button className="btn btn-primary" style={{ width: '100%', padding: '18px', fontSize: '18px', letterSpacing: '1px', boxShadow: '0 10px 20px rgba(128, 0, 0, 0.15)' }}>
                                    PROCEED TO CHECKOUT
                                </button>
                            </Link>

                            <div style={{ marginTop: '25px', textAlign: 'center' }}>
                                <p style={{ fontSize: '12px', color: '#999', lineHeight: '1.6' }}>
                                    Free returns within 7 days. Authentic handcrafted quality guaranteed.
                                </p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </main>
    );
}
