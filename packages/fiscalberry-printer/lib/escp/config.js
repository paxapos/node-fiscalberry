"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.save = exports.load = void 0;
const yaml = require("js-yaml");
const fs = require("fs");
const logger_1 = require("./logger");
const configPath = process.env.CONFIG_PATH || "config.yml";
function load() {
    try {
        const doc = yaml.load(fs.readFileSync(configPath, "utf8"));
        return doc;
    }
    catch (e) {
        throw new Error("Error loading configuration " + e.message);
    }
}
exports.load = load;
function save(config) {
    try {
        const ymlconfig = yaml.dump(config);
        fs.writeFileSync(configPath, ymlconfig);
        logger_1.logger.info("se guardó ok");
        return true;
    }
    catch (e) {
        logger_1.logger.error("Error saving configuration " +
            configPath +
            " --> Mensaje: " +
            e.message);
        return false;
    }
}
exports.save = save;
//# sourceMappingURL=config.js.map