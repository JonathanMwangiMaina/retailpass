"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { Loader2 } from 'lucide-react';

export default function HomePage() {
  const { user, initialLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!initialLoading) {
      if (user) {
        router.replace('/profile');
      } else {
        router.replace('/login');
      }
    }
  }, [user, initialLoading, router]);

  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center bg-background p-4">
      <Loader2 className="h-12 w-12 animate-spin text-primary" />
      <p className="mt-4 text-muted-foreground">Loading RetailPass...</p>
    </div>
  );
}
