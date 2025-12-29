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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
  Package,
  AlertTriangle,
  BarChart3,
  Filter,
  Download,
  Loader2,
} from "lucide-react";
import { productosConCategoria, categoriasDemo } from "@/lib/demo-data";
import { exportProductosCSV } from "@/lib/export";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

export default function ProductosPage() {
  // Hook para evitar problemas de hidratación SSR
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  const [searchQuery, setSearchQuery] = useState("");
  const [categoriaFilter, setCategoriaFilter] = useState<string>("all");
  const [stockFilter, setStockFilter] = useState<string>("all");
  const [showProductModal, setShowProductModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<typeof productosConCategoria[0] | null>(null);

  // Pantalla de carga mientras se monta el componente
  if (!mounted) {
    return (
      <DashboardLayout>
        <div className="min-h-[60vh] flex items-center justify-center">
          <div className="text-center space-y-4">
            <Loader2 className="h-12 w-12 animate-spin mx-auto text-primary" />
            <p className="text-muted-foreground">Cargando productos...</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  const handleExport = () => {
    exportProductosCSV(productosFiltrados);
    toast.success("Productos exportados a CSV");
  };

  // Filtrar productos
  const productosFiltrados = useMemo(() => {
    let productos = productosConCategoria;

    if (categoriaFilter !== "all") {
      productos = productos.filter((p) => p.categoria_id === categoriaFilter);
    }

    if (stockFilter === "bajo") {
      productos = productos.filter((p) => p.stock_actual <= p.stock_minimo);
    } else if (stockFilter === "agotado") {
      productos = productos.filter((p) => p.stock_actual === 0);
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
  }, [categoriaFilter, stockFilter, searchQuery]);

  const stats = [
    {
      title: "Total Productos",
      value: productosConCategoria.length,
      icon: Package,
      color: "text-blue-600",
      bgColor: "bg-blue-500/10",
    },
    {
      title: "Stock Bajo",
      value: productosConCategoria.filter((p) => p.stock_actual <= p.stock_minimo && p.stock_actual > 0).length,
      icon: AlertTriangle,
      color: "text-amber-600",
      bgColor: "bg-amber-500/10",
    },
    {
      title: "Agotados",
      value: productosConCategoria.filter((p) => p.stock_actual === 0).length,
      icon: Package,
      color: "text-red-600",
      bgColor: "bg-red-500/10",
    },
    {
      title: "Categorías",
      value: categoriasDemo.length,
      icon: BarChart3,
      color: "text-green-600",
      bgColor: "bg-green-500/10",
    },
  ];

  const handleEdit = (producto: typeof productosConCategoria[0]) => {
    setSelectedProduct(producto);
    setShowProductModal(true);
  };

  const handleDelete = (producto: typeof productosConCategoria[0]) => {
    toast.success(`Producto "${producto.nombre}" eliminado`);
  };

  const handleSave = () => {
    toast.success(selectedProduct ? "Producto actualizado" : "Producto creado");
    setShowProductModal(false);
    setSelectedProduct(null);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
              Productos
            </h1>
            <p className="text-muted-foreground">
              Gestiona tu inventario de productos
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
                setSelectedProduct(null);
                setShowProductModal(true);
              }}
            >
              <Plus className="h-4 w-4" />
              Nuevo Producto
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-4">
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

        {/* Filters */}
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col gap-4 md:flex-row md:items-center">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar por nombre o código..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex gap-3">
                <Select value={categoriaFilter} onValueChange={setCategoriaFilter}>
                  <SelectTrigger className="w-[180px]">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Categoría" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas las categorías</SelectItem>
                    {categoriasDemo.map((cat) => (
                      <SelectItem key={cat.id} value={cat.id}>
                        {cat.icono} {cat.nombre}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={stockFilter} onValueChange={setStockFilter}>
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Stock" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todo el stock</SelectItem>
                    <SelectItem value="bajo">Stock bajo</SelectItem>
                    <SelectItem value="agotado">Agotados</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Products Table */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Lista de Productos</span>
              <Badge variant="secondary">{productosFiltrados.length} productos</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Producto</TableHead>
                    <TableHead>Categoría</TableHead>
                    <TableHead className="text-right">P. Compra</TableHead>
                    <TableHead className="text-right">P. Venta</TableHead>
                    <TableHead className="text-right">Margen</TableHead>
                    <TableHead className="text-center">Stock</TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {productosFiltrados.map((producto) => {
                    const margen = ((producto.precio_venta - producto.precio_compra) / producto.precio_compra) * 100;
                    const stockBajo = producto.stock_actual <= producto.stock_minimo;
                    const sinStock = producto.stock_actual === 0;

                    return (
                      <TableRow key={producto.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted text-xl">
                              {producto.categoria?.icono || "📦"}
                            </div>
                            <div>
                              <p className="font-medium">{producto.nombre}</p>
                              <p className="text-sm text-muted-foreground">
                                {producto.codigo_barras || "Sin código"}
                              </p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">
                            {producto.categoria?.nombre || "Sin categoría"}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          S/ {producto.precio_compra.toFixed(2)}
                        </TableCell>
                        <TableCell className="text-right font-semibold">
                          S/ {producto.precio_venta.toFixed(2)}
                        </TableCell>
                        <TableCell className="text-right">
                          <Badge
                            variant={margen >= 30 ? "default" : margen >= 15 ? "secondary" : "destructive"}
                          >
                            {margen.toFixed(0)}%
                          </Badge>
                        </TableCell>
                        <TableCell className="text-center">
                          <Badge
                            variant={
                              sinStock
                                ? "destructive"
                                : stockBajo
                                ? "secondary"
                                : "outline"
                            }
                            className={cn(
                              stockBajo && !sinStock && "bg-amber-500/10 text-amber-600 border-amber-500/20"
                            )}
                          >
                            {producto.stock_actual} uds
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => handleEdit(producto)}>
                                <Pencil className="h-4 w-4 mr-2" />
                                Editar
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => handleDelete(producto)}
                                className="text-destructive focus:text-destructive"
                              >
                                <Trash2 className="h-4 w-4 mr-2" />
                                Eliminar
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>

            {productosFiltrados.length === 0 && (
              <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
                <Package className="h-12 w-12 mb-4 opacity-50" />
                <p className="text-lg">No se encontraron productos</p>
                <p className="text-sm">Intenta con otros filtros</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Product Modal */}
      <Dialog open={showProductModal} onOpenChange={setShowProductModal}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {selectedProduct ? "Editar Producto" : "Nuevo Producto"}
            </DialogTitle>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="nombre">Nombre del producto</Label>
              <Input
                id="nombre"
                placeholder="Ej: Inca Kola 500ml"
                defaultValue={selectedProduct?.nombre}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="codigo">Código de barras</Label>
                <Input
                  id="codigo"
                  placeholder="7751271010108"
                  defaultValue={selectedProduct?.codigo_barras}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="categoria">Categoría</Label>
                <Select defaultValue={selectedProduct?.categoria_id || ""}>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar" />
                  </SelectTrigger>
                  <SelectContent>
                    {categoriasDemo.map((cat) => (
                      <SelectItem key={cat.id} value={cat.id}>
                        {cat.icono} {cat.nombre}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="precioCompra">Precio de compra</Label>
                <Input
                  id="precioCompra"
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  defaultValue={selectedProduct?.precio_compra}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="precioVenta">Precio de venta</Label>
                <Input
                  id="precioVenta"
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  defaultValue={selectedProduct?.precio_venta}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="stock">Stock actual</Label>
                <Input
                  id="stock"
                  type="number"
                  placeholder="0"
                  defaultValue={selectedProduct?.stock_actual}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="stockMinimo">Stock mínimo</Label>
                <Input
                  id="stockMinimo"
                  type="number"
                  placeholder="0"
                  defaultValue={selectedProduct?.stock_minimo}
                />
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowProductModal(false)}>
              Cancelar
            </Button>
            <Button onClick={handleSave}>
              {selectedProduct ? "Guardar cambios" : "Crear producto"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
}
