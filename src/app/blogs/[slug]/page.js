import React from 'react';
import dbConnect from '@/lib/mongoose';
import Blog from '@/models/Blog';
import { notFound } from 'next/navigation';
import { Navbar, Footer } from './components';
import { Clock, User, Calendar, ChevronLeft } from 'lucide-react';
import Link from 'next/link';

export async function generateMetadata({ params }) {
  const { slug } = await params;
  await dbConnect();
  const blog = await Blog.findOne({ slug }).lean();
  if (!blog) return { title: 'Blog Not Found | AR Interiors' };
  return {
    title: blog.seoTitle || `${blog.title} | AR Interiors`,
    description: blog.seoDescription || blog.excerpt,
    keywords: blog.seoKeywords?.join(', ') || '',
  };
}

function renderContent(contentItems) {
  if (!Array.isArray(contentItems)) return null;
  return contentItems.map((item, idx) => {
    if (typeof item === 'string') {
      return <p key={idx} style={styles.p}>{item}</p>;
    }
    if (item && typeof item === 'object') {
      switch (item.type) {
        case 'h2': return <h2 key={idx} style={styles.h2}>{item.text}</h2>;
        case 'h3': return <h3 key={idx} style={styles.h3}>{item.text}</h3>;
        case 'p':  return <p  key={idx} style={styles.p}>{item.text}</p>;
        case 'image': return (
          <div key={idx} style={{ margin: '40px 0' }}>
            <img src={item.text} alt="" style={{ width: '100%', borderRadius: 4, border: '1px solid rgba(255,255,255,0.05)' }} />
          </div>
        );
        case 'ul': return (
          <ul key={idx} style={styles.list}>
            {item.items?.map((li, i) => <li key={i} style={styles.li}>{li}</li>)}
          </ul>
        );
        case 'ol': return (
          <ol key={idx} style={styles.list}>
            {item.items?.map((li, i) => <li key={i} style={styles.li}>{li}</li>)}
          </ol>
        );
        default: return item.text ? <p key={idx} style={styles.p}>{item.text}</p> : null;
      }
    }
    return null;
  });
}

const styles = {
  h2: { fontFamily: 'var(--font-poppins)', fontSize: 30, color: '#fff', margin: '56px 0 20px', lineHeight: 1.3 },
  h3: { fontFamily: 'var(--font-poppins)', fontSize: 22, color: '#fff', margin: '36px 0 14px', lineHeight: 1.3 },
  p:  { marginBottom: 22, lineHeight: 1.85, color: 'rgba(232,224,212,0.85)', fontSize: 16 },
  list: { marginBottom: 28, paddingLeft: 22, lineHeight: 1.8 },
  li:  { marginBottom: 10, color: 'rgba(232,224,212,0.85)', fontSize: 16 },
};

export default async function SingleBlogPage({ params }) {
  const { slug } = await params;
  await dbConnect();
  const blog = await Blog.findOne({ slug }).lean();
  if (!blog) notFound();

  const dateStr = blog.date || (blog.createdAt ? new Date(blog.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : '');

  return (
    <div style={{ background: '#050508', color: '#fff', minHeight: '100vh' }}>
      <Navbar />

      {/* Header */}
      <div style={{ padding: '170px 28px 60px', background: 'linear-gradient(to bottom, #0a0a0f, #050508)', textAlign: 'center' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <Link href="/blogs" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: 'rgba(232,224,212,0.5)', fontSize: 12, textDecoration: 'none', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: 36 }}>
            <ChevronLeft size={15} /> Back to all articles
          </Link>

          {blog.category && (
            <div style={{ marginBottom: 24 }}>
              <span style={{ background: '#C9A96E', color: '#000', fontSize: 10, fontWeight: 800, textTransform: 'uppercase', padding: '5px 14px', letterSpacing: 1, borderRadius: 2 }}>
                {blog.category}
              </span>
            </div>
          )}

          <h1 style={{ fontFamily: 'var(--font-poppins)', fontSize: 'clamp(32px, 5vw, 54px)', lineHeight: 1.2, color: '#fff', marginBottom: 28 }}>
            {blog.title}
          </h1>

          <div style={{ display: 'flex', justifyContent: 'center', gap: 24, color: 'rgba(232,224,212,0.45)', fontSize: 13, flexWrap: 'wrap' }}>
            {blog.author && <span style={{ display: 'flex', alignItems: 'center', gap: 7 }}><User size={13} /> {blog.author}</span>}
            {dateStr      && <span style={{ display: 'flex', alignItems: 'center', gap: 7 }}><Calendar size={13} /> {dateStr}</span>}
          </div>
        </div>
      </div>

      {/* Hero Image */}
      {blog.image && (
        <div style={{ maxWidth: 1180, margin: '0 auto', padding: '0 28px' }}>
          <img src={blog.image} alt={blog.title} style={{ width: '100%', maxHeight: 560, objectFit: 'cover', borderRadius: 4, border: '1px solid rgba(255,255,255,0.05)', display: 'block' }} />
        </div>
      )}

      {/* Content */}
      <div style={{ maxWidth: 780, margin: '0 auto', padding: '72px 28px 120px' }}>
        {blog.excerpt && (
          <p style={{ fontFamily: 'var(--font-poppins)', fontStyle: 'italic', fontSize: 20, color: '#C9A96E', marginBottom: 48, lineHeight: 1.65, borderLeft: '3px solid #C9A96E', paddingLeft: 20 }}>
            {blog.excerpt}
          </p>
        )}
        {renderContent(blog.content)}

        {/* Back link at bottom */}
        <div style={{ marginTop: 72, paddingTop: 40, borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <Link href="/blogs" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, color: '#C9A96E', fontSize: 13, textDecoration: 'none', fontWeight: 600, letterSpacing: 1, textTransform: 'uppercase' }}>
            <ChevronLeft size={15} /> More Articles
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  );
}
