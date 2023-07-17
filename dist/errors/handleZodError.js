"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handleZodError = (err) => {
    const errors = err.issues.map((el) => {
        return {
            path: el.path[el.path.length - 1],
            message: el.message,
        };
    });
    const statusCode = 400;
    return {
        statusCode,
        message: 'Validation error',
        errors: errors,
    };
};
exports.default = handleZodError;
