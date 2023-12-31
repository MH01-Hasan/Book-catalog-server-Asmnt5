"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const globalErrorHandler_1 = __importDefault(require("./app/middlewares/globalErrorHandler"));
const routes_1 = __importDefault(require("./app/routes"));
const express_1 = __importDefault(require("express"));
const http_status_1 = __importDefault(require("http-status"));
const sendResponse_1 = __importDefault(require("./shared/sendResponse"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use('/api/v1/', routes_1.default);
//handle global error
app.use(globalErrorHandler_1.default);
//handle not found
app.use((req, res, next) => {
    (0, sendResponse_1.default)(res, {
        message: 'API Not Found',
        success: false,
        data: {
            url: req.originalUrl,
            method: req.method,
        },
        statusCode: http_status_1.default.NOT_FOUND,
    });
    next();
});
exports.default = app;
