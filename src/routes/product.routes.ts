import { Router } from 'express';
import { ProductController } from '../controllers/product.controller';
import {
  authenticateUser,
  authorizeRoles,
} from '../middlewares/authenticateUser';
import { RolesEnum } from '../emuns/roles.enum';

const router = Router();
const productController = new ProductController();

router.get('/products', productController.getProducts.bind(productController));
router.post(
  '/products',
  authorizeRoles(RolesEnum.ADMIN),
  authenticateUser,
  productController.createProduct.bind(productController),
);
router.delete(
  '/products/:id',
  authenticateUser,
  authorizeRoles(RolesEnum.ADMIN),
  productController.deleteProduct,
);

export default router;
