"use client";

import { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DollarSign,
  ShoppingCart,
  TrendingUp,
  TrendingDown,
  Package,
  Calendar,
  Download,
  BarChart3,
  PieChart,
  ArrowUpRight,
  ArrowDownRight,
  Loader2,
} from "lucide-react";
import { generarVentasDemo } from "@/lib/demo-data";
import { exportVentasCSV } from "@/lib/export";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

export default function ReportesPage() {
  // Hook para evitar problemas de hidratación SSR
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  const [periodoSeleccionado, setPeriodoSeleccionado] = useState("hoy");
  const ventas = generarVentasDemo(50);

  // Pantalla de carga mientras se monta el componente
  if (!mounted) {
    return (
      <DashboardLayout>
        <div className="min-h-[60vh] flex items-center justify-center">
          <div className="text-center space-y-4">
            <Loader2 className="h-12 w-12 animate-spin mx-auto text-primary" />
            <p className="text-muted-foreground">Cargando reportes...</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  const handleExport = () => {
    exportVentasCSV(ventas);
    toast.success("Ventas exportadas a CSV");
  };

  // Calcular estadísticas
  const totalVentas = ventas.reduce((sum, v) => sum + v.total, 0);
  const totalTransacciones = ventas.length;
  const ticketPromedio = totalVentas / totalTransacciones;

  // Ventas por método de pago
  const ventasPorMetodo = ventas.reduce((acc, v) => {
    acc[v.metodo_pago] = (acc[v.metodo_pago] || 0) + v.total;
    return acc;
  }, {} as Record<string, number>);

  // Productos más vendidos
  const productosVendidos = ventas.flatMap((v) => v.items || []).reduce((acc, item) => {
    if (item.producto) {
      const existing = acc.find((p) => p.id === item.producto_id);
      if (existing) {
        existing.cantidad += item.cantidad;
        existing.total += item.subtotal;
      } else {
        acc.push({
          id: item.producto_id,
          nombre: item.producto.nombre,
          cantidad: item.cantidad,
          total: item.subtotal,
        });
      }
    }
    return acc;
  }, [] as { id: string; nombre: string; cantidad: number; total: number }[]);

  const topProductos = productosVendidos
    .sort((a, b) => b.cantidad - a.cantidad)
    .slice(0, 10);

  const stats = [
    {
      title: "Total Ventas",
      value: `S/ ${totalVentas.toFixed(2)}`,
      icon: DollarSign,
      change: "+15.2%",
      changeType: "positive" as const,
      color: "text-green-600",
      bgColor: "bg-green-500/10",
    },
    {
      title: "Transacciones",
      value: totalTransacciones.toString(),
      icon: ShoppingCart,
      change: "+8.5%",
      changeType: "positive" as const,
      color: "text-blue-600",
      bgColor: "bg-blue-500/10",
    },
    {
      title: "Ticket Promedio",
      value: `S/ ${ticketPromedio.toFixed(2)}`,
      icon: TrendingUp,
      change: "+3.2%",
      changeType: "positive" as const,
      color: "text-purple-600",
      bgColor: "bg-purple-500/10",
    },
    {
      title: "Productos Vendidos",
      value: productosVendidos.reduce((sum, p) => sum + p.cantidad, 0).toString(),
      icon: Package,
      change: "+12.1%",
      changeType: "positive" as const,
      color: "text-amber-600",
      bgColor: "bg-amber-500/10",
    },
  ];

  const metodosPagoLabels: Record<string, { label: string; color: string }> = {
    efectivo: { label: "Efectivo", color: "bg-green-500" },
    yape: { label: "Yape", color: "bg-purple-500" },
    plin: { label: "Plin", color: "bg-cyan-500" },
    tarjeta: { label: "Tarjeta", color: "bg-blue-500" },
    fiado: { label: "Fiado", color: "bg-amber-500" },
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
              Reportes
            </h1>
            <p className="text-muted-foreground">
              Analiza el rendimiento de tu negocio
            </p>
          </div>
          <div className="flex gap-3">
            <Select value={periodoSeleccionado} onValueChange={setPeriodoSeleccionado}>
              <SelectTrigger className="w-[180px]">
                <Calendar className="h-4 w-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="hoy">Hoy</SelectItem>
                <SelectItem value="semana">Esta semana</SelectItem>
                <SelectItem value="mes">Este mes</SelectItem>
                <SelectItem value="año">Este año</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="gap-2" onClick={handleExport}>
              <Download className="h-4 w-4" />
              Exportar
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <Card key={stat.title} className="dashboard-card">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <div className={cn("p-2 rounded-lg", stat.bgColor)}>
                  <stat.icon className={cn("h-5 w-5", stat.color)} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="flex items-center gap-2 mt-1">
                  <Badge
                    variant={stat.changeType === "positive" ? "default" : "destructive"}
                    className="gap-1 px-1.5 py-0.5"
                  >
                    {stat.changeType === "positive" ? (
                      <ArrowUpRight className="h-3 w-3" />
                    ) : (
                      <ArrowDownRight className="h-3 w-3" />
                    )}
                    {stat.change}
                  </Badge>
                  <span className="text-xs text-muted-foreground">vs. periodo anterior</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Tabs */}
        <Tabs defaultValue="ventas" className="space-y-4">
          <TabsList>
            <TabsTrigger value="ventas" className="gap-2">
              <BarChart3 className="h-4 w-4" />
              Ventas
            </TabsTrigger>
            <TabsTrigger value="productos" className="gap-2">
              <Package className="h-4 w-4" />
              Productos
            </TabsTrigger>
            <TabsTrigger value="metodos" className="gap-2">
              <PieChart className="h-4 w-4" />
              Métodos de Pago
            </TabsTrigger>
          </TabsList>

          {/* Ventas Tab */}
          <TabsContent value="ventas">
            <Card>
              <CardHeader>
                <CardTitle>Historial de Ventas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>N° Documento</TableHead>
                        <TableHead>Fecha/Hora</TableHead>
                        <TableHead>Productos</TableHead>
                        <TableHead>Método</TableHead>
                        <TableHead className="text-right">Total</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {ventas.slice(0, 15).map((venta) => (
                        <TableRow key={venta.id}>
                          <TableCell className="font-medium">
                            {venta.numero_documento}
                          </TableCell>
                          <TableCell>
                            {new Date(venta.created_at).toLocaleString("es-PE", {
                              day: "2-digit",
                              month: "2-digit",
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </TableCell>
                          <TableCell>
                            <Badge variant="secondary">
                              {venta.items?.length || 0} items
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant="outline"
                              className="capitalize"
                            >
                              {venta.metodo_pago}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right font-semibold">
                            S/ {venta.total.toFixed(2)}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Productos Tab */}
          <TabsContent value="productos">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  Top 10 Productos Más Vendidos
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-12">#</TableHead>
                        <TableHead>Producto</TableHead>
                        <TableHead className="text-right">Cantidad</TableHead>
                        <TableHead className="text-right">Total Vendido</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {topProductos.map((producto, index) => (
                        <TableRow key={producto.id}>
                          <TableCell>
                            <div
                              className={cn(
                                "flex h-8 w-8 items-center justify-center rounded-full font-bold",
                                index === 0
                                  ? "bg-amber-500/20 text-amber-600"
                                  : index === 1
                                  ? "bg-slate-300/50 text-slate-600"
                                  : index === 2
                                  ? "bg-orange-500/20 text-orange-600"
                                  : "bg-muted text-muted-foreground"
                              )}
                            >
                              {index + 1}
                            </div>
                          </TableCell>
                          <TableCell className="font-medium">
                            {producto.nombre}
                          </TableCell>
                          <TableCell className="text-right">
                            <Badge variant="secondary">{producto.cantidad} uds</Badge>
                          </TableCell>
                          <TableCell className="text-right font-semibold">
                            S/ {producto.total.toFixed(2)}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Métodos de Pago Tab */}
          <TabsContent value="metodos">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Ventas por Método de Pago</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {Object.entries(ventasPorMetodo).map(([metodo, total]) => {
                      const config = metodosPagoLabels[metodo] || {
                        label: metodo,
                        color: "bg-gray-500",
                      };
                      const porcentaje = (total / totalVentas) * 100;

                      return (
                        <div key={metodo} className="space-y-2">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <div className={cn("h-3 w-3 rounded-full", config.color)} />
                              <span className="font-medium">{config.label}</span>
                            </div>
                            <div className="text-right">
                              <span className="font-semibold">S/ {total.toFixed(2)}</span>
                              <span className="text-sm text-muted-foreground ml-2">
                                ({porcentaje.toFixed(1)}%)
                              </span>
                            </div>
                          </div>
                          <div className="h-2 rounded-full bg-muted overflow-hidden">
                            <div
                              className={cn("h-full rounded-full", config.color)}
                              style={{ width: `${porcentaje}%` }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Resumen</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 rounded-lg bg-green-500/10">
                      <div>
                        <p className="text-sm text-muted-foreground">Efectivo recibido</p>
                        <p className="text-2xl font-bold text-green-600">
                          S/ {(ventasPorMetodo.efectivo || 0).toFixed(2)}
                        </p>
                      </div>
                      <DollarSign className="h-8 w-8 text-green-600" />
                    </div>
                    <div className="flex items-center justify-between p-4 rounded-lg bg-purple-500/10">
                      <div>
                        <p className="text-sm text-muted-foreground">Pagos digitales</p>
                        <p className="text-2xl font-bold text-purple-600">
                          S/ {((ventasPorMetodo.yape || 0) + (ventasPorMetodo.plin || 0)).toFixed(2)}
                        </p>
                      </div>
                      <TrendingUp className="h-8 w-8 text-purple-600" />
                    </div>
                    <div className="flex items-center justify-between p-4 rounded-lg bg-amber-500/10">
                      <div>
                        <p className="text-sm text-muted-foreground">Fiado (por cobrar)</p>
                        <p className="text-2xl font-bold text-amber-600">
                          S/ {(ventasPorMetodo.fiado || 0).toFixed(2)}
                        </p>
                      </div>
                      <TrendingDown className="h-8 w-8 text-amber-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
