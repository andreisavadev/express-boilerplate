import { TUser, TUserUpdateSchema, TUserWithPassword } from '@/types/user';
import { db } from '@/utils/db.server';

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
