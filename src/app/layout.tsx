import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BodegaPOS - Sistema de Punto de Venta",
  description: "Sistema POS + Inventario diseñado para bodegas y minimarkets peruanos. Control de ventas, inventario, fiado y facturación electrónica SUNAT.",
  keywords: ["POS", "bodega", "minimarket", "punto de venta", "inventario", "SUNAT", "Peru"],
  authors: [{ name: "BodegaPOS" }],
  openGraph: {
    title: "BodegaPOS - Sistema de Punto de Venta",
    description: "El sistema más simple para tu bodega. Controla ventas, inventario y fiado desde tu celular.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Toaster position="top-right" richColors />
      </body>
    </html>
  );
}
