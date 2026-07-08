import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET /api/coupons — admin only
export async function GET() {
  const coupons = await prisma.coupon.findMany({ orderBy: { createdAt: 'desc' } });
  return NextResponse.json(coupons);
}

// POST /api/coupons/validate — validate a coupon code
export async function POST(req: NextRequest) {
  const body = await req.json();

  // If validating
  if (body.action === 'validate') {
    const coupon = await prisma.coupon.findUnique({ where: { code: body.code } });
    if (!coupon || !coupon.active) {
      return NextResponse.json({ error: 'Invalid or expired coupon' }, { status: 400 });
    }
    if (coupon.usedCount >= coupon.maxUses) {
      return NextResponse.json({ error: 'Coupon usage limit reached' }, { status: 400 });
    }
    if (body.orderTotal < coupon.minOrder) {
      return NextResponse.json({ error: `Minimum order ₹${coupon.minOrder} required` }, { status: 400 });
    }
    return NextResponse.json(coupon);
  }

  // Admin: create coupon
  const coupon = await prisma.coupon.create({
    data: {
      code: body.code.toUpperCase(),
      discount: Number(body.discount),
      type: body.type,
      minOrder: Number(body.minOrder || 0),
      maxUses: Number(body.maxUses || 100),
    },
  });
  return NextResponse.json(coupon, { status: 201 });
}

// DELETE /api/coupons?code=WELCOME10
export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get('code');
  if (!code) return NextResponse.json({ error: 'Code required' }, { status: 400 });
  await prisma.coupon.delete({ where: { code } });
  return NextResponse.json({ success: true });
}
