"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_route_1 = require("../modules/auth/auth.route");
const book_route_1 = require("../modules/book/book.route");
const comment_route_1 = require("../modules/comment/comment.route");
const user_route_1 = require("../modules/users/user.route");
const routes = express_1.default.Router();
const moduleRotes = [
    {
        path: '/users',
        route: user_route_1.UserRoutes,
    },
    {
        path: '/auth',
        route: auth_route_1.AuthRoutes,
    },
    {
        path: '/books',
        route: book_route_1.BookRoutes,
    },
    {
        path: '/comments',
        route: comment_route_1.CommentRoutes,
    },
];
moduleRotes.forEach(route => {
    routes.use(route.path, route.route);
});
exports.default = routes;
