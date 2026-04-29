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
  { href: '/about', label: 'About' },
  { href: '/services', label: 'Services' },
  { href: '/blogs', label: 'Blogs' },
  { href: '/#gallery', label: 'Gallery' },
  { href: '/#process', label: 'Process' },
  { href: '/#pricing', label: 'Pricing' },
  { href: '/#testimonials', label: 'Reviews' },
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
          <a href="tel:+919823999414" className="nav-phone">+91 98239 99414</a>
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
            <p className="footer-desc">Pune&apos;s most trusted interior design studio. 850+ projects. 12 years. 45-day delivery guaranteed.</p>
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
            <div className="fh">Services</div>
            <ul className="fl">
              {['Living Room', 'Modular Kitchen', 'Bedroom', 'Office Interiors', 'Full Home Design'].map(l => <li key={l}><a href="/services">{l}</a></li>)}
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
              <li><a href="tel:+919823999414">+91 98239 99414</a></li>
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

export default function AboutPage() {
  useReveal()
  const scrolled = useScrolled()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <>
      <Navbar />
      <main className="about-page">

        {/* CONTENT SECTION */}
        <section className="about-content section">
          <div className="container">
            <div className="about-story-split">
              <div className="story-img-col reveal">
                <div className="story-img-frame">
                  <div className="story-img-deco-lines" />
                  <img src="/about-content.png" alt="AR Interiors Design" className="story-main-img" />
                  <div className="story-img-border" />
                </div>

                <div className="story-stats-overlay">
                  <div className="so-glass" />
                  <div className="so-item">
                    <span className="so-num">850+</span>
                    <span className="so-lab">Projects</span>
                  </div>
                  <div className="so-sep" />
                  <div className="so-item">
                    <span className="so-num">12+</span>
                    <span className="so-lab">Years</span>
                  </div>
                </div>

                <div className="founder-badge reveal d2">
                  <div className="fb-content">
                    <span className="fb-title">Founder's Vision</span>
                    <span className="fb-name">Mr. Parvez Shaikh</span>
                  </div>
                </div>
              </div>

              <div className="story-text-col reveal d1">
                <div className="section-label">THE JOURNEY</div>
                <h2 className="heading">Every brand has a <em>beginning</em>, and ours starts with a vision.</h2>
                <div className="story-body">
                  <p>
                    Before A R Interiors became one of Pune’s most trusted names in home interior design, it was a dream nurtured by <strong>Mr. Parvez Shaikh</strong>.
                    Starting his journey working for others in the industry, he gained hands-on experience, understood client expectations, and witnessed the gaps that often went unnoticed, especially when it came to affordability, transparency, and service quality.
                  </p>

                  <div className="vision-quote">
                    <span className="quote-mark">"</span>
                    <p>Why not build something better? A space where quality interiors aren’t a luxury, but accessible to every homeowner.</p>
                  </div>

                  <p>
                    Driven by this vision, Mr. Parvez Shaikh founded A R Interiors with a clear purpose to offer affordable pricing without compromising on design, quality, or customer experience.
                    What began as a small step has today grown into a team of designers, project managers, and skilled craftsmen.
                  </p>

                  <p>
                    Since 2012, we’ve delivered 850+ projects across Pune, transforming everything from compact 2 & 3 BHK apartments to expansive villas.
                    Our approach is simple: understand your space, respect your budget, and deliver beyond expectations.
                  </p>

                  <p>
                    Whether you’re looking for cost-effective interiors or a premium full-home transformation, we ensure every project is handled with precision.
                    With a dedicated project manager, fixed timelines, transparent pricing, and our signature 10-year woodwork warranty, we don’t just design homes, we build trust that lasts.
                  </p>

                  {/* <div className="story-features">
                    <div className="sf-item"><Check size={14} /> 10-Year Warranty</div>
                    <div className="sf-item"><Check size={14} /> Fixed Timelines</div>
                    <div className="sf-item"><Check size={14} /> Transparent Pricing</div>
                  </div> */}

                  <p className="closing-quote">
                    At A R Interiors, every home tells a story. And we’re here to help you create yours.
                  </p>
                </div>
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
                <h3>850+ Happy Homes</h3>
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

        {/* CTA SECTION */}
        <section className="about-cta section">
          <div className="container">
            <div className="cta-box reveal">
              <h2>Ready to tell your <em>story</em>?</h2>
              <p>Let's collaborate to build the home you've always dreamed of.</p>
              <div className="cta-btns">
                <a href="/#cta-section" className="btn btn-gold">BOOK FREE CONSULTATION</a>
                <a href="tel:+919823999414" className="btn btn-outline">CALL NOW →</a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <style jsx>{`
        .about-page {
          background: #050508;
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
          color: #050508;
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
          color: #050508;
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
          background: linear-gradient(135deg, #0a0a14 0%, #050508 100%);
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
