"use client";

import type { ReactNode } from 'react';
import React, { createContext, useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';

interface User {
  id: string;
  email: string;
  name?: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  initialLoading: boolean;
  login: (email: string, pass: string) => Promise<void>;
  signup: (name: string | undefined, email: string, pass: string) => Promise<void>;
  logout: () => void;
  updateProfile: (name: string, email: string) => Promise<void>;
  updatePassword: (currentPass: string, newPass: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = 'retailpass_user';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error("Failed to parse user from localStorage", error);
      localStorage.removeItem(LOCAL_STORAGE_KEY);
    }
    setInitialLoading(false);
  }, []);

  const login = useCallback(async (email: string, pass: string) => {
    setLoading(true);
    // Mock API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    if (email === 'user@example.com' && pass === 'password123') {
      const mockUser: User = { id: '1', email, name: 'Test User' };
      setUser(mockUser);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(mockUser));
      toast({ title: "Login Successful", description: "Welcome back!" });
      router.push('/profile');
    } else {
      toast({ title: "Login Failed", description: "Invalid email or password.", variant: "destructive" });
    }
    setLoading(false);
  }, [router, toast]);

  const signup = useCallback(async (name: string | undefined, email: string, pass: string) => {
    setLoading(true);
    // Mock API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    const mockUser: User = { id: Date.now().toString(), email, name };
    setUser(mockUser);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(mockUser));
    toast({ title: "Signup Successful", description: "Welcome to RetailPass!" });
    router.push('/profile');
    setLoading(false);
  }, [router, toast]);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    toast({ title: "Logged Out", description: "You have been successfully logged out." });
    router.push('/login');
  }, [router, toast]);

  const updateProfile = useCallback(async (name: string, email: string) => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    if (user) {
      const updatedUser = { ...user, name, email };
      setUser(updatedUser);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedUser));
      toast({ title: "Profile Updated", description: "Your profile has been successfully updated." });
    } else {
      toast({ title: "Update Failed", description: "User not found.", variant: "destructive" });
    }
    setLoading(false);
  }, [user, toast]);

  const updatePassword = useCallback(async (currentPass: string, newPass: string) => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    // Mock password update logic
    if (currentPass === 'password123') { // Simulate checking current password
      toast({ title: "Password Updated", description: "Your password has been successfully updated." });
    } else {
      toast({ title: "Update Failed", description: "Incorrect current password.", variant: "destructive" });
    }
    setLoading(false);
  }, [toast]);

  return (
    <AuthContext.Provider value={{ user, loading, initialLoading, login, signup, logout, updateProfile, updatePassword }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
