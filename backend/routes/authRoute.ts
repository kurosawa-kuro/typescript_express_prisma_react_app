import express from 'express';
import { registerUserAction, loginUserAction, profileUserAction } from '../controllers/authController';
import { protect } from '../middleware/authMiddleware';
const router = express.Router();

// POST
router.route('/register')
    .post(registerUserAction);

router.route('/login')
    .post(loginUserAction);

router.route('/profile')
    .get(protect, profileUserAction);
export default router;