import { ThermalPrinter } from "node-thermal-printer";
import { PrinterConfig, ThermalOptions } from "./config";
export declare enum Commands {
    "printRemito" = "printRemito",
    "printStatus" = "printStatus"
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
export declare class Printer {
    private printerConfig;
    __printer: ThermalPrinter;
    __ops: ThermalOptions;
    constructor(printerConfig: PrinterConfig);
    getPrinter(): ThermalPrinter;
    getName(): string;
    getOps(): ThermalOptions;
    isConnected(): Promise<boolean>;
    print(command: Commands, data: any): Promise<void>;
}
