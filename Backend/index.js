import cookieParser from 'cookie-parser';
import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { v4 as uuid } from 'uuid';
import { NEW_MESSAGE, NEW_MESSAGE_ALERT } from './constants/Events.js';
import { errorMiddleware } from './middlewares/error';
import { Message } from './models/message.model.js';
import adminroutes from './routes/admin.routes.js';
import authroutes from './routes/auth.routes.js';
import chatroutes from './routes/chat.routes.js';
import userroutes from './routes/user.routes.js';
import workerroutes from './routes/worker.routes.js';
import { connectdb } from './utills/connectdb';
import { getSockets } from './utills/getSocket.js';
const app = express();
const server = createServer(app);

const io = new Server(server, {});
export const userSocketIds = new Map();
app(cors());
connectdb();
app.use(express.json());
app.use(errorMiddleware);
app.use(cookieParser());
app.use('/api/auth', authroutes);
app.use('/api/user', userroutes);
app.use('/api/wroker', workerroutes);
app.use('/api/chat', chatroutes);
app.use('/api/admin', adminroutes);
// middel ware for user
io.use((socket,next) => {
    
})
io.on("connection", (socket) => {
    console.log('a user connected',socket.id);
    userSocketIds.set(user._id.toString(), socket._id);
    
    socket.on(NEW_MESSAGE, async ({ chatId, members, messages }) => {
        const user = {
            _id: "dshbkjn",
            name:"Shreyasnh"
        }
        const messageForRealTime = {
            content: messages,
            _id: uuid(),
            sender: {
                _id: user._id,
                name:user.name,
            },
            chatId,
            createdAt: new Date().toString(),
        }

        const messageForDb = {
            content: messages,
            sender: user._id,
            chat:chatId,
        }

        const membersSockets = getSockets(members);

        io.to(membersSockets).emit(NEW_MESSAGE, {
            chatId,message:messageForRealTime,
        });

        io.to(membersSockets).emit(NEW_MESSAGE_ALERT, { chatId });

        // console.log("New message ",data);
        await Message.create(messageForDb);
        
    })

    socket.on('disconnect', () => {
        console.log('user disconnected');
        userSocketIds.delete(user._Id.toStrign());
        
    })
})

server.listen(3000, () => {
    console.log('server is listening on 3000');
    
})