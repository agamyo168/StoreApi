import { StatusCodes } from 'http-status-codes';
import supertest from 'supertest';
import app from '../app';
import Orders from '../models/order.model';
import Products from '../models/product.model';
import Users from '../models/user.model';

const request = supertest(app);

describe('Testing endpoints: ', () => {
  afterAll(async () => {
    await Orders.reset();
    await Products.reset();
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
  let token: string;
  describe('Testing not-found middleware', () => {
    it(`should return ${StatusCodes.NOT_FOUND} for accessing invalid url`, async () => {
      const res = await request.get('/invalid-url');
      expect(res.status).toBe(StatusCodes.NOT_FOUND);
    });
  });

  describe('Testing authentication endpoints: ', () => {
    const ROUTE = '/api/v1/auth/';
    describe(`POST ${ROUTE}register`, () => {
      it(`When registering a new user using unique username, expect status:${StatusCodes.CREATED} and success to be true `, async () => {
        const res = await request
          .post('/api/v1/auth/register')
          .send(genericUser);
        expect(res.status).toBe(StatusCodes.CREATED);
        expect(res.body.success).toBe(true);
      });
      it(`When registering a new user using already used username, expect status:${StatusCodes.CONFLICT} and success to be false`, async () => {
        const res = await request
          .post('/api/v1/auth/register')
          .send(genericUser);
        expect(res.status).toBe(StatusCodes.CONFLICT);
        expect(res.body.success).toBe(false);
      });
    });
    describe(`POST ${ROUTE}login`, () => {
      it(`When logging in with a registered user credentials, expect status:${StatusCodes.OK} and success: true`, async () => {
        const res = await request.post('/api/v1/auth/login').send({
          username: genericUser.username,
          password: genericUser.password,
        });
        token = res.body.token;
        expect(res.status).toBe(StatusCodes.OK);
        expect(token).toMatch(/^[a-zA-Z0-9-_]+.[a-zA-Z0-9-_]+.[a-zA-Z0-9-_]+$/);
        expect(res.body.success).toBe(true);
      });
      it(`When logging in with user credentials that are not registered, expect status:  ${StatusCodes.BAD_REQUEST} and success: false.`, async () => {
        const res = await request
          .post('/api/v1/auth/login')
          .send({ username: fakeUser.username, password: fakeUser.password });
        expect(res.status).toBe(StatusCodes.BAD_REQUEST);
        expect(res.body.success).toBe(false);
      });
    });
  });

  describe('Testing Products Endpoints -->', () => {
    const ROUTE = '/api/v1/products';
    describe(`POST ${ROUTE}/`, () => {
      it(`When trying to create a product without a valid access token, should return ${StatusCodes.UNAUTHORIZED}`, async () => {
        //Arrange
        //Act
        const res = await request.post(ROUTE);
        //Assert
        expect(res.status).toBe(StatusCodes.UNAUTHORIZED);
        expect(res.body.success).toBe(false);
      });
      it(`When trying to create a product providing valid body, it should return ${StatusCodes.CREATED} and the created product body`, async () => {
        //arrange
        const product = {
          name: 'Keyboard',
          price: 100,
          category: 'Electronics',
        };
        const res = await request
          .post(ROUTE)
          .send(product)
          .auth(token, { type: 'bearer' });
        expect(res.status).toBe(StatusCodes.CREATED);
        expect(res.body.result).toEqual({ ...product, id: 1 });
      });
      it(`When trying to create a product providing invalid body, it should return ${StatusCodes.BAD_REQUEST}`, async () => {
        //arrange
        const product = {};
        const res = await request
          .post(ROUTE)
          .send(product)
          .auth(token, { type: 'bearer' });
        expect(res.status).toBe(StatusCodes.BAD_REQUEST);
      });
    });
    describe(`GET ${ROUTE}/`, () => {
      it(`When trying to get all products providing a valid access token, it should return ${StatusCodes.OK} and an array of type Product[]`, async () => {
        //arrange
        const product = {
          name: 'Keyboard',
          price: 100,
          category: 'Electronics',
        };
        const res = await request.get(ROUTE);
        expect(res.status).toBe(StatusCodes.OK);
        expect(res.body.result[0]).toEqual({ ...product, id: 1 });
      });
      //TODO: Filtering products by category
      //TODO: Pagination
      //TODO: Sorting
    });
    describe(`GET ${ROUTE}/:productId`, () => {
      it(`When trying to get a product providing an existing product id`, async () => {
        const product = {
          name: 'Keyboard',
          price: 100,
          category: 'Electronics',
        };
        const res = await request.get(`${ROUTE}/1`);
        expect(res.status).toBe(StatusCodes.OK);
        expect(res.body.result).toEqual({ ...product, id: 1 });
      });
      it(`When trying to get a product providing an non existing product id, it should return status: ${StatusCodes.NOT_FOUND}`, async () => {
        const res = await request.get(`${ROUTE}/99`);
        expect(res.status).toBe(StatusCodes.NOT_FOUND);
      });
      it(`When trying to get a product providing a non numeric parameter, it should return status: ${StatusCodes.BAD_REQUEST}`, async () => {
        const res = await request.get(`${ROUTE}/asde23`);
        expect(res.status).toBe(StatusCodes.BAD_REQUEST);
      });
    });
  });

  describe('Testing Orders Endpoints', () => {
    const ROUTE = '/api/v1/orders';

    describe(`POST ${ROUTE}/`, async () => {
      it(`When adding a new active order, it should return ${StatusCodes.UNAUTHORIZED}`, async () => {
        //arrange:
        const product = {
          id: 1,
          quantity: 1,
        };
        const products = [product];

        const res = await request.post(`${ROUTE}/`).send(products);
        expect(res.status).toBe(StatusCodes.UNAUTHORIZED);
      });
      it(`When adding a new active order, it should return ${StatusCodes.CREATED} and active order's id`, async () => {
        //arrange:
        const product = {
          id: 1,
          quantity: 1,
        };
        const products = [product];

        const res = await request
          .post(`${ROUTE}/`)
          .send(products)
          .auth(token, { type: 'bearer' });
        expect(res.status).toBe(StatusCodes.CREATED);
        expect(res.body.order.id).toBeDefined();
      });
    });
    describe(`POST ${ROUTE}/:orderId/complete`, async () => {
      it(`When completing an active order, it should return status: ${StatusCodes.OK}`, async () => {
        const res = await request
          .post(`${ROUTE}/1`)
          .auth(token, { type: 'bearer' });
        expect(res.status).toBe(StatusCodes.OK);
      });
    });
    describe(`GET ${ROUTE}/`, () => {
      it(`When trying to get all user's orders without providing access token, it should return status: ${StatusCodes.UNAUTHORIZED}`, async () => {
        const res = await request.get(ROUTE);
        expect(res.status).toBe(StatusCodes.UNAUTHORIZED);
      });
      it(`When trying to get all user's orders providing access token, it should return status: ${StatusCodes.OK}`, async () => {
        //arrange
        const product = {
          id: 1,
          name: 'Keyboard',
          price: 100,
          category: 'Electronics',
          quantity: 1,
        };
        const res = await request.get(ROUTE).auth(token, { type: 'bearer' });
        expect(res.status).toBe(StatusCodes.OK);
        expect(res.body.orders[0].orderItems[0]).toEqual(product);
      });
    });
    describe(`GET ${ROUTE}/:orderId`, async () => {
      it(`When trying to get a user's completed order`, async () => {});
    });
    describe(`GET ${ROUTE}/active`, () => {
      it(`When trying to get user's active orders without providing access token, it should return status: ${StatusCodes.UNAUTHORIZED}`, async () => {
        const res = await request.get(`${ROUTE}/active`);
        expect(res.status).toBe(StatusCodes.UNAUTHORIZED);
      });
      it(`When trying to get user's active orders, it should return status: ${StatusCodes.OK} and an array of type Product[]`, async () => {
        //arrange
        const product = {
          name: 'Keyboard',
          price: 100,
          category: 'Electronics',
        };
        const res = await request
          .get(`${ROUTE}/active`)
          .auth(token, { type: 'bearer' });
        expect(res.status).toBe(StatusCodes.OK);
        expect(res.body.products[0]).toEqual(product);
      });
    });
  });
});
