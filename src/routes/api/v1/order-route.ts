import { Router } from 'express';
import {
  getCompletedOrders,
  getUserOrder,
} from '../../../controllers/order-controller';
import authHandler from '../../../middlewares/auth-handler';

const orderRoute = Router();
orderRoute.use(authHandler);
orderRoute.route('/order').get(getUserOrder);
orderRoute.route('/order/product/:id').post();
orderRoute.route('/order/complete').get(getCompletedOrders);
export default orderRoute;
