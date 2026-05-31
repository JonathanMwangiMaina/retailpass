import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const health = {
    status: 'ok',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
    hasJWTSecret: !!process.env.JWT_SECRET,
    hasSupabaseURL: !!process.env.SUPABASE_DATABASE_URL,
    hasDatabaseURL: !!process.env.DATABASE_URL,
  };

  return res.status(200).json(health);
}
