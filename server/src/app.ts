import express, { Application, Request, Response, NextFunction } from 'express';
import loginRouter from './routes/login';
import messageRouter from './routes/message';
import dotenv from 'dotenv';
import cors from 'cors';
import { Server } from 'socket.io';
import { sendMessage } from './repo/message';

dotenv.config();

const app: Application = express();
app.use(cors());
app.use(express.json()) // transforms request body to json
const PORT = process.env.PORT;

app.get('/', (req: Request, res: Response, next: NextFunction) => {
	res.send('***Kodify Chat App***');
});

app.use('/api/auth', loginRouter);
app.use('/api/message', messageRouter);

const server = app.listen(PORT, () => console.log(`Server running on ${PORT}`));

const io = new Server(server, {
	cors: {
		origin: "http://localhost:3000",
		methods: ["GET", "POST"],
	}
});

io.on("connection", (socket) => {
	socket.on('join_room', (room) => {
		console.log(`${socket.id} has joined room ${room}`);
		socket.join(room)
	});

	socket.on('send_message', async (data) => {
		console.log('🚀 > room', data.room)
		console.log('🚀 > data', data);
		socket.to(data.room).emit("receive_message", data.message);
		// Save message to database
		// await sendMessage(data.messsage);
	})

});