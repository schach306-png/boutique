import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET /api/products/[id]
export async function GET(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = await prisma.product.findUnique({
    where: { id },
    include: { reviews: true },
  });
  if (!product) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(product);
}

// PUT /api/products/[id] — admin only
export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await req.json();

  const product = await prisma.product.update({
    where: { id },
    data: {
      name: body.name,
      price: body.price !== undefined ? Number(body.price) : undefined,
      originalPrice: body.originalPrice !== undefined ? Number(body.originalPrice) : undefined,
      discount: body.discount !== undefined ? Number(body.discount) : undefined,
      category: body.category,
      fabric: body.fabric,
      color: body.color,
      occasion: body.occasion,
      sizes: body.sizes,
      description: body.description,
      washCare: body.washCare,
      stock: body.stock !== undefined ? Number(body.stock) : undefined,
      featured: body.featured !== undefined ? Boolean(body.featured) : undefined,
      newArrival: body.newArrival !== undefined ? Boolean(body.newArrival) : undefined,
    },
  });

  return NextResponse.json(product);
}

// DELETE /api/products/[id] — admin only
export async function DELETE(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  await prisma.product.delete({ where: { id } });
  return NextResponse.json({ success: true });
}

// POST /api/products/[id] — add a review
export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await req.json();

  const review = await prisma.review.create({
    data: {
      productId: id,
      userName: body.userName,
      rating: Number(body.rating),
      comment: body.comment,
      userId: body.userId || null,
    },
  });

  // Recalculate product average rating
  const allReviews = await prisma.review.findMany({ where: { productId: id } });
  const avgRating = allReviews.reduce((sum, r) => sum + r.rating, 0) / allReviews.length;
  await prisma.product.update({ where: { id }, data: { rating: avgRating } });

  return NextResponse.json(review, { status: 201 });
}
