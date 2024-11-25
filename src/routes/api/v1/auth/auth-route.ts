import { Router } from 'express';
import { login, register } from '../../../../controllers/auth/auth';

const router = Router();
router.route('/auth/login').post(login);
router.route('/auth/register').post(register);

export default router;