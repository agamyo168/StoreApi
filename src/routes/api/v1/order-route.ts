import { Router } from 'express';
import { getOrder, getOrderById } from '../../../controllers/order-controller';
import authHandler from '../../../middlewares/auth-handler';

const orderRoute = Router();
orderRoute.use(authHandler);
orderRoute.route('/order').get(getOrder).post();
orderRoute.route('/order/:id').get(getOrderById);
export default orderRoute;
