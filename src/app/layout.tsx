import type { Metadata } from 'next';
import './globals.css';
import { AuthProvider } from '@/contexts/AuthContext';
import AppHeader from '@/components/layout/AppHeader';
import { Toaster } from '@/components/ui/toaster';

export const metadata: Metadata = {
  title: 'RetailPass',
  description: 'Interactive user login portal for an e-commerce retail online store',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        <AuthProvider>
          <AppHeader />
          <main>{children}</main>
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}
