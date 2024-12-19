import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';
import BadRequestError from '../errors/bad-request-error';

const validateBodyHandler = (schema: Joi.ObjectSchema) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const { error } = await schema.validateAsync(req.body);
    if (error) {
      return next(new BadRequestError(error));
    }
  };
};

export { validateBodyHandler };
