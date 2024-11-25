import Users, { User } from '../../models/user';
import Authentication from '../../services/authenticationService';

describe('Testing Authentication Service', () => {
  const validUser: User = {
    id: 1,
    username: 'validUser',
    password: 'validPassword',
    firstName: 'validFirstName',
    lastName: 'validLastName',
  };
  const fakeUser: User = {
    id: 2,
    username: 'fakeUsername',
    password: 'fakePassword',
    firstName: 'fakeFirstName',
    lastName: 'fakeLastName',
  };
  beforeAll(async () => {
    await Users.create(validUser);
  });
  afterAll(async () => {
    await Users.removeByName(validUser.username);
  });
  it(`should return true for providing a valid credentials `, async () => {
    const isVerified = await Authentication.verifyUser(validUser);
    expect(isVerified === '').toBe(false);
  });

  it(`should return false for providing a fake credentials `, async () => {
    const isVerified = await Authentication.verifyUser(fakeUser);
    expect(isVerified === '').toBe(true);
  });
  it(`should return true for providing a user that doesn't exist in db`, async () => {
    const isAvailable = await Authentication.isAvailable(fakeUser.username);
    expect(isAvailable).toBe(true);
  });
  it(`should return false for providing an already existing username `, async () => {
    const isAvailable = await Authentication.isAvailable(validUser.username);
    expect(isAvailable).toBe(false);
  });
});
