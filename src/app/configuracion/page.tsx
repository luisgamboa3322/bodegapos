"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Store,
  User,
  CreditCard,
  Bell,
  Shield,
  Printer,
  Palette,
  Check,
  Save,
  Upload,
} from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export default function ConfiguracionPage() {
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    toast.success("Configuración guardada correctamente");
    setSaving(false);
  };

  const plans = [
    {
      name: "Gratis",
      price: "S/ 0",
      features: ["50 productos", "100 ventas/mes", "1 usuario"],
      current: false,
    },
    {
      name: "Básico",
      price: "S/ 29",
      features: ["200 productos", "Ventas ilimitadas", "Facturación SUNAT", "2 usuarios"],
      current: true,
    },
    {
      name: "Pro",
      price: "S/ 59",
      features: ["Productos ilimitados", "Fiado + WhatsApp", "Reportes avanzados", "5 usuarios"],
      current: false,
    },
    {
      name: "Business",
      price: "S/ 99",
      features: ["Multi-sucursal", "Multi-caja", "Soporte prioritario", "Usuarios ilimitados"],
      current: false,
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
              Configuración
            </h1>
            <p className="text-muted-foreground">
              Personaliza tu sistema BodegaPOS
            </p>
          </div>
          <Button onClick={handleSave} disabled={saving} className="gap-2">
            {saving ? (
              <>Guardando...</>
            ) : (
              <>
                <Save className="h-4 w-4" />
                Guardar cambios
              </>
            )}
          </Button>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="tienda" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-5">
            <TabsTrigger value="tienda" className="gap-2">
              <Store className="h-4 w-4" />
              <span className="hidden sm:inline">Tienda</span>
            </TabsTrigger>
            <TabsTrigger value="facturacion" className="gap-2">
              <CreditCard className="h-4 w-4" />
              <span className="hidden sm:inline">Facturación</span>
            </TabsTrigger>
            <TabsTrigger value="notificaciones" className="gap-2">
              <Bell className="h-4 w-4" />
              <span className="hidden sm:inline">Alertas</span>
            </TabsTrigger>
            <TabsTrigger value="impresion" className="gap-2">
              <Printer className="h-4 w-4" />
              <span className="hidden sm:inline">Impresión</span>
            </TabsTrigger>
            <TabsTrigger value="plan" className="gap-2">
              <Shield className="h-4 w-4" />
              <span className="hidden sm:inline">Mi Plan</span>
            </TabsTrigger>
          </TabsList>

          {/* Tienda Tab */}
          <TabsContent value="tienda" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Información de la Tienda</CardTitle>
                <CardDescription>
                  Datos básicos que aparecerán en tus boletas y facturas
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-6">
                  <div className="flex h-20 w-20 items-center justify-center rounded-xl bg-primary/10 border-2 border-dashed border-primary/30">
                    <Store className="h-8 w-8 text-primary" />
                  </div>
                  <div>
                    <Button variant="outline" size="sm" className="gap-2">
                      <Upload className="h-4 w-4" />
                      Subir logo
                    </Button>
                    <p className="text-xs text-muted-foreground mt-1">
                      PNG o JPG, máximo 2MB
                    </p>
                  </div>
                </div>

                <Separator />

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="nombreTienda">Nombre de la tienda</Label>
                    <Input id="nombreTienda" defaultValue="Bodega Don Pepe" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="ruc">RUC</Label>
                    <Input id="ruc" defaultValue="20123456789" maxLength={11} />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="direccion">Dirección</Label>
                  <Input
                    id="direccion"
                    defaultValue="Av. Los Olivos 123, San Juan de Lurigancho, Lima"
                  />
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="telefono">Teléfono</Label>
                    <Input id="telefono" defaultValue="01 234 5678" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="celular">Celular</Label>
                    <Input id="celular" defaultValue="987 654 321" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Facturación Tab */}
          <TabsContent value="facturacion" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Configuración de Facturación</CardTitle>
                <CardDescription>
                  Configura la emisión de comprobantes electrónicos
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="serieBoleta">Serie de Boleta</Label>
                    <Input id="serieBoleta" defaultValue="B001" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="serieFactura">Serie de Factura</Label>
                    <Input id="serieFactura" defaultValue="F001" />
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="igv">IGV (%)</Label>
                    <Input id="igv" type="number" defaultValue="18" />
                  </div>
                  <div className="space-y-2">
                    <Label>IGV incluido en precios</Label>
                    <Select defaultValue="si">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="si">Sí, precios con IGV</SelectItem>
                        <SelectItem value="no">No, agregar IGV al total</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <Label>Proveedor de Facturación Electrónica (OSE)</Label>
                  <Select defaultValue="nubefact">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="nubefact">Nubefact</SelectItem>
                      <SelectItem value="efact">Efact</SelectItem>
                      <SelectItem value="sunat">SUNAT Gratuito (SOL)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="p-4 rounded-lg bg-amber-500/10 border border-amber-500/20">
                  <p className="text-sm text-amber-700">
                    <strong>Nota:</strong> Para emitir comprobantes electrónicos válidos ante SUNAT,
                    necesitas configurar tu certificado digital y credenciales del OSE.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notificaciones Tab */}
          <TabsContent value="notificaciones" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Alertas y Notificaciones</CardTitle>
                <CardDescription>
                  Configura cuándo recibir alertas del sistema
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Alerta de stock bajo</p>
                    <p className="text-sm text-muted-foreground">
                      Notificar cuando un producto llegue al stock mínimo
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Input
                      type="number"
                      className="w-20"
                      defaultValue="10"
                    />
                    <span className="text-sm text-muted-foreground">unidades</span>
                  </div>
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Alerta de vencimiento</p>
                    <p className="text-sm text-muted-foreground">
                      Notificar productos próximos a vencer
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Input
                      type="number"
                      className="w-20"
                      defaultValue="15"
                    />
                    <span className="text-sm text-muted-foreground">días antes</span>
                  </div>
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Recordatorio de fiado</p>
                    <p className="text-sm text-muted-foreground">
                      Enviar recordatorio a clientes con deuda
                    </p>
                  </div>
                  <Select defaultValue="semanal">
                    <SelectTrigger className="w-[150px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="diario">Diario</SelectItem>
                      <SelectItem value="semanal">Semanal</SelectItem>
                      <SelectItem value="quincenal">Quincenal</SelectItem>
                      <SelectItem value="nunca">Nunca</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Impresión Tab */}
          <TabsContent value="impresion" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Configuración de Impresión</CardTitle>
                <CardDescription>
                  Configura tu impresora de tickets
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Impresora de tickets</Label>
                  <Select defaultValue="none">
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar impresora" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">No configurada</SelectItem>
                      <SelectItem value="thermal">Impresora térmica USB</SelectItem>
                      <SelectItem value="network">Impresora de red</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Ancho del papel</Label>
                  <Select defaultValue="80">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="58">58mm</SelectItem>
                      <SelectItem value="80">80mm</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Imprimir automáticamente</Label>
                  <Select defaultValue="si">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="si">Sí, al completar cada venta</SelectItem>
                      <SelectItem value="no">No, preguntar cada vez</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button 
                  variant="outline" 
                  className="gap-2"
                  onClick={() => {
                    toast.success("Imprimiendo ticket de prueba...");
                    setTimeout(() => window.print(), 500);
                  }}
                >
                  <Printer className="h-4 w-4" />
                  Imprimir ticket de prueba
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Plan Tab */}
          <TabsContent value="plan" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Mi Plan Actual</CardTitle>
                <CardDescription>
                  Gestiona tu suscripción a BodegaPOS
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                  {plans.map((plan) => (
                    <div
                      key={plan.name}
                      className={cn(
                        "relative rounded-lg border p-4 transition-all",
                        plan.current
                          ? "border-primary bg-primary/5 ring-2 ring-primary"
                          : "hover:border-primary/50"
                      )}
                    >
                      {plan.current && (
                        <Badge className="absolute -top-2 left-4">Plan actual</Badge>
                      )}
                      <div className="mb-4">
                        <h3 className="font-semibold text-lg">{plan.name}</h3>
                        <p className="text-2xl font-bold">
                          {plan.price}
                          <span className="text-sm font-normal text-muted-foreground">/mes</span>
                        </p>
                      </div>
                      <ul className="space-y-2 mb-4">
                        {plan.features.map((feature) => (
                          <li key={feature} className="flex items-center gap-2 text-sm">
                            <Check className="h-4 w-4 text-primary" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                      {!plan.current && (
                        <Button variant="outline" className="w-full">
                          Cambiar a {plan.name}
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
