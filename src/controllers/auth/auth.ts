import { NextFunction, Request, Response } from 'express';
import Users, { User } from '../../models/user';
import { StatusCodes } from 'http-status-codes';
import Authentication from '../../services/authenticationService';
import BadRequestError from '../../errors/bad-request-error';

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
  const isAvailable = await Authentication.isAvailable(username);
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
  const token = await Authentication.verifyUser(user);
  res.status(StatusCodes.ACCEPTED).json({ success: true, token });
};

export { login, register };
