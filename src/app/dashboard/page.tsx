"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DashboardLayout } from "@/components/layout";
import {
  DollarSign,
  ShoppingCart,
  Package,
  Users,
  TrendingUp,
  AlertTriangle,
  CreditCard,
  ArrowUpRight,
  ArrowDownRight,
  Loader2,
} from "lucide-react";
import { statsDemo, productosDemo, clientesDemo, generarVentasDemo } from "@/lib/demo-data";
import Link from "next/link";

export default function DashboardPage() {
  // Hook para evitar problemas de hidratación SSR
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  // Pantalla de carga mientras se monta el componente
  if (!mounted) {
    return (
      <DashboardLayout>
        <div className="min-h-[60vh] flex items-center justify-center">
          <div className="text-center space-y-4">
            <Loader2 className="h-12 w-12 animate-spin mx-auto text-primary" />
            <p className="text-muted-foreground">Cargando dashboard...</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  // Generar datos SOLO después de que el componente esté montado
  const ventas = generarVentasDemo(30);
  const productosStockBajo = productosDemo.filter(
    (p) => p.stock_actual <= p.stock_minimo
  );
  const ventasRecientes = ventas.slice(0, 5);

  const stats = [
    {
      title: "Ventas de Hoy",
      value: `S/ ${statsDemo.totalVentasHoy.toFixed(2)}`,
      icon: DollarSign,
      change: "+12.5%",
      changeType: "positive" as const,
      subtitle: `${statsDemo.ventasHoy} transacciones`,
    },
    {
      title: "Ticket Promedio",
      value: `S/ ${statsDemo.ticketPromedio.toFixed(2)}`,
      icon: ShoppingCart,
      change: "+5.2%",
      changeType: "positive" as const,
      subtitle: "vs. ayer",
    },
    {
      title: "Productos Vendidos",
      value: statsDemo.productosVendidosHoy.toString(),
      icon: Package,
      change: "+8.1%",
      changeType: "positive" as const,
      subtitle: "unidades hoy",
    },
    {
      title: "Fiados Pendientes",
      value: `S/ ${statsDemo.fiadosPendientes.toFixed(2)}`,
      icon: CreditCard,
      change: "-3.2%",
      changeType: "negative" as const,
      subtitle: `${clientesDemo.filter((c) => c.saldo_fiado > 0).length} clientes`,
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
              ¡Hola, María! 👋
            </h1>
            <p className="text-muted-foreground">
              Aquí tienes el resumen de tu negocio hoy
            </p>
          </div>
          <div className="flex gap-3">
            <Button asChild size="lg" className="gap-2">
              <Link href="/pos">
                <ShoppingCart className="h-5 w-5" />
                Iniciar Venta
              </Link>
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <Card key={stat.title} className="dashboard-card">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <div className="rounded-lg bg-primary/10 p-2">
                  <stat.icon className="h-5 w-5 text-primary" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="flex items-center gap-2 mt-1">
                  <Badge
                    variant={
                      stat.changeType === "positive" ? "default" : "destructive"
                    }
                    className="gap-1 px-1.5 py-0.5"
                  >
                    {stat.changeType === "positive" ? (
                      <ArrowUpRight className="h-3 w-3" />
                    ) : (
                      <ArrowDownRight className="h-3 w-3" />
                    )}
                    {stat.change}
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    {stat.subtitle}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Content Grid */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Ventas Recientes */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg">Ventas Recientes</CardTitle>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/reportes">Ver todo</Link>
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {ventasRecientes.map((venta) => (
                  <div
                    key={venta.id}
                    className="flex items-center justify-between border-b pb-3 last:border-0 last:pb-0"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                        <ShoppingCart className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">{venta.numero_documento}</p>
                        <p className="text-sm text-muted-foreground">
                          {venta.items?.length || 0} productos •{" "}
                          {new Date(venta.created_at).toLocaleTimeString("es-PE", {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">S/ {venta.total.toFixed(2)}</p>
                      <Badge variant="outline" className="text-xs capitalize">
                        {venta.metodo_pago}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Alertas */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-amber-500" />
                Alertas de Stock
              </CardTitle>
              <Badge variant="destructive">{productosStockBajo.length}</Badge>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {productosStockBajo.slice(0, 5).map((producto) => (
                  <div
                    key={producto.id}
                    className="flex items-center justify-between border-b pb-3 last:border-0 last:pb-0"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-500/10">
                        <Package className="h-5 w-5 text-amber-500" />
                      </div>
                      <div>
                        <p className="font-medium">{producto.nombre}</p>
                        <p className="text-sm text-muted-foreground">
                          Stock mínimo: {producto.stock_minimo}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge variant="destructive">
                        {producto.stock_actual} uds
                      </Badge>
                    </div>
                  </div>
                ))}
                {productosStockBajo.length === 0 && (
                  <div className="text-center py-6 text-muted-foreground">
                    <Package className="h-12 w-12 mx-auto mb-2 opacity-50" />
                    <p>¡Todo el stock está bien! 🎉</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Productos más vendidos */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              Productos Más Vendidos Hoy
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {productosDemo.slice(0, 4).map((producto, index) => (
                <div
                  key={producto.id}
                  className="flex items-center gap-3 p-3 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-2xl font-bold text-primary">
                    #{index + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{producto.nombre}</p>
                    <p className="text-sm text-muted-foreground">
                      S/ {producto.precio_venta.toFixed(2)}
                    </p>
                  </div>
                  <Badge variant="secondary">
                    {Math.floor(Math.random() * 20) + 5} uds
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Clientes con Fiado */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              Clientes con Fiado Pendiente
            </CardTitle>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/fiado">Ver todo</Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {clientesDemo
                .filter((c) => c.saldo_fiado > 0)
                .slice(0, 3)
                .map((cliente) => (
                  <div
                    key={cliente.id}
                    className="flex items-center gap-3 p-3 rounded-lg border"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                      <span className="text-sm font-semibold text-primary">
                        {cliente.nombre
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                          .slice(0, 2)}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{cliente.nombre}</p>
                      <p className="text-sm text-muted-foreground">
                        {cliente.telefono}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-destructive">
                        S/ {cliente.saldo_fiado.toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
