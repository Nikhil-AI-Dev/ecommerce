import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Config from '../constants/Config';

const AuthContext = createContext();

const AUTH_STORAGE_KEY = '@slnh_user_session';

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadSession = async () => {
            try {
                const storedSession = await AsyncStorage.getItem(AUTH_STORAGE_KEY);
                if (storedSession) {
                    setUser(JSON.parse(storedSession));
                }
            } catch (error) {
                console.error("Error loading auth session:", error);
            } finally {
                setLoading(false);
            }
        };
        loadSession();
    }, []);

    const login = async (email, password) => {
        try {
            // In development, we use relative URL or env-based BASE_URL
            const response = await fetch(`${Config.API_BASE_URL}/api/mobile/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (data.success) {
                await AsyncStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(data.user));
                setUser(data.user);
                return { success: true };
            } else {
                return { success: false, message: data.message || "Login failed" };
            }
        } catch (error) {
            console.error("Login Error:", error);
            return { success: false, message: "Network error. Please try again." };
        }
    };

    const logout = async () => {
        try {
            await AsyncStorage.removeItem(AUTH_STORAGE_KEY);
            setUser(null);
        } catch (error) {
            console.error("Logout Error:", error);
        }
    };

    const register = async (name, email, password) => {
        try {
            const response = await fetch(`${Config.API_BASE_URL}/api/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, password }),
            });

            const data = await response.json();

            if (response.status === 201) {
                return login(email, password); // Auto login after register
            } else {
                return { success: false, message: data.message || "Registration failed" };
            }
        } catch (error) {
            console.error("Register Error:", error);
            return { success: false, message: "Network error. Please try again." };
        }
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, register, loading, isAuthenticated: !!user }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
