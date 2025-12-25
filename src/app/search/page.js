"use client";
import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Navbar from '../../components/Navbar';
import ProductCard from '../../components/ProductCard';

function SearchResults() {
    const searchParams = useSearchParams();
    const query = searchParams.get('q') || '';
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchResults = async () => {
            setLoading(true);
            try {
                const res = await fetch('/api/products');
                const products = await res.json();
                const filtered = products.filter(p =>
                    p.name.toLowerCase().includes(query.toLowerCase()) ||
                    p.description.toLowerCase().includes(query.toLowerCase()) ||
                    p.category.toLowerCase().includes(query.toLowerCase())
                );
                setResults(filtered);
            } catch (error) {
                console.error("Search fetch error:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchResults();
    }, [query]);

    if (loading) return <div style={{ padding: '40px', textAlign: 'center' }}>Searching the collection...</div>;

    return (
        <>
            <h1 style={{ marginBottom: '30px', fontFamily: 'var(--font-family-heading)' }}>Search Results for "{query}"</h1>
            {results.length === 0 ? (
                <div style={{ padding: '60px', textAlign: 'center', backgroundColor: '#f9f9f9', borderRadius: '12px' }}>
                    <p style={{ color: '#888' }}>No products found matching your search.</p>
                </div>
            ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '30px' }}>
                    {results.map(p => (
                        <ProductCard key={p.id} product={p} />
                    ))}
                </div>
            )}
        </>
    );
}

export default function SearchPage() {
    return (
        <main>
            <Navbar />
            <div className="container mt-lg mb-lg">
                <Suspense fallback={<div>Loading...</div>}>
                    <SearchResults />
                </Suspense>
            </div>
        </main>
    );
}
