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
exports.printRemito = void 0;
const logger_1 = require("../logger");
function printRemito(kwargs, printer) {
    return __awaiter(this, void 0, void 0, function* () {
        const encabezado = kwargs.encabezado;
        const items = kwargs.items;
        const pagos = kwargs.pagos;
        const addAdditional = kwargs.addAdditional;
        const setTrailer = kwargs.setTrailer;
        if (!encabezado || items.length === 0) {
            logger_1.logger.error("No hay datos suficientes para imprimir");
            throw new Error("No hay datos suficientes para imprimir");
        }
        printer.alignCenter();
        if ("imprimir_fecha_remito" in encabezado) {
            const fecha = new Date().toLocaleString();
            printer.println(`Fecha: ${fecha} \n\n\n`);
        }
        printer.println("Verifique su cuenta por favor");
        printer.println("NO VÁLIDO COMO FACTURA");
        printer.println("\n\n");
        if ("nombre_cliente" in encabezado) {
            printer.alignCenter();
            printer.println(`${encabezado.nombre_cliente}`);
            if ("telefono" in encabezado) {
                printer.println(`${encabezado.telefono}`);
            }
            if ("domicilio_cliente" in encabezado) {
                printer.println(`${encabezado.domicilio_cliente}`);
            }
            printer.println("");
        }
        let tot_importe = 0.0;
        printer.alignLeft();
        for (const item of items) {
            const ds = item.ds.substring(0, 20);
            const item_cant = item.qty;
            const total_producto = item_cant * (item.importe * 1);
            tot_importe += total_producto;
            const itemcanttxt = item_cant.toString().padEnd(5, " ");
            const dstxt = ds.padEnd(20, " ");
            const preciotxt = `${total_producto.toFixed(2)}`.padEnd(10, " ");
            printer.println(`${itemcanttxt}${dstxt}${preciotxt}`);
        }
        if (addAdditional) {
            printer.alignRight();
            printer.println(`SUBTOTAL: ${tot_importe.toFixed(2)}`);
            for (const additional of addAdditional) {
                const sAmount = additional.amount;
                tot_importe = tot_importe - sAmount;
                printer.alignLeft();
                const descText = additional.description.padEnd(20, " ") +
                    `${sAmount.toFixed(2)}`.padEnd(10, " ");
                printer.println(descText);
            }
        }
        printer.alignRight();
        printer.println(`TOTAL: ${tot_importe.toFixed(2)}`);
        printer.alignLeft();
        if (setTrailer) {
            printer.print(setTrailer.join("\n"));
        }
        for (const pago of pagos) {
            const desc = pago.ds.substring(0, 20);
            const importe = pago.importe;
            const dsTxt = desc.padEnd(19, " ");
            const importeTxt = `${importe.toFixed(2)}`.padEnd(10, " ");
            printer.println(`${dsTxt}${importeTxt}`);
        }
        const barcode = kwargs.barcode;
        if (barcode) {
            printer.printBarcode(barcode);
        }
        const qr = kwargs.qr;
        if (qr) {
            printer.printQR(qr);
        }
        return yield printer.execute();
    });
}
exports.printRemito = printRemito;
//# sourceMappingURL=remito.js.map