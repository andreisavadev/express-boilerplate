import { TUser } from './user';

declare module 'express' {
  interface Request {
    user?: TUser;
  }
}
