// app/layout.tsx
import type { Metadata, Viewport } from 'next';
import './globals.css';
import Header from './components/Header';
import Footer from './components/Footer';
import WhatsAppFloat from './components/WhatsAppFloat';
import LoadingScreen from './components/LoadingScreen'; 
import { getSiteUrl } from '@/lib/env';

const SITE_URL = getSiteUrl();

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'HomeLab - Laboratorio Clínico',
    template: '%s | HomeLab Laboratorio Clínico',
  },
  description: 'Innovación y precisión en cada análisis clínico. Laboratorio en Piura con resultados confiables y atención de calidad.',
  keywords: ['laboratorio clínico', 'análisis clínicos', 'HomeLab', 'Clínica Bello Horizonte', 'resultados de laboratorio Piura'],
  openGraph: {
    type: 'website',
    locale: 'es_PE',
    siteName: 'HomeLab Laboratorio Clínico',
    title: 'HomeLab - Laboratorio Clínico',
    description: 'Innovación y precisión en cada análisis clínico.',
    url: SITE_URL,
    images: [
      {
        url: '/images/logoPrincipal.jpg',
        width: 1200,
        height: 630,
        alt: 'HomeLab Laboratorio Clínico',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'HomeLab - Laboratorio Clínico',
    description: 'Innovación y precisión en cada análisis clínico.',
    images: ['/images/logoPrincipal.jpg'],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: '/favicon.ico',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#D12E7B',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className="antialiased">
        {/* Pantalla de carga inicial */}
        <LoadingScreen /> 

        {/* Navegación global */}
        <Header /> 
        
        <main>
          {children}
        </main>

        {/* Componentes flotantes y globales */}
        
        <WhatsAppFloat />
        <Footer />
      </body>
    </html>
  );
}
