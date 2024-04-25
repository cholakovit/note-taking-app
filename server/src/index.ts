import express, { Application, Request, Response } from 'express';
import MongoConnect from './helper/mongoConnect';
import logger from './logger/logger';
import { noteRouter } from './routes/noteRoutes';

// Load environment variables
import dotenv from 'dotenv';
dotenv.config();

const app: Application = express();
const PORT = process.env.PORT;
app.use(express.json())

app.get('/', (req: Request, res: Response) => {
    logger.debug('Handling a request on /')
    res.send('Hello World with TypeScript in Express!');
});

//app.get('/test', (req, res) => res.send('Test route works'));

app.use('/notes', noteRouter)


const start = async () => {
    const mongoConnect = new MongoConnect()
    await mongoConnect.connectDB()

    app.listen(PORT, () => {
        logger.info(`Server is running on http://localhost:${PORT}`);
    });
}

start()