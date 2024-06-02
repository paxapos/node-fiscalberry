import {
	BreakLine,
	CharacterSet,
	PrinterTypes,
	ThermalPrinter,
} from "node-thermal-printer";
import { printRemito } from "./commands/remito";
import { PrinterConfig, ThermalOptions } from "./config";
import * as printerModule from "@thiagoelg/node-printer";
import { logger } from "./logger";

export enum Commands {
	"printRemito" = "printRemito",
	"printStatus" = "printStatus",
}

export type PrintRemitoOptions = {
	encabezado: Encabezado;
	items: Item[];
	pagos: Pago[];
	addAdditional: Additional[];
	setTrailer: string[];
	barcode?: string;
	driver?: Object;
	qr?: string;
};

export type Pago = {
	ds: string;
	importe: number;
};

export type Item = {
	qty: number;
	ds: string;
	importe: number;
	total: number;
};

export type Additional = {
	amount: number;
	description: string;
	negative: boolean;
};

export type Encabezado = {
	imprimir_fecha_remito: boolean;
	nombre_cliente: string;
	telefono: string;
	domicilio_cliente: string;
};

/**
 * Printer class
 * @class Printer class to handle printer operations and configurations
 * @param printerConfig PrinterConfig
 * @returns Printer
 * @constructor
 * @public
 * @example
 * const printer = new Printer(printerConfig);
 * printer.print(Commands.remito, data);
 * printer.isConnected();
 * printer.getName();
 * printer.getOps();
 * printer.getPrinter();
 *
 */
export class Printer {
	__printer: ThermalPrinter;
	__ops: ThermalOptions = {
		type: PrinterTypes.EPSON,
		interface: "printer:auto",
		characterSet: CharacterSet.PC852_LATIN2,
		breakLine: BreakLine.WORD,
		options: {
			timeout: 2000,
		},
	};

	constructor(private printerConfig: PrinterConfig) {
		this.__ops = { ...this.__ops, ...printerConfig.ops };

		this.__printer = new ThermalPrinter(this.__ops);

		this.__printer.setPrinterDriver(printerModule);
	}

	getPrinter(): ThermalPrinter {
		return this.__printer;
	}

	getName(): string {
		return this.printerConfig.name;
	}

	getOps(): ThermalOptions {
		return this.__ops;
	}

	async isConnected(): Promise<boolean> {
		return await this.__printer.isPrinterConnected(); // Check if printer is connected, return bool of status
	}

	async print(command: Commands, data: any): Promise<void> {
		logger.info(`Printing ${command} on ${this.getName()}`);
		switch (command) {
			case Commands.printRemito:
				printRemito(data as PrintRemitoOptions, this.getPrinter());
				break;
			case Commands.printStatus:
				const status = await this.isConnected();
				logger.info(
					`Printer ${this.getName()} is connected: ${status}`
				);
				break;
			default:
				logger.error(`Command ${command} not found`);
				throw new Error(`Command ${command} not found`);
		}
	}
}
