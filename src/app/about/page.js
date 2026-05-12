'use client'

import React, { useState, useEffect } from 'react'
import {
  ArrowRight, Shield, Check, Phone, Mail,
  Layout, Home as HomeIcon, Package, Coffee,
  Briefcase, Star, Search, Plus, X,
  Sofa, CookingPot, Bed, Building2, ShowerHead, UtensilsCrossed,
  Layers, Wind, Monitor, Target, Users, Heart
} from 'lucide-react'

import { FaInstagram, FaFacebookF, FaYoutube, FaLinkedinIn } from 'react-icons/fa6'

// ─── HOOKS ───────────────────────────────────────────────────────────

function useScrolled() {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const handle = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handle)
    return () => window.removeEventListener('scroll', handle)
  }, [])
  return scrolled
}

function useReveal() {
  useEffect(() => {
    const ro = new IntersectionObserver(
      (entries) => entries.forEach(x => {
        if (x.isIntersecting) { x.target.classList.add('visible'); ro.unobserve(x.target) }
      }),
      { threshold: 0.07, rootMargin: '0px 0px -36px 0px' }
    )
    document.querySelectorAll('.reveal').forEach(el => ro.observe(el))
    return () => ro.disconnect()
  }, [])
}

// ─── SHARED DATA ──────────────────────────────────────────────────────

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About Us' },
  { href: '/services', label: 'Services' },
  { href: '/#process', label: 'Process' },
  { href: '/#pricing', label: 'Price' },
  { href: '//portfolio', label: 'Gallery' },
  { href: '/#testimonials', label: 'Review' },
  { href: '/blogs', label: 'Blog' },
  { href: '/#faq', label: 'FAQ' },
]

function useActiveAnchor() {
  const [active, setActive] = useState('')
  useEffect(() => {
    const handle = () => setActive(window.location.pathname + window.location.hash)
    window.addEventListener('hashchange', handle)
    handle()
    return () => window.removeEventListener('hashchange', handle)
  }, [])
  return active
}

function Navbar() {
  const scrolled = useScrolled()
  const [menuOpen, setMenuOpen] = useState(false)
  const activeAnchor = useActiveAnchor()

  return (
    <nav id="navbar" className={scrolled ? 'scrolled' : ''}>
      <div className="nav-inner">
        <a href="/" className="nav-logo" style={{ textDecoration: 'none' }}>
          <img src="/logo.png" alt="AR Interiors" style={{ height: '40px', width: 'auto', display: 'block' }} />
        </a>
        <div className="nav-sep" />
        <ul className={`nav-links${menuOpen ? ' mobile-open' : ''}`}>
          {NAV_LINKS.map((l, i) => {
            const isActive = activeAnchor === l.href || activeAnchor.endsWith(l.href) || (l.href === '/services' && activeAnchor.startsWith('/services'))
            return (
              <li key={i}>
                <a href={l.href} className={isActive ? 'active' : ''} onClick={() => setMenuOpen(false)}>{l.label}</a>
              </li>
            )
          })}
        </ul>
        <div className="nav-cta">
          <a href="tel:+919822998986" className="nav-phone">+91 98229 98986</a>
          <a href="/#cta-section" className="nav-btn">
            Free Visit
            <ArrowRight size={14} strokeWidth={2.5} />
          </a>
        </div>
        <button
          className={`hamburger${menuOpen ? ' open' : ''}`}
          onClick={() => setMenuOpen(o => !o)}
          aria-label="Toggle menu"
        >
          <span /><span /><span />
        </button>
      </div>
    </nav>
  )
}

function Footer() {
  return (
    <footer>
      <div className="container">
        <div className="footer-grid">
          <div>
            <img src="/logo.png" alt="AR Interiors" style={{ height: '36px', width: 'auto', marginBottom: 14, opacity: 0.9, display: 'block' }} />
            <p className="footer-desc">Pune&apos;s most trusted interior design studio. Design Spaces,That Tell Your Story</p>
            <div className="fsocial">
              {[
                { icon: FaInstagram, label: 'Instagram', color: '#E4405F', href: '#' },
                { icon: FaFacebookF, label: 'Facebook', color: '#1877F2', href: 'https://www.facebook.com/a.r.interiors85' },
                { icon: FaYoutube, label: 'Youtube', color: '#FF0000', href: '#' },
                { icon: FaLinkedinIn, label: 'Linkedin', color: '#0A66C2', href: '#' }
              ].map((s, i) => (
                <a key={i} href={s.href} className="fsb" aria-label={s.label} style={{ '--brand-color': s.color }} target={s.href !== '#' ? '_blank' : undefined} rel={s.href !== '#' ? 'noopener noreferrer' : undefined}>
                  <s.icon size={16} color="currentColor" />
                </a>
              ))}
            </div>
          </div>
          <div>
            <div className="fh">Quick Links</div>
            <ul className="fl">
              <li><a href="/privacy-policy">Privacy Policy</a></li>
              <li><a href="/terms-and-conditions">Terms & Conditions</a></li>
              <li><a href="/about">About Us</a></li>
              <li><a href="/services">Services</a></li>
              <li><a href="/blogs">Blog</a></li>
            </ul>
          </div>
          <div>
            <div className="fh">Areas</div>
            <ul className="fl">
              {['Baner & Aundh', 'Hinjewadi & Wakad', 'Kothrud & Karve Nagar', 'Koregaon Park', 'Viman Nagar'].map(l => <li key={l}><a href="#">{l}</a></li>)}
            </ul>
          </div>
          <div>
            <div className="fh">Contact</div>
            <ul className="fl">
              <li><a href="tel:+919822998986">+91 98229 98986</a></li>
              <li><a href="mailto:a.r.interiors85@gmail.com">a.r.interiors85@gmail.com</a></li>
              <li><a href="#">Pune, Maharashtra</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} AR Interiors. All rights reserved.</span>
          <span>45-DAY DELIVERY · 10-YEAR WARRANTY · FREE SITE VISIT</span>
        </div>
      </div>
    </footer>
  )
}

function FloatingActions({ isFormOpen, setIsFormOpen }) {
  return (
    <div className="floating-actions">
      <a href="https://wa.me/919822998986?text=Hi%20AR%20Interiors,%20I'm%20interested%20in%20a%20free%20design%20consultation." className="swa" target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp">
        <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </a>
      <a href="tel:+919822998986" className="call-float" aria-label="Call Us">
        <Phone size={26} fill="currentColor" />
      </a>
      {!isFormOpen && (
        <button className="bottom-quote-btn" onClick={() => setIsFormOpen(true)} aria-label="Open form">
          <Plus size={24} />
        </button>
      )}
    </div>
  )
}

function ConsultationForm({ isOpen, onClose }) {
  const [formStatus, setFormStatus] = useState('')
  const handleSubmit = (e) => {
    e.preventDefault()
    setFormStatus('STATUS: RECEIVED · CALLING_WITHIN_2HRS')
    setTimeout(() => {
      onClose()
      setFormStatus('')
    }, 2000)
  }

  if (!isOpen) return null

  return (
    <div className="form-overlay" onClick={onClose}>
      <div className="hero-form open" onClick={e => e.stopPropagation()}>
        <button className="form-close" onClick={onClose}>
          <X size={20} />
        </button>
        <h2 className="form-h">Consult With Specialists</h2>
        <p className="form-sub">Expert design advice for your home.</p>
        <form onSubmit={handleSubmit}>
          <div className="form-group"><input type="text" placeholder="Your Name *" required /></div>
          <div className="form-group"><input type="tel" placeholder="Mobile Number *" required /></div>
          <div className="form-group">
            <select required defaultValue="">
              <option value="" disabled>— Select Project Type —</option>
              <option>Full Home Interior</option>
              <option>Modular Kitchen Only</option>
              <option>Bedroom / Wardrobes</option>
              <option>Living Room Makeover</option>
              <option>Other / Custom</option>
            </select>
          </div>
          {formStatus ? (
            <div style={{ padding: '12px', background: 'rgba(100,180,100,0.85)', color: '#000000', fontSize: 12, fontWeight: 600 }}>{formStatus}</div>
          ) : (
            <button type="submit" className="btn btn-gold" style={{ width: '100%', justifyContent: 'center' }}>
              BOOK FREE VISIT →
            </button>
          )}
        </form>
      </div>
    </div>
  )
}

export default function AboutPage() {
  useReveal()
  const scrolled = useScrolled()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isFormOpen, setIsFormOpen] = useState(false)

  return (
    <>
      <Navbar />
      <main className="about-page">

        {/* CONTENT SECTION */}
        <section className="about-content section">
          <div className="container">
            <div className="about-story-centered reveal" style={{ maxWidth: '900px', margin: '0 auto 120px', textAlign: 'center' }}>
              <div className="story-text-col">
                <div className="section-label" style={{ textAlign: 'center' }}>THE JOURNEY</div>
                <h2 className="heading" style={{ textAlign: 'center' }}>Every brand has a <em>beginning</em>, and ours starts with a vision.</h2>
                <div className="divider" style={{ margin: '24px auto 40px' }} />
                <div className="story-body" style={{ textAlign: 'left' }}>
                  <p>
                    Before A R Interiors became one of Pune’s most trusted names in home interior design, it was a dream nurtured by <strong>Mr. Parvez Shaikh</strong>.
                    Starting his journey working for others in the industry, he gained hands-on experience, understood client expectations, and witnessed the gaps that often went unnoticed, especially when it came to affordability, transparency, and service quality.
                  </p>
                  <div className="vision-quote" style={{ margin: '40px auto' }}>
                    <span className="quote-mark">"</span>
                    <p>Why not build something better? A space where quality interiors aren’t a luxury, but accessible to every homeowner.</p>
                  </div>
                  <p>
                    Driven by this vision, Mr. Parvez Shaikh founded A R Interiors with a clear purpose to offer affordable pricing without compromising on design, quality, or customer experience.
                    What began as a small step has today grown into a team of designers, project managers, and skilled craftsmen.
                  </p>
                  <p>
                    Since 2012, we’ve delivered 500+ projects across Pune, transforming everything from compact 2 & 3 BHK apartments to expansive villas.
                    Our approach is simple: understand your space, respect your budget, and deliver beyond expectations.
                  </p>
                  <p>
                    Whether you’re looking for cost-effective interiors or a premium full-home transformation, we ensure every project is handled with precision.
                    With a dedicated project manager, fixed timelines, transparent pricing, and our signature 10-year woodwork warranty, we don’t just design homes, we build trust that lasts.
                  </p>
                  <p className="closing-quote" style={{ textAlign: 'center' }}>
                    At A R Interiors, every home tells a story. And we’re here to help you create yours.
                  </p>
                </div>
              </div>

              <div className="video-wrapper reveal" style={{ marginTop: '80px', position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden', borderRadius: '4px', border: '1px solid rgba(201, 169, 110, 0.2)', boxShadow: '0 20px 50px rgba(0,0,0,0.5)' }}>
                <iframe 
                  style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                  src="https://www.youtube.com/embed/dQw4w9WgXcQ" 
                  title="YouTube video player" 
                  frameBorder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                  allowFullScreen
                ></iframe>
              </div>
            </div>
            <div className="about-values-grid">
              <div className="stat-card reveal d1">
                <Target className="stat-icon" />
                <h3>Our Vision</h3>
                <p>To make premium interior design accessible and transparent for every Pune homeowner.</p>
              </div>
              <div className="stat-card reveal d2">
                <Users className="stat-icon" />
                <h3>500+ Happy Homes</h3>
                <p>From cozy apartments to sprawling villas, we've touched lives across the city.</p>
              </div>
              <div className="stat-card reveal d3">
                <Heart className="stat-icon" />
                <h3>Trust & Quality</h3>
                <p>Backing our craftsmanship with a 10-year warranty and fixed timelines.</p>
              </div>
            </div>
          </div>
        </section>

        <FloatingActions isFormOpen={isFormOpen} setIsFormOpen={setIsFormOpen} />
        <ConsultationForm isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} />

        {/* CTA SECTION */}
        <section className="about-cta section">
          <div className="container">
            <div className="cta-box reveal">
              <h2>Ready to tell your <em>story</em>?</h2>
              <p>Let's collaborate to build the home you've always dreamed of.</p>
              <div className="cta-btns">
                <a href="/#cta-section" className="btn btn-gold">BOOK FREE CONSULTATION</a>
                <a href="tel:+919822998986" className="btn btn-outline">CALL NOW →</a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <style jsx>{`
        .about-page {
          background: #000000;
          color: #e8e0d4;
          min-height: 100vh;
          padding-top: 100px;
        }

        /* HERO */
        .about-hero {
          padding-top: 220px;
          padding-bottom: 120px;
          background: radial-gradient(circle at 50% 50%, rgba(201, 169, 110, 0.08) 0%, transparent 70%);
          text-align: center;
        }
        .about-hero-centered {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }
        .badge {
          display: inline-block;
          font-size: 10px;
          letter-spacing: 0.2em;
          color: var(--gold);
          margin-bottom: 16px;
          font-family: monospace;
          padding: 4px 12px;
          border: 1px solid rgba(201, 169, 110, 0.2);
        }
        .heading-xl {
          font-family: var(--font-display);
          font-size: clamp(48px, 8vw, 84px);
          font-weight: 700;
          line-height: 1;
          margin-bottom: 24px;
        }
        .heading-xl em {
          font-style: italic;
          color: var(--gold);
          font-weight: 400;
        }
        .hero-sub {
          font-size: 18px;
          color: rgba(232, 224, 212, 0.6);
          max-width: 600px;
          margin: 0 auto;
        }
        .about-hero-img-wrap {
          position: relative;
        }
        .about-hero-img {
          width: 100%;
          border-radius: 4px;
          box-shadow: 0 40px 100px rgba(0,0,0,0.5);
        }
        .experience-badge {
          position: absolute;
          bottom: -30px;
          left: -30px;
          background: var(--gold);
          color: #000000;
          padding: 30px;
          display: flex;
          flex-direction: column;
          gap: 4px;
          border-radius: 2px;
        }
        .eb-num {
          font-family: var(--font-display);
          font-size: 40px;
          font-weight: 700;
          line-height: 1;
        }
        .eb-txt {
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 0.1em;
        }

        /* STORY SPLIT */
        .about-story-split {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 100px;
          align-items: start;
          margin-bottom: 120px;
        }
        .story-img-col {
          position: relative;
          margin-top: 60px;
        }
        .story-img-frame {
          position: relative;
          z-index: 1;
          padding: 20px;
        }
        .story-img-deco-lines {
          position: absolute;
          top: 0;
          left: 0;
          width: 80%;
          height: 80%;
          border-left: 1px solid rgba(201, 169, 110, 0.4);
          border-top: 1px solid rgba(201, 169, 110, 0.4);
          z-index: 0;
        }
        .story-main-img {
          width: 100%;
          height: 850px;
          object-fit: cover;
          border-radius: 2px;
          box-shadow: 0 50px 100px rgba(0,0,0,0.6);
          position: relative;
          z-index: 2;
        }
        .story-img-border {
          position: absolute;
          bottom: 0;
          right: 0;
          width: 70%;
          height: 70%;
          border-right: 1px solid rgba(201, 169, 110, 0.2);
          border-bottom: 1px solid rgba(201, 169, 110, 0.2);
          z-index: 0;
        }
        .story-stats-overlay {
          position: absolute;
          bottom: 60px;
          right: -30px;
          padding: 30px 45px;
          display: flex;
          gap: 40px;
          z-index: 10;
          overflow: hidden;
          border: 1px solid rgba(255,255,255,0.1);
        }
        .so-glass {
          position: absolute;
          inset: 0;
          background: rgba(20, 20, 25, 0.8);
          backdrop-filter: blur(15px);
          z-index: -1;
        }
        .so-num {
          display: block;
          font-family: var(--font-display);
          font-size: 32px;
          font-weight: 700;
          color: var(--gold);
          line-height: 1;
          margin-bottom: 5px;
        }
        .so-lab {
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          color: rgba(232, 224, 212, 0.5);
        }
        .so-sep {
          width: 1px;
          height: 45px;
          background: rgba(201, 169, 110, 0.2);
        }

        .founder-badge {
          position: absolute;
          top: 60px;
          left: -40px;
          background: var(--gold);
          color: #000000;
          padding: 15px 25px;
          z-index: 10;
          box-shadow: 10px 10px 30px rgba(0,0,0,0.3);
        }
        .fb-title {
          display: block;
          font-size: 9px;
          text-transform: uppercase;
          letter-spacing: 0.2em;
          font-weight: 800;
          opacity: 0.8;
          margin-bottom: 2px;
        }
        .fb-name {
          font-family: var(--font-display);
          font-size: 16px;
          font-weight: 700;
        }

        .section-label {
          font-size: 11px;
          letter-spacing: 0.4em;
          color: var(--gold);
          margin-bottom: 20px;
          font-weight: 700;
        }
        .vision-quote {
          position: relative;
          padding: 30px 40px;
          background: rgba(201, 169, 110, 0.03);
          border-left: 3px solid var(--gold);
          margin: 40px 0;
        }
        .quote-mark {
          position: absolute;
          top: 10px;
          left: 15px;
          font-size: 60px;
          font-family: serif;
          color: var(--gold);
          opacity: 0.1;
          line-height: 1;
        }
        .vision-quote p {
          font-size: 19px !important;
          color: #fff !important;
          font-style: italic;
          margin-bottom: 0 !important;
          line-height: 1.6 !important;
        }
        .story-features {
          display: flex;
          flex-wrap: wrap;
          gap: 20px;
          margin-bottom: 30px;
        }
        .sf-item {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 13px;
          color: var(--gold);
          font-weight: 600;
          background: rgba(201, 169, 110, 0.05);
          padding: 6px 14px;
          border-radius: 100px;
        }

        /* VALUES GRID */
        .about-values-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }
        .stat-card {
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(255,255,255,0.05);
          padding: 40px;
          transition: all 0.4s ease;
        }
        .stat-card:hover {
          border-color: var(--gold);
          background: rgba(201, 169, 110, 0.04);
        }
        .stat-icon {
          color: var(--gold);
          width: 32px;
          height: 32px;
          margin-bottom: 20px;
        }
        .stat-card h3 {
          font-family: var(--font-display);
          font-size: 20px;
          margin-bottom: 12px;
        }
        .stat-card p {
          font-size: 14px;
          color: rgba(232, 224, 212, 0.5);
          line-height: 1.6;
        }

        /* CTA */
        .cta-box {
          background: linear-gradient(135deg, #000000 0%, #000000 100%);
          border: 1px solid rgba(201, 169, 110, 0.1);
          padding: 80px;
          text-align: center;
          border-radius: 4px;
        }
        .cta-box h2 {
          font-size: 48px;
          margin-bottom: 16px;
        }
        .cta-box p {
          font-size: 18px;
          color: rgba(232, 224, 212, 0.5);
          margin-bottom: 40px;
        }
        .cta-btns {
          display: flex;
          gap: 20px;
          justify-content: center;
        }

        .story-body p {
          font-size: 16px;
          line-height: 1.8;
          color: rgba(232, 224, 212, 0.7);
          margin-bottom: 24px;
        }
        .highlight-text {
          font-size: 20px !important;
          color: #fff !important;
          font-family: var(--font-display);
          padding-left: 24px;
          border-left: 2px solid var(--gold);
          margin: 40px 0 !important;
        }
        .closing-quote {
          font-family: var(--font-display);
          font-size: 24px !important;
          color: var(--gold) !important;
          font-weight: 500;
          margin-top: 40px;
        }

        @media (max-width: 1024px) {
          .about-hero-grid { grid-template-columns: 1fr; gap: 40px; }
          .about-story-split { grid-template-columns: 1fr; gap: 60px; }
          .story-stats-overlay { right: 0; bottom: -30px; }
          .about-values-grid { grid-template-columns: 1fr; }
          .stat-card { flex: 1; min-width: 250px; }
        }

        @media (max-width: 768px) {
          .about-hero { padding-top: 140px; }
          .story-main-img { height: 500px; }
          .cta-box { padding: 60px 24px; }
          .cta-btns { flex-direction: column; }
          .experience-badge { left: 0; padding: 20px; }
        }
      `}</style>
    </>
  )
}
