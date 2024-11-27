import Users, { User } from '../models/user.model';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

class AuthenticationService {
  static verifyCredentialsAndCreateToken = async (
    user: User
  ): Promise<string> => {
    const userHit = await Users.findByName(user.username);
    if (userHit) {
      const isValid = await bcrypt.compare(
        user.password + process.env.BCRYPT_SECRET_PASS,
        userHit.password
      );
      if (isValid) {
        const token = this.createToken(userHit);
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
  static verifyToken = async (token: string) => {
    const decoded = await jwt.verify(token, String(process.env.JWT_SECRET));
    //TODO: Remove this later.
    // console.log('Decoded payload:', decoded);
    return decoded;
  };
  // static decode = (token: string) => {
  //   return jwt.decode(token);
  // };
}

export default AuthenticationService;
