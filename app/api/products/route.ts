import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET /api/products — public
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get('category');
  const search = searchParams.get('search');
  const featured = searchParams.get('featured');

  const where: Record<string, unknown> = {};
  if (category) where.category = category;
  if (featured === 'true') where.featured = true;
  if (search) where.name = { contains: search, mode: 'insensitive' };

  const products = await prisma.product.findMany({
    where,
    include: { reviews: true },
    orderBy: { createdAt: 'desc' },
  });

  return NextResponse.json(products);
}

// POST /api/products — admin only
export async function POST(req: NextRequest) {
  const body = await req.json();

  const product = await prisma.product.create({
    data: {
      name: body.name,
      price: Number(body.price),
      originalPrice: body.originalPrice ? Number(body.originalPrice) : null,
      discount: body.discount ? Number(body.discount) : null,
      category: body.category,
      images: body.images || [],
      fabric: body.fabric,
      color: body.color,
      occasion: body.occasion,
      sizes: body.sizes || [],
      description: body.description,
      washCare: body.washCare,
      stock: Number(body.stock),
      featured: Boolean(body.featured),
      newArrival: Boolean(body.newArrival),
    },
  });

  return NextResponse.json(product, { status: 201 });
}
