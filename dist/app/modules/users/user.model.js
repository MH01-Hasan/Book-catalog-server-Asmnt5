"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const http_status_1 = __importDefault(require("http-status"));
const config_1 = __importDefault(require("../../../config"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const userSchema = new mongoose_1.Schema({
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
        select: 0,
    },
    wishlist: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'Book',
        },
    ],
    reading: [
        {
            book: {
                type: mongoose_1.Schema.Types.ObjectId,
                required: true,
            },
            stage: {
                type: String,
                required: true,
                enum: ['Reading', 'Reading Soon', 'Finished'],
            },
        },
    ],
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});
// is user exist
userSchema.statics.isUserExist = function (email) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield exports.User.findOne({ email: email }, { email: 1, password: 1 });
    });
};
// is password match
userSchema.statics.isPasswordMatch = function (givenPassword, savedPassword) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield bcrypt_1.default.compare(givenPassword, savedPassword);
    });
};
// pre save hook
userSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        // hash password
        this.password = yield bcrypt_1.default.hash(this.password, Number(config_1.default.bcrypt_salt_rounds));
        // check email exist
        const isExist = yield exports.User.findOne({ email: this.email });
        if (isExist)
            throw new ApiError_1.default(http_status_1.default.CONFLICT, 'Email already exist');
        next();
    });
});
exports.User = (0, mongoose_1.model)('User', userSchema);
