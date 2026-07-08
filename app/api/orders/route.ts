import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET /api/orders — admin sees all, user sees own (by userId)
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get('userId');

  const orders = await prisma.order.findMany({
    where: userId ? { userId } : {},
    include: { items: true },
    orderBy: { createdAt: 'desc' },
  });

  return NextResponse.json(orders);
}

// POST /api/orders — place an order
export async function POST(req: NextRequest) {
  const body = await req.json();

  const order = await prisma.order.create({
    data: {
      customerName: body.customerName,
      email: body.email,
      phone: body.phone,
      shippingAddress: body.shippingAddress,
      billingAddress: body.billingAddress,
      subtotal: Number(body.subtotal),
      tax: Number(body.tax),
      shipping: Number(body.shipping),
      total: Number(body.total),
      paymentMethod: body.paymentMethod,
      userId: body.userId || null,
      items: {
        create: body.items.map((item: {
          productId?: string;
          productName: string;
          image: string;
          price: number;
          quantity: number;
          size: string;
        }) => ({
          productId: item.productId || null,
          productName: item.productName,
          image: item.image,
          price: Number(item.price),
          quantity: Number(item.quantity),
          size: item.size,
        })),
      },
    },
    include: { items: true },
  });

  // Decrement stock for each product
  for (const item of body.items) {
    if (item.productId) {
      await prisma.product.update({
        where: { id: item.productId },
        data: { stock: { decrement: item.quantity } },
      });
    }
  }

  return NextResponse.json(order, { status: 201 });
}
