import supertest from 'supertest';
import app from '../app';
import { StatusCodes } from 'http-status-codes';

const request = supertest(app);
describe('Testing API endpoints', () => {
  it(`should return ${StatusCodes.NOT_FOUND} for accessing invalid url`, async () => {
    const res = await request.get('/invalid-url');
    expect(res.status).toBe(StatusCodes.NOT_FOUND);
  });
});

describe('Testing auth API endpoints', () => {
  it(`should return ${StatusCodes.CREATED} for a generic test user sign up`, async () => {
    const res = await request.post('/api/v1/auth/register').send({
      username: 'signup',
      password: 'test',
      firstName: 'test',
      lastName: 'test',
    });
    expect(res.status).toBe(StatusCodes.CREATED);
    expect(res.body.success).toBe(true);
  });
  it(`should return ${StatusCodes.BAD_REQUEST} for providing an already used username`, async () => {
    const res = await request.post('/api/v1/auth/register').send({
      username: 'signup',
      password: 'test',
      firstName: 'test',
      lastName: 'test',
    });
    expect(res.status).toBe(StatusCodes.BAD_REQUEST);
    expect(res.body.success).toBe(false);
  });
  //NOT VALID TEST-> You should be testing this with a user that doesn't rely on the success of register api.
  it(`should give ${StatusCodes.OK} for a valid test user login`, async () => {
    const res = await request
      .post('/api/v1/auth/login')
      .send({ username: 'test', password: 'test' });
    expect(res.status).toBe(StatusCodes.ACCEPTED);
    expect(res.body.success).toBe(true);
  });
});
