import React, { createContext, useContext, useReducer, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from './AuthContext';
import Config from '../constants/Config';

const WishlistContext = createContext();

const WISHLIST_STORAGE_KEY = '@slnh_wishlist';

const wishlistReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_TO_WISHLIST':
            if (state.find(item => item.id === action.payload.id)) return state;
            return [...state, action.payload];
        case 'REMOVE_FROM_WISHLIST':
            return state.filter(item => item.id !== action.payload);
        case 'LOAD_WISHLIST':
            return action.payload;
        default:
            return state;
    }
};

export const WishlistProvider = ({ children }) => {
    const { user, isAuthenticated } = useAuth();
    const [wishlist, dispatch] = useReducer(wishlistReducer, []);

    useEffect(() => {
        const loadWishlist = async () => {
            try {
                const storedWishlist = await AsyncStorage.getItem(WISHLIST_STORAGE_KEY);
                if (storedWishlist) {
                    dispatch({ type: 'LOAD_WISHLIST', payload: JSON.parse(storedWishlist) });
                }
            } catch (error) {
                console.error("Error loading wishlist:", error);
            }
        };
        loadWishlist();
    }, []);

    useEffect(() => {
        const saveWishlist = async () => {
            try {
                await AsyncStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlist));
                if (isAuthenticated && wishlist.length > 0) {
                    syncWithServer();
                }
            } catch (error) {
                console.error("Error saving wishlist:", error);
            }
        };
        saveWishlist();
    }, [wishlist, isAuthenticated]);

    const syncWithServer = async () => {
        try {
            await fetch(`${Config.API_BASE_URL}/api/mobile/sync`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: user.email,
                    type: 'wishlist',
                    items: wishlist
                }),
            });
        } catch (error) {
            console.error('Wishlist Sync Error:', error);
        }
    };

    const addToWishlist = (product) => {
        dispatch({ type: 'ADD_TO_WISHLIST', payload: product });
    };

    const removeFromWishlist = (productId) => {
        dispatch({ type: 'REMOVE_FROM_WISHLIST', payload: productId });
    };

    const isInWishlist = (productId) => {
        return wishlist.some(item => item.id === productId);
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
};

export const useWishlist = () => {
    const context = useContext(WishlistContext);
    if (!context) {
        throw new Error('useWishlist must be used within a WishlistProvider');
    }
    return context;
};
