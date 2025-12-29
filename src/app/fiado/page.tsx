"use client";

import { useState, useMemo, useEffect } from "react";
import { DashboardLayout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Search,
  DollarSign,
  CreditCard,
  Users,
  AlertTriangle,
  MessageCircle,
  CheckCircle,
  Phone,
  Calendar,
  Loader2,
} from "lucide-react";
import { clientesDemo, generarVentasDemo } from "@/lib/demo-data";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { Cliente } from "@/types";

export default function FiadoPage() {
  // Hook para evitar problemas de hidratación SSR
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  const [searchQuery, setSearchQuery] = useState("");
  const [showPagoModal, setShowPagoModal] = useState(false);
  const [selectedCliente, setSelectedCliente] = useState<Cliente | null>(null);
  const [montoPago, setMontoPago] = useState("");

  // TODOS los useMemo DEBEN estar ANTES de cualquier return condicional
  const clientesConFiado = useMemo(() => {
    return clientesDemo.filter((c) => c.saldo_fiado > 0);
  }, []);

  const clientesFiltrados = useMemo(() => {
    if (!searchQuery) return clientesConFiado;
    const query = searchQuery.toLowerCase();
    return clientesConFiado.filter(
      (c) =>
        c.nombre.toLowerCase().includes(query) ||
        c.dni?.includes(query) ||
        c.telefono?.includes(query)
    );
  }, [searchQuery, clientesConFiado]);

  // Pantalla de carga mientras se monta el componente
  if (!mounted) {
    return (
      <DashboardLayout>
        <div className="min-h-[60vh] flex items-center justify-center">
          <div className="text-center space-y-4">
            <Loader2 className="h-12 w-12 animate-spin mx-auto text-primary" />
            <p className="text-muted-foreground">Cargando control de fiado...</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  const totalFiado = clientesConFiado.reduce((sum, c) => sum + c.saldo_fiado, 0);

  const stats = [
    {
      title: "Total por Cobrar",
      value: `S/ ${totalFiado.toFixed(2)}`,
      icon: DollarSign,
      color: "text-red-600",
      bgColor: "bg-red-500/10",
    },
    {
      title: "Clientes con Fiado",
      value: clientesConFiado.length,
      icon: Users,
      color: "text-amber-600",
      bgColor: "bg-amber-500/10",
    },
    {
      title: "Promedio por Cliente",
      value: `S/ ${(totalFiado / (clientesConFiado.length || 1)).toFixed(2)}`,
      icon: CreditCard,
      color: "text-blue-600",
      bgColor: "bg-blue-500/10",
    },
  ];

  const handleRegistrarPago = (cliente: Cliente) => {
    setSelectedCliente(cliente);
    setMontoPago("");
    setShowPagoModal(true);
  };

  const handleConfirmarPago = () => {
    const monto = parseFloat(montoPago);
    if (!monto || monto <= 0) {
      toast.error("Ingresa un monto válido");
      return;
    }
    if (selectedCliente && monto > selectedCliente.saldo_fiado) {
      toast.error("El monto excede la deuda");
      return;
    }
    toast.success(`Pago de S/ ${monto.toFixed(2)} registrado para ${selectedCliente?.nombre}`);
    setShowPagoModal(false);
    setSelectedCliente(null);
    setMontoPago("");
  };

  const handleEnviarRecordatorio = (cliente: Cliente) => {
    if (cliente.telefono) {
      const mensaje = encodeURIComponent(
        `Hola ${cliente.nombre.split(" ")[0]}, te recordamos que tienes un saldo pendiente de S/ ${cliente.saldo_fiado.toFixed(2)} en nuestra bodega. ¡Gracias por tu preferencia! 🏪`
      );
      window.open(`https://wa.me/51${cliente.telefono}?text=${mensaje}`, "_blank");
      toast.success("Abriendo WhatsApp...");
    } else {
      toast.error("Cliente sin número de teléfono");
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
              Control de Fiado
            </h1>
            <p className="text-muted-foreground">
              Gestiona las deudas pendientes de tus clientes
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-3">
          {stats.map((stat) => (
            <Card key={stat.title}>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className={cn("p-2 rounded-lg", stat.bgColor)}>
                    <stat.icon className={cn("h-5 w-5", stat.color)} />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <p className="text-sm text-muted-foreground">{stat.title}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Search */}
        <Card>
          <CardContent className="p-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar cliente por nombre, DNI o teléfono..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        {/* Fiados List */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-amber-500" />
                Deudas Pendientes
              </span>
              <Badge variant="destructive">{clientesFiltrados.length} clientes</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {clientesFiltrados.length > 0 ? (
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Cliente</TableHead>
                      <TableHead>Teléfono</TableHead>
                      <TableHead className="text-right">Saldo Pendiente</TableHead>
                      <TableHead className="text-right">Límite</TableHead>
                      <TableHead className="text-right">Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {clientesFiltrados.map((cliente) => {
                      const porcentajeUsado = (cliente.saldo_fiado / cliente.limite_credito) * 100;

                      return (
                        <TableRow key={cliente.id}>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-500/10">
                                <span className="text-sm font-semibold text-red-600">
                                  {cliente.nombre
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")
                                    .slice(0, 2)}
                                </span>
                              </div>
                              <div>
                                <p className="font-medium">{cliente.nombre}</p>
                                <p className="text-sm text-muted-foreground">
                                  DNI: {cliente.dni || "-"}
                                </p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Phone className="h-4 w-4 text-muted-foreground" />
                              {cliente.telefono || "-"}
                            </div>
                          </TableCell>
                          <TableCell className="text-right">
                            <div>
                              <Badge
                                variant="destructive"
                                className="text-base font-semibold"
                              >
                                S/ {cliente.saldo_fiado.toFixed(2)}
                              </Badge>
                              <div className="mt-1 w-full bg-muted rounded-full h-1.5">
                                <div
                                  className={cn(
                                    "h-1.5 rounded-full",
                                    porcentajeUsado >= 80
                                      ? "bg-red-500"
                                      : porcentajeUsado >= 50
                                      ? "bg-amber-500"
                                      : "bg-green-500"
                                  )}
                                  style={{ width: `${Math.min(porcentajeUsado, 100)}%` }}
                                />
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className="text-right text-muted-foreground">
                            S/ {cliente.limite_credito.toFixed(2)}
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleEnviarRecordatorio(cliente)}
                                className="gap-1"
                              >
                                <MessageCircle className="h-4 w-4" />
                                Recordar
                              </Button>
                              <Button
                                size="sm"
                                onClick={() => handleRegistrarPago(cliente)}
                                className="gap-1"
                              >
                                <DollarSign className="h-4 w-4" />
                                Abonar
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
                <CheckCircle className="h-16 w-16 mb-4 text-green-500" />
                <p className="text-lg font-medium">¡Sin deudas pendientes!</p>
                <p className="text-sm">Todos los clientes están al día</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Payment Modal */}
      <Dialog open={showPagoModal} onOpenChange={setShowPagoModal}>
        <DialogContent className="max-w-sm max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Registrar Pago</DialogTitle>
          </DialogHeader>

          {selectedCliente && (
            <div className="space-y-4 py-4">
              {/* Client Info */}
              <div className="flex items-center gap-3 p-3 rounded-lg bg-muted">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <span className="text-base font-semibold text-primary">
                    {selectedCliente.nombre
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .slice(0, 2)}
                  </span>
                </div>
                <div>
                  <p className="font-medium">{selectedCliente.nombre}</p>
                  <p className="text-sm text-muted-foreground">
                    Deuda: S/ {selectedCliente.saldo_fiado.toFixed(2)}
                  </p>
                </div>
              </div>

              {/* Amount Input */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Monto a abonar</label>
                <Input
                  type="number"
                  step="0.50"
                  placeholder="0.00"
                  value={montoPago}
                  onChange={(e) => setMontoPago(e.target.value)}
                  className="text-2xl h-14 text-center font-bold"
                />
              </div>

              {/* Quick amounts */}
              <div className="flex flex-wrap gap-2">
                {[10, 20, 50, selectedCliente.saldo_fiado].map((amount) => (
                  <Button
                    key={amount}
                    variant="outline"
                    size="sm"
                    onClick={() => setMontoPago(String(amount))}
                  >
                    {amount === selectedCliente.saldo_fiado ? "Total" : `S/ ${amount}`}
                  </Button>
                ))}
              </div>

              {/* Remaining balance */}
              {montoPago && parseFloat(montoPago) > 0 && (
                <div className="text-center py-3 rounded-lg bg-green-500/10">
                  <p className="text-sm text-muted-foreground">Saldo restante</p>
                  <p className="text-xl font-bold text-green-600">
                    S/ {Math.max(0, selectedCliente.saldo_fiado - parseFloat(montoPago)).toFixed(2)}
                  </p>
                </div>
              )}
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowPagoModal(false)}>
              Cancelar
            </Button>
            <Button onClick={handleConfirmarPago} className="gap-2">
              <CheckCircle className="h-4 w-4" />
              Confirmar Pago
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
}
