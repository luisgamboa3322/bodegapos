"use client";

import { CartItem } from "@/types";

interface TicketProps {
  numeroDocumento: string;
  fecha: Date;
  cajero: string;
  items: CartItem[];
  subtotal: number;
  igv: number;
  total: number;
  metodoPago: string;
  montoRecibido?: number;
  vuelto?: number;
  clienteNombre?: string;
}

export function Ticket({
  numeroDocumento,
  fecha,
  cajero,
  items,
  subtotal,
  igv,
  total,
  metodoPago,
  montoRecibido,
  vuelto,
  clienteNombre,
}: TicketProps) {
  return (
    <div
      id="ticket-print"
      className="bg-white text-black p-4 font-mono text-xs"
      style={{ width: "280px", margin: "0 auto" }}
    >
      {/* Header */}
      <div className="text-center border-b border-dashed border-black pb-2 mb-2">
        <div className="text-lg font-bold">🏪 BODEGA DON PEPE</div>
        <div className="text-[10px]">RUC: 20123456789</div>
        <div className="text-[10px]">Av. Los Olivos 123, SJL, Lima</div>
        <div className="text-[10px]">Tel: 01 234-5678</div>
      </div>

      {/* Documento */}
      <div className="text-center border-b border-dashed border-black pb-2 mb-2">
        <div className="font-bold">BOLETA DE VENTA ELECTRÓNICA</div>
        <div className="text-base font-bold">{numeroDocumento}</div>
      </div>

      {/* Info */}
      <div className="text-[10px] border-b border-dashed border-black pb-2 mb-2">
        <div className="flex justify-between">
          <span>Fecha:</span>
          <span>{fecha.toLocaleDateString("es-PE")}</span>
        </div>
        <div className="flex justify-between">
          <span>Hora:</span>
          <span>{fecha.toLocaleTimeString("es-PE", { hour: "2-digit", minute: "2-digit" })}</span>
        </div>
        <div className="flex justify-between">
          <span>Cajero:</span>
          <span>{cajero}</span>
        </div>
        {clienteNombre && (
          <div className="flex justify-between">
            <span>Cliente:</span>
            <span>{clienteNombre}</span>
          </div>
        )}
      </div>

      {/* Items Header */}
      <div className="flex justify-between font-bold text-[10px] border-b border-black pb-1 mb-1">
        <span className="w-8">Cant</span>
        <span className="flex-1">Descripción</span>
        <span className="w-16 text-right">Importe</span>
      </div>

      {/* Items */}
      <div className="border-b border-dashed border-black pb-2 mb-2">
        {items.map((item, index) => (
          <div key={index} className="flex justify-between text-[10px] py-0.5">
            <span className="w-8">{item.cantidad}</span>
            <span className="flex-1 truncate pr-2">{item.producto.nombre}</span>
            <span className="w-16 text-right">S/ {item.subtotal.toFixed(2)}</span>
          </div>
        ))}
      </div>

      {/* Totals */}
      <div className="text-[11px] space-y-1">
        <div className="flex justify-between">
          <span>Op. Gravada:</span>
          <span>S/ {subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>IGV (18%):</span>
          <span>S/ {igv.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-base font-bold border-t border-black pt-1 mt-1">
          <span>TOTAL:</span>
          <span>S/ {total.toFixed(2)}</span>
        </div>
      </div>

      {/* Pago */}
      <div className="border-t border-dashed border-black pt-2 mt-2 text-[10px]">
        <div className="flex justify-between">
          <span>Método de pago:</span>
          <span className="uppercase font-bold">{metodoPago}</span>
        </div>
        {montoRecibido !== undefined && metodoPago === "efectivo" && (
          <>
            <div className="flex justify-between">
              <span>Recibido:</span>
              <span>S/ {montoRecibido.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-bold">
              <span>Vuelto:</span>
              <span>S/ {(vuelto || 0).toFixed(2)}</span>
            </div>
          </>
        )}
      </div>

      {/* Footer */}
      <div className="text-center border-t border-dashed border-black pt-3 mt-3">
        <div className="text-[10px]">Representación impresa de la</div>
        <div className="text-[10px]">Boleta de Venta Electrónica</div>
        <div className="text-[10px] mt-2">Consulte su comprobante en:</div>
        <div className="text-[10px] font-bold">www.sunat.gob.pe</div>
        <div className="mt-3 text-sm">¡Gracias por su compra!</div>
        <div className="text-[10px]">Vuelva pronto 🛒</div>
      </div>

      {/* Hash simulado */}
      <div className="text-center mt-3 pt-2 border-t border-dashed border-black">
        <div className="text-[8px] text-gray-600">
          Hash: {btoa(numeroDocumento).substring(0, 20)}...
        </div>
      </div>
    </div>
  );
}

export function TicketMini({ numeroDocumento, total }: { numeroDocumento: string; total: number }) {
  return (
    <div className="bg-white text-black p-3 font-mono text-xs rounded border" style={{ width: "200px" }}>
      <div className="text-center">
        <div className="font-bold">🏪 BODEGA DON PEPE</div>
        <div className="text-[10px] text-gray-600">{numeroDocumento}</div>
        <div className="text-lg font-bold mt-2">S/ {total.toFixed(2)}</div>
        <div className="text-[10px] text-gray-500 mt-1">
          {new Date().toLocaleString("es-PE")}
        </div>
      </div>
    </div>
  );
}
