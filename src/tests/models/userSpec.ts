import Users, { User } from '../../models/user';

describe('Testing User DB Queries', () => {
  //Test creating duplicate username? I'm already validating on register controller.
  it('should return the same input username for creating a user if success.', async () => {
    const user: User = {
      username: 'create_db',
      password: 'test',
      firstName: 'test',
      lastName: 'test',
    };
    const result = await Users.create(user);
    expect(result.username).toEqual('create_db');
  });
  //Test findByName:
  it('should return a user given a valid username.', async () => {
    const result = await Users.findByName('test');
    expect(result.username).toBe('test');
  });
  it('should return undefined given a none existing username.', async () => {
    const result = await Users.findByName('invalid');
    expect(result === undefined).toBe(true);
  });
  //Test findAll:
  it('should return an array of users', async () => {
    const result = await Users.findAll();
    expect(result.length).toBeGreaterThanOrEqual(1);
  });
  //Test findById:
  it('should return true for a given valid user.id', async () => {
    const result = await Users.findById(1);
    expect(result === undefined).toBe(false);
  });
  it('should return false for a given invalid user id', async () => {
    const result = await Users.findById(99);
    expect(result === undefined).toBe(true);
  });
});
