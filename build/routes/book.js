"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const book_ctrl_1 = __importDefault(require("../controllers/book-ctrl"));
const router = express_1.default.Router();
router.post('/create/book', book_ctrl_1.default.createBook);
router.get('/get/books', book_ctrl_1.default.getAllBooks);
module.exports = router;
