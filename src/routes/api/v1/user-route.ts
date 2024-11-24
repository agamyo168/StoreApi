import { Router } from 'express';
import { getIndex, getUserById } from '../../../controllers/userController';
const router = Router();

router.route('/user/').get(getIndex);
router.route('/user/:id').get(getUserById).put().delete();

export default router;
