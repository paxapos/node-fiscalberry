import type { ThermalPrinter } from "node-thermal-printer";
import { PrintRemitoOptions } from "../printer";
export declare function printRemito(kwargs: PrintRemitoOptions, printer: ThermalPrinter): Promise<String>;
