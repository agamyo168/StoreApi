import supertest from 'supertest';
import app from '../app';
import { StatusCodes } from 'http-status-codes';

const request = supertest(app);
describe('Testing API endpoints', () => {
  it(`should return ${StatusCodes.NOT_FOUND} for invalid url`, async () => {
    const res = await request.get('/invalid-url');
    expect(res.status).toBe(StatusCodes.NOT_FOUND);
  });
});
