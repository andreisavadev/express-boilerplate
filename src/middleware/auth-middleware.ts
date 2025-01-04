import * as UserService from '../services/user.service';
import { Request, Response, NextFunction } from 'express';
import { sendResponse } from '@/utils/response-handler';
import { verifyToken } from '@/utils/jwt-handler';

const protectAuth = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const allCookies = request.cookies;
  const token = allCookies.jwt;
  if (token) {
    try {
      const decoded = verifyToken(token);
      const authUser = await UserService.getUserByID(decoded.id);
      if (authUser?.email) {
        request.user = authUser;
      }
      next();
    } catch (error) {
      next(error);
    }
  } else {
    return sendResponse.badRequest(
      response,
      'Unauthorized - you need to login'
    );
  }
  return sendResponse.badRequest(response, 'Unauthorized - you need to login');
};

export { protectAuth };
