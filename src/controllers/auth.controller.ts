import { NextFunction, Request, Response } from 'express';
import * as UserService from '../services/user.service';
import {
  TUserLoginSchema,
  TUserRegisterSchema,
  userLoginSchema,
  userRegisterSchema,
} from '@/types/user';
import { sendResponse } from '@/utils/response-handler';
import { comparePasswords } from '@/utils/bcrypt-handler';
import { generateToken } from '@/utils/jwt-handler';
import appConfig from '@/config/app.config';

// Create user without login
export const create = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const userRequest: TUserRegisterSchema = request.body;
    const user = await UserService.createUser({
      email: userRequest.email,
      firstName: userRequest.firstName,
      lastName: userRequest.lastName,
      password: userRequest.password,
    });

    return sendResponse.success(response, user);
  } catch (error) {
    next(error);
    return null;
  }
};

// Register user with login
export const register = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const userRequest: TUserRegisterSchema = request.body;
    const user = await UserService.createUser({
      email: userRequest.email,
      firstName: userRequest.firstName,
      lastName: userRequest.lastName,
      password: userRequest.password,
    });

    const token = generateToken({ id: user.id });

    response.cookie('jwt', token, {
      httpOnly: true,
      secure: appConfig.apiEnv !== 'development',
      sameSite: 'strict',
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });

    const responseData = {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
    };
    return sendResponse.success(response, responseData);
  } catch (error) {
    next(error);
    return null;
  }
};

// Login user
export const login = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const userRequest: TUserLoginSchema = request.body;
    const user = await UserService.getUserByEmail(userRequest.email);

    if (!user) {
      return sendResponse.unauthorized(response, 'Credentials Error');
    }

    const passwordCompare = await comparePasswords(
      userRequest.password,
      user.password
    );

    if (passwordCompare) {
      const token = generateToken({ id: user.id });

      response.cookie('jwt', token, {
        httpOnly: true,
        secure: appConfig.apiEnv !== 'development',
        sameSite: 'strict',
        maxAge: 30 * 24 * 60 * 60 * 1000,
      });

      const responseData = {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
      };
      return sendResponse.success(response, responseData);
    } else {
      return sendResponse.unauthorized(response, 'Credentials Error');
    }
  } catch (error: any) {
    next(error);
  }

  return null;
};

// Logout user
export const logout = async (
  _request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    response.cookie('jwt', '', {
      httpOnly: true,
      expires: new Date(0),
    });

    return sendResponse.successNoData(response, 'Logout Successful');
  } catch (error) {
    next(error);
  }
  return null;
};

// Middleware

export const validateLoginData = (
  request: Request,
  _response: Response,
  next: NextFunction
) => {
  try {
    const data = request.body;
    userLoginSchema.parse(data);
    next();
  } catch (error) {
    next(error);
  }
};

export const validateRegisterData = (
  request: Request,
  _response: Response,
  next: NextFunction
) => {
  try {
    const data = request.body;
    userRegisterSchema.parse(data);
    next();
  } catch (error) {
    next(error);
  }
};