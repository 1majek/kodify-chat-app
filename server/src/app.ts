import express, { Application, Request, Response, NextFunction } from 'express';
import loginRouter from './routes/login';
import messageRouter from './routes/message';
import dotenv from 'dotenv';
import cors from 'cors';
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

app.listen(PORT, () => console.log(`Server running on ${PORT}`));