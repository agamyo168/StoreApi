import Users, { User } from '../../models/user';

describe('Testing User DB Queries', () => {
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
  //Test creating duplicate username:
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
  it('should return a user given a valid username.', async () => {
    const result = await Users.findByName('test');
    expect(result.username).toBe('test');
  });
  it('should return undefined given a none existing username.', async () => {
    const result = await Users.findByName('invalid');
    expect(result === undefined).toBe(true);
  });
});
