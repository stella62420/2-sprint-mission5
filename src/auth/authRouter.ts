import express from 'express';
import { withAsync } from '../lib/withAsync';
import { authenticateUser } from '../middleware/auth';
import { register, login, refresh, logout } from './authController';

const authRouter = express.Router();

authRouter.post('/register', withAsync(register));
authRouter.post('/login', withAsync(login));
authRouter.post('/refresh', withAsync(refresh));
authRouter.post('/logout', authenticateUser, withAsync(logout));

export default authRouter;
