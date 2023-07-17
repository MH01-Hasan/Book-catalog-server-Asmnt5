"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookValidation = void 0;
const zod_1 = require("zod");
const addBookSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({
            required_error: 'Name is required',
        }),
        author: zod_1.z.string({
            required_error: 'Author is required',
        }),
        genre: zod_1.z.string({
            required_error: 'Genre is required',
        }),
        summary: zod_1.z.string({
            required_error: 'summary is required',
        }),
        publicationDate: zod_1.z.string({
            required_error: 'Publication Date is required',
        }),
        banner: zod_1.z.string({
            required_error: 'Banner is required',
        }),
        user: zod_1.z.string({
            required_error: 'User is required',
        }),
    }),
});
exports.BookValidation = {
    addBookSchema,
};
