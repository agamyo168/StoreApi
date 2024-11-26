import { Router } from 'express';
import {
  getOrder,
  getOrderById,
  postOrder,
} from '../../../controllers/order-controller';
import authHandler from '../../../middlewares/auth-handler';

const orderRoute = Router();
orderRoute.use(authHandler);
orderRoute.route('/order').get(getOrder).post(postOrder);
orderRoute.route('/order/:id').get(getOrderById);
export default orderRoute;
