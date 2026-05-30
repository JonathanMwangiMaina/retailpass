import type { Metadata } from 'next';
import './globals.css';
import { AuthProvider } from '@/contexts/AuthContext';
import AppHeader from '@/components/layout/AppHeader';
import { Toaster } from '@/components/ui/toaster';

export const metadata: Metadata = {
  title: 'RetailPass - AI-Powered Authentication Platform',
  description: 'Modern authentication platform with AI-powered password strength analysis, secure user registration, and profile management built with Next.js 15',
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon-simple.svg', type: 'image/svg+xml', sizes: '32x32' },
    ],
    apple: { url: '/icon.svg', type: 'image/svg+xml' },
  },
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
