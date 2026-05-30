import type { NextApiRequest, NextApiResponse } from 'next';
import { parse } from 'cookie';
import { verifyToken } from './auth';
import { prisma } from './prisma';
import type { User } from '@prisma/client';

export interface AuthenticatedRequest extends NextApiRequest {
  user?: Omit<User, 'passwordHash'>;
}

/**
 * Middleware to authenticate API requests using JWT from cookies
 * @param req - Next.js API request
 * @param res - Next.js API response
 * @returns Authenticated user or null if not authenticated
 */
export async function authenticateRequest(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<Omit<User, 'passwordHash'> | null> {
  try {
    // Parse cookies from request
    const cookies = parse(req.headers.cookie || '');
    const token = cookies.auth_token;

    if (!token) {
      return null;
    }

    // Verify JWT token
    const payload = verifyToken(token);
    if (!payload) {
      return null;
    }

    // Fetch user from database
    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
      select: {
        id: true,
        email: true,
        name: true,
        emailVerified: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return user;
  } catch (error) {
    console.error('Authentication error:', error);
    return null;
  }
}

/**
 * Require authentication middleware - returns 401 if not authenticated
 */
export async function requireAuth(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<Omit<User, 'passwordHash'> | null> {
  const user = await authenticateRequest(req, res);
  
  if (!user) {
    res.status(401).json({ error: 'Unauthorized - Please log in' });
    return null;
  }
  
  return user;
}
