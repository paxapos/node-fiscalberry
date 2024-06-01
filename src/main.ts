import { config } from "dotenv";
import { load } from "./config";
import { Commands, Printer } from "./escp/printer";

const configLoad = load();

const toPrint = {
	printRemito: {
		encabezado: {
			tipo_cbte: "T",
			imprimir_fecha_remito: 1,
		},
		items: [
			{
				importe: 780,
				ds: "CAZUELA DE MARISCOS",
				qty: 2,
			},
			{
				importe: 320,
				ds: "COCA COLA",
				qty: 2,
			},
			{
				importe: 170,
				ds: "AGUA MINERAL",
				qty: 3,
			},
			{
				importe: 1290,
				ds: "Rabas",
				qty: 2,
			},
			{
				importe: 100,
				ds: "Cubiertos",
				qty: "4",
			},
		],
		pagos: [
			{
				ds: "Tarjeta Master Card",
				importe: 3500,
			},
			{
				ds: "Efectivo",
				importe: 2190,
			},
		],
		setTrailer: [" ", "Mozo: Ejemplo", "Mesa: 15", " "],
	},
};

configLoad.printers.forEach((printerConfig) => {
	const printer = new Printer(printerConfig);

	// iterate over the commands to print del toPrint and get the key as command and the value as data

	for (const [command, data] of Object.entries(toPrint)) {
		printer.print(command as Commands, data);
	}
});
