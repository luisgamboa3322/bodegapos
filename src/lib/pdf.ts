"use client";

import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { DatosComprobante } from '@/types/comprobante';

/**
 * Genera un PDF del comprobante a partir del elemento HTML
 */
export async function generarComprobantePDF(elementId: string = 'comprobante-pdf'): Promise<void> {
    const element = document.getElementById(elementId);
    if (!element) {
        throw new Error('Elemento del comprobante no encontrado');
    }

    try {
        // Capturar el elemento como imagen
        const canvas = await html2canvas(element, {
            scale: 2,
            useCORS: true,
            backgroundColor: '#ffffff',
        });

        const imgData = canvas.toDataURL('image/png');

        // Calcular dimensiones del PDF
        const imgWidth = canvas.width;
        const imgHeight = canvas.height;

        // Ancho fijo de 80mm para tickets
        const pdfWidth = 80;
        const pdfHeight = (imgHeight * pdfWidth) / imgWidth;

        // Crear PDF
        const pdf = new jsPDF({
            orientation: 'portrait',
            unit: 'mm',
            format: [pdfWidth, pdfHeight],
        });

        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);

        // Descargar PDF
        const fecha = new Date().toISOString().slice(0, 10);
        pdf.save(`comprobante_${fecha}.pdf`);
    } catch (error) {
        console.error('Error al generar PDF:', error);
        throw error;
    }
}

/**
 * Genera nombre del archivo PDF basado en los datos del comprobante
 */
export function generarNombreArchivo(datos: DatosComprobante): string {
    const tipoNombre = datos.tipo === 'boleta' ? 'BV' : datos.tipo === 'factura' ? 'FE' : 'TK';
    return `${tipoNombre}_${datos.serie}-${datos.numero}_${datos.fecha.toISOString().slice(0, 10)}`;
}

/**
 * Genera PDF con nombre personalizado
 */
export async function descargarComprobantePDF(
    datos: DatosComprobante,
    elementId: string = 'comprobante-pdf'
): Promise<void> {
    const element = document.getElementById(elementId);
    if (!element) {
        throw new Error('Elemento del comprobante no encontrado');
    }

    try {
        const canvas = await html2canvas(element, {
            scale: 2,
            useCORS: true,
            backgroundColor: '#ffffff',
        });

        const imgData = canvas.toDataURL('image/png');
        const imgWidth = canvas.width;
        const imgHeight = canvas.height;

        // Para A4 o tamaño personalizado según tipo
        let pdfWidth: number;
        let pdfHeight: number;

        if (datos.tipo === 'ticket') {
            // Ticket: 80mm de ancho
            pdfWidth = 80;
            pdfHeight = (imgHeight * pdfWidth) / imgWidth;
        } else {
            // Boleta/Factura: A4 o proporcional
            pdfWidth = 105; // Media carta
            pdfHeight = (imgHeight * pdfWidth) / imgWidth;
        }

        const pdf = new jsPDF({
            orientation: 'portrait',
            unit: 'mm',
            format: [pdfWidth, pdfHeight],
        });

        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);

        const nombreArchivo = generarNombreArchivo(datos);
        pdf.save(`${nombreArchivo}.pdf`);
    } catch (error) {
        console.error('Error al generar PDF:', error);
        throw error;
    }
}

/**
 * Abre el PDF en una nueva ventana para imprimir
 */
export async function imprimirComprobante(elementId: string = 'comprobante-pdf'): Promise<void> {
    const element = document.getElementById(elementId);
    if (!element) {
        throw new Error('Elemento del comprobante no encontrado');
    }

    try {
        const canvas = await html2canvas(element, {
            scale: 2,
            useCORS: true,
            backgroundColor: '#ffffff',
        });

        const imgData = canvas.toDataURL('image/png');
        const imgWidth = canvas.width;
        const imgHeight = canvas.height;

        const pdfWidth = 80;
        const pdfHeight = (imgHeight * pdfWidth) / imgWidth;

        const pdf = new jsPDF({
            orientation: 'portrait',
            unit: 'mm',
            format: [pdfWidth, pdfHeight],
        });

        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);

        // Abrir en nueva ventana para imprimir
        const pdfBlob = pdf.output('blob');
        const pdfUrl = URL.createObjectURL(pdfBlob);
        const printWindow = window.open(pdfUrl);

        if (printWindow) {
            printWindow.onload = () => {
                printWindow.print();
            };
        }
    } catch (error) {
        console.error('Error al imprimir:', error);
        throw error;
    }
}
