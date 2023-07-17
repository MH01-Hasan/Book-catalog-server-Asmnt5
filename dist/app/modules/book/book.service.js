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
exports.deleteBookDB = exports.updateBookDB = exports.getBookDB = exports.getBooksDB = exports.createBookDB = void 0;
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const book_model_1 = __importDefault(require("./book.model"));
const createBookDB = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield book_model_1.default.create(data);
    return result;
});
exports.createBookDB = createBookDB;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getBooksDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const initialQuery = [];
    if (query.search) {
        initialQuery.push({
            $or: [
                { name: { $regex: new RegExp(query.search, 'i') } },
                { author: { $regex: new RegExp(query.search, 'i') } },
            ],
        });
    }
    if (query.genre) {
        initialQuery.push({ genre: query.genre });
    }
    if (query.publicationDate) {
        initialQuery.push({
            $expr: { $eq: [{ $year: '$publicationDate' }, query.publicationDate] },
        });
    }
    query = initialQuery.length > 0 ? { $and: initialQuery } : {};
    const result = yield book_model_1.default.find(query);
    if (!result)
        throw new ApiError_1.default(404, 'Not found.');
    return result;
});
exports.getBooksDB = getBooksDB;
const getBookDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield book_model_1.default.findById(id);
    if (!result)
        throw new ApiError_1.default(404, 'Not found.');
    return result;
});
exports.getBookDB = getBookDB;
const updateBookDB = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield book_model_1.default.findByIdAndUpdate(id, data, {
        runValidators: true,
        new: true,
    });
    return result;
});
exports.updateBookDB = updateBookDB;
const deleteBookDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield book_model_1.default.findByIdAndDelete(id);
    return result;
});
exports.deleteBookDB = deleteBookDB;
