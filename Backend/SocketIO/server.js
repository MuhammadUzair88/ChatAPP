// server.js
import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();

// Create an HTTP server and attach Express
const server = http.createServer(app);

// Initialize Socket.IO and configure CORS
const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URI,
    methods: ["GET", "POST"],
  },
});


export const getReceiverSocketId=(receiverId)=>{
    return users[receiverId]
}


const users={}

// Listen for client connections
io.on("connection", (socket) => {
  console.log("a user connected", socket.id);
  const userId=socket.handshake.query.userId
  if(userId){
   users[userId]=socket.id
   console.log("hello",users)
  }

  io.emit("getOnlineUsers",Object.keys(users))

  // Handle client disconnect
  socket.on("disconnect", () => {
    console.log("a user disconnected", socket.id);
    delete users[userId];
    io.emit("getOnlineUsers",Object.keys(users));
  });
});

export {app,io,server};

