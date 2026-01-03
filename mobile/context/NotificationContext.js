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
                console.log('Mobile notification received:', data);
            };

            socket.on('notification', handleNotification);
            return () => socket.off('notification', handleNotification);
        }
    }, [socket]);

    const clearNotifications = () => {
        setNotifications([]);
    };

    return (
        <NotificationContext.Provider value={{ notifications, clearNotifications }}>
            {children}
        </NotificationContext.Provider>
    );
};

export const useNotifications = () => useContext(NotificationContext);
