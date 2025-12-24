'use client';
import { products } from '../../../lib/data';
import Link from 'next/link';
import Navbar from '../../../components/Navbar';
import { useCart } from '../../../context/CartContext';
import { useState, useEffect } from 'react';

// generateStaticParams removed to avoid conflict with "use client"

export default function ProductPage({ params }) {
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const { addToCart } = useCart();
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await fetch('/api/products');
                const apiProducts = await res.json();
                const found = apiProducts.find(p => p.id === params.id);
                setProduct(found);
            } catch (error) {
                console.error("Product fetch error:", error);
                setProduct(null);
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [params.id]);

    if (loading) return <div className="container" style={{ padding: '100px', textAlign: 'center' }}>Loading product details...</div>;

    if (!product) {
        return (
            <>
                <Navbar />
                <div className="container text-center mt-lg" style={{ padding: '100px' }}>Product not found</div>
            </>
        )
    }

    const handleAddToCart = () => {
        for (let i = 0; i < quantity; i++) {
            addToCart(product);
        }
        alert(`Added ${quantity} ${product.name}(s) to cart`);
    };

    const productImage = product.imageUrl || product.image || 'https://images.unsplash.com/photo-1610189012906-fac6d58f1a54?auto=format&fit=crop&q=80&w=600';

    return (
        <main style={{ backgroundColor: '#fdfbf7', minHeight: '100vh', paddingBottom: '80px' }}>
            <Navbar />

            <div className="container mt-lg">
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '60px' }}>

                    {/* Image Section */}
                    <div style={{
                        backgroundColor: '#fff',
                        height: '600px',
                        borderRadius: '12px',
                        overflow: 'hidden',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        border: '1px solid #eee',
                        boxShadow: '0 8px 30px rgba(0,0,0,0.05)',
                        position: 'sticky',
                        top: '120px'
                    }}>
                        <Image
                            src={productImage}
                            alt={product.name}
                            fill
                            style={{ objectFit: 'cover' }}
                            priority
                        />
                    </div>

                    {/* Details Section */}
                    <div>
                        <nav style={{ fontSize: '14px', color: '#666', marginBottom: '30px' }}>
                            <Link href="/shop" style={{ textDecoration: 'none', color: 'inherit' }}>Shop</Link>  /
                            <span style={{ color: 'var(--color-primary)' }}> {product.category} </span> /
                            <span> {product.name} </span>
                        </nav>

                        <h1 style={{ marginBottom: '16px', fontSize: '42px', fontFamily: 'var(--font-family-heading)' }}>{product.name}</h1>
                        <div style={{ marginBottom: '24px' }}>
                            <p style={{ fontSize: '32px', color: 'var(--color-primary)', fontWeight: 'bold', margin: 0 }}>
                                ₹{(product.discountedPrice || product.price).toLocaleString('en-IN')}
                            </p>
                            {product.discountedPrice && (
                                <p style={{ fontSize: '18px', color: '#999', textDecoration: 'line-through', marginTop: '4px' }}>
                                    ₹{product.price.toLocaleString('en-IN')}
                                </p>
                            )}
                            <p style={{ fontSize: '14px', color: '#666', marginTop: '8px' }}>
                                (Inclusive of all taxes)
                            </p>
                        </div>

                        <div style={{ borderTop: '1px solid #ddd', borderBottom: '1px solid #ddd', padding: '30px 0', margin: '30px 0' }}>
                            <p style={{ lineHeight: '1.8', fontSize: '18px', color: '#444' }}>
                                {product.description}
                            </p>
                        </div>

                        {/* Specifications Table */}
                        <div style={{ marginBottom: '40px' }}>
                            <h3 style={{ marginBottom: '20px', fontFamily: 'var(--font-family-heading)' }}>Product Details</h3>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '15px', fontSize: '15px' }}>
                                <div style={{ color: '#666' }}>Material</div>
                                <div style={{ fontWeight: '500' }}>{product.fabric || 'Premium Silk'}</div>

                                <div style={{ color: '#666' }}>Color</div>
                                <div style={{ fontWeight: '500' }}>{product.color || 'Multicolor'}</div>

                                <div style={{ color: '#666' }}>Blouse Piece</div>
                                <div style={{ fontWeight: '500' }}>{product.blouse || 'Included'}</div>

                                <div style={{ color: '#666' }}>Occasion</div>
                                <div style={{ fontWeight: '500' }}>{product.occasion || 'Festive'}</div>

                                <div style={{ color: '#666' }}>Wash Care</div>
                                <div style={{ fontWeight: '500' }}>{product.washCare || 'Dry Clean Recommended'}</div>
                            </div>
                        </div>

                        {/* Actions */}
                        <div style={{ display: 'flex', gap: '20px', alignItems: 'center', marginBottom: '30px' }}>
                            <div style={{ display: 'flex', border: '1px solid #ddd', borderRadius: '4px' }}>
                                <button onClick={() => setQuantity(q => Math.max(1, q - 1))} style={{ padding: '12px 20px', background: '#fff', border: 'none', cursor: 'pointer', fontSize: '18px' }}>-</button>
                                <div style={{ padding: '12px 20px', borderLeft: '1px solid #ddd', borderRight: '1px solid #ddd', fontWeight: 'bold' }}>{quantity}</div>
                                <button onClick={() => setQuantity(q => q + 1)} style={{ padding: '12px 20px', background: '#fff', border: 'none', cursor: 'pointer', fontSize: '18px' }}>+</button>
                            </div>
                            <button className="btn btn-primary" style={{ flex: 1, padding: '16px', fontSize: '18px', boxShadow: '0 4px 15px rgba(128, 0, 0, 0.2)' }} onClick={handleAddToCart}>
                                Add to Cart
                            </button>
                        </div>

                        <div style={{ marginTop: '40px', padding: '24px', backgroundColor: '#fff', borderRadius: '8px', fontSize: '14px', border: '1px solid #eee', display: 'grid', gap: '12px' }}>
                            <p style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>🚚 <strong>Free Shipping</strong> across India on orders above ₹5000</p>
                            <p style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>✨ <strong>Silk Mark Certified</strong> for authenticity</p>
                            <p style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>↩️ <strong>7-Day Returns</strong> if product is defective</p>
                        </div>
                    </div>
                </div>

                {/* Heritage & Care Section */}
                <div style={{ marginTop: '100px', borderTop: '1px solid #eee', paddingTop: '80px' }}>
                    <h2 style={{ fontFamily: 'var(--font-family-heading)', fontSize: '36px', textAlign: 'center', marginBottom: '60px' }}>The Heritage Collective</h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '40px' }}>
                        <div style={{ backgroundColor: '#fff', padding: '40px', borderRadius: '12px', border: '1px solid #eee' }}>
                            <div style={{ fontSize: '32px', marginBottom: '20px' }}>🧶</div>
                            <h4 style={{ marginBottom: '15px', color: 'var(--color-primary)' }}>Artisanal Weaving</h4>
                            <p style={{ fontSize: '15px', color: '#666', lineHeight: '1.6' }}>
                                This saree is a product of months of dedication by our master weavers.
                                Using traditional pit-looms, every motif is hand-interwoven, making each piece a unique work of art.
                            </p>
                        </div>
                        <div style={{ backgroundColor: '#fff', padding: '40px', borderRadius: '12px', border: '1px solid #eee' }}>
                            <div style={{ fontSize: '32px', marginBottom: '20px' }}>🌿</div>
                            <h4 style={{ marginBottom: '15px', color: 'var(--color-primary)' }}>Natural Sourcing</h4>
                            <p style={{ fontSize: '15px', color: '#666', lineHeight: '1.6' }}>
                                We use only pure mulberry silk and high-grade cotton. Our dyes are skin-friendly and
                                ethically produced to ensure the fabric breathes with you, keeping you comfortable for hours.
                            </p>
                        </div>
                        <div style={{ backgroundColor: '#fff', padding: '40px', borderRadius: '12px', border: '1px solid #eee' }}>
                            <div style={{ fontSize: '32px', marginBottom: '20px' }}>✨</div>
                            <h4 style={{ marginBottom: '15px', color: 'var(--color-primary)' }}>Care Guide</h4>
                            <ul style={{ fontSize: '15px', color: '#666', lineHeight: '1.8', paddingLeft: '20px' }}>
                                <li>Dry clean only for the first three washes.</li>
                                <li>Store in a cool, dry place wrapped in cotton cloth.</li>
                                <li>Avoid direct sunlight while drying to prevent color fade.</li>
                                <li>Iron on silk setting with a thin cloth on top.</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
