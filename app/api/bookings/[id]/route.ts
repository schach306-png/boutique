import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// PATCH /api/bookings/[id] — update status (admin)
export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { status } = await req.json();

  const booking = await prisma.booking.update({
    where: { id },
    data: { status },
    include: { service: true },
  });

  return NextResponse.json(booking);
}
