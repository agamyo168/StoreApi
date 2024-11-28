import Users from '../models/user.model';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../types';

class AuthenticationService {
  static authenticate = async (user: User): Promise<string> => {
    const userFound = await Users.findByName(user.username);
    if (userFound) {
      const password = `${user.password}${process.env.BCRYPT_SECRET_PASS}`;
      const isValid = await bcrypt.compare(
        password,
        userFound.password as string
      );
      if (isValid) {
        const token = this.createToken(userFound);
        return token;
      }
    }
    throw new Error('invalid username or password');
  };
  static isAvailable = async (username: string): Promise<boolean> => {
    const user: User = await Users.findByName(username);
    return user === undefined; //if username is available it should return true.
  };
  static createToken = (user: User) => {
    const secret = String(process.env.JWT_SECRET);
    return jwt.sign({ name: user.username, id: user.id }, secret, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
  };
  static verifyToken = (token: string) => {
    const decoded = jwt.verify(token, String(process.env.JWT_SECRET));
    return decoded;
  };
  // static decode = (token: string) => {
  //   return jwt.decode(token);
  // };
}

export default AuthenticationService;
