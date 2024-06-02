import {
	getPrinter,
	getPrinters,
	PrinterDetails,
} from "@thiagoelg/node-printer";
import { Commands, Printer } from "./escp/printer";
import { load } from "./escp/config";
import { logger } from "./escp/logger";

const configLoad = load();

let avaliablePrinters: Map<string, Printer> = new Map();

let offlinePrinters: string[] = [];

export const Fiscalberry = {
	loadPrinters() {
		configLoad.printers.forEach((printerConfig) => {
			try {
				const printer = new Printer(printerConfig);
				avaliablePrinters.set(printerConfig.name, printer);
			} catch (e: any) {
				offlinePrinters.push(printerConfig.name);
				logger.error(
					"Error loading printer " +
						printerConfig.name +
						" -->" +
						e.message
				);
			}
		});
	},

	printTo(printerName: string, command: Commands, data: any) {
		const printer = avaliablePrinters.get(printerName);
		if (printer) {
			printer.print(command, data);
		}
	},

	getInstalledPrinters(): Map<string, Printer> {
		return avaliablePrinters;
	},

	getInstalledPrinter(name: string): Printer | undefined {
		return avaliablePrinters.get(name);
	},

	getInstalledPrinterStatus(name: string) {
		const printer = avaliablePrinters.get(name);
		if (printer) {
			return printer.isConnected();
		}
		return undefined;
	},

	getOfflineInstalledPrinters(): string[] {
		return offlinePrinters;
	},

	getSOPrinters(): PrinterDetails[] {
		return getPrinters();
	},

	getSOPrinter(printerName: string): PrinterDetails {
		return getPrinter(printerName);
	},
};
