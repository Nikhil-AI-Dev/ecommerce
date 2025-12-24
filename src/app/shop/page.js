'use client';

import { useState, useEffect, Suspense } from 'react';
import { products, categories } from '../../lib/data';
import ProductCard from '../../components/ProductCard';
import Navbar from '../../components/Navbar';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

function ShopContent() {
    const searchParams = useSearchParams();
    const categoryParam = searchParams.get('category');

    // States for sorting and filtering
    const [allProducts, setAllProducts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [priceRange, setPriceRange] = useState(100000);
    const [loading, setLoading] = useState(true);

    // Sync URL params with state
    useEffect(() => {
        const load = async () => {
            setLoading(true);
            try {
                let url = '/api/products';
                if (categoryParam) {
                    url += `?category=${categoryParam}`;
                    if (categoryParam.toLowerCase() === 'new-arrivals') {
                        url = '/api/products?featured=true';
                        setSelectedCategory('New Arrivals');
                    } else {
                        setSelectedCategory(categoryParam.charAt(0).toUpperCase() + categoryParam.slice(1).toLowerCase());
                    }
                } else {
                    setSelectedCategory('All');
                }
                const res = await fetch(url);
                const data = await res.json();
                setAllProducts(data);
            } catch (error) {
                console.error("Shop fetch error:", error);
            } finally {
                setLoading(false);
            }
        };
        load();
    }, [categoryParam]);

    // Secondary Filter Logic (Price)
    const filteredProducts = allProducts.filter(p => {
        const priceMatch = p.price <= priceRange;
        return priceMatch;
    });

    if (loading) return <div style={{ minHeight: '60vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <p style={{ fontSize: '20px', fontFamily: 'var(--font-family-heading)' }}>Discovering sarees for you...</p>
    </div>;

    return (
        <main style={{ backgroundColor: '#fcfcfc', minHeight: '100vh' }}>
            <Navbar />

            <div className="container mt-lg mb-lg">
                <h1 style={{ marginBottom: '40px', fontFamily: 'var(--font-family-heading)', borderBottom: '1px solid #ddd', paddingBottom: '20px' }}>
                    Exclusive Collection
                </h1>

                <div style={{ display: 'grid', gridTemplateColumns: '250px 1fr', gap: '40px' }}>
                    {/* Sidebar Filters */}
                    <aside style={{ height: 'fit-content' }}>
                        <div style={{ backgroundColor: '#fff', padding: '24px', borderRadius: '12px', border: '1px solid #eee', position: 'sticky', top: '100px' }}>
                            <h3 style={{ marginBottom: '20px', fontSize: '18px', display: 'flex', justifyContent: 'space-between' }}>
                                Filters
                                <span style={{ fontSize: '12px', color: 'var(--color-primary)', cursor: 'pointer' }} onClick={() => { setSelectedCategory('All'); setPriceRange(100000) }}>Reset</span>
                            </h3>

                            {/* Categories */}
                            <div style={{ marginBottom: '30px' }}>
                                <h4 style={{ marginBottom: '12px', fontSize: '14px', color: '#555', textTransform: 'uppercase', letterSpacing: '1px' }}>Category</h4>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                    <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', color: selectedCategory === 'All' ? 'var(--color-primary)' : '#333' }}>
                                        <input type="radio" name="category" checked={selectedCategory === 'All'} onChange={() => setSelectedCategory('All')} />
                                        All Sarees
                                    </label>
                                    {categories.map(cat => (
                                        <label key={cat.slug} style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', color: selectedCategory === cat.name ? 'var(--color-primary)' : '#333' }}>
                                            <input type="radio" name="category" checked={selectedCategory === cat.name} onChange={() => setSelectedCategory(cat.name)} />
                                            {cat.name}
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Price Range */}
                            <div>
                                <h4 style={{ marginBottom: '12px', fontSize: '14px', color: '#555', textTransform: 'uppercase', letterSpacing: '1px' }}>Max Price: ₹{priceRange.toLocaleString()}</h4>
                                <input
                                    type="range"
                                    min="4000"
                                    max="100000"
                                    step="1000"
                                    value={priceRange}
                                    onChange={(e) => setPriceRange(Number(e.target.value))}
                                    style={{ width: '100%', cursor: 'pointer' }}
                                />
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#888', marginTop: '5px' }}>
                                    <span>₹4k</span>
                                    <span>₹1L</span>
                                </div>
                            </div>
                        </div>
                    </aside>

                    {/* Product Grid */}
                    <section>
                        <p style={{ marginBottom: '20px', color: '#666' }}>Showing {filteredProducts.length} results {selectedCategory !== 'All' && <span>in <strong>{selectedCategory}</strong></span>}</p>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '30px' }}>
                            {filteredProducts.map((product) => (
                                <Link href={`/shop/${product.id}`} key={product.id} style={{ textDecoration: 'none', color: 'inherit' }}>
                                    <ProductCard product={product} />
                                </Link>
                            ))}
                        </div>

                        {filteredProducts.length === 0 && (
                            <div style={{ textAlign: 'center', padding: '60px', backgroundColor: '#fff', borderRadius: '8px' }}>
                                <p style={{ color: '#888', fontSize: '18px' }}>No products found matching your filters.</p>
                                <button onClick={() => { setSelectedCategory('All'); setPriceRange(100000) }} style={{ marginTop: '20px' }} className="btn btn-primary">Clear Filters</button>
                            </div>
                        )}
                    </section>
                </div>
            </div>
        </main>
    );
}

export default function Shop() {
    return (
        <Suspense fallback={<div className="container" style={{ padding: '100px', textAlign: 'center' }}>Loading Collection...</div>}>
            <ShopContent />
        </Suspense>
    );
}
