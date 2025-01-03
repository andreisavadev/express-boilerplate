import { Prisma } from '@prisma/client';
import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { JsonWebTokenError } from 'jsonwebtoken';
import { sendResponse } from '@/utils/response-handler';
import { logger } from '@/utils/winston';

export const errorHandler = (
  error: any,
  _request: Request,
  response: Response,
  _next: NextFunction
) => {
  // Log the error stack for debugging purposes
  /*
  REPLACE WITH WINSTON
  console.error(error.stack)
  */
  logger.error(error);

  // Handle Zod validation errors
  if (error instanceof z.ZodError) {
    const errors = error.errors.map((e: any) => e.message) as string[];
    return sendResponse.validationError(response, 'Validation Error', errors);
  }

  // Handle known Prisma errors
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    const res =
      process.env.NODE_ENV == 'development'
        ? { error: 'Prisma Error occured', details: error }
        : { error: 'Error occured' };

    return sendResponse.badRequest(response, res);
  }

  // Handle Json Web Token error
  if (error instanceof JsonWebTokenError) {
    const res =
      process.env.NODE_ENV == 'development'
        ? { error: 'Json Web Token Error occured', message: error }
        : { error: 'Error occured' };
    return sendResponse.badRequest(response, res);
  }

  // Handle other types of errors
  const res =
    process.env.NODE_ENV == 'development'
      ? { message: error.message }
      : { message: 'Internal Server Error' };
  return sendResponse.error(response, res);
};
