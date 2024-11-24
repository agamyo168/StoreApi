import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

const notFoundMiddleware = async (_req: Request, res: Response) => {
  res.status(StatusCodes.NOT_FOUND).json({ error: '404 Oops!!' });
};

export default notFoundMiddleware;
