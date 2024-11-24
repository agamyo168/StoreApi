import { NextFunction, Request, Response } from 'express';
import Users, { User } from '../../models/user';
import { StatusCodes } from 'http-status-codes';

const register = async (_req: Request, res: Response, next: NextFunction) => {
  const { username, password, firstName, lastName } = _req.body;
  //Maybe add a validation layer later.
  const isNotValid = !username || !password || !firstName || !lastName;
  if (isNotValid) {
    return next(
      res.status(StatusCodes.BAD_REQUEST).json({
        error:
          'Bad request: You need to provide username, password and your fullname',
      })
    );
  }
  //I should now create a user:User object prepare the date and stuff?
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
      res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        error: "Bad request: you didn't provide username or password",
      })
    );
  }
  // const user: User = await Users.findByName(username);
  const token = 'a valid token';
  res
    .status(StatusCodes.ACCEPTED)
    .json({ success: true, username: 'name', id: 'id', token });
};

export { login, register };
