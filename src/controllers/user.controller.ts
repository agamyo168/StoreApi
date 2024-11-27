import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import Users, { User } from '../models/user.model';
import BadRequestError from '../errors/bad-request-error';
import AuthenticationService from '../services/authentication-service';

export const getIndex = async (_req: Request, res: Response) => {
  const allUsers: User[] = await Users.findAll();
  res.status(StatusCodes.OK).json({ success: true, result: allUsers });
};

export const getUserById = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = _req.params;
  if (!id) {
    return next(new BadRequestError('Please provide an id'));
  }
  const user: User = await Users.findById(id);
  res.status(StatusCodes.OK).json({ success: true, result: user });
};

export const createUser = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
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

export const deleteUser = async (_req: Request, res: Response) => {
  const { id } = _req.params;
  await Users.removeById(id);
  res.status(StatusCodes.OK).json({ success: true, message: 'User removed!' });
};

// export const updateUser = async (_req: Request, res: Response) => {
//   res.status(StatusCodes.CREATED).send({ message: 'Updated a user!' });
// };

// replaced with register endpoint cause why?
// export const createUser = async (_req: Request, res: Response) => {
//   res
//     .status(StatusCodes.CREATED)
//     .send({ message: 'Created a new user!', token: 'asdasd' });
// };
