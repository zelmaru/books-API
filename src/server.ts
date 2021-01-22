import http from 'http';
import express from 'express';
import logging from './config/logging';
import config from './config/config';
import mongoose from 'mongoose';
import bookRoutes from './routes/book';

const NAMESPACE = 'Server';
const router = express();

// connect to DB
mongoose
    .connect(config.mongo.url, config.mongo.options)
    .then((result) => {
        logging.info(NAMESPACE, 'Connected to mongoDB!');
    })
    .catch((error) => {
        logging.error(NAMESPACE, error.message, error);
    });

// log request
router.use((req, res, next) => {
    logging.info(NAMESPACE, `METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`);

    res.on('finish', () => {
        logging.info(NAMESPACE, `METHOD: [${req.method}] - URL: [${req.url}] - STATUS: [${res.statusCode}] - IP: [${req.socket.remoteAddress}]`);
    });

    next();
});

// parse req body
router.use(express.urlencoded({ extended: false }));
router.use(express.json());

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
router.use('/api/books', bookRoutes); // http://localhost:8000/sample/ping => we get "pong"

// error handling
router.use((req, res, next) => {
    const error = new Error('not found');
    return res.status(404).json({
        message: error.message
    });
});

//server

const httpServer = http.createServer(router);
httpServer.listen(config.server.port, () => logging.info(NAMESPACE, `Server running on ${config.server.hostname}:${config.server.port}`));
