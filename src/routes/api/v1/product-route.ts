import { Router } from 'express';
import {
  createProduct,
  getProductById,
  getProducts,
} from '../../../controllers/product.controller';
import authHandler from '../../../middlewares/auth-handler';

const productRoute = Router();
productRoute
  .route('/products')
  .get(getProducts)
  .post(authHandler, createProduct);
productRoute.route('/products/:id').get(getProductById);
export default productRoute;
