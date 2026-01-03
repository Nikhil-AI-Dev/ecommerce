"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useSocket } from './SocketContext';

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
    const [notifications, setNotifications] = useState([]);
    const socket = useSocket();

    useEffect(() => {
        if (socket) {
            const handleNotification = (data) => {
                setNotifications((prev) => [data, ...prev]);
                // Optional: show a toast or browser notification
                console.log('New notification:', data);
            };

            socket.on('notification', handleNotification);
            return () => socket.off('notification', handleNotification);
        }
    }, [socket]);

    const addNotification = (notif) => {
        setNotifications(prev => [notif, ...prev]);
    };

    const clearNotifications = () => {
        setNotifications([]);
    };

    return (
        <NotificationContext.Provider value={{ notifications, addNotification, clearNotifications }}>
            {children}
        </NotificationContext.Provider>
    );
};

export const useNotifications = () => useContext(NotificationContext);
