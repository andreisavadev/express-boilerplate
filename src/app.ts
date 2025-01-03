import bodyParser from 'body-parser';
import express, { NextFunction, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import xss from 'x-xss-protection';
import cookieParser from 'cookie-parser';
import rateLimit from 'express-rate-limit';
import v1Routes from './routes/v1';
import { notFoundHandler } from './middleware/not-found';
import { errorHandler } from './middleware/error-handler';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  })
);
app.use(helmet());
app.use(xss());
app.use(cookieParser());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

app.use(limiter);

app.use('/api/v1', v1Routes);

app.use(notFoundHandler as any);

app.use(errorHandler as any);

export default app;
