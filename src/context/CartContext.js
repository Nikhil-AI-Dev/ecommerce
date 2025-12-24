'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';

const CartContext = createContext();

export function CartProvider({ children }) {
    const [cart, setCart] = useState([]);
    const { data: session } = useSession();

    // Load cart from local storage on mount
    useEffect(() => {
        const savedCart = localStorage.getItem('sri_lakshmi_cart');
        if (savedCart) {
            setCart(JSON.parse(savedCart));
        }
    }, []);

    // Save cart to local storage and sync whenever it changes
    useEffect(() => {
        localStorage.setItem('sri_lakshmi_cart', JSON.stringify(cart));
        if (session?.user?.email && cart.length > 0) {
            syncWithServer();
        }
    }, [cart, session]);

    const syncWithServer = async () => {
        try {
            await fetch('/api/mobile/sync', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: session.user.email,
                    type: 'cart',
                    items: cart
                }),
            });
        } catch (error) {
            console.error('Cart Sync Error:', error);
        }
    };

    const addToCart = (product, quantity = 1) => {
        setCart((prevCart) => {
            const existingItem = prevCart.find((item) => item.id === product.id);
            if (existingItem) {
                return prevCart.map((item) =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                );
            }
            return [...prevCart, { ...product, quantity }];
        });
    };

    const removeFromCart = (productId) => {
        setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
    };

    const updateQuantity = (productId, quantity) => {
        setCart((prevCart) =>
            prevCart.map((item) =>
                item.id === productId ? { ...item, quantity: Math.max(1, quantity) } : item
            )
        );
    };

    const clearCart = () => {
        setCart([]);
    };

    const cartTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
    const cartCount = cart.reduce((count, item) => count + item.quantity, 0);

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart, cartTotal, cartCount }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    return useContext(CartContext);
}
