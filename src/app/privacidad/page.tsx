"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Store, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function PrivacidadPage() {
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
            <CardTitle className="text-2xl">Política de Privacidad</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-sm dark:prose-invert max-w-none">
            <p className="text-muted-foreground mb-4">
              Última actualización: Diciembre 2024
            </p>

            <h3>1. Información que Recopilamos</h3>
            <p>
              Recopilamos información que nos proporcionas directamente, como tu nombre, 
              correo electrónico y datos de tu negocio cuando te registras en BodegaPOS.
            </p>

            <h3>2. Uso de la Información</h3>
            <p>
              Utilizamos la información recopilada para:
            </p>
            <ul>
              <li>Proporcionar y mantener el servicio</li>
              <li>Mejorar la experiencia del usuario</li>
              <li>Enviar notificaciones importantes</li>
              <li>Proporcionar soporte al cliente</li>
            </ul>

            <h3>3. Protección de Datos</h3>
            <p>
              Implementamos medidas de seguridad técnicas y organizativas para proteger 
              tus datos personales contra acceso no autorizado, alteración o destrucción.
            </p>

            <h3>4. Compartir Información</h3>
            <p>
              No vendemos ni alquilamos tu información personal a terceros. 
              Solo compartimos información cuando es necesario para proporcionar el servicio 
              o cuando la ley lo requiere.
            </p>

            <h3>5. Cookies</h3>
            <p>
              Utilizamos cookies y tecnologías similares para mejorar tu experiencia, 
              analizar el uso del servicio y personalizar el contenido.
            </p>

            <h3>6. Tus Derechos</h3>
            <p>
              Tienes derecho a acceder, corregir o eliminar tu información personal. 
              También puedes solicitar una copia de los datos que tenemos sobre ti.
            </p>

            <h3>7. Retención de Datos</h3>
            <p>
              Conservamos tu información mientras tu cuenta esté activa o según sea necesario 
              para proporcionarte servicios y cumplir con obligaciones legales.
            </p>

            <h3>8. Cambios en esta Política</h3>
            <p>
              Podemos actualizar esta política de privacidad ocasionalmente. 
              Te notificaremos sobre cambios significativos publicando la nueva política en esta página.
            </p>

            <h3>9. Contacto</h3>
            <p>
              Si tienes preguntas sobre esta política de privacidad, contáctanos a través de nuestros canales oficiales.
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
