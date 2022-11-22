import express from 'express';
import { protect } from '../middleware/authMiddleware';
import { createUserAction, readUsersAction, readUserAction, updateUserAction, deleteUserAction } from '../controllers/userController';

const router = express.Router();

// readUsersAction,readUserActionはPublicにする

// GET POST
router.route('/')
    .get(readUsersAction)
    .post(protect, createUserAction);

// GET PUT DELETE     
router.route('/:id')
    .get(readUserAction)
    .put(protect, updateUserAction)
    .delete(protect, deleteUserAction);

export default router;