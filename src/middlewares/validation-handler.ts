import { NextFunction, Request, RequestHandler, Response } from 'express';
import Joi from 'joi';
import BadRequestError from '../errors/bad-request-error';

const validateBodyHandler = (schema: Joi.ObjectSchema): RequestHandler => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body);
    if (error) {
      return next(new BadRequestError(`${error}`));
    }
    next();
  };
};
const validateQueryHandler = (schema: Joi.ObjectSchema): RequestHandler => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.query);
    if (error) {
      return next(new BadRequestError(`${error}`));
    }
    next();
  };
};
const validateParamHandler = (schema: Joi.ObjectSchema): RequestHandler => {
  return async (req: Request, res: Response, next: NextFunction) => {
    console.log(req.params);

    const { error } = schema.validate(req.params);
    if (error) {
      return next(new BadRequestError(`${error}`));
    }
    next();
  };
};

export { validateBodyHandler, validateParamHandler, validateQueryHandler };
