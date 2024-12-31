// Import necessary modules
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { v4 as uuid } from 'uuid';

import { NEW_MESSAGE, NEW_MESSAGE_ALERT } from './constants/Events.js';
import { errorMiddleware } from './middlewares/error.js';
import { Message } from './models/message.model.js';
import adminroutes from './routes/admin.routes.js';
import authroutes from './routes/auth.routes.js';
import chatroutes from './routes/chat.routes.js';
import userroutes from './routes/user.routes.js';
import workerroutes from './routes/worker.routes.js';
import { connectdb } from './utills/connectdb.js';

// Initialize Express App
const app = express();
const server = createServer(app);

// Socket.IO setup
const io = new Server(server, {
  cors: {
    origin: '*', // Adjust this in production
    methods: ['GET', 'POST'],
  },
});

// Global map to track connected users
export const userSocketIds = new Map();

// Middlewares
app.use(cors({
  origin: 'http://127.0.0.1:5173', // Explicit frontend origin
  credentials: true, // Allow cookies and credentials
}));
app.use(express.json());
app.use(cookieParser());
app.use(errorMiddleware);

// Database connection
await connectdb();

// Routes
app.use('/api/auth', authroutes);
app.use('/api/user', userroutes);
app.use('/api/worker', workerroutes);
app.use('/api/chat', chatroutes);
app.use('/api/admin', adminroutes);

// Utility function to get socket IDs of users
const getSockets = (users) => {
  return users
    .map((user) => userSocketIds.get(user._id.toString()))
    .filter((socketId) => socketId); // Filter out undefined socket IDs
};

// Socket.IO middleware for authentication (if required)
io.use((socket, next) => {
  const token = socket.handshake.auth?.token; // Example for token-based auth
  if (token) {
    // Validate token here if needed
    next();
  } else {
    next(new Error('Authentication error'));
  }
});

// Socket.IO connection handling
io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  // Example user object (Replace this with your authentication logic)
  const user = {
    _id: uuid(),
    name: 'Shreyansh',
  };

  userSocketIds.set(user._id.toString(), socket.id);

  socket.on(NEW_MESSAGE, async ({ chatId, members, messages }) => {
    try {
      const messageForRealTime = {
        content: messages,
        _id: uuid(),
        sender: {
          _id: user._id,
          name: user.name,
        },
        chatId,
        createdAt: new Date().toISOString(),
      };

      const messageForDb = {
        content: messages,
        sender: user._id,
        chat: chatId,
      };

      const membersSockets = getSockets(members);

      membersSockets.forEach((memberSocketId) => {
        io.to(memberSocketId).emit(NEW_MESSAGE, {
          chatId,
          message: messageForRealTime,
        });

        io.to(memberSocketId).emit(NEW_MESSAGE_ALERT, { chatId });
      });

      await Message.create(messageForDb);
    } catch (error) {
      console.error('Error handling NEW_MESSAGE:', error);
    }
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
    userSocketIds.delete(user._id.toString());
  });
});

// Start the server
server.listen(3000, () => {
  console.log('Server is listening on port 3000');
});
