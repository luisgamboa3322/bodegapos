import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartItem, Producto, Cliente } from '@/types';

interface CartState {
    items: CartItem[];
    cliente: Cliente | null;
    metodoPago: 'efectivo' | 'yape' | 'plin' | 'tarjeta' | 'mixto' | 'fiado';
    montoRecibido: number;
    observaciones: string;

    // Acciones
    addItem: (producto: Producto, cantidad?: number) => void;
    removeItem: (productoId: string) => void;
    updateQuantity: (productoId: string, cantidad: number) => void;
    clearCart: () => void;
    setCliente: (cliente: Cliente | null) => void;
    setMetodoPago: (metodo: CartState['metodoPago']) => void;
    setMontoRecibido: (monto: number) => void;
    setObservaciones: (obs: string) => void;

    // Getters computados
    getSubtotal: () => number;
    getIGV: () => number;
    getTotal: () => number;
    getTotalItems: () => number;
    getVuelto: () => number;
}

export const useCartStore = create<CartState>()(
    persist(
        (set, get) => ({
            items: [],
            cliente: null,
            metodoPago: 'efectivo',
            montoRecibido: 0,
            observaciones: '',

            addItem: (producto, cantidad = 1) => {
                set((state) => {
                    const existingIndex = state.items.findIndex(
                        (item) => item.producto.id === producto.id
                    );

                    if (existingIndex >= 0) {
                        const newItems = [...state.items];
                        newItems[existingIndex].cantidad += cantidad;
                        newItems[existingIndex].subtotal =
                            newItems[existingIndex].cantidad * newItems[existingIndex].precio_unitario;
                        return { items: newItems };
                    }

                    const newItem: CartItem = {
                        producto,
                        cantidad,
                        precio_unitario: producto.precio_venta,
                        descuento: 0,
                        subtotal: producto.precio_venta * cantidad,
                    };

                    return { items: [...state.items, newItem] };
                });
            },

            removeItem: (productoId) => {
                set((state) => ({
                    items: state.items.filter((item) => item.producto.id !== productoId),
                }));
            },

            updateQuantity: (productoId, cantidad) => {
                if (cantidad <= 0) {
                    get().removeItem(productoId);
                    return;
                }

                set((state) => ({
                    items: state.items.map((item) =>
                        item.producto.id === productoId
                            ? {
                                ...item,
                                cantidad,
                                subtotal: item.precio_unitario * cantidad,
                            }
                            : item
                    ),
                }));
            },

            clearCart: () => {
                set({
                    items: [],
                    cliente: null,
                    metodoPago: 'efectivo',
                    montoRecibido: 0,
                    observaciones: '',
                });
            },

            setCliente: (cliente) => set({ cliente }),
            setMetodoPago: (metodoPago) => set({ metodoPago }),
            setMontoRecibido: (montoRecibido) => set({ montoRecibido }),
            setObservaciones: (observaciones) => set({ observaciones }),

            getSubtotal: () => {
                const items = get().items;
                return items.reduce((sum, item) => sum + item.subtotal, 0);
            },

            getIGV: () => {
                return get().getSubtotal() * 0.18;
            },

            getTotal: () => {
                const subtotal = get().getSubtotal();
                // El precio ya incluye IGV en Perú normalmente
                return subtotal;
            },

            getTotalItems: () => {
                return get().items.reduce((sum, item) => sum + item.cantidad, 0);
            },

            getVuelto: () => {
                const total = get().getTotal();
                const recibido = get().montoRecibido;
                return recibido > total ? recibido - total : 0;
            },
        }),
        {
            name: 'bodegapos-cart',
            partialize: (state) => ({
                items: state.items,
                cliente: state.cliente,
            }),
        }
    )
);

// Store para datos globales de la app
interface AppState {
    tiendaActual: string | null;
    usuarioActual: string | null;
    sidebarOpen: boolean;

    setTienda: (tiendaId: string | null) => void;
    setUsuario: (usuarioId: string | null) => void;
    toggleSidebar: () => void;
    setSidebarOpen: (open: boolean) => void;
}

export const useAppStore = create<AppState>()(
    persist(
        (set) => ({
            tiendaActual: null,
            usuarioActual: null,
            sidebarOpen: true,

            setTienda: (tiendaId) => set({ tiendaActual: tiendaId }),
            setUsuario: (usuarioId) => set({ usuarioActual: usuarioId }),
            toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
            setSidebarOpen: (open) => set({ sidebarOpen: open }),
        }),
        {
            name: 'bodegapos-app',
        }
    )
);
