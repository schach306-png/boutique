import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET /api/services
export async function GET() {
  const services = await prisma.tailoringService.findMany({
    orderBy: { createdAt: 'asc' },
  });
  return NextResponse.json(services);
}
