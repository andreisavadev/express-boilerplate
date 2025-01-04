import appConfig from '@/config/app.config';
import jwt from 'jsonwebtoken';

type TPayload = { id: string };

export const generateToken = (payload: TPayload): string => {
  return jwt.sign(payload, appConfig.jwt.secret, {
    expiresIn: appConfig.jwt.expiresIn,
  });
};

export const verifyToken = (token: string): TPayload => {
  return jwt.verify(token, appConfig.jwt.secret) as TPayload;
};
