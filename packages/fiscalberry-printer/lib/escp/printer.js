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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Printer = exports.Commands = void 0;
const node_thermal_printer_1 = require("node-thermal-printer");
const remito_1 = require("./commands/remito");
const printerModule = require("@thiagoelg/node-printer");
const logger_1 = require("./logger");
var Commands;
(function (Commands) {
    Commands["printRemito"] = "printRemito";
    Commands["printStatus"] = "printStatus";
})(Commands || (exports.Commands = Commands = {}));
class Printer {
    constructor(printerConfig) {
        this.printerConfig = printerConfig;
        this.__ops = {
            type: node_thermal_printer_1.PrinterTypes.EPSON,
            interface: "printer:auto",
            characterSet: node_thermal_printer_1.CharacterSet.PC852_LATIN2,
            breakLine: node_thermal_printer_1.BreakLine.WORD,
            options: {
                timeout: 2000,
            },
        };
        this.__ops = Object.assign(Object.assign({}, this.__ops), printerConfig.ops);
        this.__printer = new node_thermal_printer_1.ThermalPrinter(this.__ops);
        this.__printer.setPrinterDriver(printerModule);
    }
    getPrinter() {
        return this.__printer;
    }
    getName() {
        return this.printerConfig.name;
    }
    getOps() {
        return this.__ops;
    }
    isConnected() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.__printer.isPrinterConnected();
        });
    }
    print(command, data) {
        return __awaiter(this, void 0, void 0, function* () {
            logger_1.logger.info(`Printing ${command} on ${this.getName()}`);
            switch (command) {
                case Commands.printRemito:
                    (0, remito_1.printRemito)(data, this.getPrinter());
                    break;
                case Commands.printStatus:
                    const status = yield this.isConnected();
                    logger_1.logger.info(`Printer ${this.getName()} is connected: ${status}`);
                    break;
                default:
                    logger_1.logger.error(`Command ${command} not found`);
                    throw new Error(`Command ${command} not found`);
            }
        });
    }
}
exports.Printer = Printer;
//# sourceMappingURL=printer.js.map