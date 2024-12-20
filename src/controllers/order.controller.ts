import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import Orders, { Order } from '../models/order.model';

const getOrders = async (req: Request, res: Response) => {
  const { id } = res.locals.user;
  const order = await Orders.findAll(id);
  res.status(StatusCodes.OK).json({
    success: true,
    orders: order,
  });
};
const postOrder = async (req: Request, res: Response) => {
  const { id } = res.locals.user;
  const products = req.body;
  const order = await Orders.create({
    userId: id,
    products,
    currentStatus: 'active',
  } as Order);

  res.status(StatusCodes.CREATED).json({
    success: true,
    order: order,
  });
};
const completeOrder = async () => {};

export { completeOrder, getOrders, postOrder };
