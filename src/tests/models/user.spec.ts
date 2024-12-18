import Users from '../../models/user.model';
import { User } from '../../types';
import dotenv from 'dotenv';

dotenv.config();

describe('User Model ->', () => {
  describe('Check that methods exist', () => {
    it('should have a findAll method', () => {
      expect(Users.findAll).toBeDefined();
    });

    it('should have a findById method', () => {
      expect(Users.findById).toBeDefined();
    });

    it('should have a create method', () => {
      expect(Users.create).toBeDefined();
    });
  });

  //clean up after all scenarios
  afterAll(async () => {
    await Users.reset();
  });

  const testUser: User = {
    id: 1,
    username: 'testUser',
    password: 'testPassword',
    firstName: 'testFirstName',
    lastName: 'testLastName',
  };
  const { password: _password, ...expectedUser } = testUser;
  describe('Create a new user', () => {
    it('should return a user object for creating a new user.', async () => {
      //Arrange:

      //Act
      const result = await Users.create(testUser);
      //Assert
      expect(result).toEqual(expectedUser as User);
    });
  });

  describe('Finding a user', () => {
    it('findAll should return an array of users', async () => {
      //Arrange:
      const result = await Users.findAll();
      expect(result.length).toBe(1);
      expect(result[0].id).toEqual(expectedUser.id);
    });
    it('findByName should return a user given a valid username.', async () => {
      const result = await Users.findByName('testUser');
      expect({ ...result, password: 'x' }).toEqual({
        password: 'x',
        ...expectedUser,
      } as User);
    });
    it('findByName should return undefined given a none existing username.', async () => {
      const result = await Users.findByName('fakeUser');
      expect(result === undefined).toBe(true);
    });
    //Test findById:
    it('findById should return a valid user given a valid user id', async () => {
      const result = await Users.findById(testUser.id);
      expect({ ...result, password: 'x' }).toEqual({
        password: 'x',
        ...expectedUser,
      } as User);
    });
    it('findById should return undefined given an invalid user id', async () => {
      const result = await Users.findById(99);
      expect(result === undefined).toBe(true);
    });
  });
});
