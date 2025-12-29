// ============================================
// TIPOS PARA BODEGAPOS - Sistema POS para Bodegas
// ============================================

// Tienda/Negocio
export interface Tienda {
  id: string;
  nombre: string;
  ruc?: string;
  direccion?: string;
  telefono?: string;
  logo_url?: string;
  plan: 'gratis' | 'basico' | 'pro' | 'business';
  created_at: string;
  updated_at: string;
}

// Usuario
export interface Usuario {
  id: string;
  tienda_id: string;
  email: string;
  nombre: string;
  rol: 'admin' | 'cajero' | 'almacenero';
  avatar_url?: string;
  activo: boolean;
  created_at: string;
}

// Categoría de productos
export interface Categoria {
  id: string;
  tienda_id: string;
  nombre: string;
  icono: string;
  color: string;
  orden: number;
  activo: boolean;
}

// Producto
export interface Producto {
  id: string;
  tienda_id: string;
  categoria_id: string;
  codigo_barras?: string;
  nombre: string;
  descripcion?: string;
  precio_compra: number;
  precio_venta: number;
  stock_actual: number;
  stock_minimo: number;
  unidad_medida: 'unidad' | 'kg' | 'litro' | 'caja';
  fecha_vencimiento?: string;
  imagen_url?: string;
  activo: boolean;
  created_at: string;
  updated_at: string;
  categoria?: Categoria;
}

// Cliente
export interface Cliente {
  id: string;
  tienda_id: string;
  dni?: string;
  nombre: string;
  telefono?: string;
  email?: string;
  direccion?: string;
  saldo_fiado: number;
  limite_credito: number;
  activo: boolean;
  created_at: string;
}

// Venta
export interface Venta {
  id: string;
  tienda_id: string;
  usuario_id: string;
  cliente_id?: string;
  numero_documento: string;
  tipo_documento: 'boleta' | 'factura' | 'ticket';
  subtotal: number;
  igv: number;
  total: number;
  metodo_pago: 'efectivo' | 'yape' | 'plin' | 'tarjeta' | 'mixto' | 'fiado';
  monto_recibido: number;
  vuelto: number;
  es_fiado: boolean;
  estado: 'completada' | 'anulada' | 'pendiente';
  estado_sunat?: 'pendiente' | 'enviada' | 'aceptada' | 'rechazada';
  observaciones?: string;
  created_at: string;
  items?: VentaItem[];
  cliente?: Cliente;
  usuario?: Usuario;
}

// Item de venta
export interface VentaItem {
  id: string;
  venta_id: string;
  producto_id: string;
  cantidad: number;
  precio_unitario: number;
  descuento: number;
  subtotal: number;
  producto?: Producto;
}

// Fiado (Crédito)
export interface Fiado {
  id: string;
  cliente_id: string;
  venta_id: string;
  monto_original: number;
  monto_pendiente: number;
  fecha_limite?: string;
  estado: 'pendiente' | 'parcial' | 'pagado' | 'vencido';
  created_at: string;
  cliente?: Cliente;
  venta?: Venta;
  pagos?: PagoFiado[];
}

// Pago de fiado
export interface PagoFiado {
  id: string;
  fiado_id: string;
  monto: number;
  metodo_pago: 'efectivo' | 'yape' | 'plin' | 'tarjeta';
  observaciones?: string;
  created_at: string;
}

// Item del carrito (estado local)
export interface CartItem {
  producto: Producto;
  cantidad: number;
  precio_unitario: number;
  descuento: number;
  subtotal: number;
}

// Resumen del carrito
export interface CartSummary {
  items: CartItem[];
  subtotal: number;
  igv: number;
  total: number;
  totalItems: number;
}

// Estadísticas del dashboard
export interface DashboardStats {
  ventasHoy: number;
  ventasSemana: number;
  ventasMes: number;
  totalVentasHoy: number;
  ticketPromedio: number;
  productosVendidosHoy: number;
  productosBajoStock: number;
  fiadosPendientes: number;
  topProductos: { producto: Producto; cantidad: number; total: number }[];
  ventasPorHora: { hora: string; total: number }[];
  ventasPorDia: { dia: string; total: number }[];
}

// Alertas
export interface Alerta {
  id: string;
  tipo: 'stock_bajo' | 'vencimiento' | 'fiado_vencido' | 'meta_cumplida';
  titulo: string;
  mensaje: string;
  producto_id?: string;
  cliente_id?: string;
  leida: boolean;
  created_at: string;
}

// Configuración de la tienda
export interface ConfiguracionTienda {
  igv_incluido: boolean;
  igv_porcentaje: number;
  moneda: string;
  formato_numero_documento: string;
  ultimo_numero_boleta: number;
  ultimo_numero_factura: number;
  permitir_fiado: boolean;
  permitir_stock_negativo: boolean;
  notificar_stock_bajo: boolean;
  dias_alerta_vencimiento: number;
}
