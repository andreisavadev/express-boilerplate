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
