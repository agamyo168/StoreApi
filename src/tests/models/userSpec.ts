import Users, { User } from '../../models/user';

describe('Testing User DB Queries', () => {
  it('should return the same input username, firstName, and lastName for creating a user if success.', async () => {
    const user: User = {
      username: 'create_db',
      password: 'test',
      firstName: 'test',
      lastName: 'test',
    };
    const result = await Users.create(user);
    expect(result.username).toEqual('create_db');
  });
});
