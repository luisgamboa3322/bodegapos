# 🏪 BodegaPOS - Sistema de Punto de Venta para Bodegas

<div align="center">

![BodegaPOS](https://img.shields.io/badge/BodegaPOS-v1.0.0-green)
![Status](https://img.shields.io/badge/Estado-En%20Desarrollo-yellow)
![Next.js](https://img.shields.io/badge/Next.js-14-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-cyan)

**Sistema POS + Inventario diseñado específicamente para bodegas y minimarkets peruanos.**

🚧 *Proyecto en desarrollo activo - Abierto a contribuciones* 🚧

[Demo en Vivo](#) • [Documentación](#características) • [Reportar Bug](../../issues)

</div>

---

## 📋 Descripción

**BodegaPOS** es una solución completa de punto de venta diseñada para las +500,000 bodegas y minimarkets en Perú que aún operan manualmente. El sistema ofrece:

- ✅ Interfaz táctil optimizada para tablets y celulares
- ✅ Control de inventario en tiempo real
- ✅ Sistema de fiado con recordatorios por WhatsApp
- ✅ Integración con pagos digitales (Yape, Plin)
- ✅ Facturación electrónica SUNAT (próximamente)
- ✅ Reportes y analytics de ventas

## 🚀 Inicio Rápido

### Prerrequisitos

- Node.js 18+ 
- npm o yarn

### Instalación

```bash
# Clonar el repositorio
git clone https://github.com/tu-usuario/bodegapos.git

# Entrar al directorio
cd bodegapos

# Instalar dependencias
npm install

# Iniciar en modo desarrollo
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## �️ Páginas Disponibles (URLs)

| URL | Página | Descripción |
|-----|--------|-------------|
| `/` | Landing Page | Página de inicio con información del producto |
| `/login` | Iniciar Sesión | Autenticación de usuarios |
| `/registro` | Registro | Crear nueva cuenta |
| `/recuperar` | Recuperar Contraseña | Restablecer contraseña olvidada |
| `/dashboard` | Panel Principal | Resumen de ventas y estadísticas |
| `/pos` | Punto de Venta | Interfaz de ventas con comprobantes |
| `/productos` | Productos | Gestión de inventario |
| `/clientes` | Clientes | Gestión de clientes |
| `/fiado` | Fiado | Control de créditos y deudas |
| `/reportes` | Reportes | Estadísticas y exportación |
| `/configuracion` | Configuración | Ajustes del sistema |

## 📖 Tutorial Rápido

### 1. Probar el sistema (Modo Demo)
```
1. Entra a la landing page (/)
2. Click en "Probar Demo" o "Iniciar Sesión"
3. Ingresa cualquier email/contraseña (modo demo)
4. ¡Explora el dashboard!
```

### 2. Realizar una venta
```
1. Ve a /pos (Punto de Venta)
2. Busca y selecciona productos
3. Click en "Cobrar"
4. Elige el tipo de comprobante (Boleta/Factura/Ticket)
5. Selecciona método de pago
6. Click en "Confirmar Venta"
7. Descarga el PDF o imprime el comprobante
```

### 3. Exportar datos
```
1. Ve a /productos, /clientes o /reportes
2. Click en botón "Exportar"
3. Se descargará un archivo CSV
```

## �📦 Características

### 🛒 Punto de Venta (POS)
- Búsqueda rápida de productos
- Categorías con iconos
- Carrito interactivo
- Múltiples métodos de pago
- Venta al fiado
- Selección de cliente

### 📊 Dashboard
- Ventas del día/semana/mes
- Ticket promedio
- Productos más vendidos
- Alertas de stock bajo
- Clientes con fiado pendiente

### 📦 Inventario
- CRUD de productos
- Categorías personalizables
- Control de stock
- Alertas de reposición
- Margen de ganancia

### 👥 Clientes
- Registro de clientes
- Historial de compras
- Sistema de fiado
- Límites de crédito
- Contacto por WhatsApp

### 💰 Fiado
- Lista de deudores
- Registro de pagos parciales
- Recordatorios automáticos
- Historial de pagos

### 📈 Reportes
- Ventas por período
- Productos más vendidos
- Métodos de pago
- Exportación a Excel

### ⚙️ Configuración
- Datos de la tienda
- Facturación SUNAT
- Alertas personalizables
- Configuración de impresora
- Planes de suscripción

## 🛠️ Stack Tecnológico

| Tecnología | Uso |
|------------|-----|
| **Next.js 14** | Framework React con App Router |
| **TypeScript** | Tipado estático |
| **Tailwind CSS 4** | Estilos utilitarios |
| **shadcn/ui** | Componentes UI |
| **Zustand** | Estado global |
| **Supabase** | Backend (Auth, DB, Storage) |
| **Lucide React** | Iconos |

## 📁 Estructura del Proyecto

```
bodegapos/
├── src/
│   ├── app/                    # Páginas (App Router)
│   │   ├── dashboard/          # Panel principal
│   │   ├── pos/                # Punto de venta
│   │   ├── productos/          # Gestión de productos
│   │   ├── clientes/           # Gestión de clientes
│   │   ├── fiado/              # Control de créditos
│   │   ├── reportes/           # Reportes y analytics
│   │   ├── configuracion/      # Ajustes del sistema
│   │   └── login/              # Autenticación
│   ├── components/
│   │   ├── ui/                 # Componentes shadcn/ui
│   │   └── layout/             # Layout components
│   ├── lib/
│   │   ├── supabase/           # Cliente Supabase
│   │   ├── store.ts            # Zustand stores
│   │   ├── demo-data.ts        # Datos de demostración
│   │   └── utils.ts            # Utilidades
│   └── types/
│       └── index.ts            # Tipos TypeScript
├── public/                     # Archivos estáticos
└── package.json
```

## 🔧 Configuración

### Variables de Entorno

Crea un archivo `.env.local` con las siguientes variables:

```env
# Supabase (Opcional para modo demo)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key

# App
NEXT_PUBLIC_APP_NAME=BodegaPOS
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

Ver `ENV_SETUP.md` para más detalles.

## 💼 Modelo de Negocio

| Plan | Precio | Características |
|------|--------|-----------------|
| **Gratis** | S/ 0 | 50 productos, 100 ventas/mes |
| **Básico** | S/ 29/mes | 200 productos, facturación SUNAT |
| **Pro** | S/ 59/mes | Ilimitado, fiado + WhatsApp |
| **Business** | S/ 99/mes | Multi-sucursal, soporte prioritario |

## 🇵🇪 Adaptado para Perú

- ✅ IGV (18%) incluido
- ✅ Formato de boletas/facturas SUNAT
- ✅ Integración Yape/Plin
- ✅ Moneda en Soles (S/)
- ✅ DNI de clientes
- ✅ RUC de empresas
- ✅ Sistema de fiado (común en bodegas)

## 📱 Responsive

El sistema está optimizado para:
- 📱 Celulares (ventas rápidas)
- 📟 Tablets (uso en mostrador)
- 💻 Desktop (administración)

## 🚀 Próximas Funcionalidades

- [ ] PWA (App instalable)
- [ ] Modo offline
- [ ] Lector de código de barras
- [ ] Integración SUNAT real
- [ ] Reportes avanzados
- [ ] Multi-sucursal

## 📄 Licencia

Este proyecto está bajo la Licencia MIT.

## ⚠️ Estado del Proyecto

Este proyecto está **en desarrollo activo**. Algunas características:

- ✅ **Funcionalidades completas**: POS, inventario, fiado, reportes
- ✅ **UI/UX profesional**: Diseño moderno y responsivo
- ✅ **Modo demo**: Funciona sin backend configurado
- 🚧 **En progreso**: Integración real con Supabase
- 🚧 **En progreso**: Facturación SUNAT real (actualmente simulada)
- 🚧 **Próximamente**: PWA y modo offline

### Roadmap

- [x] Sistema POS completo
- [x] Comprobantes electrónicos (simulados)
- [x] Exportación CSV/PDF
- [x] Landing page
- [ ] Persistencia de datos con Supabase
- [ ] Integración SUNAT real
- [ ] PWA
- [ ] Multi-sucursal

## 🤝 Contribuir

Las contribuciones son bienvenidas. Por favor, abre un issue primero para discutir qué te gustaría cambiar.

---

<div align="center">

Hecho por Luis Gamboa con ❤️ para las bodegas del Perú 🇵🇪

</div>
