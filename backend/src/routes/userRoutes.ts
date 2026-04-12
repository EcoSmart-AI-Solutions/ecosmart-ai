import { Router } from 'express';
import {
  forgotPassword,
  resetPassword,
  signIn,
  signUp,
} from '../controllers/authController';

const router = Router();

router.post('/sign-up', signUp);
router.post('/sign-in', signIn);
router.post('/register', signUp);
router.post('/login', signIn);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);

export default router;
