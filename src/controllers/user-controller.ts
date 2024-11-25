import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

export const getIndex = async (_req: Request, res: Response) => {
  res.status(StatusCodes.OK).json('Get all Users');
};

export const getUserById = async (_req: Request, res: Response) => {
  res.status(StatusCodes.OK).json('Get user by id');
};

export const updateUser = async (_req: Request, res: Response) => {
  res.status(StatusCodes.CREATED).send({ message: 'Updated a user!' });
};

export const deleteUser = async (_req: Request, res: Response) => {
  res.status(StatusCodes.CREATED).send({ message: 'Deleted a user!' });
};
// replaced with register endpoint cause why?
// export const createUser = async (_req: Request, res: Response) => {
//   res
//     .status(StatusCodes.CREATED)
//     .send({ message: 'Created a new user!', token: 'asdasd' });
// };
