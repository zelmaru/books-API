"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const express_1 = __importDefault(require("express"));
const logging_1 = __importDefault(require("./config/logging"));
const config_1 = __importDefault(require("./config/config"));
const mongoose_1 = __importDefault(require("mongoose"));
const book_1 = __importDefault(require("./routes/book"));
const NAMESPACE = 'Server';
const router = express_1.default();
// connect to DB
mongoose_1.default
    .connect(config_1.default.mongo.url, config_1.default.mongo.options)
    .then((result) => {
    logging_1.default.info(NAMESPACE, 'Connected to mongoDB!');
})
    .catch((error) => {
    logging_1.default.error(NAMESPACE, error.message, error);
});
// log request
router.use((req, res, next) => {
    logging_1.default.info(NAMESPACE, `METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`);
    res.on('finish', () => {
        logging_1.default.info(NAMESPACE, `METHOD: [${req.method}] - URL: [${req.url}] - STATUS: [${res.statusCode}] - IP: [${req.socket.remoteAddress}]`);
    });
    next();
});
// parse req body
router.use(express_1.default.urlencoded({ extended: false }));
router.use(express_1.default.json());
// API rules
router.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); // * = request can come from anywhere
    res.header('Access-Control-Allow-Origin', 'Origin, X-Requested-With, Content-Type, Acept, Authorization');
    if (req.method == 'OPTIONS') {
        res.header('Access-Control-Allow-Origin', 'GET PATCH DELETE POST PUT'); // allowed methods
        return res.status(200).json({});
    }
    next();
});
// routes
router.use('/api/books', book_1.default); // http://localhost:8000/sample/ping => we get "pong"
// error handling
router.use((req, res, next) => {
    const error = new Error('not found');
    return res.status(404).json({
        message: error.message
    });
});
//server
const httpServer = http_1.default.createServer(router);
httpServer.listen(config_1.default.server.port, () => logging_1.default.info(NAMESPACE, `Server running on ${config_1.default.server.hostname}:${config_1.default.server.port}`));
