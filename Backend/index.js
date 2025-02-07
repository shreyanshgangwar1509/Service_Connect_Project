// Import necessary modules
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import { createServer } from 'http';
import jwt from 'jsonwebtoken';
import { Server } from 'socket.io';
import { v4 as uuid } from 'uuid';
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

const io = new Server(server, {
  cors: {
    origin: '*', // Adjust this in production
    methods: ['GET', 'POST'],
  },
});

export const userSocketIds = new Map();

const allowedOrigins = [
  'http://localhost:5173',
  'http://127.0.0.1:5173'
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true, 
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

function getSockets(userId) {
  const sockets = userSocketIds[userId];
  if (!sockets || !Array.isArray(sockets)) {
    console.warn(`No sockets found for userId: ${userId}`);
    return [];
  }
  return sockets.map((socketId) => io.sockets.sockets.get(socketId));
}


io.use((socket, next) => {
  const token = socket.handshake.headers?.token;
  console.log(socket);
  
  if (!token) {
    console.warn('Token is missing in handshake.auth');
    return next(new Error('Authentication error: Token missing'));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECERET); // Verify token
    socket.user = decoded;
    next();
  } catch (err) {
    console.error('Token verification failed:', err.message);
    next(new Error('Authentication error: Invalid token'));
  }
});
io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);
  const user = {
    _id: uuid(),
    name: 'Shreyansh',
  };

  userSocketIds.set(user._id.toString(), socket.id);

  socket.on('NEW_MESSAGE', async ({ chatId, members, messages }) => {
  try {
    const user = socket.user;    
    if (!user.userId) {
      console.warn('User information is missing');
      return socket.emit('ERROR', 'User authentication required');
    }

    const messageForRealTime = {
      content: messages,
      _id: uuid(),
      sender: {
        _id: user.userId,
        name: user.name,
      },
      chatId,
      createdAt: new Date().toISOString(),
    };

    const messageForDb = {
      content: messages,
      senderId: user.userId,
      receiverId:members,
      chat: chatId,
    };

    
    const membersSockets = getSockets(members);
    membersSockets.forEach((memberSocketId) => {
      io.to(memberSocketId).emit('NEW_MESSAGE', {
        chatId,
        message: messageForRealTime,
      });

      io.to(memberSocketId).emit('NEW_MESSAGE_ALERT', { chatId });
    });

    
    await Message.create(messageForDb);
  } catch (error) {
    console.error('Error handling NEW_MESSAGE:', error);
    socket.emit('ERROR', 'Failed to handle message');
  }
});

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
    userSocketIds.delete(user._id.toString());
  });
});

// Start the server
app.get('/', (req, res) => {
  res.status(200).json({
    message: "Team service connect", members: {
      1:"Shreyansh gangwar ",
      2:"Palak Jain",
      3:"Aryan bhai ke aage koi bol skta hai kya ",
      4:"Sujal bhai "
  }})
})
const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log('Server is listening on port 3000');
});
