import { Response } from 'express';
import HttpStatusCode from './http-status-code';

interface SuccessResponse<T> {
  success: true;
  data: T;
}

interface ErrorResponse<T> {
  success: false;
  error: {
    message: T;
  };
}

// Success response with data
const success = <T>(
  res: Response,
  data: T,
  status = HttpStatusCode.OK
): Response<SuccessResponse<T>> => {
  return res.status(status).json({ success: true, data });
};

// Success response without data (e.g. for delete operations)
const successNoData = (
  res: Response,
  message = 'Operation successful',
  status = HttpStatusCode.OK
): Response<SuccessResponse<null>> => {
  return res.status(status).json({ success: true, message });
};

// Error response
const error = <T>(
  res: Response,
  message: T,
  status = HttpStatusCode.INTERNAL_SERVER_ERROR
): Response<ErrorResponse<T>> => {
  return res.status(status).json({ success: false, error: { message } });
};

// Not found response
const notFound = <T>(
  res: Response,
  message: T,
  status = HttpStatusCode.NOT_FOUND
): Response<ErrorResponse<T>> => {
  return res.status(status).json({ success: false, error: { message } });
};

// Validation error response
const validationError = <T>(
  res: Response,
  message: T,
  errors: string[],
  status = HttpStatusCode.BAD_REQUEST
): Response<ErrorResponse<T>> => {
  return res.status(status).json({
    success: false,
    error: {
      message: message,
      errors: errors,
    },
  });
};

// Unauthorized response
const unauthorized = <T>(
  res: Response,
  message = 'Unauthorized',
  status = HttpStatusCode.UNAUTHORIZED
): Response<ErrorResponse<T>> => {
  return res.status(status).json({ success: false, error: { message } });
};

// Forbidden response
const forbidden = <T>(
  res: Response,
  message = 'Forbidden',
  status = HttpStatusCode.FORBIDDEN
): Response<ErrorResponse<T>> => {
  return res.status(status).json({ success: false, error: { message } });
};

// Bad request response
const badRequest = <T>(
  res: Response,
  message: T,
  status = HttpStatusCode.BAD_REQUEST
): Response<ErrorResponse<T>> => {
  return res.status(status).json({ success: false, error: { message } });
};

export const sendResponse = {
  success,
  successNoData,
  error,
  notFound,
  validationError,
  unauthorized,
  forbidden,
  badRequest,
};
