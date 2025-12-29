"use client";

import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Search,
  Plus,
  Minus,
  Trash2,
  X,
  Banknote,
  Smartphone,
  FileText,
  CheckCircle,
  Store,
  User,
  ShoppingCart,
  ArrowLeft,
  Receipt,
  FileCheck,
  Download,
  Printer,
} from "lucide-react";
import { categoriasDemo, productosConCategoria, clientesDemo } from "@/lib/demo-data";
import { useCartStore } from "@/lib/store";
import { cn } from "@/lib/utils";
import { Producto, Cliente } from "@/types";
import { TipoComprobante, DatosComprobante, emisorDemo, configuracionDemo, generarNumeroComprobante, generarHashCPE } from "@/types/comprobante";
import { Comprobante, ComprobanteTicket } from "@/components/pos/comprobante";
import { descargarComprobantePDF } from "@/lib/pdf";
import Link from "next/link";
import { toast } from "sonner";

type MetodoPago = "efectivo" | "yape" | "plin" | "fiado";

const tiposComprobante = [
  { id: "boleta" as TipoComprobante, label: "Boleta", icon: Receipt, color: "text-blue-600", description: "Para consumidores finales" },
  { id: "factura" as TipoComprobante, label: "Factura", icon: FileCheck, color: "text-green-600", description: "Para empresas (RUC)" },
  { id: "ticket" as TipoComprobante, label: "Ticket", icon: FileText, color: "text-gray-600", description: "Ventas menores" },
];

export default function POSPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoriaActiva, setCategoriaActiva] = useState<string | null>(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showComprobanteModal, setShowComprobanteModal] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<MetodoPago>("efectivo");
  const [clienteSeleccionado, setClienteSeleccionado] = useState<Cliente | null>(null);
  const [showClienteModal, setShowClienteModal] = useState(false);
  const [clienteSearch, setClienteSearch] = useState("");
  const [montoRecibido, setMontoRecibido] = useState("");
  const [lastVentaNumero, setLastVentaNumero] = useState("");
  
  // Estados para comprobante
  const [tipoComprobante, setTipoComprobante] = useState<TipoComprobante>("boleta");
  const [showFacturaForm, setShowFacturaForm] = useState(false);
  const [datosFactura, setDatosFactura] = useState({
    ruc: "",
    razonSocial: "",
    direccion: "",
  });
  const [comprobanteGenerado, setComprobanteGenerado] = useState<DatosComprobante | null>(null);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

  const {
    items,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    getTotal,
    getTotalItems,
  } = useCartStore();

  const total = getTotal();
  const totalItems = getTotalItems();
  const vuelto = montoRecibido ? parseFloat(montoRecibido) - total : 0;

  // Filtrar productos
  const productosFiltrados = useMemo(() => {
    let productos = productosConCategoria;

    if (categoriaActiva) {
      productos = productos.filter((p) => p.categoria_id === categoriaActiva);
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      productos = productos.filter(
        (p) =>
          p.nombre.toLowerCase().includes(query) ||
          p.codigo_barras?.includes(query)
      );
    }

    return productos;
  }, [categoriaActiva, searchQuery]);

  // Filtrar clientes
  const clientesFiltrados = useMemo(() => {
    if (!clienteSearch) return clientesDemo;
    const query = clienteSearch.toLowerCase();
    return clientesDemo.filter(
      (c) =>
        c.nombre.toLowerCase().includes(query) ||
        c.dni?.includes(query) ||
        c.telefono?.includes(query)
    );
  }, [clienteSearch]);

  const handleAddProduct = (producto: Producto) => {
    if (producto.stock_actual <= 0) {
      toast.error("Producto sin stock");
      return;
    }
    addItem(producto);
    toast.success(`${producto.nombre} agregado`);
  };

  const generarComprobante = (): DatosComprobante => {
    const { serie, numero } = generarNumeroComprobante(tipoComprobante, configuracionDemo);
    const subtotal = total / 1.18;
    const igv = total - subtotal;

    return {
      tipo: tipoComprobante,
      serie,
      numero,
      fecha: new Date(),
      emisor: emisorDemo,
      cliente: {
        tipoDocumento: tipoComprobante === 'factura' ? 'RUC' : (clienteSeleccionado?.dni ? 'DNI' : 'SIN_DOCUMENTO'),
        numeroDocumento: tipoComprobante === 'factura' ? datosFactura.ruc : (clienteSeleccionado?.dni || ''),
        nombre: tipoComprobante === 'factura' ? datosFactura.razonSocial : (clienteSeleccionado?.nombre || 'Cliente General'),
        direccion: tipoComprobante === 'factura' ? datosFactura.direccion : undefined,
      },
      items: items.map(item => ({
        cantidad: item.cantidad,
        unidad: 'UND',
        descripcion: item.producto.nombre,
        precioUnitario: item.precio_unitario,
        subtotal: item.subtotal,
      })),
      subtotal,
      igv,
      total,
      metodoPago: selectedPayment,
      montoRecibido: selectedPayment === 'efectivo' ? parseFloat(montoRecibido) : undefined,
      vuelto: selectedPayment === 'efectivo' && vuelto > 0 ? vuelto : undefined,
      cajero: 'María García',
      hashCPE: tipoComprobante !== 'ticket' ? generarHashCPE() : undefined,
    };
  };

  const handleCompleteSale = () => {
    if (items.length === 0) {
      toast.error("Agrega productos al carrito");
      return;
    }

    if (selectedPayment === "fiado" && !clienteSeleccionado) {
      toast.error("Selecciona un cliente para el fiado");
      setShowClienteModal(true);
      return;
    }

    if (selectedPayment === "efectivo" && parseFloat(montoRecibido || "0") < total) {
      toast.error("El monto recibido es insuficiente");
      return;
    }

    if (tipoComprobante === 'factura' && (!datosFactura.ruc || !datosFactura.razonSocial)) {
      toast.error("Completa los datos de factura (RUC y Razón Social)");
      setShowFacturaForm(true);
      return;
    }

    // Generar comprobante
    const comprobante = generarComprobante();
    setComprobanteGenerado(comprobante);
    setLastVentaNumero(`${comprobante.serie}-${comprobante.numero}`);
    
    setShowPaymentModal(false);
    setShowSuccessModal(true);
  };

  const handleDescargarPDF = async () => {
    if (!comprobanteGenerado) return;
    
    setIsGeneratingPDF(true);
    try {
      await descargarComprobantePDF(comprobanteGenerado);
      toast.success("PDF descargado correctamente");
    } catch (error) {
      toast.error("Error al generar PDF");
      console.error(error);
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  const handleNuevaVenta = () => {
    clearCart();
    setClienteSeleccionado(null);
    setMontoRecibido("");
    setSelectedPayment("efectivo");
    setTipoComprobante("boleta");
    setDatosFactura({ ruc: "", razonSocial: "", direccion: "" });
    setComprobanteGenerado(null);
    setShowSuccessModal(false);
  };

  const paymentMethods = [
    { id: "efectivo" as MetodoPago, label: "Efectivo", icon: Banknote, color: "text-green-600" },
    { id: "yape" as MetodoPago, label: "Yape", icon: Smartphone, color: "text-purple-600" },
    { id: "plin" as MetodoPago, label: "Plin", icon: Smartphone, color: "text-cyan-600" },
    { id: "fiado" as MetodoPago, label: "Fiado", icon: FileText, color: "text-amber-600" },
  ];

  const quickAmounts = [5, 10, 20, 50, 100, 200];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 h-16 border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
        <div className="flex h-full items-center justify-between px-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" asChild>
              <Link href="/dashboard">
                <ArrowLeft className="h-5 w-5" />
              </Link>
            </Button>
            <div className="flex items-center gap-2">
              <Store className="h-6 w-6 text-primary" />
              <span className="text-lg font-bold">Punto de Venta</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="gap-1">
              <User className="h-3 w-3" />
              María G.
            </Badge>
          </div>
        </div>
      </header>

      <div className="flex h-[calc(100vh-4rem)]">
        {/* Products Section */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Search and Categories */}
          <div className="p-4 space-y-4 border-b bg-card">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Buscar producto o escanear código..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12 text-lg"
              />
              {searchQuery && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-1/2 -translate-y-1/2"
                  onClick={() => setSearchQuery("")}
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>

            {/* Categories */}
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
              <button
                onClick={() => setCategoriaActiva(null)}
                className={cn(
                  "category-chip whitespace-nowrap",
                  !categoriaActiva
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted hover:bg-muted/80"
                )}
              >
                🏪 Todos
              </button>
              {categoriasDemo.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setCategoriaActiva(cat.id === categoriaActiva ? null : cat.id)}
                  className={cn(
                    "category-chip whitespace-nowrap",
                    categoriaActiva === cat.id
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted hover:bg-muted/80"
                  )}
                >
                  {cat.icono} {cat.nombre}
                </button>
              ))}
            </div>
          </div>

          {/* Products Grid */}
          <ScrollArea className="flex-1 p-4">
            <div className="pos-grid">
              {productosFiltrados.map((producto) => {
                const enCarrito = items.find((i) => i.producto.id === producto.id);
                const sinStock = producto.stock_actual <= 0;

                return (
                  <button
                    key={producto.id}
                    onClick={() => handleAddProduct(producto)}
                    disabled={sinStock}
                    className={cn(
                      "product-card text-left",
                      enCarrito && "selected",
                      sinStock && "opacity-50 cursor-not-allowed"
                    )}
                  >
                    {/* Category badge */}
                    <div
                      className="absolute top-2 left-2 text-lg"
                      title={producto.categoria?.nombre}
                    >
                      {producto.categoria?.icono}
                    </div>

                    {/* Quantity in cart */}
                    {enCarrito && (
                      <Badge className="absolute top-2 right-2 h-6 w-6 p-0 flex items-center justify-center">
                        {enCarrito.cantidad}
                      </Badge>
                    )}

                    {/* Product info */}
                    <div className="pt-8 space-y-1">
                      <p className="font-medium text-sm line-clamp-2 min-h-[2.5rem]">
                        {producto.nombre}
                      </p>
                      <div className="flex items-center justify-between">
                        <p className="text-lg font-bold text-primary">
                          S/ {producto.precio_venta.toFixed(2)}
                        </p>
                        <Badge
                          variant={sinStock ? "destructive" : "secondary"}
                          className="text-xs"
                        >
                          {producto.stock_actual}
                        </Badge>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {productosFiltrados.length === 0 && (
              <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
                <Search className="h-12 w-12 mb-4 opacity-50" />
                <p className="text-lg">No se encontraron productos</p>
                <p className="text-sm">Intenta con otro término de búsqueda</p>
              </div>
            )}
          </ScrollArea>
        </div>

        {/* Cart Section */}
        <div className="w-full max-w-md border-l bg-card flex flex-col">
          {/* Cart Header */}
          <div className="p-4 border-b">
            <div className="flex items-center justify-between">
              <h2 className="font-semibold flex items-center gap-2">
                <ShoppingCart className="h-5 w-5" />
                Carrito
                {totalItems > 0 && (
                  <Badge variant="secondary">{totalItems}</Badge>
                )}
              </h2>
              {items.length > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearCart}
                  className="text-destructive hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4 mr-1" />
                  Limpiar
                </Button>
              )}
            </div>

            {/* Cliente seleccionado */}
            {clienteSeleccionado && (
              <div className="mt-3 p-2 rounded-lg bg-primary/10 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium">
                    {clienteSeleccionado.nombre}
                  </span>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6"
                  onClick={() => setClienteSeleccionado(null)}
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            )}
          </div>

          {/* Cart Items */}
          <ScrollArea className="flex-1 p-4">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-muted-foreground py-12">
                <ShoppingCart className="h-16 w-16 mb-4 opacity-30" />
                <p className="text-lg font-medium">Carrito vacío</p>
                <p className="text-sm">Selecciona productos para agregar</p>
              </div>
            ) : (
              <div className="space-y-3">
                {items.map((item) => (
                  <div
                    key={item.producto.id}
                    className="cart-item-enter flex items-center gap-3 p-3 rounded-lg border bg-background"
                  >
                    {/* Product info */}
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate">
                        {item.producto.nombre}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        S/ {item.precio_unitario.toFixed(2)} c/u
                      </p>
                    </div>

                    {/* Quantity controls */}
                    <div className="flex items-center gap-1">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() =>
                          updateQuantity(item.producto.id, item.cantidad - 1)
                        }
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="w-8 text-center font-medium">
                        {item.cantidad}
                      </span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() =>
                          updateQuantity(item.producto.id, item.cantidad + 1)
                        }
                        disabled={item.cantidad >= item.producto.stock_actual}
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>

                    {/* Subtotal */}
                    <div className="text-right min-w-[70px]">
                      <p className="font-semibold">
                        S/ {item.subtotal.toFixed(2)}
                      </p>
                    </div>

                    {/* Remove button */}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-destructive hover:text-destructive"
                      onClick={() => removeItem(item.producto.id)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </ScrollArea>

          {/* Cart Footer */}
          <div className="border-t p-4 space-y-4 bg-muted/30">
            {/* Totals */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span>S/ {(total / 1.18).toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">IGV (18%)</span>
                <span>S/ {(total - total / 1.18).toFixed(2)}</span>
              </div>
              <Separator />
              <div className="flex justify-between text-xl font-bold">
                <span>Total</span>
                <span className="text-primary">S/ {total.toFixed(2)}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-3">
              <Button
                variant="outline"
                onClick={() => setShowClienteModal(true)}
                disabled={items.length === 0}
              >
                <User className="h-4 w-4 mr-2" />
                Cliente
              </Button>
              <Button
                onClick={() => setShowPaymentModal(true)}
                disabled={items.length === 0}
                size="lg"
                className="font-semibold"
              >
                Cobrar S/ {total.toFixed(2)}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Modal */}
      <Dialog open={showPaymentModal} onOpenChange={setShowPaymentModal}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl">Completar Venta</DialogTitle>
          </DialogHeader>

          <div className="space-y-6 py-4">
            {/* Total */}
            <div className="text-center py-4 rounded-lg bg-primary/10">
              <p className="text-sm text-muted-foreground mb-1">Total a cobrar</p>
              <p className="text-4xl font-bold text-primary">
                S/ {total.toFixed(2)}
              </p>
            </div>

            {/* Tipo de Comprobante */}
            <div className="space-y-3">
              <p className="font-medium">Tipo de comprobante</p>
              <div className="grid grid-cols-3 gap-2">
                {tiposComprobante.map((tipo) => (
                  <button
                    key={tipo.id}
                    onClick={() => {
                      setTipoComprobante(tipo.id);
                      setShowFacturaForm(tipo.id === 'factura');
                    }}
                    className={cn(
                      "flex flex-col items-center gap-1 p-3 rounded-lg border transition-all",
                      tipoComprobante === tipo.id
                        ? "border-primary bg-primary/10 ring-2 ring-primary"
                        : "hover:bg-muted"
                    )}
                  >
                    <tipo.icon className={cn("h-6 w-6", tipo.color)} />
                    <span className="font-medium text-sm">{tipo.label}</span>
                    <span className="text-[10px] text-muted-foreground text-center">
                      {tipo.description}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Datos de Factura */}
            {showFacturaForm && (
              <div className="space-y-3 p-4 rounded-lg border bg-muted/30">
                <p className="font-medium text-sm">Datos para Factura</p>
                <div className="grid gap-3">
                  <div className="grid gap-1">
                    <Label htmlFor="ruc" className="text-xs">RUC *</Label>
                    <Input
                      id="ruc"
                      placeholder="20123456789"
                      maxLength={11}
                      value={datosFactura.ruc}
                      onChange={(e) => setDatosFactura({ ...datosFactura, ruc: e.target.value })}
                    />
                  </div>
                  <div className="grid gap-1">
                    <Label htmlFor="razonSocial" className="text-xs">Razón Social *</Label>
                    <Input
                      id="razonSocial"
                      placeholder="EMPRESA S.A.C."
                      value={datosFactura.razonSocial}
                      onChange={(e) => setDatosFactura({ ...datosFactura, razonSocial: e.target.value })}
                    />
                  </div>
                  <div className="grid gap-1">
                    <Label htmlFor="direccionFactura" className="text-xs">Dirección</Label>
                    <Input
                      id="direccionFactura"
                      placeholder="Av. Ejemplo 123, Lima"
                      value={datosFactura.direccion}
                      onChange={(e) => setDatosFactura({ ...datosFactura, direccion: e.target.value })}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Payment Methods */}
            <div className="space-y-3">
              <p className="font-medium">Método de pago</p>
              <div className="grid grid-cols-2 gap-3">
                {paymentMethods.map((method) => (
                  <button
                    key={method.id}
                    onClick={() => setSelectedPayment(method.id)}
                    className={cn(
                      "payment-btn",
                      selectedPayment === method.id && "selected"
                    )}
                  >
                    <method.icon className={cn("h-6 w-6", method.color)} />
                    <span className="font-medium">{method.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Cash amount input */}
            {selectedPayment === "efectivo" && (
              <div className="space-y-3">
                <p className="font-medium">Monto recibido</p>
                <Input
                  type="number"
                  placeholder="0.00"
                  value={montoRecibido}
                  onChange={(e) => setMontoRecibido(e.target.value)}
                  className="text-2xl h-14 text-center font-bold"
                />
                <div className="flex flex-wrap gap-2">
                  {quickAmounts.map((amount) => (
                    <Button
                      key={amount}
                      variant="outline"
                      size="sm"
                      onClick={() => setMontoRecibido(String(amount))}
                    >
                      S/ {amount}
                    </Button>
                  ))}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setMontoRecibido(String(Math.ceil(total)))}
                  >
                    Exacto
                  </Button>
                </div>
                {vuelto > 0 && (
                  <div className="text-center py-3 rounded-lg bg-green-500/10">
                    <p className="text-sm text-muted-foreground">Vuelto</p>
                    <p className="text-2xl font-bold text-green-600">
                      S/ {vuelto.toFixed(2)}
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Fiado warning */}
            {selectedPayment === "fiado" && (
              <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/20">
                <p className="text-sm text-amber-600">
                  {clienteSeleccionado
                    ? `Se agregará S/ ${total.toFixed(2)} al fiado de ${clienteSeleccionado.nombre}`
                    : "Debes seleccionar un cliente para ventas al fiado"}
                </p>
              </div>
            )}
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowPaymentModal(false)}>
              Cancelar
            </Button>
            <Button onClick={handleCompleteSale} size="lg" className="gap-2">
              <CheckCircle className="h-5 w-5" />
              Confirmar Venta
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Cliente Selection Modal */}
      <Dialog open={showClienteModal} onOpenChange={setShowClienteModal}>
        <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Seleccionar Cliente</DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <Input
              placeholder="Buscar por nombre, DNI o teléfono..."
              value={clienteSearch}
              onChange={(e) => setClienteSearch(e.target.value)}
            />

            <ScrollArea className="h-[300px]">
              <div className="space-y-2">
                {clientesFiltrados.map((cliente) => (
                  <button
                    key={cliente.id}
                    onClick={() => {
                      setClienteSeleccionado(cliente);
                      setShowClienteModal(false);
                      setClienteSearch("");
                    }}
                    className={cn(
                      "w-full flex items-center gap-3 p-3 rounded-lg border text-left transition-colors",
                      "hover:bg-accent",
                      clienteSeleccionado?.id === cliente.id && "border-primary bg-primary/5"
                    )}
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                      <span className="text-sm font-semibold text-primary">
                        {cliente.nombre.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                      </span>
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{cliente.nombre}</p>
                      <p className="text-sm text-muted-foreground">
                        DNI: {cliente.dni} • {cliente.telefono}
                      </p>
                    </div>
                    {cliente.saldo_fiado > 0 && (
                      <Badge variant="destructive">
                        Debe S/ {cliente.saldo_fiado.toFixed(2)}
                      </Badge>
                    )}
                  </button>
                ))}
              </div>
            </ScrollArea>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowClienteModal(false)}>
              Cancelar
            </Button>
            <Button variant="outline">
              <Plus className="h-4 w-4 mr-2" />
              Nuevo Cliente
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Success Modal with Comprobante */}
      <Dialog open={showSuccessModal} onOpenChange={setShowSuccessModal}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <div className="space-y-6">
            {/* Success Header */}
            <div className="text-center space-y-2">
              <div className="mx-auto w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center">
                <CheckCircle className="h-10 w-10 text-green-500" />
              </div>
              <h2 className="text-xl font-bold text-green-600">¡Venta Exitosa!</h2>
              <p className="text-muted-foreground">{lastVentaNumero}</p>
            </div>

            {/* Comprobante Preview */}
            {comprobanteGenerado && (
              <div className="border rounded-lg overflow-hidden bg-white">
                {comprobanteGenerado.tipo === 'ticket' ? (
                  <ComprobanteTicket datos={comprobanteGenerado} />
                ) : (
                  <Comprobante datos={comprobanteGenerado} />
                )}
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-3 justify-center">
              <Button
                variant="outline"
                className="gap-2"
                onClick={handleNuevaVenta}
              >
                Nueva Venta
              </Button>
              <Button
                variant="outline"
                className="gap-2"
                onClick={handleDescargarPDF}
                disabled={isGeneratingPDF}
              >
                <Download className="h-4 w-4" />
                {isGeneratingPDF ? "Generando..." : "Descargar PDF"}
              </Button>
              <Button
                className="gap-2"
                onClick={() => {
                  toast.success("Enviando a impresora...");
                  window.print();
                }}
              >
                <Printer className="h-4 w-4" />
                Imprimir
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
