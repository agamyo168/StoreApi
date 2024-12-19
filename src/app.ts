import dotenv from 'dotenv';
import express from 'express';
import errorHandlerMiddleware from './middlewares/error-handler';
import notFoundMiddleware from './middlewares/not-found';
import authRouter from './routes/api/v1/auth/auth-route';
import orderRoute from './routes/api/v1/order-route';
import productRoute from './routes/api/v1/product-route';
import userRouter from './routes/api/v1/user-route';
import logger from './utils/logger';

dotenv.config();
const app = express();
app.use(express.json());

app.use('/api/v1', authRouter, userRouter, productRoute, orderRoute);

//Last middleware stack:
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const start = async () => {
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    logger.info(`SERVER IS LISTENING ON PORT:${port}`);
  });
};

start();
export default app;
