import type { ThermalPrinter } from "node-thermal-printer";
import { PrintRemitoOptions } from "../printer";
import { logger } from "../../logger";

/**
 *
 * Esto sirve para armar el TXT o Buffer que se va a imprimir
 * De esta manera podria armar el diseño de los tickets, remitos, etc
 * independientemente de la libreria que se use para imprimir
 *
 *
 * @param kwargs
 * @param printer ThermalPrinter
 *
 * @returns
 */

// Print remito function
export async function printRemito(
	kwargs: PrintRemitoOptions,
	printer: ThermalPrinter
): Promise<String> {
	const encabezado = kwargs.encabezado;
	const items = kwargs.items;
	const pagos = kwargs.pagos;
	const addAdditional = kwargs.addAdditional;
	const setTrailer = kwargs.setTrailer;

	if (!encabezado || items.length === 0) {
		logger.error("No hay datos suficientes para imprimir");
		throw new Error("No hay datos suficientes para imprimir");
	}

	// quiero traducir de python a typescript
	// en python la variable es printer y en ts es printer que depende del tipo ThermalPrinter

	/* en python */
	// printer.set(CENTER, FONT_A, NORMAL, 1, 1)
	// if "imprimir_fecha_remito" in encabezado:
	// 	fecha = datetime.datetime.strftime(datetime.datetime.now(), "%d/%m/%Y %H:%M")
	// 	printer.text(f"Fecha: {fecha} \n\n\n")
	// printer.text(u"Verifique su cuenta por favor\n")
	// printer.text(u"NO VÁLIDO COMO FACTURA\n\n")

	/* en ts */
	printer.alignCenter();
	if ("imprimir_fecha_remito" in encabezado) {
		const fecha = new Date().toLocaleString();
		printer.println(`Fecha: ${fecha} \n\n\n`);
	}
	printer.println("Verifique su cuenta por favor");
	printer.println("NO VÁLIDO COMO FACTURA");
	printer.println("\n\n");

	/* en python */
	/*
	```python
	f encabezado:
            printer.set(CENTER, FONT_A, NORMAL, 1, 2)
            if "nombre_cliente" in encabezado:
                printer.text(f'\n{encabezado.get("nombre_cliente")}\n')
                if "telefono" in encabezado:
                    printer.text(f'\n{encabezado.get("telefono")}\n')
                if "domicilio_cliente" in encabezado:
                    printer.text(f'\n{encabezado.get("domicilio_cliente")}\n')
                printer.text(u"\n")

				```
	*/
	/* en ts */
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

	/* en python */
	/*
	```python
	tot_importe = 0.0
        printer.set(LEFT, FONT_A, NORMAL, 1, 1)
        for item in items:
            ds = item.get('ds')[0:self.desc_cols-2]
            item_cant = float(item.get('qty'))
            total_producto = item_cant * float(item.get('importe'))
            tot_importe += total_producto
         
            itemcanttxt = pad(floatToString(item_cant), self.cant_cols, " ", "l")
            dstxt = pad(ds, self.desc_cols, " ", "l")
            preciotxt = pad(f"{self.signo}{round(total_producto,2):,.2f}" , self.price_cols, " ", "r")
            printer.text(itemcanttxt + dstxt + preciotxt + "\n")
			```
	*/
	/* en ts */
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

	/* en python */
	/*
	```python
	 if addAdditional:
            # imprimir subtotal
            printer.set(RIGHT, FONT_A, NORMAL, 1, 1)
            printer.text(f"SUBTOTAL: {self.signo}%.2f\n" % tot_importe)

            # imprimir descuento
            sAmount = float(addAdditional.get('amount', 0))
            tot_importe = tot_importe - sAmount
            printer.set(LEFT, FONT_A, NORMAL, 1, 1)
            descText = pad(addAdditional.get('description'), self.desc_cols_ext, " ", "r") + pad(f"{self.signo}{sAmount:.2f}", self.price_cols ," ", "r")
            printer.text(descText + "\n")
			```
	*/
	/* en ts */
	if (addAdditional) {
		printer.alignRight();
		printer.println(`SUBTOTAL: ${tot_importe.toFixed(2)}`);

		for (const additional of addAdditional) {
			const sAmount = additional.amount;
			tot_importe = tot_importe - sAmount;

			printer.alignLeft();
			const descText =
				additional.description.padEnd(20, " ") +
				`${sAmount.toFixed(2)}`.padEnd(10, " ");
			printer.println(descText);
		}
	}

	/* en python */
	/*
	```python
	# imprimir total
        printer.set(RIGHT, FONT_A, NORMAL, 1, 2)
        printer.text(f"TOTAL: {self.signo}{tot_importe:.2f}\n")

        printer.set(LEFT, FONT_A, NORMAL, 1, 1)
        
        if self.__preFillTrailer:
            #print(self.conector.driver)
			printer = self.conector.driver

			for trailerLine in setTrailer:
				if trailerLine:
					printer.text(trailerLine)

				printer.text("\n")

        if setTrailer:
            #print(self.conector.driver)
			printer = self.conector.driver

			for trailerLine in setTrailer:
				if trailerLine:
					printer.text(trailerLine)

				printer.text("\n")

        self.__printExtras(kwargs)

		```
	*/
	/* en ts */
	printer.alignRight();
	printer.println(`TOTAL: ${tot_importe.toFixed(2)}`);

	printer.alignLeft();
	if (setTrailer) {
		printer.print(setTrailer.join("\n"));
	}

	/* en python */
	/*
	```python
	 
        for pago in pagos:
            desc = pago.get('ds', "Pago")[0:20]
            importe = float(pago.get('importe'))

            dsTxt = pad(desc, self.desc_cols_ext - 1," ","l")
            importeTxt = pad(f"{importe:,.2f}",self.price_cols," ","r")
            
            printer.text(f"{dsTxt}{self.signo}{importeTxt}\n")
			```
	*/
	/* en ts */
	for (const pago of pagos) {
		const desc = pago.ds.substring(0, 20);
		const importe = pago.importe;

		const dsTxt = desc.padEnd(19, " ");
		const importeTxt = `${importe.toFixed(2)}`.padEnd(10, " ");
		printer.println(`${dsTxt}${importeTxt}`);
	}

	/*
	```python
	 barcode = kwargs.get("barcode", None)
        if barcode:            
            printer.barcode(str(barcode).rjust(8, "0"), 'EAN13')

			```

	*/
	/* en ts */
	const barcode = kwargs.barcode;
	if (barcode) {
		printer.printBarcode(barcode);
	}

	/*
	```python
	 qr = kwargs.get("qr", None)
		if qr:
			printer.qr(str(qr), size=3)
		```
	*/
	/* en ts */
	const qr = kwargs.qr;
	if (qr) {
		printer.printQR(qr);
	}

	return await printer.execute();
}
