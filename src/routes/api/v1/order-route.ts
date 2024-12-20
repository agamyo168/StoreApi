import { Router } from 'express';
import { getOrders, postOrder } from '../../../controllers/order.controller';
import authHandler from '../../../middlewares/auth-handler';

const orderRoute = Router();
orderRoute
  .route('/orders')
  .post(authHandler, postOrder)
  .get(authHandler, getOrders);
export default orderRoute;
