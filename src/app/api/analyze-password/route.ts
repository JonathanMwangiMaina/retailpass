import { NextRequest, NextResponse } from 'next/server';
import { analyzePasswordStrength } from '@/ai/flows/password-strength-analyzer';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { password } = body;

    if (!password || typeof password !== 'string') {
      return NextResponse.json(
        { error: 'Password is required and must be a string' },
        { status: 400 }
      );
    }

    const result = await analyzePasswordStrength({ password });

    return NextResponse.json(result);
  } catch (error) {
    console.error('Error analyzing password strength:', error);
    return NextResponse.json(
      { error: 'Failed to analyze password strength' },
      { status: 500 }
    );
  }
}
