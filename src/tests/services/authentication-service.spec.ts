import Users, { User } from '../../models/user.model';
import AuthenticationService from '../../services/authentication.service';

describe('Testing AuthenticationService Service', () => {
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
    const isVerified = await AuthenticationService.authenticate(validUser);
    expect(isVerified === '').toBe(false);
  });

  it(`should return an error for providing fake credentials`, async () => {
    try {
      await AuthenticationService.authenticate(fakeUser);
      fail("Didn't throw an error for providing fake crednetials");
    } catch (err) {
      expect(err);
    }
  });
  it(`should return true for providing a user that doesn't exist in db`, async () => {
    const isAvailable = await AuthenticationService.isAvailable(
      fakeUser.username
    );
    expect(isAvailable).toBe(true);
  });
  it(`should return false for providing an already existing username `, async () => {
    const isAvailable = await AuthenticationService.isAvailable(
      validUser.username
    );
    expect(isAvailable).toBe(false);
  });
});
