"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
const fs = require("fs");
const dotenv = require("dotenv");
dotenv.config();
const path = process.env.LOG_PATH;
class FileLogger {
    constructor(filename) {
        this.fd = fs.openSync(filename, "a");
    }
    trace(message, ...optionalParams) {
        this.append("TRACE", `${message} ${JSON.stringify(optionalParams)}`);
    }
    debug(message, ...optionalParams) {
        this.append("DEBUG", `${message} ${JSON.stringify(optionalParams)}`);
    }
    info(message, ...optionalParams) {
        this.append("INFO ", `${message} ${JSON.stringify(optionalParams)}`);
    }
    warn(message, ...optionalParams) {
        this.append("WARN ", `${message} ${JSON.stringify(optionalParams)}`);
    }
    error(message, ...optionalParams) {
        this.append("ERROR", `${message} ${JSON.stringify(optionalParams)}`);
    }
    append(type, message) {
        fs.writeSync(this.fd, `${new Date().toISOString()} ${type} ${message}\n`);
    }
}
class ConsoleLogger {
    trace(message, ...optionalParams) {
        console.trace(`${message} ${JSON.stringify(optionalParams)}`);
    }
    debug(message, ...optionalParams) {
        console.debug(`${message} ${JSON.stringify(optionalParams)}`);
    }
    info(message, ...optionalParams) {
        console.info(`${message} ${JSON.stringify(optionalParams)}`);
    }
    warn(message, ...optionalParams) {
        console.warn(`${message} ${JSON.stringify(optionalParams)}`);
    }
    error(message, ...optionalParams) {
        console.error(`${message} ${JSON.stringify(optionalParams)}`);
    }
}
exports.logger = path !== undefined ? new FileLogger(path) : new ConsoleLogger();
//# sourceMappingURL=logger.js.map