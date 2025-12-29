"use client";

import { DatosComprobante, TipoComprobante } from "@/types/comprobante";
import { cn } from "@/lib/utils";

interface ComprobanteProps {
  datos: DatosComprobante;
  className?: string;
}

export function Comprobante({ datos, className }: ComprobanteProps) {
  const getTituloComprobante = (tipo: TipoComprobante) => {
    switch (tipo) {
      case 'boleta':
        return 'BOLETA DE VENTA ELECTRÓNICA';
      case 'factura':
        return 'FACTURA ELECTRÓNICA';
      case 'ticket':
        return 'TICKET DE VENTA';
    }
  };

  return (
    <div
      id="comprobante-pdf"
      className={cn(
        "bg-white text-black p-6 font-sans text-sm",
        className
      )}
      style={{ width: "400px", margin: "0 auto" }}
    >
      {/* Header - Datos del Emisor */}
      <div className="text-center border-b-2 border-black pb-4 mb-4">
        <div className="text-2xl font-bold mb-1">🏪 {datos.emisor.nombreComercial}</div>
        <div className="text-xs text-gray-600">{datos.emisor.razonSocial}</div>
        <div className="text-xs">RUC: {datos.emisor.ruc}</div>
        <div className="text-xs">{datos.emisor.direccion}</div>
        <div className="text-xs">
          {datos.emisor.distrito}, {datos.emisor.provincia} - {datos.emisor.departamento}
        </div>
        {datos.emisor.telefono && (
          <div className="text-xs">Tel: {datos.emisor.telefono}</div>
        )}
      </div>

      {/* Tipo de Comprobante */}
      <div className="text-center border-2 border-black py-3 mb-4">
        <div className="font-bold text-lg">{getTituloComprobante(datos.tipo)}</div>
        <div className="text-xl font-bold text-primary mt-1">
          {datos.serie}-{datos.numero}
        </div>
      </div>

      {/* Datos del Cliente */}
      <div className="border border-gray-300 p-3 mb-4 text-xs">
        <div className="grid grid-cols-2 gap-1">
          <div>
            <span className="font-semibold">Fecha:</span>{" "}
            {datos.fecha.toLocaleDateString("es-PE")}
          </div>
          <div>
            <span className="font-semibold">Hora:</span>{" "}
            {datos.fecha.toLocaleTimeString("es-PE", { hour: "2-digit", minute: "2-digit" })}
          </div>
        </div>
        <div className="mt-2">
          <span className="font-semibold">
            {datos.cliente.tipoDocumento === 'RUC' ? 'RUC' : 'DNI'}:
          </span>{" "}
          {datos.cliente.numeroDocumento || 'Sin documento'}
        </div>
        <div>
          <span className="font-semibold">Cliente:</span>{" "}
          {datos.cliente.nombre || 'Cliente General'}
        </div>
        {datos.cliente.direccion && (
          <div>
            <span className="font-semibold">Dirección:</span>{" "}
            {datos.cliente.direccion}
          </div>
        )}
      </div>

      {/* Detalle de Items */}
      <table className="w-full text-xs mb-4">
        <thead>
          <tr className="border-b-2 border-black">
            <th className="text-left py-1 w-12">Cant.</th>
            <th className="text-left py-1">Descripción</th>
            <th className="text-right py-1 w-16">P.Unit</th>
            <th className="text-right py-1 w-16">Importe</th>
          </tr>
        </thead>
        <tbody>
          {datos.items.map((item, index) => (
            <tr key={index} className="border-b border-gray-200">
              <td className="py-1">{item.cantidad}</td>
              <td className="py-1">{item.descripcion}</td>
              <td className="text-right py-1">S/ {item.precioUnitario.toFixed(2)}</td>
              <td className="text-right py-1">S/ {item.subtotal.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Totales */}
      <div className="border-t-2 border-black pt-2 space-y-1 text-sm">
        <div className="flex justify-between">
          <span>Op. Gravada:</span>
          <span>S/ {datos.subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>IGV (18%):</span>
          <span>S/ {datos.igv.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-lg font-bold border-t border-black pt-2 mt-2">
          <span>TOTAL:</span>
          <span>S/ {datos.total.toFixed(2)}</span>
        </div>
      </div>

      {/* Método de Pago */}
      <div className="border-t border-dashed border-gray-400 pt-2 mt-4 text-xs">
        <div className="flex justify-between">
          <span className="font-semibold">Forma de Pago:</span>
          <span className="uppercase">{datos.metodoPago}</span>
        </div>
        {datos.metodoPago === 'efectivo' && datos.montoRecibido && (
          <>
            <div className="flex justify-between">
              <span>Recibido:</span>
              <span>S/ {datos.montoRecibido.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-semibold">
              <span>Vuelto:</span>
              <span>S/ {(datos.vuelto || 0).toFixed(2)}</span>
            </div>
          </>
        )}
      </div>

      {/* QR y Hash - Solo para Boleta y Factura */}
      {datos.tipo !== 'ticket' && (
        <div className="border-t border-dashed border-gray-400 pt-4 mt-4">
          <div className="flex items-center gap-4">
            {/* QR Simulado */}
            <div className="w-20 h-20 border-2 border-black flex items-center justify-center text-xs text-center">
              <div>
                <div className="text-2xl">📱</div>
                <div className="text-[8px]">Escanear QR</div>
              </div>
            </div>
            <div className="flex-1 text-[9px] text-gray-600">
              <div className="mb-1">
                <span className="font-semibold">Representación impresa de la</span><br/>
                {datos.tipo === 'boleta' ? 'Boleta' : 'Factura'} de Venta Electrónica
              </div>
              <div className="break-all">
                <span className="font-semibold">Hash:</span><br/>
                {datos.hashCPE || 'xXxXxXxXxXxXxXxXxXxX'}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="text-center border-t border-dashed border-gray-400 pt-4 mt-4 text-xs text-gray-600">
        <div className="font-semibold mb-1">¡Gracias por su compra!</div>
        <div>Consulte su comprobante en:</div>
        <div className="font-semibold">www.sunat.gob.pe</div>
        <div className="mt-2 text-[10px]">
          Atendido por: {datos.cajero}
        </div>
      </div>
    </div>
  );
}

export function ComprobanteTicket({ datos }: { datos: DatosComprobante }) {
  return (
    <div
      id="comprobante-pdf"
      className="bg-white text-black p-4 font-mono text-xs"
      style={{ width: "280px", margin: "0 auto" }}
    >
      {/* Header */}
      <div className="text-center border-b border-dashed border-black pb-2 mb-2">
        <div className="font-bold text-lg">🏪 {datos.emisor.nombreComercial}</div>
        <div className="text-[10px]">RUC: {datos.emisor.ruc}</div>
        <div className="text-[10px]">{datos.emisor.direccion}</div>
      </div>

      {/* Ticket Number */}
      <div className="text-center border-b border-dashed border-black pb-2 mb-2">
        <div className="font-bold">TICKET DE VENTA</div>
        <div className="font-bold">{datos.serie}-{datos.numero}</div>
        <div className="text-[10px]">
          {datos.fecha.toLocaleDateString("es-PE")} {datos.fecha.toLocaleTimeString("es-PE", { hour: "2-digit", minute: "2-digit" })}
        </div>
      </div>

      {/* Items */}
      <div className="border-b border-dashed border-black pb-2 mb-2">
        {datos.items.map((item, index) => (
          <div key={index} className="flex justify-between py-0.5">
            <span>{item.cantidad}x {item.descripcion}</span>
            <span>S/ {item.subtotal.toFixed(2)}</span>
          </div>
        ))}
      </div>

      {/* Total */}
      <div className="text-center font-bold text-lg py-2 border-b border-dashed border-black">
        TOTAL: S/ {datos.total.toFixed(2)}
      </div>

      {/* Footer */}
      <div className="text-center pt-2 text-[10px]">
        <div>¡Gracias por su compra!</div>
        <div>Atendido por: {datos.cajero}</div>
      </div>
    </div>
  );
}
