"use client";

import { useState, useMemo, useEffect } from "react";
import { DashboardLayout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Search,
  Plus,
  MoreHorizontal,
  Pencil,
  Trash2,
  User,
  Users,
  CreditCard,
  Phone,
  MessageCircle,
  Download,
  Loader2,
} from "lucide-react";
import { clientesDemo } from "@/lib/demo-data";
import { exportClientesCSV } from "@/lib/export";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { Cliente } from "@/types";

export default function ClientesPage() {
  // Hook para evitar problemas de hidratación SSR
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  const [searchQuery, setSearchQuery] = useState("");
  const [showClienteModal, setShowClienteModal] = useState(false);
  const [selectedCliente, setSelectedCliente] = useState<Cliente | null>(null);

  // Filtrar clientes - DEBE estar ANTES de cualquier return condicional
  const clientesFiltrados = useMemo(() => {
    if (!searchQuery) return clientesDemo;
    const query = searchQuery.toLowerCase();
    return clientesDemo.filter(
      (c) =>
        c.nombre.toLowerCase().includes(query) ||
        c.dni?.includes(query) ||
        c.telefono?.includes(query)
    );
  }, [searchQuery]);

  // Pantalla de carga mientras se monta el componente
  if (!mounted) {
    return (
      <DashboardLayout>
        <div className="min-h-[60vh] flex items-center justify-center">
          <div className="text-center space-y-4">
            <Loader2 className="h-12 w-12 animate-spin mx-auto text-primary" />
            <p className="text-muted-foreground">Cargando clientes...</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  const handleExport = () => {
    exportClientesCSV(clientesFiltrados);
    toast.success("Clientes exportados a CSV");
  };

  const stats = [
    {
      title: "Total Clientes",
      value: clientesDemo.length,
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-500/10",
    },
    {
      title: "Con Fiado",
      value: clientesDemo.filter((c) => c.saldo_fiado > 0).length,
      icon: CreditCard,
      color: "text-amber-600",
      bgColor: "bg-amber-500/10",
    },
    {
      title: "Total Fiado",
      value: `S/ ${clientesDemo.reduce((sum, c) => sum + c.saldo_fiado, 0).toFixed(2)}`,
      icon: CreditCard,
      color: "text-red-600",
      bgColor: "bg-red-500/10",
    },
  ];

  const handleEdit = (cliente: Cliente) => {
    setSelectedCliente(cliente);
    setShowClienteModal(true);
  };

  const handleDelete = (cliente: Cliente) => {
    toast.success(`Cliente "${cliente.nombre}" eliminado`);
  };

  const handleSave = () => {
    toast.success(selectedCliente ? "Cliente actualizado" : "Cliente creado");
    setShowClienteModal(false);
    setSelectedCliente(null);
  };

  const handleWhatsApp = (cliente: Cliente) => {
    if (cliente.telefono) {
      window.open(`https://wa.me/51${cliente.telefono}`, "_blank");
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
              Clientes
            </h1>
            <p className="text-muted-foreground">
              Gestiona tu cartera de clientes
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="gap-2" onClick={handleExport}>
              <Download className="h-4 w-4" />
              Exportar
            </Button>
            <Button
              className="gap-2"
              onClick={() => {
                setSelectedCliente(null);
                setShowClienteModal(true);
              }}
            >
              <Plus className="h-4 w-4" />
              Nuevo Cliente
            </Button>
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
                placeholder="Buscar por nombre, DNI o teléfono..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        {/* Clients Table */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Lista de Clientes</span>
              <Badge variant="secondary">{clientesFiltrados.length} clientes</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Cliente</TableHead>
                    <TableHead>DNI</TableHead>
                    <TableHead>Teléfono</TableHead>
                    <TableHead className="text-right">Fiado</TableHead>
                    <TableHead className="text-right">Límite</TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {clientesFiltrados.map((cliente) => (
                    <TableRow key={cliente.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                            <span className="text-sm font-semibold text-primary">
                              {cliente.nombre
                                .split(" ")
                                .map((n) => n[0])
                                .join("")
                                .slice(0, 2)}
                            </span>
                          </div>
                          <div>
                            <p className="font-medium">{cliente.nombre}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{cliente.dni || "-"}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Phone className="h-4 w-4 text-muted-foreground" />
                          {cliente.telefono || "-"}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        {cliente.saldo_fiado > 0 ? (
                          <Badge variant="destructive">
                            S/ {cliente.saldo_fiado.toFixed(2)}
                          </Badge>
                        ) : (
                          <Badge variant="outline">Sin deuda</Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        S/ {cliente.limite_credito.toFixed(2)}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-1">
                          {cliente.telefono && (
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleWhatsApp(cliente)}
                              className="text-green-600 hover:text-green-700"
                            >
                              <MessageCircle className="h-4 w-4" />
                            </Button>
                          )}
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => handleEdit(cliente)}>
                                <Pencil className="h-4 w-4 mr-2" />
                                Editar
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => handleDelete(cliente)}
                                className="text-destructive focus:text-destructive"
                              >
                                <Trash2 className="h-4 w-4 mr-2" />
                                Eliminar
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {clientesFiltrados.length === 0 && (
              <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
                <User className="h-12 w-12 mb-4 opacity-50" />
                <p className="text-lg">No se encontraron clientes</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Client Modal */}
      <Dialog open={showClienteModal} onOpenChange={setShowClienteModal}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {selectedCliente ? "Editar Cliente" : "Nuevo Cliente"}
            </DialogTitle>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="nombre">Nombre completo</Label>
              <Input
                id="nombre"
                placeholder="Juan Pérez García"
                defaultValue={selectedCliente?.nombre}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="dni">DNI</Label>
                <Input
                  id="dni"
                  placeholder="12345678"
                  maxLength={8}
                  defaultValue={selectedCliente?.dni}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="telefono">Teléfono</Label>
                <Input
                  id="telefono"
                  placeholder="987654321"
                  maxLength={9}
                  defaultValue={selectedCliente?.telefono}
                />
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="limite">Límite de crédito</Label>
              <Input
                id="limite"
                type="number"
                step="10"
                placeholder="100.00"
                defaultValue={selectedCliente?.limite_credito}
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowClienteModal(false)}>
              Cancelar
            </Button>
            <Button onClick={handleSave}>
              {selectedCliente ? "Guardar cambios" : "Crear cliente"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
}
