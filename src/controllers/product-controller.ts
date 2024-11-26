import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import Products, { Product } from '../models/product';
import BadRequestError from '../errors/bad-request-error';

export const createProduct = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  const { category, name, price }: Product = _req.body;
  //Validate:
  if (!category || !name || !price)
    return next(
      new BadRequestError(
        "Body doesn't have either category, name, and or price "
      )
    );
  const result = await Products.create({ category, name, price });
  res.status(StatusCodes.OK).json({ success: true, result: result });
};
export const getProducts = async (_req: Request, res: Response) => {
  const result = await Products.findAll();
  res.status(StatusCodes.OK).json({ success: true, result: result });
};

// export const getProductsByCategory = async (_req: Request, res: Response) => {
//   const { id } = _req.params;
//   const result = await Products.findByCategory(id);
//   res.status(StatusCodes.OK).json({ success: true, result });
// };

export const getProductById = async (_req: Request, res: Response) => {
  const { id } = _req.params;
  const result = await Products.findById(id);
  res.status(StatusCodes.OK).json({ success: true, result: result });
};
