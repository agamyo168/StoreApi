import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

export const create = async (_req: Request, res: Response) => {
  res
    .status(StatusCodes.CREATED)
    .json({ success: true, result: 'Created a new order' });
};
export const getOrder = async (_req: Request, res: Response) => {
  res
    .status(StatusCodes.OK)
    .json({ success: true, result: 'Retrieved all orders' });
};
export const getOrderById = async (_req: Request, res: Response) => {
  res
    .status(StatusCodes.OK)
    .json({ success: true, result: 'Retrieved a single order' });
};
