import bodyParser from 'body-parser';
import express, { NextFunction, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import xss from 'x-xss-protection';
import cookieParser from 'cookie-parser';
import rateLimit from 'express-rate-limit';
import v1Routes from './routes/v1';
import HttpStatusCode from './utils/HTTPStatusCodes';
import prisma from '@/services/prisma.service';
import { ApiResponseBody } from '@/utils/responseHandler';

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
