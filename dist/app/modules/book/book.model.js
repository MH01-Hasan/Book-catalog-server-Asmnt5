"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const bookSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    publicationDate: {
        type: Date,
        required: true,
    },
    genre: {
        type: String,
        required: true,
    },
    summary: {
        type: String,
        required: true,
    },
    banner: {
        type: String,
        required: true,
    },
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
}, {
    timestamps: true,
});
const Book = (0, mongoose_1.model)('Book', bookSchema);
exports.default = Book;
