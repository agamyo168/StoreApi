import express from 'express';
import dotenv from 'dotenv';
import userRouter from './routes/api/v1/user-route';
import notFoundMiddleware from './middlewares/not-found';
import authRouter from './routes/api/v1/auth/auth-route';
import errorHandlerMiddleware from './middlewares/errorhandler';

dotenv.config();
const app = express();
app.use(express.json());

app.use('/api/v1', authRouter, userRouter);

//Last middleware stack:
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const start = async () => {
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`SERVER IS LISTENING ON PORT:${port}`);
  });
};

start();
export default app;
