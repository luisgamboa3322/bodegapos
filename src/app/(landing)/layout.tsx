import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "BodegaPOS - Sistema de Punto de Venta para Bodegas",
  description: "El sistema POS más simple para bodegas y minimarkets peruanos. Control de ventas, inventario, fiado y facturación electrónica SUNAT.",
};

export default function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
