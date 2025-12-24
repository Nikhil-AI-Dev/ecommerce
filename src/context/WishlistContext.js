'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';

const WishlistContext = createContext();

export function WishlistProvider({ children }) {
    const [wishlist, setWishlist] = useState([]);
    const { data: session } = useSession();

    // Load wishlist from local storage on mount
    useEffect(() => {
        const savedWishlist = localStorage.getItem('sri_lakshmi_wishlist');
        if (savedWishlist) {
            setWishlist(JSON.parse(savedWishlist));
        }
    }, []);

    // Save to local storage and sync with server
    useEffect(() => {
        localStorage.setItem('sri_lakshmi_wishlist', JSON.stringify(wishlist));

        if (session?.user?.email && wishlist.length > 0) {
            syncWithServer();
        }
    }, [wishlist, session]);

    const syncWithServer = async () => {
        try {
            await fetch('/api/mobile/sync', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: session.user.email,
                    type: 'wishlist',
                    items: wishlist
                }),
            });
        } catch (error) {
            console.error('Wishlist Sync Error:', error);
        }
    };

    const addToWishlist = (product) => {
        setWishlist((prev) => {
            if (prev.find((item) => item.id === product.id)) return prev;
            return [...prev, product];
        });
    };

    const removeFromWishlist = (productId) => {
        setWishlist((prev) => prev.filter((item) => item.id !== productId));
    };

    const isInWishlist = (productId) => {
        return wishlist.some((item) => item.id === productId);
    };

    const toggleWishlist = (product) => {
        if (isInWishlist(product.id)) {
            removeFromWishlist(product.id);
        } else {
            addToWishlist(product);
        }
    };

    return (
        <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist, isInWishlist, toggleWishlist, wishlistCount: wishlist.length }}>
            {children}
        </WishlistContext.Provider>
    );
}

export function useWishlist() {
    return useContext(WishlistContext);
}
