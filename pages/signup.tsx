import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import AuthFormWrapper from '@/components/shared/AuthFormWrapper';
import SignupForm from '@/components/auth/SignupForm';
import { useAuth } from '@/hooks/useAuth';
import { Loader2 } from 'lucide-react';

export default function SignupPage() {
  const { user, initialLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!initialLoading && user) {
      router.replace('/profile');
    }
  }, [user, initialLoading, router]);

  if (initialLoading || (!initialLoading && user)) {
    return (
      <div className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center bg-background p-4">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <AuthFormWrapper
      title="Create Account"
      footer={<>Already have an account? <Link href="/login" className="text-primary hover:underline">Log in</Link></>}
    >
      <SignupForm />
    </AuthFormWrapper>
  );
}
