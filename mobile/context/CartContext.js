import React, { createContext, useContext, useReducer, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from './AuthContext';
import { useSocket } from './SocketContext';
import Config from '../constants/Config';

const CartContext = createContext();

const cartReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_TO_CART': {
            const existingItemIndex = state.items.findIndex(item => item.id === action.payload.id);
            if (existingItemIndex > -1) {
                const newItems = [...state.items];
                newItems[existingItemIndex].quantity += action.payload.quantity || 1;
                return { ...state, items: newItems };
            }
            return { ...state, items: [...state.items, { ...action.payload, quantity: action.payload.quantity || 1 }] };
        }
        case 'REMOVE_FROM_CART':
            return { ...state, items: state.items.filter(item => item.id !== action.payload) };
        case 'UPDATE_QUANTITY':
            return {
                ...state,
                items: state.items.map(item =>
                    item.id === action.payload.id
                        ? { ...item, quantity: action.payload.quantity }
                        : item
                ),
            };
        case 'CLEAR_CART':
            return { ...state, items: [] };
        case 'SET_CART':
            return { ...state, items: action.payload };
        default:
            return state;
    }
};

export const CartProvider = ({ children }) => {
    const { user, isAuthenticated } = useAuth();
    const socket = useSocket();
    const [state, dispatch] = useReducer(cartReducer, { items: [] });

    useEffect(() => {
        loadCart();
    }, []);

    useEffect(() => {
        if (socket) {
            const handleRemoteSync = (data) => {
                if (data.email === user?.email && data.type === 'cart') {
                    console.log('Mobile syncing from remote:', data.items.length);
                    dispatch({ type: 'SET_CART', payload: data.items });
                }
            };
            socket.on('remote-sync', handleRemoteSync);
            return () => socket.off('remote-sync', handleRemoteSync);
        }
    }, [socket, user]);

    useEffect(() => {
        saveCart();
        if (isAuthenticated && state.items.length > 0) {
            syncWithServer();
        }
    }, [state.items, isAuthenticated]);

    const syncWithServer = async () => {
        try {
            const response = await fetch(`${Config.API_BASE_URL}/api/mobile/sync`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: user.email,
                    type: 'cart',
                    items: state.items
                }),
            });
            const result = await response.json();
            if (result.success && socket) {
                socket.emit('sync-update', {
                    email: user.email,
                    type: 'cart',
                    items: state.items
                });
            }
        } catch (error) {
            console.error('Cart Sync Error:', error);
        }
    };

    const loadCart = async () => {
        try {
            const savedCart = await AsyncStorage.getItem('mobile_cart');
            if (savedCart) {
                dispatch({ type: 'SET_CART', payload: JSON.parse(savedCart) });
            }
        } catch (error) {
            console.error('Error loading cart:', error);
        }
    };

    const saveCart = async () => {
        try {
            await AsyncStorage.setItem('mobile_cart', JSON.stringify(state.items));
        } catch (error) {
            console.error('Error saving cart:', error);
        }
    };

    const addToCart = (product, quantity = 1) => {
        dispatch({ type: 'ADD_TO_CART', payload: { ...product, quantity } });
    };

    const removeFromCart = (productId) => {
        dispatch({ type: 'REMOVE_FROM_CART', payload: productId });
    };

    const updateQuantity = (productId, quantity) => {
        dispatch({ type: 'UPDATE_QUANTITY', payload: { id: productId, quantity } });
    };

    const clearCart = () => {
        dispatch({ type: 'CLEAR_CART' });
    };

    const cartTotal = state.items.reduce((total, item) => total + item.price * item.quantity, 0);
    const cartCount = state.items.reduce((count, item) => count + item.quantity, 0);

    return (
        <CartContext.Provider value={{
            cart: state.items,
            addToCart,
            removeFromCart,
            updateQuantity,
            clearCart,
            cartTotal,
            cartCount
        }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};
