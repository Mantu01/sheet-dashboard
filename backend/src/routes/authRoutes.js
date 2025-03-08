import express from 'express';
import { login, logout, me, register } from '../controllers/authController.js';
import authenticate from '../middleware/auth.js';

const router = express.Router();
router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.get('/me',authenticate,me);

export default router;
