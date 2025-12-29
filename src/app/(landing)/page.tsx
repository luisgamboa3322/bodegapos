"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import {
  Store,
  ShoppingCart,
  Package,
  Users,
  CreditCard,
  BarChart3,
  Smartphone,
  Wifi,
  Shield,
  ArrowRight,
  CheckCircle,
  Star,
  Zap,
  Globe,
} from "lucide-react";

const features = [
  {
    icon: ShoppingCart,
    title: "Punto de Venta",
    description: "Interfaz táctil intuitiva, búsqueda rápida y múltiples métodos de pago.",
    color: "text-green-500",
    bgColor: "bg-green-500/10",
  },
  {
    icon: Package,
    title: "Control de Inventario",
    description: "Gestiona productos, stock y alertas de reposición automáticas.",
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
  },
  {
    icon: CreditCard,
    title: "Sistema de Fiado",
    description: "Control de créditos, límites y recordatorios por WhatsApp.",
    color: "text-amber-500",
    bgColor: "bg-amber-500/10",
  },
  {
    icon: BarChart3,
    title: "Reportes Inteligentes",
    description: "Análisis de ventas, productos más vendidos y métodos de pago.",
    color: "text-purple-500",
    bgColor: "bg-purple-500/10",
  },
  {
    icon: Smartphone,
    title: "Pagos Digitales",
    description: "Integración con Yape y Plin para pagos sin efectivo.",
    color: "text-cyan-500",
    bgColor: "bg-cyan-500/10",
  },
  {
    icon: Shield,
    title: "Facturación SUNAT",
    description: "Emisión de boletas y facturas electrónicas cumpliendo normativas.",
    color: "text-red-500",
    bgColor: "bg-red-500/10",
  },
];

const stats = [
  { value: "500K+", label: "Bodegas en Perú" },
  { value: "85%", label: "Operan manualmente" },
  { value: "S/29", label: "Desde /mes" },
  { value: "24/7", label: "Soporte" },
];

const testimonials = [
  {
    name: "María García",
    role: "Bodega Don Pepe, SJL",
    content: "Antes anotaba todo en un cuaderno. Ahora con BodegaPOS tengo todo controlado desde mi celular.",
    rating: 5,
  },
  {
    name: "Carlos Quispe",
    role: "Minimarket El Sol, Comas",
    content: "El sistema de fiado me ha salvado. Ya no pierdo clientes por no recordar cuánto me deben.",
    rating: 5,
  },
  {
    name: "Rosa Mendoza",
    role: "Bodega La Esquina, Callao",
    content: "Mis hijos me ayudaron a instalarlo. Es tan fácil que ahora lo uso yo sola todos los días.",
    rating: 5,
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
              <Store className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="font-bold text-xl">BodegaPOS</span>
          </div>
          <div className="hidden md:flex items-center gap-6">
            <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors">
              Características
            </a>
            <a href="#pricing" className="text-muted-foreground hover:text-foreground transition-colors">
              Precios
            </a>
            <a href="#testimonials" className="text-muted-foreground hover:text-foreground transition-colors">
              Testimonios
            </a>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/login">
              <Button variant="ghost">Iniciar Sesión</Button>
            </Link>
            <Link href="/dashboard">
              <Button className="gap-2">
                Probar Demo
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute top-1/2 -left-40 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-6 px-4 py-2" variant="secondary">
              <Zap className="h-4 w-4 mr-2" />
              Sistema #1 para Bodegas Peruanas
            </Badge>

            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
              El POS más simple para{" "}
              <span className="text-primary">tu bodega</span>
            </h1>

            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Controla ventas, inventario y fiado desde tu celular o tablet. 
              Diseñado especialmente para bodegas y minimarkets peruanos.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link href="/dashboard">
                <Button size="lg" className="gap-2 w-full sm:w-auto text-lg px-8">
                  <ShoppingCart className="h-5 w-5" />
                  Probar Demo Gratis
                </Button>
              </Link>
              <Link href="#features">
                <Button size="lg" variant="outline" className="gap-2 w-full sm:w-auto text-lg px-8">
                  Ver Características
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-primary">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4">Características</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Todo lo que necesitas para tu bodega
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Herramientas diseñadas para el día a día de una bodega peruana, 
              sin complicaciones técnicas.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="bg-card rounded-xl p-6 border hover:shadow-lg transition-shadow"
              >
                <div className={`inline-flex p-3 rounded-lg ${feature.bgColor} mb-4`}>
                  <feature.icon className={`h-6 w-6 ${feature.color}`} />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4">Precios</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Planes para cada bodega
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Empieza gratis y crece con nosotros. Sin contratos ni sorpresas.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {[
              {
                name: "Gratis",
                price: "S/ 0",
                description: "Para empezar",
                features: ["50 productos", "100 ventas/mes", "1 usuario", "Soporte por email"],
                popular: false,
              },
              {
                name: "Básico",
                price: "S/ 29",
                description: "Para bodegas pequeñas",
                features: ["200 productos", "Ventas ilimitadas", "Facturación SUNAT", "2 usuarios"],
                popular: false,
              },
              {
                name: "Pro",
                price: "S/ 59",
                description: "El más popular",
                features: ["Productos ilimitados", "Fiado + WhatsApp", "Reportes avanzados", "5 usuarios"],
                popular: true,
              },
              {
                name: "Business",
                price: "S/ 99",
                description: "Para cadenas",
                features: ["Multi-sucursal", "Multi-caja", "Soporte prioritario", "Usuarios ilimitados"],
                popular: false,
              },
            ].map((plan) => (
              <div
                key={plan.name}
                className={`relative bg-card rounded-xl p-6 border ${
                  plan.popular ? "border-primary ring-2 ring-primary" : ""
                }`}
              >
                {plan.popular && (
                  <Badge className="absolute -top-3 left-1/2 -translate-x-1/2">
                    Más Popular
                  </Badge>
                )}
                <div className="text-center mb-6">
                  <h3 className="font-semibold text-lg">{plan.name}</h3>
                  <p className="text-sm text-muted-foreground">{plan.description}</p>
                  <div className="mt-4">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    <span className="text-muted-foreground">/mes</span>
                  </div>
                </div>
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-primary" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link href="/dashboard" className="block">
                  <Button
                    variant={plan.popular ? "default" : "outline"}
                    className="w-full"
                  >
                    Empezar ahora
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4">Testimonios</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Lo que dicen nuestros clientes
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.name}
                className="bg-card rounded-xl p-6 border"
              >
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4">"{testimonial.content}"</p>
                <div>
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center bg-primary/10 rounded-2xl p-12 border border-primary/20">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              ¿Listo para modernizar tu bodega?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Únete a las miles de bodegas peruanas que ya usan BodegaPOS. 
              Empieza gratis, sin tarjeta de crédito.
            </p>
            <Link href="/dashboard">
              <Button size="lg" className="gap-2 text-lg px-8">
                <ShoppingCart className="h-5 w-5" />
                Probar Demo Ahora
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                  <Store className="h-4 w-4 text-primary-foreground" />
                </div>
                <span className="font-bold">BodegaPOS</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Sistema POS diseñado para bodegas y minimarkets peruanos.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Producto</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#features" className="hover:text-foreground">Características</a></li>
                <li><a href="#pricing" className="hover:text-foreground">Precios</a></li>
                <li><Link href="/dashboard" className="hover:text-foreground">Demo</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Soporte</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground">Centro de ayuda</a></li>
                <li><a href="#" className="hover:text-foreground">Contacto</a></li>
                <li><a href="#" className="hover:text-foreground">WhatsApp</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground">Términos de uso</a></li>
                <li><a href="#" className="hover:text-foreground">Privacidad</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © 2024 BodegaPOS. Hecho con ❤️ para las bodegas del Perú 🇵🇪
            </p>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Globe className="h-4 w-4" />
              Español (Perú)
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
