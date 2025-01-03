import { sendResponse } from '@/utils/response-handler';
import express from 'express';

const router = express.Router();

router.get('/', (_req, res) => {
  sendResponse.successNoData(res, 'Pong');
});

export default router;
