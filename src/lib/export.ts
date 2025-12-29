// Utilidades de exportación para BodegaPOS

/**
 * Convierte un array de objetos a formato CSV
 */
export function arrayToCSV<T extends Record<string, unknown>>(
    data: T[],
    columns: { key: keyof T; header: string }[]
): string {
    const headers = columns.map((col) => col.header).join(",");
    const rows = data.map((row) =>
        columns
            .map((col) => {
                const value = row[col.key];
                // Escapar comillas y valores con comas
                if (typeof value === "string" && (value.includes(",") || value.includes('"'))) {
                    return `"${value.replace(/"/g, '""')}"`;
                }
                return value ?? "";
            })
            .join(",")
    );
    return [headers, ...rows].join("\n");
}

/**
 * Descarga un string como archivo
 */
export function downloadFile(content: string, filename: string, mimeType: string = "text/csv") {
    const blob = new Blob(["\ufeff" + content], { type: `${mimeType};charset=utf-8` }); // BOM for Excel
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}

/**
 * Obtiene la fecha actual formateada para nombres de archivo
 */
export function getDateForFilename(): string {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(
        now.getDate()
    ).padStart(2, "0")}`;
}

/**
 * Exporta productos a CSV
 */
export function exportProductosCSV(productos: Array<{
    nombre: string;
    codigo_barras?: string;
    categoria?: { nombre: string };
    precio_compra: number;
    precio_venta: number;
    stock_actual: number;
    stock_minimo: number;
}>) {
    const columns = [
        { key: "nombre" as const, header: "Nombre" },
        { key: "codigo_barras" as const, header: "Código de Barras" },
        { key: "categoria_nombre" as const, header: "Categoría" },
        { key: "precio_compra" as const, header: "Precio Compra" },
        { key: "precio_venta" as const, header: "Precio Venta" },
        { key: "stock_actual" as const, header: "Stock Actual" },
        { key: "stock_minimo" as const, header: "Stock Mínimo" },
    ];

    const data = productos.map((p) => ({
        ...p,
        categoria_nombre: p.categoria?.nombre || "Sin categoría",
    }));

    const csv = arrayToCSV(data, columns);
    downloadFile(csv, `productos_${getDateForFilename()}.csv`);
}

/**
 * Exporta clientes a CSV
 */
export function exportClientesCSV(clientes: Array<{
    nombre: string;
    dni?: string;
    telefono?: string;
    saldo_fiado: number;
    limite_credito: number;
}>) {
    const columns = [
        { key: "nombre" as const, header: "Nombre" },
        { key: "dni" as const, header: "DNI" },
        { key: "telefono" as const, header: "Teléfono" },
        { key: "saldo_fiado" as const, header: "Saldo Fiado" },
        { key: "limite_credito" as const, header: "Límite Crédito" },
    ];

    const csv = arrayToCSV(clientes, columns);
    downloadFile(csv, `clientes_${getDateForFilename()}.csv`);
}

/**
 * Exporta ventas a CSV
 */
export function exportVentasCSV(ventas: Array<{
    numero_documento: string;
    created_at: string;
    total: number;
    metodo_pago: string;
    items?: Array<unknown>;
}>) {
    const columns = [
        { key: "numero_documento" as const, header: "N° Documento" },
        { key: "fecha" as const, header: "Fecha" },
        { key: "items_count" as const, header: "Productos" },
        { key: "metodo_pago" as const, header: "Método Pago" },
        { key: "total" as const, header: "Total" },
    ];

    const data = ventas.map((v) => ({
        ...v,
        fecha: new Date(v.created_at).toLocaleString("es-PE"),
        items_count: v.items?.length || 0,
    }));

    const csv = arrayToCSV(data, columns);
    downloadFile(csv, `ventas_${getDateForFilename()}.csv`);
}

/**
 * Imprime el contenido de un elemento
 */
export function printElement(elementId: string) {
    const element = document.getElementById(elementId);
    if (!element) return;

    const printWindow = window.open("", "_blank");
    if (!printWindow) return;

    printWindow.document.write(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Ticket de Venta</title>
        <style>
          body {
            font-family: 'Courier New', monospace;
            font-size: 12px;
            padding: 10px;
            max-width: 80mm;
            margin: 0 auto;
          }
          .text-center { text-align: center; }
          .font-bold { font-weight: bold; }
          .border-top { border-top: 1px dashed #000; padding-top: 8px; margin-top: 8px; }
          .border-bottom { border-bottom: 1px dashed #000; padding-bottom: 8px; margin-bottom: 8px; }
          .flex { display: flex; justify-content: space-between; }
          .text-lg { font-size: 14px; }
          .text-xl { font-size: 18px; }
          .my-2 { margin: 8px 0; }
        </style>
      </head>
      <body>
        ${element.innerHTML}
      </body>
    </html>
  `);

    printWindow.document.close();
    printWindow.focus();

    setTimeout(() => {
        printWindow.print();
        printWindow.close();
    }, 250);
}
