"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const CommentSchema = new mongoose_1.Schema({
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    book: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Book',
        required: true
    },
    comment: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});
const Comment = (0, mongoose_1.model)('Comment', CommentSchema);
exports.default = Comment;
