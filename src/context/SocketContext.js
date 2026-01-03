"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        const socketInstance = io(); // Connects to the host server

        socketInstance.on('connect', () => {
            console.log('Web connected to socket server');
        });

        socketInstance.on('remote-sync', (data) => {
            console.log('Web received remote sync:', data);
            // Trigger local state updates or revalidation
            if (typeof window !== 'undefined') {
                // You could use a custom event or a context update here
                window.dispatchEvent(new CustomEvent('sync-cart', { detail: data }));
            }
        });

        setSocket(socketInstance);

        return () => {
            socketInstance.disconnect();
        };
    }, []);

    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    );
};

export const useSocket = () => useContext(SocketContext);
