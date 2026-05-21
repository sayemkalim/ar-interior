'use client'

import React, { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { ArrowRight, Lock, Mail, AlertCircle } from 'lucide-react'

function LoginForm() {
  const router = useRouter()
  const params = useSearchParams()
  const redirect = params.get('redirect') || '/admin/blogs'

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      })
      const data = await res.json()
      if (data.success) {
        router.push(redirect)
      } else {
        setError(data.error || 'Invalid credentials.')
      }
    } catch {
      setError('Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {error && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', color: '#f87171', padding: '13px 16px', borderRadius: 6, fontSize: 14 }}>
          <AlertCircle size={16} /> {error}
        </div>
      )}

      <div style={{ position: 'relative' }}>
        <Mail size={16} style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', color: 'rgba(201,169,110,0.6)', pointerEvents: 'none' }} />
        <input
          type="email" value={email} onChange={e => setEmail(e.target.value)} required autoComplete="email"
          placeholder="Admin Email"
          style={{ width: '100%', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 6, padding: '14px 16px 14px 44px', color: '#fff', fontSize: 14, fontFamily: 'inherit', boxSizing: 'border-box' }}
        />
      </div>

      <div style={{ position: 'relative' }}>
        <Lock size={16} style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', color: 'rgba(201,169,110,0.6)', pointerEvents: 'none' }} />
        <input
          type="password" value={password} onChange={e => setPassword(e.target.value)} required autoComplete="current-password"
          placeholder="Password"
          style={{ width: '100%', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 6, padding: '14px 16px 14px 44px', color: '#fff', fontSize: 14, fontFamily: 'inherit', boxSizing: 'border-box' }}
        />
      </div>

      <button type="submit" disabled={loading}
        style={{ marginTop: 8, width: '100%', background: '#C9A96E', color: '#000', border: 'none', borderRadius: 6, padding: 16, fontSize: 13, fontWeight: 700, letterSpacing: '1.5px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, opacity: loading ? 0.7 : 1 }}>
        {loading ? 'SIGNING IN...' : <><span>SIGN IN</span><ArrowRight size={16} /></>}
      </button>
    </form>
  )
}

export default function AdminLoginPage() {
  return (
    <div style={{ minHeight: '100vh', background: '#050508', backgroundImage: 'radial-gradient(ellipse 80% 60% at 20% 20%, rgba(201,169,110,0.05) 0%, transparent 60%)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 20px', fontFamily: 'var(--font-poppins)' }}>
      <div style={{ width: '100%', maxWidth: 420 }}>
        <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(201,169,110,0.15)', borderRadius: 8, padding: '48px 40px' }}>
          <div style={{ textAlign: 'center', marginBottom: 32 }}>
            <img src="/newlogo.png" alt="AR Interiors" style={{ height: 38, width: 'auto', opacity: 0.9 }} />
          </div>
          <div style={{ textAlign: 'center', marginBottom: 36 }}>
            <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#C9A96E' }}>// SECURE ACCESS</span>
            <h1 style={{ fontFamily: 'var(--font-poppins)', fontSize: 34, color: '#fff', margin: '12px 0 8px' }}>
              Admin <em style={{ color: '#C9A96E', fontStyle: 'italic' }}>Portal</em>
            </h1>
            <p style={{ color: 'rgba(232,224,212,0.5)', fontSize: 14 }}>Sign in to manage your blog content</p>
          </div>

          <Suspense fallback={<div style={{ color: 'rgba(232,224,212,0.4)', textAlign: 'center', padding: 20 }}>Loading...</div>}>
            <LoginForm />
          </Suspense>

          <div style={{ textAlign: 'center', marginTop: 28 }}>
            <a href="/blogs" style={{ color: 'rgba(232,224,212,0.4)', fontSize: 13, textDecoration: 'none' }}>← Back to Website</a>
          </div>
        </div>
      </div>
    </div>
  )
}
