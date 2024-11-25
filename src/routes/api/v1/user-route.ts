import { Router } from 'express';
import { getIndex, getUserById } from '../../../controllers/user-controller';
import authHandler from '../../../middlewares/auth-handler';
const router = Router();

router.route('/user/').get(authHandler, getIndex);
router.route('/user/:id').get(authHandler, getUserById).put().delete();

export default router;
