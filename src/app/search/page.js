"use client";
import { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Navbar from '../../components/Navbar';
import ProductCard from '../../components/ProductCard';
import { products } from '../../lib/data';

function SearchResults() {
    const searchParams = useSearchParams();
    const query = searchParams.get('q') || '';

    const filteredProducts = products.filter(p =>
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.description.toLowerCase().includes(query.toLowerCase()) ||
        p.category.toLowerCase().includes(query.toLowerCase())
    );

    return (
        <>
            <h1 style={{ marginBottom: '30px' }}>Search Results for "{query}"</h1>
            {filteredProducts.length === 0 ? (
                <p>No products found matching your search.</p>
            ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '30px' }}>
                    {filteredProducts.map(p => (
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
