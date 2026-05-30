import type { User } from '@prisma/client';

// Omit sensitive fields from User type for API responses
export type PublicUser = Omit<User, 'passwordHash'>;

// Authentication API types
export interface SignupRequest {
  name?: string;
  email: string;
  password: string;
}

export interface SignupResponse {
  user: PublicUser;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  user: PublicUser;
}

export interface MeResponse {
  user: PublicUser | null;
}

export interface UpdateProfileRequest {
  name?: string;
  email?: string;
}

export interface UpdateProfileResponse {
  user: PublicUser;
}

export interface UpdatePasswordRequest {
  currentPassword: string;
  newPassword: string;
}

export interface UpdatePasswordResponse {
  message: string;
}

export interface LogoutResponse {
  message: string;
}

export interface ErrorResponse {
  error: string;
}
