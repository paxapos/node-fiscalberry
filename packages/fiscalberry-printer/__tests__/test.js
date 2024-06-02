const Fiscalberrt = require("../lib/fiscalberry");

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

Fiscalberry.loadPrinters();

const printersDisponibles = Fiscalberry.getSOPrinters();
console.info(
	"las Printers printersDisponibles son",
	printersDisponibles.reduce((acc, printer) => acc + printer.name + " ", "")
);

const printers = Fiscalberry.getInstalledPrinters();
console.info("las Printers instaladas son", printers.keys());

// las offline
const offlinePrinters = Fiscalberry.getOfflineInstalledPrinters();
console.info(
	"las offline",
	offlinePrinters.reduce((acc, printer) => acc + printer + " ", "")
);
