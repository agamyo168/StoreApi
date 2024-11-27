import supertest from 'supertest';
import app from '../app';
import { StatusCodes } from 'http-status-codes';
import Users from '../models/user.model';

const request = supertest(app);
describe('Testing endpoints: ', () => {
  it(`should return ${StatusCodes.NOT_FOUND} for accessing invalid url`, async () => {
    const res = await request.get('/invalid-url');
    expect(res.status).toBe(StatusCodes.NOT_FOUND);
  });
});

describe('Testing AuthenticationService endpoints: ', () => {
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
  afterAll(async () => {
    await Users.removeByName(genericUser.username);
  });
  it(`should return ${StatusCodes.CREATED} for a generic test user sign up`, async () => {
    const res = await request.post('/api/v1/auth/register').send(genericUser);
    expect(res.status).toBe(StatusCodes.CREATED);
    expect(res.body.success).toBe(true);
  });
  it(`should return ${StatusCodes.BAD_REQUEST} for providing an already used username`, async () => {
    const res = await request.post('/api/v1/auth/register').send(genericUser);
    expect(res.status).toBe(StatusCodes.BAD_REQUEST);
    expect(res.body.success).toBe(false);
  });
  it(`should give ${StatusCodes.OK} for a valid test user login`, async () => {
    const res = await request
      .post('/api/v1/auth/login')
      .send({ username: genericUser.username, password: genericUser.password });
    expect(res.status).toBe(StatusCodes.ACCEPTED);
    expect(res.body.success).toBe(true);
  });
  it(`should give ${StatusCodes.UNAUTHORIZED} for a fake user login`, async () => {
    const res = await request
      .post('/api/v1/auth/login')
      .send({ username: fakeUser.username, password: fakeUser.password });
    expect(res.status).toBe(StatusCodes.UNAUTHORIZED);
    expect(res.body.success).toBe(false);
  });
});
