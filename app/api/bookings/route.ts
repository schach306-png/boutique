import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET /api/bookings — admin sees all, customer sees their own (by phone)
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const phone = searchParams.get('phone');

  const bookings = await prisma.booking.findMany({
    where: phone ? { phone } : {},
    include: { service: true },
    orderBy: { createdAt: 'desc' },
  });

  return NextResponse.json(bookings);
}

// POST /api/bookings — create a booking
export async function POST(req: NextRequest) {
  const body = await req.json();

  const booking = await prisma.booking.create({
    data: {
      customerName: body.customerName,
      phone: body.phone,
      serviceId: body.serviceId,
      preferredDate: body.preferredDate,
      preferredTime: body.preferredTime,
      notes: body.notes || null,
      userId: body.userId || null,
    },
    include: { service: true },
  });

  return NextResponse.json(booking, { status: 201 });
}
