import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import NotFound from '../errors/not-found-error';
import Products from '../models/product.model';
import { Product } from '../types';
import logger from '../utils/logger';

export const createProduct = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  const { category, name, price }: Product = _req.body;
  try {
    const result = await Products.create({ category, name, price });
    res.status(StatusCodes.CREATED).json({ success: true, result: result });
  } catch (err) {
    logger.error(err);
    return next(new Error(`Couldn't create the product`));
  }
};
export const getProducts = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await Products.findAll();
    res.status(StatusCodes.OK).json({ success: true, result: result });
  } catch (err) {
    logger.error(err);
    return next(new Error(`Couldn't fetch the products`));
  }
};

// export const getProductsByCategory = async (_req: Request, res: Response) => {
//   const { id } = _req.params;
//   const result = await Products.findByCategory(id);
//   res.status(StatusCodes.OK).json({ success: true, result });
// };

export const getProductById = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  const { productId } = _req.params;
  try {
    const result = await Products.findById(productId);
    if (result == undefined) return next(new NotFound(`Product doesn't exist`));
    res.status(StatusCodes.OK).json({ success: true, result: result });
  } catch (err) {
    logger.error(err);
    return next(new Error(`Couldn't find the product`));
  }
};
