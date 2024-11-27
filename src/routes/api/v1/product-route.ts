import { Router } from 'express';
import authHandler from '../../../middlewares/auth-handler';
import {
  createProduct,
  getProductById,
  getProducts,
} from '../../../controllers/product.controller';

const productRoute = Router();
productRoute
  .route('/product')
  .get(getProducts)
  .post(authHandler, createProduct);
productRoute.route('/product/:id').get(getProductById);
export default productRoute;
