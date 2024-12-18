import { NextFunction, Request, Response } from 'express';
import BadRequestError from '../errors/bad-request-error';
import AuthenticationService from '../services/authentication.service';
import { User } from '../types';
import Users from '../models/user.model';
import { StatusCodes } from 'http-status-codes';
import NotAuthorized from '../errors/not-authorized-error';

const register = async (_req: Request, res: Response, next: NextFunction) => {
  const { username, password, firstName, lastName } = _req.body;
  //Maybe add a validation layer later.
  const isNotValid = !username || !password || !firstName || !lastName;
  if (isNotValid) {
    return next(
      new BadRequestError(
        'Bad request: you did not provide either username, password, firstname or lastname'
      )
    );
  }
  //Need way too many validations -> not_empty. [3, 20] chars.
  //Unique user:
  const isAvailable = await AuthenticationService.isAvailable(username);
  if (!isAvailable) {
    return next(
      new BadRequestError('Bad request: this username already exists')
    );
  }

  const user: User = await Users.create({
    username,
    password,
    firstName,
    lastName,
  });

  res.status(StatusCodes.CREATED).json({ success: true, ...user });
};

const login = async (_req: Request, res: Response, next: NextFunction) => {
  const { username, password } = _req.body;
  const isNotValid = !username || !password;
  if (isNotValid) {
    return next(
      new BadRequestError(
        "Bad request: you didn't provide username or password"
      )
    );
  }
  const user: User = { username, password };
  try {
    const token = await AuthenticationService.authenticate(user);
    res.status(StatusCodes.OK).json({ success: true, token });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (_err) {
    // console.error(`${err}`);
    return next(new NotAuthorized(`Token verification error.`));
  }
};

export { login, register };
