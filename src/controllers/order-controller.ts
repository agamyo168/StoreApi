import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

// export const createOrder = async (_req: Request, res: Response) => {
//   res
//     .status(StatusCodes.CREATED)
//     .json({ success: true, result: 'Created a new order' });
// };
export const getUserOrder = async (_req: Request, res: Response) => {
  const { id, name } = res.locals.user;
  console.log(id, name);
  res
    .status(StatusCodes.OK)
    .json({ success: true, result: 'Retrieved user order' });
};
export const getCompletedOrders = async (_req: Request, res: Response) => {
  res
    .status(StatusCodes.OK)
    .json({ success: true, result: 'Retrieved all completed orders' });
};
export const postProductOrder = async (_req: Request, res: Response) => {
  res
    .status(StatusCodes.OK)
    .json({ success: true, result: 'Product was added to your order!' });
};
// export const getOrderById = async (_req: Request, res: Response) => {
//   res
//     .status(StatusCodes.OK)
//     .json({ success: true, result: 'Retrieved a single order' });
// };
