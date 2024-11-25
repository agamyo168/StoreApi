import { Router } from 'express';
import {
  deleteUser,
  getIndex,
  getUserById,
} from '../../../controllers/user-controller';
import authHandler from '../../../middlewares/auth-handler';
const router = Router();
router.route('/user').all(authHandler);
router.route('/user/').get(getIndex);
router.route('/user/:id').get(getUserById).delete(deleteUser).put();

export default router;
