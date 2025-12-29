"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Store, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function TerminosPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 p-4">
      <div className="max-w-3xl mx-auto py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
          <div className="flex items-center gap-2">
            <Store className="h-6 w-6 text-primary" />
            <span className="font-bold text-xl">BodegaPOS</span>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Términos de Servicio</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-sm dark:prose-invert max-w-none">
            <p className="text-muted-foreground mb-4">
              Última actualización: Diciembre 2024
            </p>

            <h3>1. Aceptación de los Términos</h3>
            <p>
              Al acceder y utilizar BodegaPOS, aceptas estar sujeto a estos términos de servicio. 
              Si no estás de acuerdo con alguna parte de los términos, no puedes acceder al servicio.
            </p>

            <h3>2. Descripción del Servicio</h3>
            <p>
              BodegaPOS es un sistema de punto de venta diseñado para bodegas y minimarkets. 
              El servicio incluye gestión de inventario, control de ventas, manejo de clientes y reportes.
            </p>

            <h3>3. Uso del Servicio</h3>
            <p>
              Te comprometes a utilizar el servicio de manera responsable y conforme a la ley. 
              No debes utilizar el servicio para actividades ilegales o no autorizadas.
            </p>

            <h3>4. Cuentas de Usuario</h3>
            <p>
              Eres responsable de mantener la confidencialidad de tu cuenta y contraseña. 
              Debes notificarnos inmediatamente sobre cualquier uso no autorizado de tu cuenta.
            </p>

            <h3>5. Propiedad Intelectual</h3>
            <p>
              El servicio y su contenido original son propiedad de BodegaPOS. 
              Nuestras marcas comerciales no pueden ser utilizadas sin nuestro consentimiento previo por escrito.
            </p>

            <h3>6. Limitación de Responsabilidad</h3>
            <p>
              BodegaPOS no será responsable por daños indirectos, incidentales o consecuentes 
              que resulten del uso o la imposibilidad de usar el servicio.
            </p>

            <h3>7. Cambios en los Términos</h3>
            <p>
              Nos reservamos el derecho de modificar estos términos en cualquier momento. 
              Los cambios serán efectivos inmediatamente después de su publicación.
            </p>

            <h3>8. Contacto</h3>
            <p>
              Si tienes preguntas sobre estos términos, contáctanos a través de nuestros canales oficiales.
            </p>

            <div className="mt-8 pt-4 border-t">
              <Button asChild>
                <Link href="/">Volver al Inicio</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
