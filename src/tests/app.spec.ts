import supertest from 'supertest';
import app from '../app';
import { StatusCodes } from 'http-status-codes';
import Users from '../models/user.model';

const request = supertest(app);
describe('Testing endpoints: ', () => {
  afterAll(async () => {
    await Users.reset();
  });

  const genericUser = {
    id: 1,
    username: 'genericUser',
    password: 'genericPassword',
    firstName: 'genericFirstName',
    lastName: 'genericLastName',
  };
  const fakeUser = {
    id: 1,
    username: 'fakeUser',
    password: 'genericPassword',
    firstName: 'genericFirstName',
    lastName: 'genericLastName',
  };

  describe('Testing not-found middleware', () => {
    it(`should return ${StatusCodes.NOT_FOUND} for accessing invalid url`, async () => {
      const res = await request.get('/invalid-url');
      expect(res.status).toBe(StatusCodes.NOT_FOUND);
    });
  });

  describe('Testing authentication endpoints: ', () => {
    it(`When registering a new user using unique username, expect status:${StatusCodes.CREATED} and success to be true `, async () => {
      const res = await request.post('/api/v1/auth/register').send(genericUser);
      expect(res.status).toBe(StatusCodes.CREATED);
      expect(res.body.success).toBe(true);
    });
    it(`When registering a new user using already used username, expect status:${StatusCodes.BAD_REQUEST} and success to be false`, async () => {
      const res = await request.post('/api/v1/auth/register').send(genericUser);
      expect(res.status).toBe(StatusCodes.BAD_REQUEST);
      expect(res.body.success).toBe(false);
    });

    it(`When logging in with a registered user credentials, expect status:${StatusCodes.OK} and success: true`, async () => {
      const res = await request.post('/api/v1/auth/login').send({
        username: genericUser.username,
        password: genericUser.password,
      });
      expect(res.status).toBe(StatusCodes.OK);
      expect(res.body.success).toBe(true);
    });
    it(`When logging in with user credentials that are not registered, expect status:  ${StatusCodes.UNAUTHORIZED} and success: false.`, async () => {
      const res = await request
        .post('/api/v1/auth/login')
        .send({ username: fakeUser.username, password: fakeUser.password });
      expect(res.status).toBe(StatusCodes.UNAUTHORIZED);
      expect(res.body.success).toBe(false);
    });
  });
});
