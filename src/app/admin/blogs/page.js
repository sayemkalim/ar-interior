'use client'

import React, { useState, useEffect } from 'react'
import { Plus, Trash2, Save, ArrowLeft, Edit2, List, X, LogOut, Type, Image as ImageIcon } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

// ── Shared input style ───────────────────────────────────────────────
const inp = {
  background:'rgba(0,0,0,0.3)', border:'1px solid rgba(255,255,255,0.1)',
  borderRadius:'4px', padding:'11px 14px', color:'#fff',
  fontFamily:'inherit', fontSize:'14px', width:'100%',
  transition:'border-color .3s',
}

const CATEGORIES = ['Interior Design','Modular Kitchen','Materials','Commercial','Luxury','Specialty']

// ── Empty form state ─────────────────────────────────────────────────
const EMPTY = {
  title:'', slug:'', excerpt:'', author:'', category:'', image:'',
  date: new Date().toLocaleDateString('en-US',{year:'numeric',month:'long',day:'numeric'}),
  seoTitle:'', seoDescription:'', seoKeywords:''
}

// ── Content block helpers ─────────────────────────────────────────────
function ContentEditor({ content, setContent }) {
  const add = (type) => setContent(c => [
    ...c, type==='ul'||type==='ol' ? {type,items:['']} : {type,text:''}
  ])
  const remove = (i) => setContent(c => c.filter((_,idx)=>idx!==i))
  const updText = (i,v) => setContent(c => c.map((b,idx)=>idx===i?{...b,text:v}:b))
  const updItem = (bi,ii,v) => setContent(c => c.map((b,idx)=>idx===bi?{...b,items:b.items.map((it,i)=>i===ii?v:it)}:b))
  const addItem = (bi) => setContent(c => c.map((b,idx)=>idx===bi?{...b,items:[...b.items,'']}:b))
  const remItem = (bi,ii) => setContent(c => c.map((b,idx)=>idx===bi?{...b,items:b.items.filter((_,i)=>i!==ii)}:b))

  return (
    <div>
      <div style={{display:'flex',flexDirection:'column',gap:16,marginBottom:16}}>
        {content.map((block,i)=>(
          <div key={i} style={{background:'rgba(0,0,0,0.2)',border:'1px solid rgba(255,255,255,0.08)',borderRadius:6,padding:16}}>
            <div style={{display:'flex',justifyContent:'space-between',marginBottom:12}}>
              <span style={{background:'rgba(201,169,110,0.1)',color:'#C9A96E',padding:'3px 10px',borderRadius:4,fontSize:11,fontWeight:700,letterSpacing:1}}>{block.type.toUpperCase()}</span>
              <button type="button" onClick={()=>remove(i)} style={{background:'rgba(239,68,68,0.1)',border:'none',color:'#ef4444',padding:'4px 8px',borderRadius:4,cursor:'pointer'}}>
                <X size={14}/>
              </button>
            </div>
            {(block.type==='p'||block.type==='image') && (
              block.type==='p'
                ? <textarea value={block.text} onChange={e=>updText(i,e.target.value)} rows={3} style={{...inp,resize:'vertical'}} placeholder="Paragraph text..."/>
                : <input value={block.text} onChange={e=>updText(i,e.target.value)} style={inp} placeholder="Image URL..."/>
            )}
            {(block.type==='h2'||block.type==='h3') && (
              <input value={block.text} onChange={e=>updText(i,e.target.value)} style={inp} placeholder={`${block.type.toUpperCase()} heading...`}/>
            )}
            {(block.type==='ul'||block.type==='ol') && (
              <div style={{display:'flex',flexDirection:'column',gap:8}}>
                {block.items.map((it,ii)=>(
                  <div key={ii} style={{display:'flex',gap:8}}>
                    <input value={it} onChange={e=>updItem(i,ii,e.target.value)} style={{...inp,flex:1}} placeholder={`Item ${ii+1}...`}/>
                    <button type="button" onClick={()=>remItem(i,ii)} style={{background:'none',border:'none',color:'rgba(239,68,68,0.6)',cursor:'pointer'}}><X size={14}/></button>
                  </div>
                ))}
                <button type="button" onClick={()=>addItem(i)} style={{background:'transparent',border:'1px dashed rgba(255,255,255,0.2)',color:'rgba(232,224,212,0.6)',padding:'6px 12px',borderRadius:4,fontSize:12,cursor:'pointer',width:'fit-content'}}>
                  + Add Item
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
      <div style={{display:'flex',flexWrap:'wrap',gap:10,padding:16,background:'rgba(255,255,255,0.02)',border:'1px dashed rgba(201,169,110,0.3)',borderRadius:6,justifyContent:'center'}}>
        {[['p','Paragraph'],['h2','H2'],['h3','H3'],['ul','Bullet List'],['ol','Number List'],['image','Image']].map(([t,label])=>(
          <button key={t} type="button" onClick={()=>add(t)}
            style={{background:'rgba(0,0,0,0.3)',border:'1px solid rgba(255,255,255,0.1)',color:'#fff',padding:'8px 14px',borderRadius:4,fontSize:13,cursor:'pointer',display:'flex',alignItems:'center',gap:6}}>
            <Type size={13}/> {label}
          </button>
        ))}
      </div>
    </div>
  )
}

// ── BlogForm ──────────────────────────────────────────────────────────
function BlogForm({ initial, initialContent, onSuccess, editSlug }) {
  const [form, setForm] = useState(initial || EMPTY)
  const [content, setContent] = useState(initialContent || [])
  const [loading, setLoading] = useState(false)
  const [msg, setMsg] = useState({ type:'', text:'' })

  const set = e => setForm(f=>({...f,[e.target.name]:e.target.value}))
  const genSlug = () => { if(form.title) setForm(f=>({...f,slug:f.title.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/(^-|-$)/g,'')})) }

  const submit = async (e) => {
    e.preventDefault(); setLoading(true); setMsg({type:'',text:''})
    try {
      const payload = { ...form, seoKeywords: form.seoKeywords.split(',').map(k=>k.trim()).filter(Boolean), content }
      const url    = editSlug ? `/api/blogs/${editSlug}` : '/api/blogs'
      const method = editSlug ? 'PUT' : 'POST'
      const res  = await fetch(url,{method,headers:{'Content-Type':'application/json'},body:JSON.stringify(payload)})
      const data = await res.json()
      if(data.success) {
        setMsg({type:'success', text: editSlug ? 'Blog updated!' : 'Blog published!'})
        if(!editSlug){ setForm(EMPTY); setContent([]) }
        if(onSuccess) onSuccess()
      } else { setMsg({type:'error',text:data.error||'Failed'}) }
    } catch { setMsg({type:'error',text:'Network error'}) }
    finally { setLoading(false) }
  }

  return (
    <form onSubmit={submit}>
      {msg.text && (
        <div style={{padding:'14px 16px',borderRadius:6,marginBottom:24,fontSize:14,
          background: msg.type==='success'?'rgba(34,197,94,0.1)':'rgba(239,68,68,0.1)',
          border:`1px solid ${msg.type==='success'?'rgba(34,197,94,0.3)':'rgba(239,68,68,0.3)'}`,
          color: msg.type==='success'?'#4ade80':'#f87171'}}>
          {msg.text}
        </div>
      )}
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:20,marginBottom:20}}>
        {[['title','Title *',1],['slug','Slug *',1],['author','Author',0],['image','Featured Image URL',0]].map(([name,label,req])=>(
          <div key={name} style={{gridColumn: name==='image'?'1/-1':'auto', display:'flex',flexDirection:'column',gap:6}}>
            <label style={{fontSize:12,textTransform:'uppercase',letterSpacing:1,color:'rgba(232,224,212,0.5)',display:'flex',justifyContent:'space-between'}}>
              {label}
              {name==='slug' && <button type="button" onClick={genSlug} style={{background:'none',border:'none',color:'#C9A96E',fontSize:11,cursor:'pointer'}}>Generate</button>}
            </label>
            <input name={name} value={form[name]} onChange={set} required={!!req} style={inp}/>
          </div>
        ))}
        <div style={{display:'flex',flexDirection:'column',gap:6}}>
          <label style={{fontSize:12,textTransform:'uppercase',letterSpacing:1,color:'rgba(232,224,212,0.5)'}}>Category</label>
          <select name="category" value={form.category} onChange={set} style={{...inp,appearance:'none',cursor:'pointer'}}>
            <option value="">Select Category</option>
            {CATEGORIES.map(c=><option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <div style={{display:'flex',flexDirection:'column',gap:6}}>
          <label style={{fontSize:12,textTransform:'uppercase',letterSpacing:1,color:'rgba(232,224,212,0.5)'}}>Date</label>
          <input name="date" value={form.date} onChange={set} style={inp}/>
        </div>
        <div style={{gridColumn:'1/-1',display:'flex',flexDirection:'column',gap:6}}>
          <label style={{fontSize:12,textTransform:'uppercase',letterSpacing:1,color:'rgba(232,224,212,0.5)'}}>Excerpt</label>
          <textarea name="excerpt" value={form.excerpt} onChange={set} rows={3} style={{...inp,resize:'vertical'}}/>
        </div>
      </div>

      <div style={{height:1,background:'rgba(255,255,255,0.05)',margin:'28px 0'}}/>
      <h3 style={{fontFamily:'var(--font-playfair)',fontSize:20,color:'#fff',marginBottom:8}}>Content Blocks</h3>
      <p style={{color:'rgba(232,224,212,0.5)',fontSize:13,marginBottom:20}}>Build the body of your blog post.</p>
      <ContentEditor content={content} setContent={setContent}/>

      <div style={{height:1,background:'rgba(255,255,255,0.05)',margin:'28px 0'}}/>
      <h3 style={{fontFamily:'var(--font-playfair)',fontSize:20,color:'#fff',marginBottom:16}}>SEO Settings</h3>
      <div style={{display:'flex',flexDirection:'column',gap:14}}>
        {[['seoTitle','SEO Title'],['seoDescription','SEO Description'],['seoKeywords','Keywords (comma separated)']].map(([name,label])=>(
          <div key={name} style={{display:'flex',flexDirection:'column',gap:6}}>
            <label style={{fontSize:12,textTransform:'uppercase',letterSpacing:1,color:'rgba(232,224,212,0.5)'}}>{label}</label>
            {name==='seoDescription'
              ? <textarea name={name} value={form[name]} onChange={set} rows={2} style={{...inp,resize:'vertical'}}/>
              : <input name={name} value={form[name]} onChange={set} style={inp}/>}
          </div>
        ))}
      </div>

      <div style={{marginTop:32,paddingTop:24,borderTop:'1px solid rgba(255,255,255,0.05)',display:'flex',justifyContent:'flex-end'}}>
        <button type="submit" disabled={loading}
          style={{background:'#C9A96E',color:'#000',border:'none',borderRadius:4,padding:'13px 32px',
            fontSize:13,fontWeight:700,letterSpacing:1,cursor:'pointer',display:'flex',alignItems:'center',gap:8,
            opacity:loading?.7:1}}>
          <Save size={16}/> {loading ? 'SAVING...' : editSlug ? 'UPDATE POST' : 'PUBLISH POST'}
        </button>
      </div>
    </form>
  )
}

// ── Main Page ─────────────────────────────────────────────────────────
export default function AdminBlogsPage() {
  const router = useRouter()
  const [tab, setTab] = useState('list')          // 'list' | 'create' | 'edit'
  const [blogs, setBlogs] = useState([])
  const [loadingBlogs, setLoadingBlogs] = useState(true)
  const [editBlog, setEditBlog] = useState(null)
  const [deletingSlug, setDeletingSlug] = useState(null)

  const fetchBlogs = async () => {
    setLoadingBlogs(true)
    try {
      const r = await fetch('/api/blogs'); const d = await r.json()
      if(d.success) setBlogs(d.data)
    } finally { setLoadingBlogs(false) }
  }

  useEffect(()=>{ fetchBlogs() },[])

  const logout = async () => {
    await fetch('/api/admin/logout',{method:'POST'})
    router.push('/admin')
  }

  const deleteBlog = async (slug) => {
    if(!confirm(`Delete "${slug}"? This cannot be undone.`)) return
    setDeletingSlug(slug)
    await fetch(`/api/blogs/${slug}`,{method:'DELETE'})
    setBlogs(b=>b.filter(x=>x.slug!==slug))
    setDeletingSlug(null)
  }

  const startEdit = (blog) => {
    setEditBlog(blog)
    setTab('edit')
    window.scrollTo({top:0,behavior:'smooth'})
  }

  return (
    <div style={{background:'#050508',color:'#e8e0d4',minHeight:'100vh',fontFamily:'var(--font-dm-sans)'}}>
      {/* Header */}
      <div style={{padding:'24px 28px',borderBottom:'1px solid rgba(255,255,255,0.05)',background:'rgba(0,0,0,0.3)',display:'flex',justifyContent:'space-between',alignItems:'center',position:'sticky',top:0,zIndex:100,backdropFilter:'blur(20px)'}}>
        <div style={{display:'flex',alignItems:'center',gap:20}}>
          <Link href="/" style={{textDecoration:'none'}}>
            <img src="/logo.png" alt="AR Interiors" style={{height:32,width:'auto'}}/>
          </Link>
          <div style={{width:1,height:24,background:'rgba(201,169,110,0.2)'}}/>
          <span style={{fontSize:11,fontWeight:700,letterSpacing:2,color:'#C9A96E',textTransform:'uppercase'}}>Admin Panel</span>
        </div>
        <button onClick={logout} style={{background:'none',border:'1px solid rgba(255,255,255,0.1)',color:'rgba(232,224,212,0.5)',padding:'7px 14px',borderRadius:4,cursor:'pointer',fontSize:12,display:'flex',alignItems:'center',gap:7,transition:'all .3s'}}>
          <LogOut size={14}/> Logout
        </button>
      </div>

      <div style={{maxWidth:960,margin:'0 auto',padding:'40px 28px 100px'}}>
        {/* Title + tabs */}
        <div style={{marginBottom:36}}>
          <h1 style={{fontFamily:'var(--font-playfair)',fontSize:36,color:'#fff',marginBottom:24}}>
            Blog <em style={{color:'#C9A96E',fontStyle:'italic'}}>Management</em>
          </h1>
          <div style={{display:'flex',gap:4,background:'rgba(255,255,255,0.03)',padding:4,borderRadius:6,width:'fit-content',border:'1px solid rgba(255,255,255,0.06)'}}>
            {[['list','All Posts'],['create','New Post']].map(([id,label])=>(
              <button key={id} onClick={()=>{ setTab(id); if(id==='list') fetchBlogs() }}
                style={{background:tab===id?'rgba(201,169,110,0.15)':'transparent',
                  border:tab===id?'1px solid rgba(201,169,110,0.3)':'1px solid transparent',
                  color:tab===id?'#C9A96E':'rgba(232,224,212,0.5)',
                  padding:'8px 20px',borderRadius:4,cursor:'pointer',fontSize:13,fontWeight:600,
                  display:'flex',alignItems:'center',gap:8,transition:'all .3s'}}>
                {id==='list'?<List size={14}/>:<Plus size={14}/>} {label}
              </button>
            ))}
            {tab==='edit' && (
              <button style={{background:'rgba(201,169,110,0.15)',border:'1px solid rgba(201,169,110,0.3)',color:'#C9A96E',padding:'8px 20px',borderRadius:4,cursor:'pointer',fontSize:13,fontWeight:600,display:'flex',alignItems:'center',gap:8}}>
                <Edit2 size={14}/> Editing Post
              </button>
            )}
          </div>
        </div>

        {/* ── LIST TAB ── */}
        {tab==='list' && (
          <div>
            {loadingBlogs ? (
              <div style={{textAlign:'center',padding:'80px 0'}}>
                <div style={{display:'flex',gap:10,justifyContent:'center'}}>
                  {[0,1,2].map(i=><span key={i} style={{width:10,height:10,borderRadius:'50%',background:'#C9A96E',display:'inline-block',animation:`lp 1.2s ${i*.2}s ease-in-out infinite`}}/>)}
                </div>
              </div>
            ) : blogs.length===0 ? (
              <div style={{textAlign:'center',padding:'80px 0',color:'rgba(232,224,212,0.4)'}}>
                <p style={{marginBottom:20}}>No blogs found.</p>
                <button onClick={()=>setTab('create')} style={{background:'#C9A96E',color:'#000',border:'none',padding:'12px 24px',borderRadius:4,cursor:'pointer',fontWeight:700,fontSize:13}}>Create First Post</button>
              </div>
            ) : (
              <div style={{display:'flex',flexDirection:'column',gap:16}}>
                {blogs.map(blog=>(
                  <div key={blog._id} style={{background:'rgba(255,255,255,0.02)',border:'1px solid rgba(255,255,255,0.06)',borderRadius:6,padding:'20px 24px',display:'flex',alignItems:'center',gap:20}}>
                    {blog.image && <img src={blog.image} alt="" style={{width:80,height:60,objectFit:'cover',borderRadius:4,flexShrink:0,border:'1px solid rgba(255,255,255,0.05)'}}/>}
                    <div style={{flex:1,minWidth:0}}>
                      <div style={{display:'flex',alignItems:'center',gap:10,marginBottom:4}}>
                        {blog.category && <span style={{background:'rgba(201,169,110,0.1)',color:'#C9A96E',fontSize:10,fontWeight:800,textTransform:'uppercase',padding:'2px 8px',borderRadius:2,letterSpacing:1}}>{blog.category}</span>}
                        <span style={{fontSize:12,color:'rgba(232,224,212,0.35)'}}>{blog.date}</span>
                      </div>
                      <div style={{fontFamily:'var(--font-playfair)',fontSize:17,color:'#fff',marginBottom:4,overflow:'hidden',whiteSpace:'nowrap',textOverflow:'ellipsis'}}>{blog.title}</div>
                      <div style={{fontSize:12,color:'rgba(232,224,212,0.4)',fontFamily:'monospace'}}>/blogs/{blog.slug}</div>
                    </div>
                    <div style={{display:'flex',gap:10,flexShrink:0}}>
                      <Link href={`/blogs/${blog.slug}`} target="_blank"
                        style={{background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.1)',color:'rgba(232,224,212,0.6)',padding:'8px 14px',borderRadius:4,fontSize:12,textDecoration:'none'}}>
                        View
                      </Link>
                      <button onClick={()=>startEdit(blog)}
                        style={{background:'rgba(201,169,110,0.08)',border:'1px solid rgba(201,169,110,0.2)',color:'#C9A96E',padding:'8px 14px',borderRadius:4,cursor:'pointer',fontSize:12,display:'flex',alignItems:'center',gap:6}}>
                        <Edit2 size={13}/> Edit
                      </button>
                      <button onClick={()=>deleteBlog(blog.slug)} disabled={deletingSlug===blog.slug}
                        style={{background:'rgba(239,68,68,0.08)',border:'1px solid rgba(239,68,68,0.2)',color:'#ef4444',padding:'8px 14px',borderRadius:4,cursor:'pointer',fontSize:12,display:'flex',alignItems:'center',gap:6}}>
                        <Trash2 size={13}/> {deletingSlug===blog.slug?'…':'Delete'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ── CREATE TAB ── */}
        {tab==='create' && (
          <div style={{background:'rgba(255,255,255,0.02)',border:'1px solid rgba(255,255,255,0.05)',borderRadius:8,overflow:'hidden'}}>
            <div style={{padding:'20px 28px',borderBottom:'1px solid rgba(255,255,255,0.05)',background:'rgba(0,0,0,0.2)'}}>
              <h2 style={{fontFamily:'var(--font-playfair)',fontSize:22,color:'#fff'}}>Create New Post</h2>
            </div>
            <div style={{padding:28}}>
              <BlogForm onSuccess={()=>{ setTab('list'); fetchBlogs() }}/>
            </div>
          </div>
        )}

        {/* ── EDIT TAB ── */}
        {tab==='edit' && editBlog && (
          <div>
            <div style={{display:'flex',alignItems:'center',gap:16,marginBottom:24}}>
              <button onClick={()=>setTab('list')} style={{background:'none',border:'none',color:'rgba(201,169,110,0.7)',cursor:'pointer',display:'flex',alignItems:'center',gap:6,fontSize:13}}>
                <ArrowLeft size={16}/> Back to list
              </button>
              <div style={{fontFamily:'var(--font-playfair)',fontSize:18,color:'#fff',overflow:'hidden',whiteSpace:'nowrap',textOverflow:'ellipsis'}}>
                Editing: <em style={{color:'#C9A96E'}}>{editBlog.title}</em>
              </div>
            </div>
            <div style={{background:'rgba(255,255,255,0.02)',border:'1px solid rgba(255,255,255,0.05)',borderRadius:8,overflow:'hidden'}}>
              <div style={{padding:'20px 28px',borderBottom:'1px solid rgba(255,255,255,0.05)',background:'rgba(0,0,0,0.2)'}}>
                <h2 style={{fontFamily:'var(--font-playfair)',fontSize:22,color:'#fff'}}>Update Post</h2>
              </div>
              <div style={{padding:28}}>
                <BlogForm
                  initial={{
                    title: editBlog.title||'', slug: editBlog.slug||'', excerpt: editBlog.excerpt||'',
                    author: editBlog.author||'', category: editBlog.category||'', image: editBlog.image||'',
                    date: editBlog.date||'', seoTitle: editBlog.seoTitle||'',
                    seoDescription: editBlog.seoDescription||'',
                    seoKeywords: (editBlog.seoKeywords||[]).join(', ')
                  }}
                  initialContent={editBlog.content||[]}
                  editSlug={editBlog.slug}
                  onSuccess={()=>{ fetchBlogs(); setTab('list') }}
                />
              </div>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes lp { 0%,100%{opacity:.2;transform:scale(.8)} 50%{opacity:1;transform:scale(1.2)} }
      `}</style>
    </div>
  )
}
