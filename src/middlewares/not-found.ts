import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

const notFoundMiddleware = async (_req: Request, res: Response) => {
  res
    .status(StatusCodes.NOT_FOUND)
    .json({ message: '404 Oops!! Resource not found' });
};

export default notFoundMiddleware;
