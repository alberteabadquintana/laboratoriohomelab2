// app/layout.tsx
import type { Metadata, Viewport } from 'next';
import './globals.css';
import Header from './components/Header';
import Footer from './components/Footer';
import WhatsAppFloat from './components/WhatsAppFloat';
import LoadingScreen from './components/LoadingScreen'; 
import ChatBot from './components/ChatBot';

// TODO: reemplazar por el dominio real cuando esté definido (o setear
// NEXT_PUBLIC_SITE_URL en .env.local / variables de entorno de Vercel).
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'HomeLab - Laboratorio Clínico',
    template: '%s | HomeLab Laboratorio Clínico',
  },
  description: 'Innovación y precisión en cada análisis clínico. Laboratorio en Lima con resultados confiables y atención de calidad.',
  keywords: ['laboratorio clínico', 'análisis clínicos', 'HomeLab', 'Clínica Bello Horizonte', 'resultados de laboratorio Lima'],
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
        <ChatBot />
        <Footer />
      </body>
    </html>
  );
}