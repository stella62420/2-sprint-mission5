import { Router } from 'express';
import { authenticateUser } from '../middleware/auth';
import {
  getArticleList,
  getArticleDetail,
  createArticle,
  updateArticle,
  removeArticle,
} from './articleController';

const router = Router();

router.get('/', getArticleList);
router.get('/:id', getArticleDetail);
router.post('/', authenticateUser, createArticle);
router.patch('/:id', authenticateUser, updateArticle);
router.delete('/:id', authenticateUser, removeArticle);

export default router;
