import { Request, Response, NextFunction } from 'express';
import { sendResponse } from '@/utils/responseHandler';

export const notFoundHandler = (
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  const notFoundMessage = {
    Requested_URL: req.originalUrl,
    success: false,
    erro: 'Error 404 - Not Found',
  };
  return sendResponse.notFound(res, notFoundMessage);
};
