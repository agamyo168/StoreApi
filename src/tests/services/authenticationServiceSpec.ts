import { User } from '../../models/user';
import Authentication from '../../services/authenticationService';

describe('Testing Authentication Service', () => {
  it(`should return true for providing a valid credentials `, async () => {
    const user: User = {
      username: 'test',
      password: 'test',
      firstName: 'test',
      lastName: 'test',
    };
    const isVerified = await Authentication.verifyUser(user);
    expect(isVerified === '').toBe(false);
  });
  it(`should return false for providing a bad credentials `, async () => {
    const user: User = {
      username: 'invalid',
      password: 'not_a_user',
      firstName: 'test',
      lastName: 'test',
    };
    const isVerified = await Authentication.verifyUser(user);
    expect(isVerified === '').toBe(true);
  });
  it(`should return true for providing a user that doesn't exist in db`, async () => {
    const isAvailable = await Authentication.isAvailable('fantastic_user');
    expect(isAvailable).toBe(true);
  });
  it(`should return false for providing an already existing username `, async () => {
    const isAvailable = await Authentication.isAvailable('test');
    expect(isAvailable).toBe(false);
  });
});
