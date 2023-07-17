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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = exports.signUpUser = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const user_model_1 = require("../users/user.model");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../../../config"));
const jwt_1 = require("../../../helpers/jwt");
const bcrypt_1 = __importDefault(require("bcrypt"));
const signUpUser = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.create(data);
    const other = __rest(result.toObject(), []);
    return other;
});
exports.signUpUser = signUpUser;
const loginUser = (loginData) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = loginData;
    const isUserExist = yield user_model_1.User.isUserExist(email);
    if (!isUserExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'User not found');
    }
    const isPasswordMatch = isUserExist.password &&
        (yield user_model_1.User.isPasswordMatch(password, isUserExist.password));
    if (!isPasswordMatch) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, 'Password is incorrect');
    }
    const { email: userEmail } = isUserExist;
    const accessToken = jwt_1.JwtHelper.createToken({
        userEmail,
    }, config_1.default.jwt.secret, config_1.default.jwt.secret_expires_in);
    const refreshToken = jwt_1.JwtHelper.createToken({
        userEmail,
    }, config_1.default.jwt.refresh_secret, config_1.default.jwt.refresh_secret_expires_in);
    return {
        accessToken,
        refreshToken,
    };
});
const refreshToken = (refreshToken) => __awaiter(void 0, void 0, void 0, function* () {
    let verifiedToken;
    try {
        verifiedToken = jwt_1.JwtHelper.verifyToken(refreshToken, config_1.default.jwt.refresh_secret);
    }
    catch (error) {
        throw new ApiError_1.default(http_status_1.default.FORBIDDEN, 'Invalid refresh token');
    }
    const { userEmail } = verifiedToken;
    const isUserExist = yield user_model_1.User.isUserExist(userEmail);
    if (!isUserExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'User not found');
    }
    const newAccessToken = jwt_1.JwtHelper.createToken({
        email: isUserExist.email,
    }, config_1.default.jwt.refresh_secret, config_1.default.jwt.refresh_secret_expires_in);
    return {
        accessToken: newAccessToken,
    };
});
const changePassword = (user, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { oldPassword, newPassword } = payload;
    const isUserExist = yield user_model_1.User.isUserExist(user === null || user === void 0 ? void 0 : user.email);
    if (!isUserExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'User not found');
    }
    const isPasswordMatch = isUserExist.password &&
        (yield user_model_1.User.isPasswordMatch(oldPassword, isUserExist.password));
    if (!isPasswordMatch) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, 'Password is incorrect');
    }
    const newHashedPassword = yield bcrypt_1.default.hash(newPassword, Number(config_1.default.bcrypt_salt_rounds));
    yield user_model_1.User.findOneAndUpdate({ email: user === null || user === void 0 ? void 0 : user.email }, {
        password: newHashedPassword,
    });
});
const getLoggedInUser = (token) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const verifyUser = jsonwebtoken_1.default.verify(token, config_1.default.jwt.secret);
        return yield user_model_1.User.findOne({ email: verifyUser === null || verifyUser === void 0 ? void 0 : verifyUser.userEmail }).select({
            email: 1,
        });
    }
    catch (error) {
        return null;
    }
});
exports.AuthService = {
    loginUser,
    refreshToken,
    changePassword,
    signUpUser: exports.signUpUser,
    getLoggedInUser,
};
