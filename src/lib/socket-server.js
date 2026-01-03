import { Server } from "socket.io";

let io;

export const initSocket = (server) => {
    if (!io) {
        io = new Server(server, {
            cors: {
                origin: "*",
                methods: ["GET", "POST"],
            },
        });

        io.on("connection", (socket) => {
            console.log("Client connected:", socket.id);

            socket.on("sync-update", (data) => {
                console.log("Sync update received:", data);
                // Broadcast to all other clients
                socket.broadcast.emit("remote-sync", data);
            });

            socket.on("disconnect", () => {
                console.log("Client disconnected:", socket.id);
            });
        });
    }
    return io;
};

export const getIO = () => {
    if (!io) {
        throw new Error("Socket.io not initialized!");
    }
    return io;
};
