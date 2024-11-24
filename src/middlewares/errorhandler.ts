import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import CustomError from '../errors/custom-error';
const errorHandlerMiddleware = (
  err: CustomError,
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  const status = err?.status || StatusCodes.INTERNAL_SERVER_ERROR;
  const message = err.message || 'Internal server error try again later.';
  return next(
    res.status(status).json({
      success: false,
      message,
    })
  );
};

export default errorHandlerMiddleware;
