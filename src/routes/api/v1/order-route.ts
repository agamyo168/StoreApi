import { Router } from 'express';
import {
  completeOrder,
  getOrderById,
  getOrders,
  postOrder,
} from '../../../controllers/order.controller';
import authHandler from '../../../middlewares/auth-handler';
import {
  validateBodyHandler,
  validateParamHandler,
} from '../../../middlewares/validation-handler';
import {
  orderBodySchema,
  orderParamsSchema,
} from '../../../schema/order.schema';

const orderRoute = Router();
orderRoute
  .route('/orders')
  .post(authHandler, validateBodyHandler(orderBodySchema), postOrder)
  .get(authHandler, getOrders);
orderRoute
  .route('/orders/:orderId')
  .get(authHandler, validateParamHandler(orderParamsSchema), getOrderById);

orderRoute.route('/orders/:orderId/complete').patch(authHandler, completeOrder);
export default orderRoute;
