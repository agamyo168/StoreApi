import Users, { User } from '../../models/user.model';

describe('Testing User DB Queries', () => {
  const testUser: User = {
    id: 1,
    username: 'testUser',
    password: 'testPassword',
    firstName: 'tesFirstNamet',
    lastName: 'testLastName',
  };
  afterAll(() => {
    Users.removeByName(testUser.username);
  });
  it('should return the same input username for creating a user if success.', async () => {
    const result = await Users.create(testUser);
    expect(result.username).toEqual('testUser');
  });
  //Test findByName:
  it('should return a user given a valid username.', async () => {
    const result = await Users.findByName('testUser');
    expect(result.username).toBe('testUser');
  });
  it('should return undefined given a none existing username.', async () => {
    const result = await Users.findByName('fakeUser');
    expect(result === undefined).toBe(true);
  });
  //Test findAll:
  it('should return an array of users', async () => {
    const result = await Users.findAll();
    expect(result.length).toBeGreaterThanOrEqual(1);
  });
  //Test findById:
  it('should return true given a valid user id', async () => {
    const result = await Users.findById(testUser.id);
    expect(result === undefined).toBe(false);
  });
  it('should return falsegiven an invalid user id', async () => {
    const result = await Users.findById(99);
    expect(result === undefined).toBe(true);
  });
});
