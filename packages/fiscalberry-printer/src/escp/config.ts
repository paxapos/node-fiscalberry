import * as yaml from "js-yaml";
import * as fs from "fs";
import { BreakLine, CharacterSet, PrinterTypes } from "node-thermal-printer";
import { logger } from "./logger";

const configPath = process.env.CONFIG_PATH || "config.yml";

export type ConfigurationYml = {
	printers: PrinterConfig[];
};

export type PrinterConfig = {
	name: string;
	ops: ThermalOptions;
};

export type ThermalNetworkOpcions = {
	timeout: number;
};

export type ThermalOptions = {
	interface: string; // Printer interface
	type?: PrinterTypes; // Printer type: 'star' or 'epson'
	characterSet?: CharacterSet; // Printer character set
	removeSpecialCharacters?: boolean; // Removes special characters - default: false
	//lineCharacter: "=",                                       // Set character for lines - default: "-"
	breakLine?: BreakLine.WORD; // Break line after WORD or CHARACTERS. Disabled with NONE - default: WORD
	options?: ThermalNetworkOpcions;
};

export function load(): ConfigurationYml {
	try {
		const doc = yaml.load(
			fs.readFileSync(configPath, "utf8")
		) as ConfigurationYml;
		return doc;
	} catch (e: any) {
		throw new Error("Error loading configuration " + e.message);
	}
}

export function save(config: ConfigurationYml): boolean {
	try {
		const ymlconfig = yaml.dump(config);
		fs.writeFileSync(configPath, ymlconfig);
		logger.info("se guardó ok");
		return true;
	} catch (e: any) {
		logger.error(
			"Error saving configuration " +
				configPath +
				" --> Mensaje: " +
				e.message
		);
		return false;
	}
}
