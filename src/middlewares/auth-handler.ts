import { NextFunction, Request, Response } from 'express';
import NotAuthorized from '../errors/not-authorized-error';
import AuthenticationService from '../services/authentication.service';

const authHandler = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHead = _req.headers.authorization;
  if (!authHead || !authHead.startsWith('Bearer')) {
    return next(new NotAuthorized('Unauthorized'));
  }
  const token = authHead.split(' ')[1];
  try {
    const payload = await AuthenticationService.verifyToken(token);
    res.locals.user = payload;
  } catch (err) {
    return next(new NotAuthorized(`Token verification failed: ${err}`));
  }
  next();
};
export default authHandler;
