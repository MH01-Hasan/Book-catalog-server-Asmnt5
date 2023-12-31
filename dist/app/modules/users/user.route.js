"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("./user.controller");
const router = express_1.default.Router();
router.get('/:id', user_controller_1.UserController.getUserById);
router.patch('/:id', user_controller_1.UserController.updateUser);
router.patch('/:id/wishlist', user_controller_1.UserController.updateUserWishlist);
router.get('/:id/wishlist', user_controller_1.UserController.allWishlist);
exports.UserRoutes = router;
