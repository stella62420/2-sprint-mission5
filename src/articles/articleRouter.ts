import express from 'express';
import multer from 'multer';
import { withAsync } from '../lib/withAsync';
import { authenticateUser, optionalAuthenticateUser } from '../middleware/auth';
import {
  createArticle,
  getArticle,
  updateArticle,
  deleteArticle,
  getArticleList,
  addArticleLike,
  removeArticleLike,
} from './articleController';

const articlesRouter = express.Router();

const upload = multer({ dest: 'uploads/' });

articlesRouter.post('/', authenticateUser, withAsync(createArticle));
articlesRouter.get('/:id', optionalAuthenticateUser, withAsync(getArticle));
articlesRouter.patch('/:id', authenticateUser, withAsync(updateArticle));
articlesRouter.delete('/:id', authenticateUser, withAsync(deleteArticle));
articlesRouter.get('/', optionalAuthenticateUser, withAsync(getArticleList));
articlesRouter.post('/:id/likes', authenticateUser, withAsync(addArticleLike));
articlesRouter.delete('/:id/likes', authenticateUser, withAsync(removeArticleLike));

export default articlesRouter;
