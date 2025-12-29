"use client";

import { useState, useEffect } from 'react';

/**
 * Hook para manejar la hidratación en Next.js
 * Evita errores de mismatch entre servidor y cliente
 * 
 * Uso:
 * const mounted = useMounted();
 * if (!mounted) return <Loading />;
 */
export function useMounted() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    return mounted;
}

/**
 * Hook para Zustand stores con persistencia
 * Evita errores de hidratación con localStorage
 */
export function useHydration() {
    const [hydrated, setHydrated] = useState(false);

    useEffect(() => {
        // Pequeño delay para asegurar que localStorage esté listo
        const timeout = setTimeout(() => {
            setHydrated(true);
        }, 100);

        return () => clearTimeout(timeout);
    }, []);

    return hydrated;
}
