import { Router } from 'express';
import {
  createProduct,
  getProductById,
  getProducts,
} from '../../../controllers/product.controller';
import authHandler from '../../../middlewares/auth-handler';
import {
  validateBodyHandler,
  validateParamHandler,
} from '../../../middlewares/validation-handler';
import {
  productBodySchema,
  productParamsSchema,
} from '../../../schema/products.schema';

const productRoute = Router();
productRoute
  .route('/products')
  .get(getProducts)
  .post(authHandler, validateBodyHandler(productBodySchema), createProduct);
productRoute
  .route('/products/:productId')
  .get(validateParamHandler(productParamsSchema), getProductById);
export default productRoute;
