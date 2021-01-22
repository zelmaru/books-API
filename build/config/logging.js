"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getTimeStamp = () => {
    return new Date().toISOString();
};
const info = (namespace, message, object) => {
    if (object) {
        console.log(`$[${getTimeStamp()}] [INFO] [${namespace}] ${message}`, object);
    }
    else {
        console.log(`$[${getTimeStamp()}] [INFO] [${namespace}] ${message}`);
    }
};
const warn = (namespace, message, object) => {
    if (object) {
        console.log(`$[${getTimeStamp()}] [INFO] [${namespace}] ${message}`, object);
    }
    else {
        console.log(`$[${getTimeStamp()}] [INFO] [${namespace}] ${message}`);
    }
};
const error = (namespace, message, object) => {
    if (object) {
        console.log(`$[${getTimeStamp()}] [INFO] [${namespace}] ${message}`, object);
    }
    else {
        console.log(`$[${getTimeStamp()}] [INFO] [${namespace}] ${message}`);
    }
};
const debug = (namespace, message, object) => {
    if (object) {
        console.log(`$[${getTimeStamp()}] [INFO] [${namespace}] ${message}`, object);
    }
    else {
        console.log(`$[${getTimeStamp()}] [INFO] [${namespace}] ${message}`);
    }
};
exports.default = { info, warn, error, debug };
