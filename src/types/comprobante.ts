// Tipos para el sistema de comprobantes electrónicos

export type TipoComprobante = 'boleta' | 'factura' | 'ticket';

export interface DatosComprobante {
    tipo: TipoComprobante;
    serie: string;
    numero: string;
    fecha: Date;

    // Datos del emisor (tienda)
    emisor: {
        ruc: string;
        razonSocial: string;
        nombreComercial: string;
        direccion: string;
        distrito: string;
        provincia: string;
        departamento: string;
        telefono?: string;
    };

    // Datos del cliente
    cliente: {
        tipoDocumento: 'DNI' | 'RUC' | 'CE' | 'PASAPORTE' | 'SIN_DOCUMENTO';
        numeroDocumento: string;
        nombre: string;
        direccion?: string;
    };

    // Detalle de productos
    items: {
        cantidad: number;
        unidad: string;
        descripcion: string;
        precioUnitario: number;
        subtotal: number;
    }[];

    // Totales
    subtotal: number;
    igv: number;
    total: number;

    // Pago
    metodoPago: string;
    montoRecibido?: number;
    vuelto?: number;

    // Cajero
    cajero: string;

    // QR y hash (simulados)
    codigoQR?: string;
    hashCPE?: string;
}

export interface ConfiguracionComprobante {
    seriesBoleta: string;
    seriesFactura: string;
    seriesTicket: string;
    ultimoNumeroBoleta: number;
    ultimoNumeroFactura: number;
    ultimoNumeroTicket: number;
}

// Datos del emisor por defecto (demo)
export const emisorDemo = {
    ruc: '20123456789',
    razonSocial: 'BODEGA DON PEPE S.A.C.',
    nombreComercial: 'Bodega Don Pepe',
    direccion: 'Av. Los Olivos 123',
    distrito: 'San Juan de Lurigancho',
    provincia: 'Lima',
    departamento: 'Lima',
    telefono: '01 234-5678',
};

// Configuración por defecto
export const configuracionDemo: ConfiguracionComprobante = {
    seriesBoleta: 'B001',
    seriesFactura: 'F001',
    seriesTicket: 'T001',
    ultimoNumeroBoleta: 0,
    ultimoNumeroFactura: 0,
    ultimoNumeroTicket: 0,
};

// Función para generar número de comprobante
export function generarNumeroComprobante(
    tipo: TipoComprobante,
    config: ConfiguracionComprobante
): { serie: string; numero: string } {
    let serie: string;
    let ultimoNumero: number;

    switch (tipo) {
        case 'boleta':
            serie = config.seriesBoleta;
            ultimoNumero = config.ultimoNumeroBoleta + 1;
            break;
        case 'factura':
            serie = config.seriesFactura;
            ultimoNumero = config.ultimoNumeroFactura + 1;
            break;
        case 'ticket':
            serie = config.seriesTicket;
            ultimoNumero = config.ultimoNumeroTicket + 1;
            break;
    }

    return {
        serie,
        numero: String(ultimoNumero).padStart(8, '0'),
    };
}

// Función para generar hash simulado
export function generarHashCPE(): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let hash = '';
    for (let i = 0; i < 40; i++) {
        hash += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return hash;
}
