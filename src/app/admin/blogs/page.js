'use client'

import React, { useState, useEffect, lazy, Suspense } from 'react'
import {
  Plus, Trash2, Save, ArrowLeft, Edit2,
  List, LogOut, Eye, EyeOff
} from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

const RichEditor = lazy(() => import('../components/RichEditor'))

const CATEGORIES = ['Interior Design', 'Modular Kitchen', 'Materials', 'Commercial', 'Luxury', 'Specialty']

const inp = {
  background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)',
  borderRadius: 4, padding: '11px 14px', color: '#fff',
  fontFamily: 'inherit', fontSize: 14, width: '100%', boxSizing: 'border-box',
}

const EMPTY = {
  title: '', slug: '', excerpt: '', author: '', category: '',
  image: '', date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
  seoTitle: '', seoDescription: '', seoKeywords: '',
}

// ─── Live Preview ──────────────────────────────────────────────────────
function BlogPreview({ form, html }) {
  return (
    <div style={{ background: '#050508', borderRadius: 6, padding: '32px 28px', border: '1px solid rgba(255,255,255,0.06)', height: 700, overflowY: 'auto', boxSizing: 'border-box' }}>
      <div style={{ marginBottom: 20 }}>
        {form.category && (
          <span style={{ background: '#C9A96E', color: '#000', fontSize: 10, fontWeight: 800, textTransform: 'uppercase', padding: '4px 12px', letterSpacing: 1, borderRadius: 2, marginBottom: 16, display: 'inline-block' }}>
            {form.category}
          </span>
        )}
        <h1 style={{ fontFamily: 'var(--font-playfair)', fontSize: 'clamp(22px,4vw,36px)', color: '#fff', lineHeight: 1.25, margin: '14px 0 12px' }}>
          {form.title || <span style={{ color: 'rgba(232,224,212,0.2)' }}>Blog title will appear here</span>}
        </h1>
        <div style={{ display: 'flex', gap: 16, color: 'rgba(232,224,212,0.4)', fontSize: 12, marginBottom: 20 }}>
          {form.author && <span>By {form.author}</span>}
          {form.date   && <span>{form.date}</span>}
        </div>
        {form.image && (
          <img src={form.image} alt="" style={{ width: '100%', maxHeight: 260, objectFit: 'cover', borderRadius: 4, marginBottom: 24 }} onError={e => e.target.style.display='none'}/>
        )}
        {form.excerpt && (
          <p style={{ fontFamily: 'var(--font-playfair)', fontStyle: 'italic', fontSize: 17, color: '#C9A96E', borderLeft: '3px solid #C9A96E', paddingLeft: 16, marginBottom: 24, lineHeight: 1.6 }}>
            {form.excerpt}
          </p>
        )}
      </div>
      <div
        className="blog-preview-body"
        dangerouslySetInnerHTML={{ __html: html || '<p style="color:rgba(232,224,212,0.2)">Start writing in the editor to see a preview...</p>' }}
      />
      <style>{`
        .blog-preview-body p { margin: 0 0 16px; font-size: 15px; line-height: 1.8; color: rgba(232,224,212,0.85); }
        .blog-preview-body h1 { font-family: var(--font-playfair); font-size: 30px; color: #fff; margin: 44px 0 16px; }
        .blog-preview-body h2 { font-family: var(--font-playfair); font-size: 24px; color: #fff; margin: 36px 0 14px; }
        .blog-preview-body h3 { font-family: var(--font-playfair); font-size: 19px; color: #fff; margin: 28px 0 10px; }
        .blog-preview-body ul { padding-left: 22px; margin-bottom: 18px; list-style-type: disc; }
        .blog-preview-body ol { padding-left: 22px; margin-bottom: 18px; list-style-type: decimal; }
        .blog-preview-body li { margin-bottom: 8px; font-size: 15px; color: rgba(232,224,212,0.85); }
        .blog-preview-body ul li::marker { color: #C9A96E; }
        .blog-preview-body blockquote { border-left: 3px solid #C9A96E; padding: 4px 0 4px 18px; margin: 24px 0; color: rgba(201,169,110,0.85); font-style: italic; font-family: var(--font-playfair); font-size: 16px; }
        .blog-preview-body hr { border: none; border-top: 1px solid rgba(255,255,255,0.07); margin: 32px 0; }
        .blog-preview-body strong { color: #fff; }
      `}</style>
    </div>
  )
}

// ─── Blog Form ─────────────────────────────────────────────────────────
function BlogForm({ initial, initialHtml, editSlug, onSuccess }) {
  const [form, setForm] = useState(initial || EMPTY)
  const [html, setHtml] = useState(initialHtml || '')
  const [preview, setPreview] = useState(false)
  const [loading, setLoading] = useState(false)
  const [msg, setMsg] = useState({ type: '', text: '' })

  const set = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))
  const genSlug = () => {
    if (form.title) setForm(f => ({ ...f, slug: f.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') }))
  }

  const submit = async (e) => {
    e.preventDefault(); setLoading(true); setMsg({ type: '', text: '' })
    try {
      const payload = {
        ...form,
        htmlContent: html,
        seoKeywords: form.seoKeywords.split(',').map(k => k.trim()).filter(Boolean),
      }
      const url    = editSlug ? `/api/blogs/${editSlug}` : '/api/blogs'
      const method = editSlug ? 'PUT' : 'POST'
      const res  = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
      const data = await res.json()
      if (data.success) {
        setMsg({ type: 'success', text: editSlug ? 'Blog updated successfully!' : 'Blog published successfully!' })
        if (!editSlug) { setForm(EMPTY); setHtml('') }
        if (onSuccess) onSuccess()
      } else {
        setMsg({ type: 'error', text: data.error || 'Failed to save.' })
      }
    } catch { setMsg({ type: 'error', text: 'Network error.' }) }
    finally { setLoading(false) }
  }

  return (
    <form onSubmit={submit}>
      {msg.text && (
        <div style={{ padding: '13px 16px', borderRadius: 6, marginBottom: 24, fontSize: 14,
          background: msg.type === 'success' ? 'rgba(34,197,94,0.1)' : 'rgba(239,68,68,0.1)',
          border: `1px solid ${msg.type === 'success' ? 'rgba(34,197,94,0.3)' : 'rgba(239,68,68,0.3)'}`,
          color: msg.type === 'success' ? '#4ade80' : '#f87171' }}>
          {msg.text}
        </div>
      )}

      {/* Meta fields */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18, marginBottom: 24 }}>
        {/* Title */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <label style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: 1, color: 'rgba(232,224,212,0.45)' }}>Title *</label>
          <input name="title" value={form.title} onChange={set} required style={inp} placeholder="Your blog post title" />
        </div>
        {/* Slug */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <label style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: 1, color: 'rgba(232,224,212,0.45)', display: 'flex', justifyContent: 'space-between' }}>
            Slug *
            <button type="button" onClick={genSlug} style={{ background: 'none', border: 'none', color: '#C9A96E', fontSize: 11, cursor: 'pointer' }}>Auto-generate</button>
          </label>
          <input name="slug" value={form.slug} onChange={set} required style={inp} placeholder="your-blog-post-title" />
        </div>
        {/* Author */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <label style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: 1, color: 'rgba(232,224,212,0.45)' }}>Author</label>
          <input name="author" value={form.author} onChange={set} style={inp} />
        </div>
        {/* Category */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <label style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: 1, color: 'rgba(232,224,212,0.45)' }}>Category</label>
          <select name="category" value={form.category} onChange={set} style={{ ...inp, appearance: 'none', cursor: 'pointer' }}>
            <option value="">Select category</option>
            {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        {/* Image */}
        <div style={{ gridColumn: '1/-1', display: 'flex', flexDirection: 'column', gap: 6 }}>
          <label style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: 1, color: 'rgba(232,224,212,0.45)' }}>Featured Image URL</label>
          <input name="image" value={form.image} onChange={set} style={inp} placeholder="/images/post.jpg or https://..." />
        </div>
        {/* Excerpt */}
        <div style={{ gridColumn: '1/-1', display: 'flex', flexDirection: 'column', gap: 6 }}>
          <label style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: 1, color: 'rgba(232,224,212,0.45)' }}>Excerpt / Short Description</label>
          <textarea name="excerpt" value={form.excerpt} onChange={set} rows={2} style={{ ...inp, resize: 'vertical' }} />
        </div>
      </div>

      {/* Editor / Preview toggle */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
        <span style={{ fontSize: 13, fontWeight: 600, color: '#fff', textTransform: 'uppercase', letterSpacing: 1 }}>Content</span>
        <button type="button" onClick={() => setPreview(p => !p)}
          style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(232,224,212,0.7)', padding: '7px 14px', borderRadius: 4, cursor: 'pointer', fontSize: 12, display: 'flex', alignItems: 'center', gap: 7 }}>
          {preview ? <><EyeOff size={14}/> Hide Preview</> : <><Eye size={14}/> Show Preview</>}
        </button>
      </div>

      {/* Editor + optional preview side by side */}
      <div style={{ display: 'grid', gridTemplateColumns: preview ? '1fr 1fr' : '1fr', gap: 20, marginBottom: 28 }}>
        <Suspense fallback={<div style={{ padding: 24, color: 'rgba(232,224,212,0.3)', textAlign: 'center', background: 'rgba(0,0,0,0.3)', borderRadius: 6 }}>Loading editor...</div>}>
          <RichEditor value={html} onChange={setHtml} />
        </Suspense>
        {preview && <BlogPreview form={form} html={html} />}
      </div>

      {/* SEO */}
      <div style={{ height: 1, background: 'rgba(255,255,255,0.05)', margin: '0 0 24px' }} />
      <div style={{ marginBottom: 24 }}>
        <p style={{ fontSize: 13, fontWeight: 600, color: '#fff', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 16 }}>SEO Settings</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {[['seoTitle', 'SEO Title'], ['seoDescription', 'Meta Description'], ['seoKeywords', 'Keywords (comma separated)']].map(([name, label]) => (
            <div key={name} style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <label style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: 1, color: 'rgba(232,224,212,0.45)' }}>{label}</label>
              {name === 'seoDescription'
                ? <textarea name={name} value={form[name]} onChange={set} rows={2} style={{ ...inp, resize: 'vertical' }} />
                : <input name={name} value={form[name]} onChange={set} style={inp} />}
            </div>
          ))}
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: 20, borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <button type="submit" disabled={loading}
          style={{ background: '#C9A96E', color: '#000', border: 'none', borderRadius: 4, padding: '13px 32px', fontSize: 13, fontWeight: 700, letterSpacing: 1, cursor: loading ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', gap: 8, opacity: loading ? 0.7 : 1 }}>
          <Save size={15} /> {loading ? 'SAVING...' : editSlug ? 'UPDATE POST' : 'PUBLISH POST'}
        </button>
      </div>
    </form>
  )
}

// ─── Main Page ─────────────────────────────────────────────────────────
export default function AdminBlogsPage() {
  const router = useRouter()
  const [tab, setTab] = useState('list')
  const [blogs, setBlogs] = useState([])
  const [loadingBlogs, setLoadingBlogs] = useState(true)
  const [editBlog, setEditBlog] = useState(null)
  const [deletingSlug, setDeletingSlug] = useState(null)

  const fetchBlogs = async () => {
    setLoadingBlogs(true)
    try {
      const r = await fetch('/api/blogs')
      const d = await r.json()
      if (d.success) setBlogs(d.data)
    } finally { setLoadingBlogs(false) }
  }

  useEffect(() => { fetchBlogs() }, [])

  const logout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' })
    router.push('/admin')
  }

  const deleteBlog = async (slug, title) => {
    if (!confirm(`Delete "${title}"?\n\nThis cannot be undone.`)) return
    setDeletingSlug(slug)
    await fetch(`/api/blogs/${slug}`, { method: 'DELETE' })
    setBlogs(b => b.filter(x => x.slug !== slug))
    setDeletingSlug(null)
  }

  const startEdit = (blog) => {
    setEditBlog(blog)
    setTab('edit')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const tabBtn = (id, label, icon) => (
    <button key={id} onClick={() => { setTab(id); if (id === 'list') fetchBlogs() }}
      style={{
        background: tab === id ? 'rgba(201,169,110,0.15)' : 'transparent',
        border: tab === id ? '1px solid rgba(201,169,110,0.3)' : '1px solid transparent',
        color: tab === id ? '#C9A96E' : 'rgba(232,224,212,0.5)',
        padding: '8px 20px', borderRadius: 4, cursor: 'pointer', fontSize: 13, fontWeight: 600,
        display: 'flex', alignItems: 'center', gap: 8, transition: 'all .25s'
      }}>
      {icon} {label}
    </button>
  )

  return (
    <div style={{ background: '#050508', color: '#e8e0d4', minHeight: '100vh', fontFamily: 'var(--font-dm-sans)' }}>
      {/* Sticky header */}
      <div style={{ padding: '16px 28px', borderBottom: '1px solid rgba(255,255,255,0.05)', background: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: 0, zIndex: 100, backdropFilter: 'blur(20px)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
          <Link href="/" style={{ textDecoration: 'none' }}>
            <img src="/logo.png" alt="AR Interiors" style={{ height: 30, width: 'auto' }} />
          </Link>
          <div style={{ width: 1, height: 22, background: 'rgba(201,169,110,0.2)' }} />
          <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.2em', color: '#C9A96E', textTransform: 'uppercase' }}>Admin Panel</span>
        </div>
        <button onClick={logout}
          style={{ background: 'none', border: '1px solid rgba(255,255,255,0.08)', color: 'rgba(232,224,212,0.5)', padding: '7px 14px', borderRadius: 4, cursor: 'pointer', fontSize: 12, display: 'flex', alignItems: 'center', gap: 7 }}>
          <LogOut size={13} /> Logout
        </button>
      </div>

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '36px 28px 100px' }}>
        <h1 style={{ fontFamily: 'var(--font-playfair)', fontSize: 34, color: '#fff', marginBottom: 28 }}>
          Blog <em style={{ color: '#C9A96E', fontStyle: 'italic' }}>Management</em>
        </h1>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: 4, background: 'rgba(255,255,255,0.03)', padding: 4, borderRadius: 6, width: 'fit-content', border: '1px solid rgba(255,255,255,0.06)', marginBottom: 36 }}>
          {tabBtn('list', 'All Posts', <List size={14} />)}
          {tabBtn('create', 'New Post', <Plus size={14} />)}
          {tab === 'edit' && (
            <button style={{ background: 'rgba(201,169,110,0.15)', border: '1px solid rgba(201,169,110,0.3)', color: '#C9A96E', padding: '8px 20px', borderRadius: 4, cursor: 'default', fontSize: 13, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 8 }}>
              <Edit2 size={14} /> Editing Post
            </button>
          )}
        </div>

        {/* ── LIST ── */}
        {tab === 'list' && (
          <div>
            {loadingBlogs ? (
              <div style={{ textAlign: 'center', padding: '80px 0' }}>
                <div style={{ display: 'flex', gap: 10, justifyContent: 'center' }}>
                  {[0, 1, 2].map(i => (
                    <span key={i} style={{ width: 10, height: 10, borderRadius: '50%', background: '#C9A96E', display: 'inline-block', animation: `lp 1.2s ${i * 0.2}s ease-in-out infinite` }} />
                  ))}
                </div>
              </div>
            ) : blogs.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '80px 0', color: 'rgba(232,224,212,0.4)' }}>
                <p style={{ marginBottom: 20 }}>No blogs yet.</p>
                <button onClick={() => setTab('create')} style={{ background: '#C9A96E', color: '#000', border: 'none', padding: '12px 24px', borderRadius: 4, cursor: 'pointer', fontWeight: 700, fontSize: 13 }}>
                  Create First Post
                </button>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                {blogs.map(blog => (
                  <div key={blog._id} style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 6, padding: '18px 22px', display: 'flex', alignItems: 'center', gap: 18 }}>
                    {blog.image && (
                      <img src={blog.image} alt="" style={{ width: 76, height: 56, objectFit: 'cover', borderRadius: 4, flexShrink: 0, border: '1px solid rgba(255,255,255,0.05)' }} onError={e => e.target.style.display = 'none'} />
                    )}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
                        {blog.category && <span style={{ background: 'rgba(201,169,110,0.1)', color: '#C9A96E', fontSize: 10, fontWeight: 800, textTransform: 'uppercase', padding: '2px 8px', borderRadius: 2, letterSpacing: 1 }}>{blog.category}</span>}
                        <span style={{ fontSize: 11, color: 'rgba(232,224,212,0.3)' }}>{blog.date}</span>
                      </div>
                      <div style={{ fontFamily: 'var(--font-playfair)', fontSize: 16, color: '#fff', marginBottom: 3, overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>{blog.title}</div>
                      <div style={{ fontSize: 11, color: 'rgba(232,224,212,0.35)', fontFamily: 'monospace' }}>/blogs/{blog.slug}</div>
                    </div>
                    <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
                      <Link href={`/blogs/${blog.slug}`} target="_blank" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.09)', color: 'rgba(232,224,212,0.6)', padding: '7px 12px', borderRadius: 4, fontSize: 12, textDecoration: 'none' }}>
                        View
                      </Link>
                      <button onClick={() => startEdit(blog)} style={{ background: 'rgba(201,169,110,0.08)', border: '1px solid rgba(201,169,110,0.2)', color: '#C9A96E', padding: '7px 12px', borderRadius: 4, cursor: 'pointer', fontSize: 12, display: 'flex', alignItems: 'center', gap: 5 }}>
                        <Edit2 size={12} /> Edit
                      </button>
                      <button onClick={() => deleteBlog(blog.slug, blog.title)} disabled={deletingSlug === blog.slug} style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)', color: '#ef4444', padding: '7px 12px', borderRadius: 4, cursor: 'pointer', fontSize: 12, display: 'flex', alignItems: 'center', gap: 5 }}>
                        <Trash2 size={12} /> {deletingSlug === blog.slug ? '...' : 'Delete'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ── CREATE ── */}
        {tab === 'create' && (
          <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 8, overflow: 'hidden' }}>
            <div style={{ padding: '18px 26px', borderBottom: '1px solid rgba(255,255,255,0.05)', background: 'rgba(0,0,0,0.2)' }}>
              <h2 style={{ fontFamily: 'var(--font-playfair)', fontSize: 21, color: '#fff' }}>Create New Post</h2>
            </div>
            <div style={{ padding: '26px 26px' }}>
              <BlogForm onSuccess={() => { setTab('list'); fetchBlogs() }} />
            </div>
          </div>
        )}

        {/* ── EDIT ── */}
        {tab === 'edit' && editBlog && (
          <div>
            <button onClick={() => setTab('list')} style={{ background: 'none', border: 'none', color: 'rgba(201,169,110,0.7)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, marginBottom: 20 }}>
              <ArrowLeft size={15} /> Back to All Posts
            </button>
            <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 8, overflow: 'hidden' }}>
              <div style={{ padding: '18px 26px', borderBottom: '1px solid rgba(255,255,255,0.05)', background: 'rgba(0,0,0,0.2)' }}>
                <h2 style={{ fontFamily: 'var(--font-playfair)', fontSize: 21, color: '#fff' }}>
                  Editing: <em style={{ color: '#C9A96E', fontStyle: 'italic' }}>{editBlog.title}</em>
                </h2>
              </div>
              <div style={{ padding: '26px 26px' }}>
                <BlogForm
                  initial={{
                    title: editBlog.title || '', slug: editBlog.slug || '',
                    excerpt: editBlog.excerpt || '', author: editBlog.author || '',
                    category: editBlog.category || '', image: editBlog.image || '',
                    date: editBlog.date || '', seoTitle: editBlog.seoTitle || '',
                    seoDescription: editBlog.seoDescription || '',
                    seoKeywords: (editBlog.seoKeywords || []).join(', '),
                  }}
                  initialHtml={editBlog.htmlContent || ''}
                  editSlug={editBlog.slug}
                  onSuccess={() => { fetchBlogs(); setTab('list') }}
                />
              </div>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes lp { 0%,100%{opacity:.2;transform:scale(.8)} 50%{opacity:1;transform:scale(1.2)} }
        input:focus, select:focus, textarea:focus { outline: none; border-color: rgba(201,169,110,0.5) !important; }
      `}</style>
    </div>
  )
}
