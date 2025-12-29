"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Store, ArrowLeft, Mail, CheckCircle } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

export default function RecuperarPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [enviado, setEnviado] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast.error("Ingresa tu correo electrónico");
      return;
    }

    if (!email.includes("@")) {
      toast.error("Ingresa un correo válido");
      return;
    }

    setLoading(true);
    
    // Simular envío de email
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    setLoading(false);
    setEnviado(true);
    toast.success("Correo enviado correctamente");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-primary/5 p-4">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
      </div>

      <Card className="w-full max-w-md relative z-10">
        <CardHeader className="text-center space-y-4">
          {/* Logo */}
          <div className="flex justify-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary shadow-lg">
              <Store className="h-7 w-7 text-primary-foreground" />
            </div>
          </div>
          
          <div>
            <CardTitle className="text-2xl">Recuperar Contraseña</CardTitle>
            <CardDescription>
              {enviado 
                ? "Revisa tu bandeja de entrada"
                : "Te enviaremos instrucciones a tu correo"
              }
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent>
          {!enviado ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Correo electrónico</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="tu@correo.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                    disabled={loading}
                  />
                </div>
              </div>

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? (
                  <>
                    <span className="animate-spin mr-2">⏳</span>
                    Enviando...
                  </>
                ) : (
                  <>
                    <Mail className="h-4 w-4 mr-2" />
                    Enviar instrucciones
                  </>
                )}
              </Button>

              <div className="text-center">
                <Link 
                  href="/login" 
                  className="text-sm text-muted-foreground hover:text-primary inline-flex items-center gap-1"
                >
                  <ArrowLeft className="h-3 w-3" />
                  Volver al inicio de sesión
                </Link>
              </div>
            </form>
          ) : (
            <div className="text-center space-y-6 py-4">
              {/* Success Icon */}
              <div className="mx-auto w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center">
                <CheckCircle className="h-10 w-10 text-green-500" />
              </div>

              {/* Success Message */}
              <div className="space-y-2">
                <h3 className="font-semibold text-lg">¡Correo enviado!</h3>
                <p className="text-sm text-muted-foreground">
                  Hemos enviado las instrucciones a:<br />
                  <span className="font-medium text-foreground">{email}</span>
                </p>
              </div>

              {/* Info box */}
              <div className="p-4 rounded-lg bg-muted/50 text-sm text-muted-foreground">
                <p>
                  Si no ves el correo en tu bandeja de entrada, 
                  revisa la carpeta de spam o correo no deseado.
                </p>
              </div>

              {/* Actions */}
              <div className="space-y-3">
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => {
                    setEnviado(false);
                    setEmail("");
                  }}
                >
                  Enviar a otro correo
                </Button>
                
                <Link href="/login" className="block">
                  <Button className="w-full">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Volver al inicio de sesión
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Footer */}
      <div className="absolute bottom-4 text-center text-sm text-muted-foreground">
        <p>© 2024 BodegaPOS. Todos los derechos reservados.</p>
      </div>
    </div>
  );
}
