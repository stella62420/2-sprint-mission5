import { Router } from 'express';
import { authenticateUser } from '../middleware/auth';
import * as controller from './productsController';

const router = Router();

router.get('/', controller.getProductList);
router.get('/:id', controller.getProductDetail);

router.post('/', authenticateUser, controller.createProduct);
router.patch('/:id', authenticateUser, controller.updateProduct);
router.delete('/:id', authenticateUser, controller.removeProduct);

router.post('/:id/likes', authenticateUser, controller.addProductLike);
router.delete('/:id/likes', authenticateUser, controller.removeProductLike);

export default router;
