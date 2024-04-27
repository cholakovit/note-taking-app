import express, { Application, Request, Response } from 'express';

import MongoConnect from './helper/mongoConnect';
import logger from './logger/logger';
import { noteRouter } from './routes/noteRoutes';
import cors from 'cors'

// Load environment variables
import dotenv from 'dotenv';
import { sanitizeRequestBody } from './middleware/sanitization';
import { userRouter } from './routes/userRoutes';
dotenv.config();

const app: Application = express();
const PORT = process.env.PORT;
app.use(express.json())
app.use(sanitizeRequestBody);

//app.use(cors());
app.use(cors({
    origin: 'http://localhost:5173'  // Only allow this origin to access your API
  }));

app.get('/', (req: Request, res: Response) => {
    logger.debug('Handling a request on /')
    res.send('Hello World with TypeScript in Express!');
});

//app.get('/test', (req, res) => res.send('Test route works'));

app.use('/notes', noteRouter)
app.use('/users', userRouter)


const start = async () => {
    const mongoConnect = new MongoConnect()
    await mongoConnect.connectDB()

    app.listen(PORT, () => {
        logger.info(`Server is running on http://localhost:${PORT}`);
    });
}

start()