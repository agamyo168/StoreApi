import { Router } from 'express';
import { getOrder } from '../../../controllers/order-controller';
import authHandler from '../../../middlewares/auth-handler';

const orderRoute = Router();

orderRoute.route('/order/:id').get(authHandler, getOrder);
