'use client';

import Image from 'next/image';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

export default function ProductCard({ product }) {
    const { addToCart } = useCart();
    const { toggleWishlist, isInWishlist } = useWishlist();

    return (
        <div style={{
            border: 'none',
            borderRadius: '12px',
            overflow: 'hidden',
            transition: 'all 0.3s ease',
            backgroundColor: '#fff',
            cursor: 'pointer',
            boxShadow: '0 4px 6px rgba(0,0,0,0.05)'
        }}
            className="product-card"
            onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.boxShadow = '0 12px 20px rgba(0,0,0,0.1)';
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 6px rgba(0,0,0,0.05)';
            }}
        >
            <div style={{ position: 'relative', width: '100%', height: '350px', backgroundColor: '#fdfbf7' }}>
                <Image
                    src={product.image || 'https://images.unsplash.com/photo-1610189012906-fac6d58f1a54?auto=format&fit=crop&q=80&w=600'}
                    alt={product.name}
                    fill
                    style={{ objectFit: 'cover' }}
                    sizes="(max-width: 768px) 100vw, 33vw"
                />
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        toggleWishlist(product);
                    }}
                    style={{
                        position: 'absolute',
                        top: '12px',
                        right: '12px',
                        backgroundColor: 'rgba(255,255,255,0.85)',
                        border: 'none',
                        borderRadius: '50%',
                        width: '36px',
                        height: '36px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        transition: 'backgroundColor 0.2s',
                        zIndex: 2,
                        fontSize: '18px'
                    }}
                >
                    {isInWishlist(product.id) ? '❤️' : '🤍'}
                </button>
            </div>

            <div style={{ padding: '16px' }}>
                <p style={{
                    fontSize: '12px',
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                    color: 'var(--color-text-light)',
                    marginBottom: '4px'
                }}>
                    {product.category}
                </p>
                <h3 style={{
                    fontSize: '18px',
                    fontFamily: 'var(--font-family-heading)',
                    marginBottom: '8px',
                    color: 'var(--color-text-main)'
                }}>
                    {product.name}
                </h3>
                <p style={{
                    fontSize: '16px',
                    fontWeight: 'bold',
                    color: 'var(--color-primary)'
                }}>
                    ₹{product.price.toLocaleString('en-IN')}
                </p>

                <button
                    className="btn btn-primary"
                    style={{ width: '100%', marginTop: '12px' }}
                    onClick={(e) => {
                        e.preventDefault();
                        addToCart(product);
                        alert(`Added ${product.name} to cart`);
                    }}
                >
                    Add to Cart
                </button>
            </div>
        </div>
    );
}
