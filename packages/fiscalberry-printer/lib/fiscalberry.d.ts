import { PrinterDetails } from "@thiagoelg/node-printer";
import { Commands, Printer } from "./escp/printer";
export declare const Fiscalberry: {
    loadPrinters(): void;
    printTo(printerName: string, command: Commands, data: any): void;
    getInstalledPrinters(): Map<string, Printer>;
    getInstalledPrinter(name: string): Printer | undefined;
    getInstalledPrinterStatus(name: string): Promise<boolean>;
    getOfflineInstalledPrinters(): string[];
    getSOPrinters(): PrinterDetails[];
    getSOPrinter(printerName: string): PrinterDetails;
};
