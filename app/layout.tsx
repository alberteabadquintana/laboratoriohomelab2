// app/layout.tsx
import './globals.css';
import Header from './components/Header';
import Footer from './components/Footer';
import WhatsAppFloat from './components/WhatsAppFloat';
import LoadingScreen from './components/LoadingScreen'; 

export const metadata = {
  title: 'HomeLab - Laboratorio Clínico',
  description: 'Innovación y precisión en cada análisis',
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



