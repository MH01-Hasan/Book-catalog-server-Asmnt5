import express from 'express';
import { UserController } from './user.controller';

const router = express.Router();

router.get('/:id', UserController.getUserById);
router.patch('/:id', UserController.updateUser);
router.patch('/:id/wishlist', UserController.updateUserWishlist);
router.get('/:id/wishlist', UserController.allWishlist);

export const UserRoutes = router;
