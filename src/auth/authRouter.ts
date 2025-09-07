import express from 'express';
import { withAsync } from '../lib/withAsync';
import { authenticateUser } from '../middleware/auth';
import * as controller from './authController';

const authRouter = express.Router();

type Handler = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => any;

function pickHandler(...names: string[]) {
  for (const n of names) {
    const fn = (controller as any)[n];
    if (typeof fn === 'function') return fn as Handler;
  }
  throw new Error(`[authRouter] handler not implemented: ${names.join(', ')}`);
}

authRouter.post('/register', withAsync(pickHandler('register', 'signup', 'signUp')));
authRouter.post('/signup',   withAsync(pickHandler('signup', 'register', 'signUp')));
authRouter.post('/login',    withAsync(pickHandler('login', 'signin', 'signIn', 'logIn')));

const refresh = (controller as any)['refresh'];
if (typeof refresh === 'function') authRouter.post('/refresh', withAsync(refresh));

const logout = (controller as any)['logout'];
if (typeof logout === 'function')
  authRouter.post('/logout', authenticateUser, withAsync(logout));

export default authRouter;
