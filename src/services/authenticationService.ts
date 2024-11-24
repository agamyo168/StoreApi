import Users, { User } from '../models/user';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

class Authentication {
  static verifyUser = async (user: User) => {
    const userHit = await Users.findByName(user.username);
    let token = '';
    if (userHit) {
      const isCorrect = await bcrypt.compare(
        user.password + process.env.BCRYPT_SECRET_PASS,
        userHit.password
      );
      if (isCorrect) token = this.createToken(userHit);
      return token;
    }
    return token;
  };
  static isAvailable = async (username: string): Promise<boolean> => {
    const user: User = await Users.findByName(username);
    return user === undefined; //if username is available it should return true.
  };
  static createToken = (user: User) => {
    // const isValid = this.verifyUser();
    // if(isValid){
    const secret = String(process.env.JWT_SECRET);
    return jwt.sign({ name: user.username, id: user.id }, secret, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
    // }
  };
}

export default Authentication;
