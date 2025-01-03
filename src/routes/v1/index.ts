import express from 'express';
import pingRoute from './ping.route';

const router = express.Router();

router.use('/ping', pingRoute);

export default router;
