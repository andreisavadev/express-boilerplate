import express from 'express';
import * as AuthController from '@/controllers/auth.controller';
import { protectAuth } from '@/middleware/auth-middleware';

const router = express.Router();

// Access: public
// POST: login
// Params body: { email: string, password: string }
router.post(
  '/login',
  AuthController.validateLoginData,
  AuthController.login as any
);

// Access: private
// POST: logout
router.post('/logout', protectAuth as any, AuthController.logout as any);

// Access: private
// Params.body: {email: string, firstName: string, lastName: string, password: string, confirmPassword: string, role?: string}
router.post('/register', AuthController.validateRegisterData,  AuthController.register as any);

router.post('/create', AuthController.validateRegisterData, AuthController.create as any);

export default router;