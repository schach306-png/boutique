import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // ─── Admin User ───────────────────────────────────────────────
  const adminPassword = await bcrypt.hash('admin123', 10);
  await prisma.user.upsert({
    where: { email: 'admin@threadsandtraditions.com' },
    update: {},
    create: {
      name: 'Store Owner',
      email: 'admin@threadsandtraditions.com',
      password: adminPassword,
      role: 'admin',
      addresses: ['Shop 14, Lotus Plaza, Sector 18, Noida'],
    },
  });
  console.log('✅ Admin user created');

  // ─── Products ─────────────────────────────────────────────────
  const products = [
    {
      name: 'Royal Maroon Velvet Anarkali Suit Set',
      price: 3899,
      originalPrice: 4899,
      discount: 20,
      category: 'suits',
      images: ['/images/product_maroon_velvet_1.jpg'],
      fabric: 'Velvet & Organza',
      color: 'Maroon',
      occasion: 'Festive Wear',
      sizes: ['S', 'M', 'L', 'XL'],
      description: 'An elegant maroon velvet Anarkali suit set with intricate gold zari embroidery on the yoke and cuffs. Comes with a matching organza dupatta featuring scalloped borders and raw silk trousers.',
      washCare: 'Dry Clean Only',
      stock: 8,
      featured: true,
      newArrival: true,
      rating: 4.8,
    },
    {
      name: 'Classic Mustard Silk Banarasi Saree',
      price: 5200,
      originalPrice: 6500,
      discount: 20,
      category: 'sarees',
      images: ['/images/product_mustard_silk_1.jpg'],
      fabric: 'Banarasi Katan Silk',
      color: 'Mustard Yellow',
      occasion: 'Wedding Wear',
      sizes: ['Free Size'],
      description: 'Handwoven Banarasi silk saree in a brilliant mustard yellow shade, complete with a traditional gold zari border and rich pallu featuring floral motifs. Includes unstitched blouse piece.',
      washCare: 'Dry Clean Only',
      stock: 5,
      featured: true,
      newArrival: false,
      rating: 4.9,
    },
    {
      name: 'Mint Green Floral Georgette Saree',
      price: 2499,
      originalPrice: 2999,
      discount: 16,
      category: 'sarees',
      images: ['/images/product_mint_green_1.jpg'],
      fabric: 'Georgette',
      color: 'Mint Green',
      occasion: 'Casual Festive',
      sizes: ['Free Size'],
      description: 'A light and breezy mint green georgette saree printed with beautiful pastel watercolor florals. Finished with a delicate gold gota-patti border.',
      washCare: 'Gentle Hand Wash',
      stock: 12,
      featured: false,
      newArrival: true,
      rating: 4.5,
    },
    {
      name: 'Elbow-Length Velvet Blouse with Zardozi Work',
      price: 1899,
      originalPrice: 2299,
      discount: 17,
      category: 'blouses',
      images: ['/images/product_velvet_blouse_1.jpg'],
      fabric: 'Velvet',
      color: 'Deep Red',
      occasion: 'Bridal/Party Wear',
      sizes: ['34', '36', '38', '40'],
      description: 'A heavily embroidered deep red velvet padded blouse. The back features a deep round neckline with handcrafted dori tassels. Front hook-and-eye closure.',
      washCare: 'Dry Clean Only',
      stock: 15,
      featured: true,
      newArrival: true,
      rating: 4.7,
    },
    {
      name: 'Earthy Indigo Cotton Suit Set',
      price: 1850,
      originalPrice: 1850,
      category: 'suits',
      images: ['/images/product_indigo_cotton_1.jpg'],
      fabric: '100% Indigo Cotton',
      color: 'Indigo Blue',
      occasion: 'Daily Wear',
      sizes: ['S', 'M', 'L', 'XL', 'XXL'],
      description: 'Everyday comfortable regular fit block-printed indigo straight kurti, paired with off-white cotton palazzo trousers and a lightweight mulmul dupatta.',
      washCare: 'Hand Wash separately in cold water',
      stock: 20,
      featured: false,
      newArrival: false,
      rating: 4.3,
    },
    {
      name: 'Golden Brocade Sleeveless Saree Blouse',
      price: 999,
      originalPrice: 1299,
      discount: 23,
      category: 'blouses',
      images: ['/images/product_brocade_blouse_1.jpg'],
      fabric: 'Banarasi Brocade Silk',
      color: 'Gold',
      occasion: 'Party Wear',
      sizes: ['32', '34', '36', '38', '40'],
      description: 'A classic sleeveless gold brocade blouse that pairs beautifully with almost any saree. Features a boat neck front and back, with inside margins for size adjustments.',
      washCare: 'Dry Clean Recommended',
      stock: 25,
      featured: false,
      newArrival: false,
      rating: 4.6,
    },
  ];

  for (const p of products) {
    await prisma.product.create({ data: p });
  }
  console.log(`✅ ${products.length} products created`);

  // ─── Tailoring Services ────────────────────────────────────────
  const services = [
    { name: 'Blouse Stitching (Plain/Padded)', category: 'stitching', description: 'Custom tailored saree blouse made exactly to your body measurements. Choose necklines, back designs, sleeve length, and padding choices.', startingPrice: 650, duration: '4-5 Days' },
    { name: 'Blouse Alteration & Fitting', category: 'alteration', description: 'Fixing loose or tight blouses, adding/removing sleeves, adding pads, or adjusting shoulders for that flawless fit.', startingPrice: 150, duration: '1-2 Days' },
    { name: 'Saree Pico & Fall Stitching', category: 'finishing', description: 'Overlock edging (pico) on both ends of the saree and stitching cotton fallback support on the lower inner hem.', startingPrice: 120, duration: '1 Day' },
    { name: 'Saree Rolling & Polishing', category: 'finishing', description: 'Professional rolling and mild starching/polishing for organza, silk, and cotton sarees to restore original shine and drape.', startingPrice: 250, duration: '2 Days' },
    { name: 'Salwar/Anarkali Suit Stitching', category: 'stitching', description: 'Stitching of custom salwar kameez, designer kurti, pants, palazzo, or heavy lining Anarkali sets from fabric.', startingPrice: 1200, duration: '6-7 Days' },
    { name: 'Kurti / Suit Alteration', category: 'alteration', description: 'Side fitting adjustments, length shortening/lengthening, sleeve adjustments, or neckline modifications.', startingPrice: 200, duration: '1-2 Days' },
    { name: 'Custom Lehenga Stitching', category: 'stitching', description: 'High-end lehenga choli stitching with canvas lining, double gher, latkan details, and customized dupatta drapery settings.', startingPrice: 2500, duration: '8-10 Days' },
  ];

  for (const s of services) {
    await prisma.tailoringService.create({ data: s });
  }
  console.log(`✅ ${services.length} tailoring services created`);

  // ─── Coupons ──────────────────────────────────────────────────
  await prisma.coupon.createMany({
    data: [
      { code: 'WELCOME10', discount: 10, type: 'percentage', minOrder: 1000, maxUses: 1000 },
      { code: 'FESTIVE500', discount: 500, type: 'fixed', minOrder: 3000, maxUses: 500 },
    ],
    skipDuplicates: true,
  });
  console.log('✅ Coupons created');

  console.log('\n🎉 Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
