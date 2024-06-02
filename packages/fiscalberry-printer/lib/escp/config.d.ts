import { BreakLine, CharacterSet, PrinterTypes } from "node-thermal-printer";
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
    interface: string;
    type?: PrinterTypes;
    characterSet?: CharacterSet;
    removeSpecialCharacters?: boolean;
    breakLine?: BreakLine.WORD;
    options?: ThermalNetworkOpcions;
};
export declare function load(): ConfigurationYml;
export declare function save(config: ConfigurationYml): boolean;
