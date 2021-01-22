"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const book_model_1 = __importDefault(require("../models/book-model"));
const NAMESPACE = 'Sample Controller';
const createBook = (req, res, next) => {
    let { author, title } = req.body;
    const book = new book_model_1.default({
        _id: new mongoose_1.default.Types.ObjectId(),
        author,
        title
    });
    return book
        .save()
        .then((result) => {
        return res.status(201).json({
            book: result
        });
    })
        .catch((error) => {
        return res.status(500).json({
            message: error.message,
            error
        });
    });
};
const getAllBooks = (req, res, next) => {
    book_model_1.default.find()
        .exec()
        .then((results) => {
        return res.status(200).json({
            books: results,
            count: results.length
        });
    })
        .catch((error) => {
        return res.status(500).json({
            message: error.message,
            error
        });
    });
};
exports.default = { createBook, getAllBooks };
