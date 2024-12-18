import { Router } from 'express';
import {
  createUser,
  getIndex,
  getUserById,
} from '../../../controllers/user.controller';
import authHandler from '../../../middlewares/auth-handler';
const router = Router();
router.route('/user').all(authHandler);
router.route('/user/').get(getIndex).post(createUser);
router.route('/user/:id').get(getUserById);

export default router;
