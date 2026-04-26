/**
 * Seed Script – AR Interiors
 * Seeds sample blogs + a default admin into MongoDB
 *
 * Usage:
 *   node scripts/seed.js
 *
 * Make sure MONGODB_URI is set in your .env.local file first.
 */

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config({ path: '.env.local' });

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
  console.error('❌  MONGODB_URI is not set in .env.local');
  process.exit(1);
}

// ─── SCHEMAS ─────────────────────────────────────────────────────────

const AdminSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    name: { type: String },
  },
  { timestamps: true }
);

AdminSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

const BlogSchema = new mongoose.Schema(
  {
    slug: { type: String, required: true, unique: true },
    title: { type: String },
    excerpt: { type: String },
    date: { type: String },
    author: { type: String },
    category: { type: String },
    image: { type: String },
    seoTitle: { type: String },
    seoDescription: { type: String },
    seoKeywords: [{ type: String }],
    content: [{ type: mongoose.Schema.Types.Mixed }],
  },
  { timestamps: true }
);

const Admin = mongoose.models.Admin || mongoose.model('Admin', AdminSchema);
const Blog = mongoose.models.Blog || mongoose.model('Blog', BlogSchema);

// ─── SEED DATA ───────────────────────────────────────────────────────



const BLOGS_SEED = [
  {
    slug: 'top-5-modular-kitchen-trends-pune-2026',
    title: 'Top 5 Modular Kitchen Trends in Pune for 2026',
    excerpt: 'Discover why handleless designs and built-in appliances are taking over Pune homes this year.',
    date: 'April 15, 2026',
    author: 'A R Interiors Editorial',
    category: 'Modular Kitchen',
    image: '/modularkitchen.jpg',
    seoTitle: 'Top 5 Modular Kitchen Trends in Pune 2026 | AR Interiors',
    seoDescription: 'Explore the latest modular kitchen trends in Pune for 2026. Handleless designs, built-in appliances and more from AR Interiors.',
    seoKeywords: ['modular kitchen pune', 'kitchen design 2026', 'interior design pune'],
    content: [
      { type: 'p', text: 'The modular kitchen landscape in Pune is evolving rapidly as homeowners demand smarter, more aesthetic solutions.' },
      { type: 'h2', text: '1. Handleless Cabinets' },
      { type: 'p', text: 'Handleless kitchen designs offer a sleek, seamless look that is both modern and easy to clean. Push-to-open mechanisms are gaining popularity across Baner and Hinjewadi households.' },
      { type: 'h2', text: '2. Built-In Appliances' },
      { type: 'p', text: 'Integrated ovens, microwaves, and dishwashers give the kitchen a unified, high-end appearance. This trend is particularly popular in luxury apartments in Koregaon Park.' },
      { type: 'h2', text: '3. Matte Finish Laminates' },
      { type: 'p', text: 'Glossy finishes are giving way to sophisticated matte laminates that resist fingerprints and add texture to the space.' },
      { type: 'h2', text: '4. Smart Storage Solutions' },
      { type: 'ul', items: ['Pull-out pantry units', 'Corner carousels', 'Under-sink organisers', 'Tall-unit pull-outs'] },
      { type: 'h2', text: '5. Earthy, Warm Tones' },
      { type: 'p', text: 'Greige, terracotta, and olive green palettes are replacing stark whites, bringing warmth and personality to Pune kitchens.' },
    ],
  },
  {
    slug: 'design-small-2bhk-pune-expert-tips',
    title: 'How to Design a Small 2 BHK in Pune: Expert Tips',
    excerpt: 'Maximize every square foot with smart multifunctional furniture and space-saving layouts.',
    date: 'April 12, 2026',
    author: 'Project Manager – Baner',
    category: 'Interior Design',
    image: '/livingroom.jpg',
    seoTitle: 'Small 2 BHK Interior Design Tips Pune | AR Interiors',
    seoDescription: 'Expert tips on designing a small 2 BHK flat in Pune. Space-saving furniture, smart layouts and professional advice from AR Interiors.',
    seoKeywords: ['2 bhk interior design pune', 'small apartment design', 'space saving furniture'],
    content: [
      { type: 'p', text: 'Designing a compact 2 BHK in Pune requires creativity, precision, and a deep understanding of how residents use each room.' },
      { type: 'h2', text: 'Use Multifunctional Furniture' },
      { type: 'p', text: 'Sofa-cum-beds, ottomans with storage, and extendable dining tables are your best friends in a compact home.' },
      { type: 'h2', text: 'Vertical Space is Gold' },
      { type: 'p', text: 'Floor-to-ceiling wardrobes and wall-mounted shelving free up precious floor area. Use high cabinets in kitchens to store rarely used items.' },
      { type: 'h2', text: 'Light and Mirror Magic' },
      { type: 'ul', items: ['Full-length mirrors to double perceived space', 'Light neutral paint colours', 'Sheer curtains to maximise natural light', 'Recessed lighting to avoid visual clutter'] },
      { type: 'h2', text: 'Open Plan Living' },
      { type: 'p', text: 'Combining the living and dining area into an open plan creates a more spacious feel while still defining each zone through rugs and lighting.' },
    ],
  },
  {
    slug: 'woodwork-quality-matters-ar-standard',
    title: 'Why Woodwork Quality Matters: The AR Standard',
    excerpt: 'Learn about BWR vs BWP grade plywood and why our 10-year warranty is industry-leading.',
    date: 'April 08, 2026',
    author: 'Technical Team',
    category: 'Materials',
    image: '/masterbedroom.jpg',
    seoTitle: 'Woodwork Quality Guide for Interior Design Pune | AR Interiors',
    seoDescription: 'Understand BWR and BWP plywood grades and why quality woodwork is critical for long-lasting interiors in Pune.',
    seoKeywords: ['bwr plywood', 'bwp plywood', 'woodwork quality pune', 'interior materials'],
    content: [
      { type: 'p', text: 'At AR Interiors, we believe quality materials are not optional — they are the foundation of every beautiful, lasting interior.' },
      { type: 'h2', text: 'BWR vs BWP Plywood' },
      { type: 'p', text: 'BWR (Boiling Water Resistant) plywood is suitable for most interior applications. BWP (Boiling Waterproof) is a premium grade recommended for kitchens and bathrooms where moisture exposure is higher.' },
      { type: 'h2', text: 'Our Material Standard' },
      {
        type: 'ul', items: [
          'Minimum 18mm BWR/BWP grade plywood for all carcasses',
          'CARB2-certified MDF for shutters',
          'Hafele / Hettich hardware throughout',
          'Durian / Century laminates only',
        ]
      },
      { type: 'h2', text: 'The 10-Year Warranty Promise' },
      { type: 'p', text: 'Our industry-leading 10-year structural warranty on all woodwork is backed by these material standards. We document every material used on site so you always know what went into your home.' },
    ],
  },
  {
    slug: 'productive-home-office-hinjewadi',
    title: 'Creating a Productive Home Office in Hinjewadi',
    excerpt: 'Ergonomic tips and design inspiration for professionals working from home in Pune IT hubs.',
    date: 'April 05, 2026',
    author: 'A R Interiors Editorial',
    category: 'Commercial',
    image: '/Office.jpg',
    seoTitle: 'Home Office Design Hinjewadi Pune | AR Interiors',
    seoDescription: 'Design a productive home office in Pune. Ergonomic furniture, lighting tips and professional workspace ideas from AR Interiors.',
    seoKeywords: ['home office design pune', 'work from home interior', 'hinjewadi interior design'],
    content: [
      { type: 'p', text: 'With Pune\'s IT sector booming, thousands of professionals are designing dedicated home offices for maximum productivity.' },
      { type: 'h2', text: 'Ergonomics First' },
      { type: 'p', text: 'Invest in an adjustable height desk and an ergonomic chair. Position your monitor at eye level to prevent neck strain during long work sessions.' },
      { type: 'h2', text: 'Lighting Setup' },
      { type: 'ul', items: ['Natural light on the left or right of your monitor (never behind)', 'Warm-white task lighting (3000K) for evenings', 'Bias lighting behind your monitor to reduce eye strain'] },
      { type: 'h2', text: 'Storage and Cable Management' },
      { type: 'p', text: 'Built-in shelving above the desk, cable management trays, and a dedicated printer cabinet keep the workspace clean and focused.' },
      { type: 'h2', text: 'Acoustic Comfort' },
      { type: 'p', text: 'Acoustic panels or a fabric-wrapped feature wall significantly reduce echo in video calls — a professional touch that costs less than you think.' },
    ],
  },
  {
    slug: 'art-of-false-ceilings-living-room',
    title: 'The Art of False Ceilings: Elevating Your Living Room',
    excerpt: 'From cove lighting to minimalist patterns, find the perfect ceiling for your dream home.',
    date: 'March 28, 2026',
    author: 'Design Team',
    category: 'Specialty',
    image: '/False Ceiling.jpg',
    seoTitle: 'False Ceiling Design Ideas Pune | AR Interiors',
    seoDescription: 'Explore beautiful false ceiling designs for Pune homes. Cove lighting, POP, and gypsum ceiling ideas from AR Interiors.',
    seoKeywords: ['false ceiling design pune', 'pop ceiling', 'cove lighting interior', 'gypsum ceiling'],
    content: [
      { type: 'p', text: 'A well-designed false ceiling can completely transform the character of a living room — adding drama, warmth, or minimalist sophistication.' },
      { type: 'h2', text: 'Cove Lighting Ceilings' },
      { type: 'p', text: 'Cove lighting involves concealing LED strips in recessed trays to cast a soft, indirect glow. It adds depth and ambience without harsh overhead light.' },
      { type: 'h2', text: 'Coffered Ceilings' },
      { type: 'p', text: 'Inspired by classical architecture, coffered ceilings add a sense of grandeur through sunken panels. Ideal for larger living rooms in Koregaon Park villas.' },
      { type: 'h2', text: 'Minimalist Flat Ceilings' },
      { type: 'p', text: 'Sometimes less is more. A smooth gypsum flat ceiling with recessed spotlights is clean, timeless, and works in any apartment size.' },
      { type: 'h2', text: 'Material Options' },
      { type: 'ul', items: ['Gypsum board – smooth finish, lightweight', 'POP (Plaster of Paris) – intricate designs, traditional', 'Wood veneer panels – warm, premium feel', 'Stretch fabric ceilings – modern, acoustically beneficial'] },
    ],
  },
  {
    slug: 'luxury-villa-transformations-koregaon-park',
    title: 'Luxury Villa Transformations in Koregaon Park',
    excerpt: 'A walkthrough of our latest premium project blending traditional elegance with modern luxury.',
    date: 'March 22, 2026',
    author: 'Head Designer',
    category: 'Luxury',
    image: '/fullInterior.jpg',
    seoTitle: 'Luxury Villa Interior Design Koregaon Park Pune | AR Interiors',
    seoDescription: 'Explore our luxury villa transformation in Koregaon Park, Pune. Premium materials, custom design, and timeless elegance by AR Interiors.',
    seoKeywords: ['luxury villa design pune', 'koregaon park interior', 'premium interior design pune'],
    content: [
      { type: 'p', text: 'Our most ambitious project this season, this 5000 sq ft villa in Koregaon Park required a delicate balance of old-world charm and contemporary sensibility.' },
      { type: 'h2', text: 'The Brief' },
      { type: 'p', text: 'The homeowners — a well-travelled family — wanted an interior that felt like a five-star hotel while remaining warm and liveable for their three-generation household.' },
      { type: 'h2', text: 'Materials Used' },
      { type: 'ul', items: ['Imported Italian marble for flooring and feature walls', 'Teak wood panelling throughout the formal living area', 'Handcrafted brass hardware and fixtures', 'Custom upholstered furniture from a Pune-based artisan collective'] },
      { type: 'h2', text: 'Signature Design Moments' },
      { type: 'p', text: 'The centrepiece is a 14-foot hand-painted feature wall in the dining room, complemented by a bespoke chandelier commissioned from a local metalwork studio.' },
      { type: 'h2', text: 'The Result' },
      { type: 'p', text: 'A home that has since been featured in Architectural Digest India, and a family that calls it "exactly what we dreamed but couldn\'t articulate." That, for us, is the true mark of success.' },
    ],
  },
];

// ─── MAIN ────────────────────────────────────────────────────────────

async function seed() {
  console.log('🔌  Connecting to MongoDB...');
  await mongoose.connect(MONGODB_URI, { bufferCommands: false });
  console.log('✅  Connected.\n');

  // ── Admin ──────────────────────────────────────────────────────────
  console.log('👤  Seeding admin...');
  const existingAdmin = await Admin.findOne({ email: ADMIN_SEED.email });
  if (existingAdmin) {
    console.log(`   ⚠  Admin already exists: ${ADMIN_SEED.email} (skipped)`);
  } else {
    await new Admin(ADMIN_SEED).save();
    console.log(`   ✅  Admin created: ${ADMIN_SEED.email}`);
    console.log(`   🔑  Default password: ${ADMIN_SEED.password}  ← change this after login!\n`);
  }

  // ── Blogs ──────────────────────────────────────────────────────────
  console.log('📝  Seeding blogs...');
  let created = 0, skipped = 0;

  for (const blog of BLOGS_SEED) {
    const exists = await Blog.findOne({ slug: blog.slug });
    if (exists) {
      console.log(`   ⚠  Blog already exists: "${blog.title}" (skipped)`);
      skipped++;
    } else {
      await Blog.create(blog);
      console.log(`   ✅  Created: "${blog.title}"`);
      created++;
    }
  }

  console.log(`\n🎉  Done! ${created} blog(s) created, ${skipped} skipped.`);
  await mongoose.disconnect();
  console.log('🔌  Disconnected from MongoDB.');
}

seed().catch((err) => {
  console.error('❌  Seed failed:', err);
  process.exit(1);
});
