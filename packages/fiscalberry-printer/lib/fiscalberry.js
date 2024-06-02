"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Fiscalberry = void 0;
const node_printer_1 = require("@thiagoelg/node-printer");
const printer_1 = require("./escp/printer");
const config_1 = require("./escp/config");
const logger_1 = require("./escp/logger");
const configLoad = (0, config_1.load)();
let avaliablePrinters = new Map();
let offlinePrinters = [];
exports.Fiscalberry = {
    loadPrinters() {
        configLoad.printers.forEach((printerConfig) => {
            try {
                const printer = new printer_1.Printer(printerConfig);
                avaliablePrinters.set(printerConfig.name, printer);
            }
            catch (e) {
                offlinePrinters.push(printerConfig.name);
                logger_1.logger.error("Error loading printer " +
                    printerConfig.name +
                    " -->" +
                    e.message);
            }
        });
    },
    printTo(printerName, command, data) {
        const printer = avaliablePrinters.get(printerName);
        if (printer) {
            printer.print(command, data);
        }
    },
    getInstalledPrinters() {
        return avaliablePrinters;
    },
    getInstalledPrinter(name) {
        return avaliablePrinters.get(name);
    },
    getInstalledPrinterStatus(name) {
        const printer = avaliablePrinters.get(name);
        if (printer) {
            return printer.isConnected();
        }
        return undefined;
    },
    getOfflineInstalledPrinters() {
        return offlinePrinters;
    },
    getSOPrinters() {
        return (0, node_printer_1.getPrinters)();
    },
    getSOPrinter(printerName) {
        return (0, node_printer_1.getPrinter)(printerName);
    },
};
//# sourceMappingURL=fiscalberry.js.map