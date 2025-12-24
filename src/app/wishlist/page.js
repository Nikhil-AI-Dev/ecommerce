'use client';

import { useWishlist } from '../../context/WishlistContext';
import ProductCard from '../../components/ProductCard';
import Navbar from '../../components/Navbar';
import Link from 'next/link';

export default function WishlistPage() {
    const { wishlist, wishlistCount } = useWishlist();

    return (
        <main>
            <Navbar />
            <div className="container" style={{ padding: '60px 0' }}>
                <h1 style={{
                    fontFamily: 'var(--font-family-heading)',
                    fontSize: '36px',
                    marginBottom: '10px',
                    textAlign: 'center'
                }}>
                    My Wishlist
                </h1>
                <p style={{
                    textAlign: 'center',
                    color: 'var(--color-text-light)',
                    marginBottom: '50px'
                }}>
                    Saved items for your heritage collection
                </p>

                {wishlistCount === 0 ? (
                    <div style={{ textAlign: 'center', padding: '100px 0' }}>
                        <p style={{ fontSize: '18px', color: '#888', marginBottom: '20px' }}>Your wishlist is empty.</p>
                        <Link href="/shop" className="btn btn-primary" style={{ padding: '12px 30px' }}>
                            Explore Handlooms
                        </Link>
                    </div>
                ) : (
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                        gap: '30px'
                    }}>
                        {wishlist.map(product => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                )}
            </div>
        </main>
    );
}
