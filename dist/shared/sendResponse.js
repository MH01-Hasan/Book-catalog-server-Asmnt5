"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_1 = __importDefault(require("http-status"));
const sendResponse = (res, data) => {
    const responseData = {
        statusCode: data.statusCode,
        success: data.success,
        message: data.message || null,
        meta: data.meta || null || undefined,
        data: data.data || null,
    };
    if (!data.data && data.statusCode === http_status_1.default.OK) {
        responseData.success = false;
        responseData.statusCode = http_status_1.default.NO_CONTENT;
        responseData.message = 'No Content Found';
    }
    res.status(data.statusCode).json(responseData);
};
exports.default = sendResponse;
