import express from 'express';
import multer from 'multer';
import { authenticateUser, optionalAuthenticateUser } from '../middleware/auth';
import { withAsync } from '../lib/withAsync';
import * as PC from './productController';

const router = express.Router();

const upload = multer({ dest: 'uploads/' });

router.post('/', authenticateUser, withAsync(PC.createProduct));
router.get('/:id', optionalAuthenticateUser, withAsync(PC.getProduct));
router.patch('/:id', authenticateUser, withAsync(PC.updateProduct));
router.delete('/:id', authenticateUser, withAsync(PC.deleteProduct));
router.get('/', optionalAuthenticateUser, withAsync(PC.getProductList));
router.post('/:id/likes', authenticateUser, withAsync(PC.addProductLike));
router.delete('/:id/likes', authenticateUser, withAsync(PC.removeProductLike));
export default router;
