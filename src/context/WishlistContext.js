'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useSocket } from './SocketContext';

const WishlistContext = createContext();

export function WishlistProvider({ children }) {
    const [wishlist, setWishlist] = useState([]);
    const { data: session } = useSession();
    const socket = useSocket();

    const [isLoaded, setIsLoaded] = useState(false);
    useEffect(() => {
        const savedWishlist = localStorage.getItem('sri_lakshmi_wishlist');
        if (savedWishlist) {
            setWishlist(JSON.parse(savedWishlist));
        }
        setIsLoaded(true);
    }, []);

    useEffect(() => {
        if (socket && session?.user?.email) {
            const handleRemoteSync = (data) => {
                if (data.email === session.user.email && data.type === 'wishlist') {
                    console.log('Web wishlist syncing from remote:', data.items.length);
                    setWishlist(data.items);
                }
            };
            socket.on('remote-sync', handleRemoteSync);
            return () => socket.off('remote-sync', handleRemoteSync);
        }
    }, [socket, session]);

    useEffect(() => {
        if (isLoaded) {
            localStorage.setItem('sri_lakshmi_wishlist', JSON.stringify(wishlist));
            if (session?.user?.email) {
                syncWithServer();
            }
        }
    }, [wishlist, session, isLoaded]);

    const syncWithServer = async () => {
        try {
            const response = await fetch('/api/mobile/sync', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: session.user.email,
                    type: 'wishlist',
                    items: wishlist
                }),
            });
            const result = await response.json();
            if (result.success && socket) {
                socket.emit('sync-update', {
                    email: session.user.email,
                    type: 'wishlist',
                    items: wishlist
                });
            }
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
