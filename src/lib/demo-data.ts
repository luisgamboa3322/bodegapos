// Datos de demostración para BodegaPOS
import { Categoria, Producto, Cliente, Venta } from '@/types';

// Categorías de ejemplo
export const categoriasDemo: Categoria[] = [
    { id: '1', tienda_id: '1', nombre: 'Bebidas', icono: '🥤', color: '#3B82F6', orden: 1, activo: true },
    { id: '2', tienda_id: '1', nombre: 'Abarrotes', icono: '🍚', color: '#10B981', orden: 2, activo: true },
    { id: '3', tienda_id: '1', nombre: 'Lácteos', icono: '🥛', color: '#F59E0B', orden: 3, activo: true },
    { id: '4', tienda_id: '1', nombre: 'Panadería', icono: '🍞', color: '#8B5CF6', orden: 4, activo: true },
    { id: '5', tienda_id: '1', nombre: 'Golosinas', icono: '🍬', color: '#EC4899', orden: 5, activo: true },
    { id: '6', tienda_id: '1', nombre: 'Limpieza', icono: '🧹', color: '#06B6D4', orden: 6, activo: true },
    { id: '7', tienda_id: '1', nombre: 'Cuidado Personal', icono: '🧴', color: '#F97316', orden: 7, activo: true },
    { id: '8', tienda_id: '1', nombre: 'Snacks', icono: '🍿', color: '#EF4444', orden: 8, activo: true },
];

// Productos de ejemplo (precios en Soles peruanos)
export const productosDemo: Producto[] = [
    // Bebidas
    { id: '1', tienda_id: '1', categoria_id: '1', codigo_barras: '7751271010108', nombre: 'Inca Kola 500ml', precio_compra: 2.00, precio_venta: 3.00, stock_actual: 48, stock_minimo: 12, unidad_medida: 'unidad', activo: true, created_at: '', updated_at: '' },
    { id: '2', tienda_id: '1', categoria_id: '1', codigo_barras: '7751271010115', nombre: 'Coca Cola 500ml', precio_compra: 2.00, precio_venta: 3.00, stock_actual: 36, stock_minimo: 12, unidad_medida: 'unidad', activo: true, created_at: '', updated_at: '' },
    { id: '3', tienda_id: '1', categoria_id: '1', codigo_barras: '7751271010122', nombre: 'Sprite 500ml', precio_compra: 2.00, precio_venta: 3.00, stock_actual: 24, stock_minimo: 12, unidad_medida: 'unidad', activo: true, created_at: '', updated_at: '' },
    { id: '4', tienda_id: '1', categoria_id: '1', codigo_barras: '7751271010139', nombre: 'Agua San Luis 625ml', precio_compra: 1.20, precio_venta: 2.00, stock_actual: 60, stock_minimo: 24, unidad_medida: 'unidad', activo: true, created_at: '', updated_at: '' },
    { id: '5', tienda_id: '1', categoria_id: '1', codigo_barras: '7751271010146', nombre: 'Cerveza Pilsen 620ml', precio_compra: 4.50, precio_venta: 6.50, stock_actual: 24, stock_minimo: 12, unidad_medida: 'unidad', activo: true, created_at: '', updated_at: '' },
    { id: '6', tienda_id: '1', categoria_id: '1', codigo_barras: '7751271010153', nombre: 'Gatorade 500ml', precio_compra: 3.50, precio_venta: 5.00, stock_actual: 18, stock_minimo: 6, unidad_medida: 'unidad', activo: true, created_at: '', updated_at: '' },

    // Abarrotes
    { id: '7', tienda_id: '1', categoria_id: '2', codigo_barras: '7751271020107', nombre: 'Arroz Costeño 1kg', precio_compra: 4.00, precio_venta: 5.50, stock_actual: 30, stock_minimo: 10, unidad_medida: 'unidad', activo: true, created_at: '', updated_at: '' },
    { id: '8', tienda_id: '1', categoria_id: '2', codigo_barras: '7751271020114', nombre: 'Aceite Primor 1L', precio_compra: 9.00, precio_venta: 12.00, stock_actual: 15, stock_minimo: 5, unidad_medida: 'unidad', activo: true, created_at: '', updated_at: '' },
    { id: '9', tienda_id: '1', categoria_id: '2', codigo_barras: '7751271020121', nombre: 'Azúcar Rubia 1kg', precio_compra: 3.50, precio_venta: 4.50, stock_actual: 25, stock_minimo: 10, unidad_medida: 'unidad', activo: true, created_at: '', updated_at: '' },
    { id: '10', tienda_id: '1', categoria_id: '2', codigo_barras: '7751271020138', nombre: 'Fideos Don Vittorio 500g', precio_compra: 2.80, precio_venta: 3.80, stock_actual: 40, stock_minimo: 15, unidad_medida: 'unidad', activo: true, created_at: '', updated_at: '' },
    { id: '11', tienda_id: '1', categoria_id: '2', codigo_barras: '7751271020145', nombre: 'Atún Florida 170g', precio_compra: 5.50, precio_venta: 7.50, stock_actual: 20, stock_minimo: 8, unidad_medida: 'unidad', activo: true, created_at: '', updated_at: '' },
    { id: '12', tienda_id: '1', categoria_id: '2', codigo_barras: '7751271020152', nombre: 'Sal Emsal 1kg', precio_compra: 1.50, precio_venta: 2.00, stock_actual: 35, stock_minimo: 10, unidad_medida: 'unidad', activo: true, created_at: '', updated_at: '' },

    // Lácteos
    { id: '13', tienda_id: '1', categoria_id: '3', codigo_barras: '7751271030106', nombre: 'Leche Gloria 1L', precio_compra: 4.20, precio_venta: 5.50, stock_actual: 24, stock_minimo: 12, unidad_medida: 'unidad', activo: true, created_at: '', updated_at: '' },
    { id: '14', tienda_id: '1', categoria_id: '3', codigo_barras: '7751271030113', nombre: 'Yogurt Gloria 1L', precio_compra: 5.00, precio_venta: 7.00, stock_actual: 15, stock_minimo: 6, unidad_medida: 'unidad', activo: true, created_at: '', updated_at: '' },
    { id: '15', tienda_id: '1', categoria_id: '3', codigo_barras: '7751271030120', nombre: 'Queso Fresco 200g', precio_compra: 6.00, precio_venta: 8.50, stock_actual: 10, stock_minimo: 5, unidad_medida: 'unidad', activo: true, created_at: '', updated_at: '' },
    { id: '16', tienda_id: '1', categoria_id: '3', codigo_barras: '7751271030137', nombre: 'Mantequilla Laive 200g', precio_compra: 5.50, precio_venta: 7.50, stock_actual: 8, stock_minimo: 4, unidad_medida: 'unidad', activo: true, created_at: '', updated_at: '' },

    // Panadería
    { id: '17', tienda_id: '1', categoria_id: '4', codigo_barras: '7751271040105', nombre: 'Pan de Molde Bimbo', precio_compra: 5.00, precio_venta: 7.00, stock_actual: 12, stock_minimo: 5, unidad_medida: 'unidad', activo: true, created_at: '', updated_at: '' },
    { id: '18', tienda_id: '1', categoria_id: '4', codigo_barras: '7751271040112', nombre: 'Pan Francés (unidad)', precio_compra: 0.15, precio_venta: 0.25, stock_actual: 100, stock_minimo: 50, unidad_medida: 'unidad', activo: true, created_at: '', updated_at: '' },

    // Golosinas
    { id: '19', tienda_id: '1', categoria_id: '5', codigo_barras: '7751271050104', nombre: 'Galleta Oreo', precio_compra: 2.00, precio_venta: 3.00, stock_actual: 30, stock_minimo: 10, unidad_medida: 'unidad', activo: true, created_at: '', updated_at: '' },
    { id: '20', tienda_id: '1', categoria_id: '5', codigo_barras: '7751271050111', nombre: 'Chocolate Sublime', precio_compra: 1.80, precio_venta: 2.50, stock_actual: 40, stock_minimo: 15, unidad_medida: 'unidad', activo: true, created_at: '', updated_at: '' },
    { id: '21', tienda_id: '1', categoria_id: '5', codigo_barras: '7751271050128', nombre: 'Caramelos Halls', precio_compra: 0.80, precio_venta: 1.00, stock_actual: 50, stock_minimo: 20, unidad_medida: 'unidad', activo: true, created_at: '', updated_at: '' },
    { id: '22', tienda_id: '1', categoria_id: '5', codigo_barras: '7751271050135', nombre: 'Chicle Trident', precio_compra: 1.50, precio_venta: 2.00, stock_actual: 35, stock_minimo: 15, unidad_medida: 'unidad', activo: true, created_at: '', updated_at: '' },

    // Limpieza
    { id: '23', tienda_id: '1', categoria_id: '6', codigo_barras: '7751271060103', nombre: 'Detergente Ace 850g', precio_compra: 8.00, precio_venta: 11.00, stock_actual: 15, stock_minimo: 5, unidad_medida: 'unidad', activo: true, created_at: '', updated_at: '' },
    { id: '24', tienda_id: '1', categoria_id: '6', codigo_barras: '7751271060110', nombre: 'Lejía Clorox 1L', precio_compra: 4.50, precio_venta: 6.50, stock_actual: 20, stock_minimo: 8, unidad_medida: 'unidad', activo: true, created_at: '', updated_at: '' },
    { id: '25', tienda_id: '1', categoria_id: '6', codigo_barras: '7751271060127', nombre: 'Jabón Bolivar 240g', precio_compra: 2.50, precio_venta: 3.50, stock_actual: 25, stock_minimo: 10, unidad_medida: 'unidad', activo: true, created_at: '', updated_at: '' },
    { id: '26', tienda_id: '1', categoria_id: '6', codigo_barras: '7751271060134', nombre: 'Papel Higiénico Elite x4', precio_compra: 5.00, precio_venta: 7.00, stock_actual: 18, stock_minimo: 6, unidad_medida: 'unidad', activo: true, created_at: '', updated_at: '' },

    // Cuidado Personal
    { id: '27', tienda_id: '1', categoria_id: '7', codigo_barras: '7751271070102', nombre: 'Shampoo H&S 375ml', precio_compra: 12.00, precio_venta: 16.00, stock_actual: 8, stock_minimo: 4, unidad_medida: 'unidad', activo: true, created_at: '', updated_at: '' },
    { id: '28', tienda_id: '1', categoria_id: '7', codigo_barras: '7751271070119', nombre: 'Pasta Dental Colgate 75ml', precio_compra: 4.00, precio_venta: 5.50, stock_actual: 15, stock_minimo: 6, unidad_medida: 'unidad', activo: true, created_at: '', updated_at: '' },
    { id: '29', tienda_id: '1', categoria_id: '7', codigo_barras: '7751271070126', nombre: 'Jabón Dove 90g', precio_compra: 3.50, precio_venta: 5.00, stock_actual: 20, stock_minimo: 8, unidad_medida: 'unidad', activo: true, created_at: '', updated_at: '' },

    // Snacks
    { id: '30', tienda_id: '1', categoria_id: '8', codigo_barras: '7751271080101', nombre: 'Papitas Lays 42g', precio_compra: 1.80, precio_venta: 2.50, stock_actual: 40, stock_minimo: 15, unidad_medida: 'unidad', activo: true, created_at: '', updated_at: '' },
    { id: '31', tienda_id: '1', categoria_id: '8', codigo_barras: '7751271080118', nombre: 'Doritos 42g', precio_compra: 1.80, precio_venta: 2.50, stock_actual: 35, stock_minimo: 15, unidad_medida: 'unidad', activo: true, created_at: '', updated_at: '' },
    { id: '32', tienda_id: '1', categoria_id: '8', codigo_barras: '7751271080125', nombre: 'Chifles 50g', precio_compra: 1.50, precio_venta: 2.00, stock_actual: 30, stock_minimo: 12, unidad_medida: 'unidad', activo: true, created_at: '', updated_at: '' },
];

// Agregar la categoría a cada producto
export const productosConCategoria = productosDemo.map(producto => ({
    ...producto,
    categoria: categoriasDemo.find(c => c.id === producto.categoria_id)
}));

// Clientes de ejemplo
export const clientesDemo: Cliente[] = [
    { id: '1', tienda_id: '1', dni: '12345678', nombre: 'Juan Pérez García', telefono: '987654321', saldo_fiado: 45.50, limite_credito: 200, activo: true, created_at: '' },
    { id: '2', tienda_id: '1', dni: '87654321', nombre: 'María López Torres', telefono: '912345678', saldo_fiado: 0, limite_credito: 150, activo: true, created_at: '' },
    { id: '3', tienda_id: '1', dni: '11223344', nombre: 'Carlos Ramírez Silva', telefono: '956781234', saldo_fiado: 125.00, limite_credito: 300, activo: true, created_at: '' },
    { id: '4', tienda_id: '1', dni: '44332211', nombre: 'Ana Sánchez Mendoza', telefono: '934567890', saldo_fiado: 15.00, limite_credito: 100, activo: true, created_at: '' },
    { id: '5', tienda_id: '1', dni: '55667788', nombre: 'Pedro Vargas Huamán', telefono: '923456789', saldo_fiado: 78.50, limite_credito: 250, activo: true, created_at: '' },
];

// Función para generar ventas de ejemplo
export function generarVentasDemo(cantidad: number = 20): Venta[] {
    const ventas: Venta[] = [];
    const metodosPago: Venta['metodo_pago'][] = ['efectivo', 'yape', 'plin', 'efectivo', 'efectivo'];

    for (let i = 0; i < cantidad; i++) {
        const itemsCount = Math.floor(Math.random() * 5) + 1;
        const items = [];
        let total = 0;

        for (let j = 0; j < itemsCount; j++) {
            const producto = productosDemo[Math.floor(Math.random() * productosDemo.length)];
            const cantidad = Math.floor(Math.random() * 3) + 1;
            const subtotal = producto.precio_venta * cantidad;
            total += subtotal;

            items.push({
                id: `${i}-${j}`,
                venta_id: String(i + 1),
                producto_id: producto.id,
                cantidad,
                precio_unitario: producto.precio_venta,
                descuento: 0,
                subtotal,
                producto
            });
        }

        const fecha = new Date();
        fecha.setHours(fecha.getHours() - Math.floor(Math.random() * 72));

        ventas.push({
            id: String(i + 1),
            tienda_id: '1',
            usuario_id: '1',
            numero_documento: `B001-${String(i + 1).padStart(6, '0')}`,
            tipo_documento: 'boleta',
            subtotal: total / 1.18,
            igv: total - (total / 1.18),
            total,
            metodo_pago: metodosPago[Math.floor(Math.random() * metodosPago.length)],
            monto_recibido: total,
            vuelto: 0,
            es_fiado: false,
            estado: 'completada',
            created_at: fecha.toISOString(),
            items
        });
    }

    return ventas.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
}

// Estadísticas de demo
export const statsDemo = {
    ventasHoy: 24,
    totalVentasHoy: 892.50,
    ticketPromedio: 37.19,
    productosVendidosHoy: 68,
    productosBajoStock: 5,
    fiadosPendientes: 264.00,
};
