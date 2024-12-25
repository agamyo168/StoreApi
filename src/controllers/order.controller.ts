import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import NotFound from '../errors/not-found-error';
import Orders from '../models/order.model';
import { CurrentStatus, Order } from '../types/order.type';
import logger from '../utils/logger';

const getOrders = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = res.locals.user;
  const { status, page } = req.query;
  const limit = 10;
  const offset = (Number(page) - 1) * limit;
  let currentStatus: CurrentStatus | undefined;
  switch (status) {
    case 'active':
      currentStatus = CurrentStatus.ACTIVE;
      break;
    case 'complete':
      currentStatus = CurrentStatus.COMPLETE;
      break;
    default:
      currentStatus = undefined;
  }
  try {
    const orders = await Orders.findAll({
      where: { userId: Number(id), currentStatus },
      offset,
      limit,
    });
    res.status(StatusCodes.OK).json({
      success: true,
      orders,
    });
  } catch (error) {
    logger.error(error);
    return next(new Error('Failed to find all orders'));
  }
};
const getOrderById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = res.locals.user;
  const { orderId } = req.params;
  try {
    const order = await Orders.findAll({
      where: { id: Number(orderId), userId: Number(id) },
    });
    if (order.length == 0) {
      next(new NotFound(`There's no product with the id: ${orderId}`));
    }
    res.status(StatusCodes.OK).json({
      success: true,
      order: order[0],
    });
  } catch (error) {
    logger.error(error);
    return next(new Error('Failed to find an order'));
  }
};
const postOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = res.locals.user;
    const { products } = req.body;
    const order = await Orders.create({
      userId: id,
      products,
      currentStatus: 'active',
    } as Order);

    res.status(StatusCodes.CREATED).json({
      success: true,
      order: order,
    });
  } catch (err) {
    logger.error(err);
    return next(new Error('Failed to post order'));
  }
};
const completeOrder = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { orderId } = _req.params;
    const { id } = res.locals.user;
    const order = await Orders.completeOrder(Number(id), Number(orderId));
    if (!order) return next(new NotFound(`There's no such active order`));
    res.status(StatusCodes.OK).json({ success: true, order });
  } catch (err) {
    logger.error(err);
    return next(new Error('Failed to complete an active order'));
  }
};

export { completeOrder, getOrderById, getOrders, postOrder };
