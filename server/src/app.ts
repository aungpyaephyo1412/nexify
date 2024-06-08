import cors from 'cors';
import http from 'http';
import express, { Application } from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import logger from 'morgan';
import router from './routes';
import mongoose from 'mongoose';
import 'dotenv/config';
import helmet from 'helmet';

const app: Application = express();

app.use(
  cors({
    credentials: true,
  })
);
app.use(helmet());
app.use(logger('dev'));
app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(`/api/v1`, router());
const server = http.createServer(app);
const port = process.env['PORT'] || '8080';
server.listen(port, async () => {
  try {
    await mongoose.connect(process.env['MONGO_URL'] as string);
    console.log(`Server running on http://localhost:${port} ✨`);
    console.log('Mongo connected 🦄');
  } catch (error) {
    console.log(error);
    process.exit();
  }
});
process.on('SIGINT', () => {
  process.exit();
});

export default app;
