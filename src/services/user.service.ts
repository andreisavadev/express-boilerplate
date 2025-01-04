import { TUserUpdateSchema } from '@/types/user';
import { db } from '@/utils/db.server';
import { User } from '@prisma/client';

export const getUserByEmail = async (
  email: string
): Promise<Omit<User, 'createdAt' | 'updatedAt'>> => {
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

export const getUserByID = async (
  id: string
): Promise<Omit<User, 'password' | 'createdAt' | 'updatedAt'>> => {
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

export const updateUserByID = async (id: string, data: TUserUpdateSchema) => {
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
