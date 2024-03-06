import express from 'express';
import { createServer } from 'http'
import { Server } from 'socket.io'
import cors from 'cors'
import dotenv from 'dotenv'

const app = express();

dotenv.config()

app.use(cors({
    origin: "https://kuchbaate.onrender.com",
    methods: ['GET', 'POST'],
    credentials: true
}))

const PORT = process.env.PORT || 3000;

const server = createServer(app);

const io = new Server(server, {
    cors:{
        origin: "https://kuchbaate.onrender.com",
        methods: ['GET', 'POST'],
        credentials: true
    }
});

io.on("connection", (socket) => {
    console.log(`Socket from server: ${socket.id}`);

    socket.on('user-message', ({msg, name}) => {
        socket.broadcast.emit('all-user-message', {msg, name});
    })

    socket.on("disconnect", () => {
        console.log("User disconnected:", socket.id)
    })
})

app.get('/', (req, res) => {
    res.send('This is an express app');
})



server.listen(PORT, () => console.log(`Server is running at port ${PORT}`));