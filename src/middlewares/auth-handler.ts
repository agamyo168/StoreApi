import { NextFunction, Request, Response } from 'express';
import NotAuthorized from '../errors/not-authorized-error';

const authHandler = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHead = _req.headers.authorization;
  if (!authHead || !authHead.startsWith('Bearer')) {
    return next(new NotAuthorized('Unauthorized'));
  }
  next();
};
export default authHandler;
