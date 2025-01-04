import { z } from 'zod';
import { User } from '@prisma/client';

// User Base Schema
const userBaseSchema = {
  email: z.string().email({ message: 'invalid email' }),
  password: z
    .string()
    .min(1, { message: 'invalid username or password' })
    .max(50, {
      message: 'invalid username or password',
    }),
};

// User Register Schema
export const userRegisterSchema = z
  .object({
    ...userBaseSchema,
    firstName: z.string().min(1, { message: 'you must provide a first name' }),
    lastName: z.string().min(1, { message: 'you must provide a last name' }),
    password: z
      .string()
      .min(1, { message: 'you must provide a password' })
      .max(50, {
        message: 'password can not be longer than 50 characters',
      }),
    confirmPassword: z
      .string()
      .min(1, { message: 'you must confirm your password' })
      .max(50, {
        message: 'you must confirm your password',
      }),
    role: z.string().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'passwords do not match',
  });

// User Login Schema
export const userLoginSchema = z.object(userBaseSchema);

// User Update Schema
export const userUpdateSchema = z.object({
  ...userBaseSchema,
  firstName: z.string().min(1, { message: 'you must provide a first name' }),
  lastName: z.string().min(1, { message: 'you must provide a last name' }),
  role: z.string().optional(),
});

// Export Types
export type TUserLoginSchema = z.infer<typeof userLoginSchema>;
export type TUserRegisterSchema = z.infer<typeof userRegisterSchema>;
export type TUserUpdateSchema = z.infer<typeof userUpdateSchema>;
export type TUser = Omit<User, 'password' | 'createdAt' | 'updatedAt'>;
export type TUserWithPassword = Omit<User, 'createdAt' | 'updatedAt'>;
