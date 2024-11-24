import { NextFunction, Request, Response } from 'express';
import Users, { User } from '../../models/user';
import { StatusCodes } from 'http-status-codes';

const register = async (_req: Request, res: Response, next: NextFunction) => {
  const { username, password, firstName, lastName } = _req.body;
  //Maybe add a validation layer later.
  const isNotValid = !username || !password || !firstName || !lastName;
  if (isNotValid) {
    return next(
      res.status(400).json({
        error:
          'Bad request you forgot to provide username, password or your fullname',
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
  res.status(StatusCodes.CREATED).json(user);
  //Should I make a service for bcrypt or just do it?

  // res.send('Login Successful');
};

const login = async (_req: Request, res: Response) => {
  res.send('Login Successful');
};

export { login, register };
