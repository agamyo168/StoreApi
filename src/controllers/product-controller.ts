import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

export const createProduct = async (_req: Request, res: Response) => {
  res
    .status(StatusCodes.OK)
    .json({ success: true, result: 'Product Created !' });
};
export const getProducts = async (_req: Request, res: Response) => {
  res
    .status(StatusCodes.OK)
    .json({ success: true, result: 'All Products retrieved !' });
};

export const getProductById = async (_req: Request, res: Response) => {
  res
    .status(StatusCodes.OK)
    .json({ success: true, result: 'Product retrieved !' });
};
