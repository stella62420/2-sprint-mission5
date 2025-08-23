import express from 'express';
import { withAsync } from '../lib/withAsync';
import { authenticateUser, optionalAuthenticateUser } from '../middleware/auth';
import {
  getComment,
  getCommentList,
  createComment,
  updateComment,
  deleteComment,
} from './commentController';

const commentsRouter = express.Router();

commentsRouter.get('/', optionalAuthenticateUser, withAsync(getCommentList));
commentsRouter.get('/:id', optionalAuthenticateUser, withAsync(getComment));
commentsRouter.post('/', authenticateUser, withAsync(createComment));
commentsRouter.patch('/:id', authenticateUser, withAsync(updateComment));
commentsRouter.delete('/:id', authenticateUser, withAsync(deleteComment));

export default commentsRouter;
