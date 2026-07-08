import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: NextRequest) {
  try {
    const rawUrl = process.env.DATABASE_URL || '';
    // Mask the password for safety
    const maskedUrl = rawUrl.replace(/:([^:@]+)@/, ':***@');

    const users = await prisma.user.findMany({
      select: {
        email: true,
        name: true,
        role: true,
      }
    });

    return NextResponse.json({
      activeDatabaseUrl: maskedUrl,
      usersCount: users.length,
      users: users,
    });
  } catch (error: any) {
    return NextResponse.json({
      error: error.message,
      stack: error.stack,
    }, { status: 500 });
  }
}
