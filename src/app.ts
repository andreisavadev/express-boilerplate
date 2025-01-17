import bodyParser from 'body-parser';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import xss from 'x-xss-protection';
import cookieParser from 'cookie-parser';
import rateLimit from 'express-rate-limit';
import winston from 'winston';
import expressWinston from 'express-winston';
import v1Routes from './routes/v1';
import { notFoundHandler } from './middleware/not-found';
import { errorHandler } from './middleware/error-handler';
import { db } from './utils/db.server';

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

app.use(
  expressWinston.logger({
    transports: [new winston.transports.Console()],
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.json()
    ),
    meta: false,
    msg: 'HTTP {{req.method}} {{req.url}}',
    colorize: true,
  })
);


// V1 Routes
app.use('/api/v1', v1Routes);

// Not found routes middleware
app.use(notFoundHandler as any);

// Error handler middleware
app.use(errorHandler as any);

// Disconnect database on shutdown
process.on('SIGINT', async () => {
  await db.$disconnect();
  process.exit(0);
});

export default app;

