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
      username: 'test',
      password: 'test',
      firstName: 'test',
      lastName: 'test',
    });
    expect(res.status).toBe(StatusCodes.CREATED);
    expect(res.body.success).toBe(true);
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
