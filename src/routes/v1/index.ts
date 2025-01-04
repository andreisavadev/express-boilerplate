import express from 'express';
import pingRoute from './ping.route';
import authRoute from './auth.route';

const router = express.Router();

router.use('/ping', pingRoute);
router.use('/auth', authRoute);

export default router;
