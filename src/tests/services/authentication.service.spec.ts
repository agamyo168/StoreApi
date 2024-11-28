import { JwtPayload } from 'jsonwebtoken';
import Users from '../../models/user.model';
import AuthenticationService from '../../services/authentication.service';
import { User } from '../../types';

describe('Authentication Service ->', () => {
  const testUser: User = {
    id: 1,
    username: 'testUser',
    password: 'testPassword',
    firstName: 'testFirstName',
    lastName: 'testLastName',
  };
  const fakeUser: User = {
    id: 2,
    username: 'fakeUser',
    password: 'testPassword',
    firstName: 'testFirstName',
    lastName: 'testLastName',
  };
  beforeAll(async () => {
    await Users.create(testUser);
  });
  //clean up after all scenarios
  afterAll(async () => {
    await Users.reset();
  });

  describe('Check that methods exist', () => {
    it('should have authenticate method', () => {
      expect(AuthenticationService.authenticate).toBeDefined();
    });
    it('should have createToken method', () => {
      expect(AuthenticationService.createToken).toBeDefined();
    });
    it('should have verifyToken method', () => {
      expect(AuthenticationService.verifyToken).toBeDefined();
    });
    it('should have isAvailable method', () => {
      expect(AuthenticationService.isAvailable).toBeDefined();
    });
  });

  describe('Authenticate a login, token creation and token verification.', () => {
    it('When a user logs in with valid credentials, it should return a token.', async () => {
      //Act
      const token = await AuthenticationService.authenticate(testUser);
      const payload = AuthenticationService.verifyToken(token) as JwtPayload;
      //Assert
      expect(token).toMatch(/\S+\.\S+\.\S+/); // Check if the token has three parts
      expect({
        name: payload.name,
        id: payload.id,
      }).toEqual({
        name: testUser.username,
        id: testUser.id,
      });
    });
    it('When a user logs in with fake credentials, it should throw an error"', async () => {
      try {
        await AuthenticationService.authenticate(fakeUser);
        fail('it should throw an error');
      } catch (err) {
        expect(`${err}`).toBe('Error: invalid username or password');
      }
    });
  });
});
