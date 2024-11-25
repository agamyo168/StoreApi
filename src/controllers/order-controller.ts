import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

export const getOrder = async (_req: Request, res: Response) => {
  res.status(StatusCodes.OK).json({ success: true, result: 'Order retrieved' });
};
