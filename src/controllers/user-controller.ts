import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import Users, { User } from '../models/user';

export const getIndex = async (_req: Request, res: Response) => {
  const allUsers: User[] = await Users.findAll();
  res.status(StatusCodes.OK).json({ success: true, result: allUsers });
};

export const getUserById = async (_req: Request, res: Response) => {
  const { id } = _req.params;
  const user: User = await Users.findById(id);
  res.status(StatusCodes.OK).json({ success: true, result: user });
};

export const updateUser = async (_req: Request, res: Response) => {
  res.status(StatusCodes.CREATED).send({ message: 'Updated a user!' });
};

export const deleteUser = async (_req: Request, res: Response) => {
  const { id } = _req.params;
  await Users.removeById(id);
  res.status(StatusCodes.OK).json({ success: true, message: 'User removed!' });
};

// replaced with register endpoint cause why?
// export const createUser = async (_req: Request, res: Response) => {
//   res
//     .status(StatusCodes.CREATED)
//     .send({ message: 'Created a new user!', token: 'asdasd' });
// };
