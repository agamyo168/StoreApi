import { StatusCodes } from 'http-status-codes';
import CustomError from './custom-error';

class NotAuthorized extends CustomError {
  constructor(message: string) {
    super(message, StatusCodes.UNAUTHORIZED);
  }
}
export default NotAuthorized;
