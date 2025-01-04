import {
  TUser,
  TUserRegisterSchema,
  TUserUpdateSchema,
  TUserWithPassword,
} from '@/types/user';
import { db } from '@/utils/db.server';

export const createUser = async (
  data: Omit<TUserRegisterSchema, 'confirmPassword'>
): Promise<TUser> => {
  return db.user.create({
    data,
    select: {
      id: true,
      firstName: true,
      lastName: true,
      email: true,
      role: true,
    },
  });
};

export const getUserByEmail = async (
  email: string
): Promise<TUserWithPassword | null> => {
  return db.user.findUnique({
    where: { email },
    select: {
      id: true,
      firstName: true,
      lastName: true,
      email: true,
      password: true,
      role: true,
    },
  });
};

export const getUserByID = async (id: string): Promise<TUser | null> => {
  return db.user.findUnique({
    where: { id },
    select: {
      id: true,
      firstName: true,
      lastName: true,
      email: true,
      role: true,
    },
  });
};

export const updateUserByID = async (
  id: string,
  data: TUserUpdateSchema
): Promise<TUser | null> => {
  return db.user.update({
    where: { id },
    data,
    select: {
      id: true,
      firstName: true,
      lastName: true,
      email: true,
      role: true,
    },
  });
};
