/**
 * Migration Script – Convert block-based content to HTML
 * Finds all blogs that have no `htmlContent` but have a `content` array,
 * converts the blocks to HTML, and saves it as `htmlContent`.
 *
 * Usage:
 *   node scripts/migrate-content.js
 */

const mongoose = require('mongoose');
require('dotenv').config({ path: '.env.local' });

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
  console.error('❌  MONGODB_URI is not set in .env.local');
  process.exit(1);
}

const BlogSchema = new mongoose.Schema(
  {
    slug:        { type: String },
    title:       { type: String },
    htmlContent: { type: String },
    content:     [{ type: mongoose.Schema.Types.Mixed }],
  },
  { strict: false, timestamps: true }
);

const Blog = mongoose.models.Blog || mongoose.model('Blog', BlogSchema);

// ── Convert a block array to an HTML string ───────────────────────────
function blocksToHtml(blocks) {
  if (!Array.isArray(blocks) || blocks.length === 0) return '';

  return blocks.map(block => {
    if (typeof block === 'string') {
      return `<p>${escHtml(block)}</p>`;
    }
    if (!block || typeof block !== 'object') return '';

    switch (block.type) {
      case 'h1':
        return `<h1>${escHtml(block.text || '')}</h1>`;
      case 'h2':
        return `<h2>${escHtml(block.text || '')}</h2>`;
      case 'h3':
        return `<h3>${escHtml(block.text || '')}</h3>`;
      case 'p':
        return `<p>${escHtml(block.text || '')}</p>`;
      case 'ul':
        if (!Array.isArray(block.items) || block.items.length === 0) return '';
        return `<ul>${block.items.map(i => `<li>${escHtml(i)}</li>`).join('')}</ul>`;
      case 'ol':
        if (!Array.isArray(block.items) || block.items.length === 0) return '';
        return `<ol>${block.items.map(i => `<li>${escHtml(i)}</li>`).join('')}</ol>`;
      case 'blockquote':
        return `<blockquote>${escHtml(block.text || '')}</blockquote>`;
      case 'image':
        return block.text ? `<img src="${block.text}" alt="" />` : '';
      default:
        // Unknown type but has text — render as paragraph
        return block.text ? `<p>${escHtml(block.text)}</p>` : '';
    }
  }).join('\n');
}

function escHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// ── Main ─────────────────────────────────────────────────────────────
async function migrate() {
  console.log('🔌  Connecting to MongoDB...');
  await mongoose.connect(MONGODB_URI, { bufferCommands: false });
  console.log('✅  Connected.\n');

  // Find blogs that need migration
  const blogs = await Blog.find({
    $or: [
      { htmlContent: { $exists: false } },
      { htmlContent: null },
      { htmlContent: '' },
    ],
  });

  if (blogs.length === 0) {
    console.log('✅  Nothing to migrate — all blogs already have htmlContent.');
    await mongoose.disconnect();
    return;
  }

  console.log(`📝  Found ${blogs.length} blog(s) to migrate:\n`);

  let migrated = 0, skipped = 0;

  for (const blog of blogs) {
    if (!blog.content || blog.content.length === 0) {
      console.log(`   ⚠  "${blog.title}" — no content blocks, skipping.`);
      skipped++;
      continue;
    }

    const html = blocksToHtml(blog.content);
    await Blog.updateOne({ _id: blog._id }, { $set: { htmlContent: html } });

    console.log(`   ✅  Migrated: "${blog.title}"`);
    console.log(`       Blocks: ${blog.content.length} → HTML: ${html.length} chars`);
    migrated++;
  }

  console.log(`\n🎉  Done! ${migrated} migrated, ${skipped} skipped.`);
  await mongoose.disconnect();
  console.log('🔌  Disconnected.');
}

migrate().catch(err => {
  console.error('❌  Migration failed:', err);
  process.exit(1);
});
