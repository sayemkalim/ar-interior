'use client'

import { useEffect, useRef, useState } from 'react'

// ─── DATA ───────────────────────────────────────────────────────────
const NAV_LINKS = [
  { href: '#services', label: 'Services' },
  { href: '#about', label: 'About' },
  { href: '#gallery', label: 'Gallery' },
  { href: '#process', label: 'Process' },
  { href: '#pricing', label: 'Pricing' },
  { href: '#testimonials', label: 'Reviews' },
  { href: '#faq', label: 'FAQ' },
]

const SERVICES = [
  { num: '01', icon: '🛋️', title: 'Living Room', desc: 'Luxurious living spaces crafted to reflect your personality and lifestyle.', tag: 'RESIDENTIAL' },
  { num: '02', icon: '🍳', title: 'Modular Kitchen', desc: 'Sleek, functional modular kitchens built for the modern Indian home.', tag: 'MODULAR' },
  { num: '03', icon: '🛏️', title: 'Master Bedroom', desc: 'Serene, sophisticated bedroom retreats tailored to your taste.', tag: 'RESIDENTIAL' },
  { num: '04', icon: '🏢', title: 'Office Interiors', desc: 'Productive, inspiring commercial spaces that reflect your brand identity.', tag: 'COMMERCIAL' },
  { num: '05', icon: '🚿', title: 'Bathroom Design', desc: 'Elegant bathrooms with premium fixtures and smart storage solutions.', tag: 'RESIDENTIAL' },
  { num: '06', icon: '🍽️', title: 'Dining Room', desc: 'Beautiful dining spaces where every meal becomes an occasion.', tag: 'RESIDENTIAL' },
  { num: '07', icon: '🪟', title: 'False Ceiling', desc: 'Creative false ceiling designs to elevate every room\'s aesthetic.', tag: 'SPECIALTY' },
  { num: '08', icon: '🏠', title: 'Full Home Design', desc: 'End-to-end interior design for your entire home — one team, one vision.', tag: 'COMPLETE' },
]

const USP_PANELS = [
  { id: 'USP_01', title: '45-Day Delivery', desc: 'Contractual 45-day delivery — or we pay the penalty. We have honoured this promise across 850+ projects.', fill: 95 },
  { id: 'USP_02', title: '10-Year Warranty', desc: 'Industry-leading 10-year warranty on all woodwork and modular furniture. Quality you can trust for decades.', fill: 88 },
  { id: 'USP_03', title: 'Transparent Pricing', desc: 'No hidden costs. Itemized quotations with fixed pricing. What we quote is what you pay.', fill: 100 },
  { id: 'USP_04', title: 'Dedicated Manager', desc: 'A single point of contact throughout your project — from design consultation to final handover.', fill: 90 },
]

const TESTIMONIALS = [
  { name: 'Priya S.', loc: 'BANER · 3BHK', text: 'AR Interiors transformed our apartment beyond expectations. The attention to detail and quality of work is exceptional. Delivered exactly on time!', initials: 'PS' },
  { name: 'Rahul M.', loc: 'HINJEWADI · VILLA', text: 'The team understood our vision perfectly. Our villa looks straight out of a magazine. Worth every rupee invested.', initials: 'RM' },
  { name: 'Sneha K.', loc: 'AUNDH · 2BHK', text: 'Extremely professional service. The modular kitchen they designed for us is both beautiful and highly functional.', initials: 'SK' },
  { name: 'Amit P.', loc: 'KOREGAON PARK', text: 'Hired AR Interiors for our office fit-out. The result is stunning — our clients are always impressed when they walk in.', initials: 'AP' },
  { name: 'Kavitha R.', loc: 'WAKAD · 3BHK', text: 'From concept to completion in 40 days! The quality of materials and craftsmanship is top-notch. Highly recommended.', initials: 'KR' },
  { name: 'Suresh N.', loc: 'KOTHRUD · BUNGALOW', text: 'AR Interiors delivered a masterpiece. Our bungalow is now the talk of the neighbourhood. Five star service!', initials: 'SN' },
]

const FAQS = [
  { q: 'What is your typical project timeline?', a: 'We contractually guarantee 45-day delivery for standard apartments (2-3BHK). Larger projects like villas and bungalows take 60-90 days. Your dedicated project manager will give you a precise timeline during consultation.' },
  { q: 'Do you provide a warranty on your work?', a: 'Yes — we offer an industry-leading 10-year warranty on all woodwork and modular furniture. This covers manufacturing defects and structural issues. Hardware and accessories carry a 2-year warranty.' },
  { q: 'What areas do you serve in Pune?', a: 'We serve all areas across Pune including Baner, Aundh, Hinjewadi, Wakad, Kothrud, Koregaon Park, Viman Nagar, Kalyani Nagar, and surrounding areas. We also take outstation projects.' },
  { q: 'What is included in the free site visit?', a: 'Our free site visit includes measurement of all spaces, discussion of your requirements and budget, preliminary design ideas, and a detailed itemized quotation — all at no charge and with no obligation.' },
  { q: 'Can I customize the designs?', a: 'Absolutely. Every project is 100% custom-designed to your preferences, lifestyle, and budget. We do not use template designs. Your home will be unique.' },
  { q: 'What materials do you use?', a: 'We use only premium materials — BWR/BWP grade plywood, high-quality laminates, quartz and granite surfaces, and branded hardware. We are happy to show you samples and explain the specifications.' },
]

const PRICING_PLANS = [
  {
    id: 'PLAN_01',
    name: 'Essential',
    price: '₹699',
    unit: 'per sq.ft · onwards',
    features: [
      { text: 'Modular kitchen + wardrobes', on: true },
      { text: 'False ceiling in living & master', on: true },
      { text: 'Premium laminates finish', on: true },
      { text: 'Dedicated project manager', on: true },
      { text: 'Custom furniture pieces', on: false },
      { text: 'Premium Italian laminates', on: false },
    ],
    featured: false,
  },
  {
    id: 'PLAN_02',
    name: 'Premium',
    price: '₹999',
    unit: 'per sq.ft · onwards',
    badge: 'MOST POPULAR',
    features: [
      { text: 'Complete home interior design', on: true },
      { text: 'Custom furniture & joinery', on: true },
      { text: 'Premium Italian laminates', on: true },
      { text: 'Dedicated project manager', on: true },
      { text: 'Lighting design & installation', on: true },
      { text: 'Smart home integration', on: false },
    ],
    featured: true,
  },
  {
    id: 'PLAN_03',
    name: 'Luxury',
    price: '₹1499',
    unit: 'per sq.ft · onwards',
    features: [
      { text: 'Full luxury interior package', on: true },
      { text: 'Imported materials & finishes', on: true },
      { text: 'Smart home integration', on: true },
      { text: 'Bespoke furniture design', on: true },
      { text: 'Art curation & styling', on: true },
      { text: 'Post-handover support (1yr)', on: true },
    ],
    featured: false,
  },
]

// ─── HOOKS ───────────────────────────────────────────────────────────
function useScrolled(threshold = 50) {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > threshold)
    window.addEventListener('scroll', handler, { passive: true })
    handler()
    return () => window.removeEventListener('scroll', handler)
  }, [threshold])
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

function useCountUp() {
  useEffect(() => {
    function countUp(el, t, s, d = 1800) {
      const st = performance.now();
      (function f(n) {
        const p = Math.min((n - st) / d, 1), e = 1 - Math.pow(1 - p, 3)
        el.textContent = Math.round(e * t) + (s || '')
        if (p < 1) requestAnimationFrame(f)
        else el.textContent = t + (s || '')
      })(st)
    }
    const co = new IntersectionObserver(
      (entries) => entries.forEach(x => {
        if (x.isIntersecting) {
          const el = x.target, t = parseInt(el.dataset.target), s = el.dataset.suffix || ''
          if (!isNaN(t)) countUp(el, t, s)
          co.unobserve(el)
        }
      }),
      { threshold: 0.5 }
    )
    document.querySelectorAll('[data-target]').forEach(el => co.observe(el))
    return () => co.disconnect()
  }, [])
}

function useParticles() {
  useEffect(() => {
    const c = document.getElementById('particles')
    if (!c) return
    const colors = ['rgba(201,169,110,0.7)', 'rgba(201,169,110,0.4)', 'rgba(180,200,255,0.3)']
    for (let i = 0; i < 45; i++) {
      const p = document.createElement('div')
      p.className = 'particle'
      const sz = Math.random() * 1.5 + 0.5
      p.style.cssText = `left:${Math.random() * 100}%;width:${sz}px;height:${sz}px;background:${colors[Math.floor(Math.random() * colors.length)]};animation-duration:${Math.random() * 20 + 10}s;animation-delay:${Math.random() * 14}s;`
      c.appendChild(p)
    }
  }, [])
}

// ─── COMPONENTS ──────────────────────────────────────────────────────

function Navbar() {
  const scrolled = useScrolled()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav id="navbar" className={scrolled ? 'scrolled' : ''}>
      <div className="nav-inner">
        {/* Logo as SVG text since base64 is embedded in original */}
        <a href="#hero" className="nav-logo" style={{ textDecoration: 'none' }}>
          <svg width="120" height="40" viewBox="0 0 120 40" fill="none">
            <text x="4" y="28" fontFamily="'Playfair Display', serif" fontSize="22" fontWeight="700" fill="#C9A96E">AR</text>
            <text x="38" y="28" fontFamily="'DM Sans', sans-serif" fontSize="11" fontWeight="600" fill="rgba(232,224,212,0.8)" letterSpacing="3">INTERIORS</text>
            <line x1="4" y1="33" x2="116" y2="33" stroke="rgba(201,169,110,0.3)" strokeWidth="0.5" />
          </svg>
        </a>
        <div className="nav-sep" />
        <ul className={`nav-links${menuOpen ? ' mobile-open' : ''}`}>
          {NAV_LINKS.map((l, i) => (
            <li key={i}>
              <a href={l.href} onClick={() => setMenuOpen(false)}>{l.label}</a>
            </li>
          ))}
        </ul>
        <div className="nav-cta">
          <a href="tel:+919XXXXXXXXX" className="nav-phone">+91 9X-XXXX-XXXX</a>
          <a href="#cta-section" className="nav-btn">
            Free Visit
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
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

function Hero() {
  const [formStatus, setFormStatus] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    setFormStatus('STATUS: RECEIVED · CALLING_WITHIN_2HRS')
    e.target.reset()
  }

  return (
    <section id="hero">
      <div className="hero-mesh" />
      <div className="hero-grid" />
      <div className="particles" id="particles" />
      <div className="orb orb1" /><div className="orb orb2" /><div className="orb orb3" />
      <div className="bracket bracket-tl" /><div className="bracket bracket-tr" />
      <div className="bracket bracket-bl" /><div className="bracket bracket-br" />

      {/* LEFT CONTENT */}
      <div className="hero-content">
        <div className="hero-inner">
          <div className="hero-badge">
            <span className="badge-pulse" />
            Pune&apos;s Premium Interior Studio — Est. 2012
          </div>
          <h1 className="hero-title">
            <span className="title-line"><span className="title-line-inner">Spaces That</span></span>
            <span className="title-line"><span className="title-line-inner">Tell Your <em>Story</em></span></span>
            <span className="title-line"><span className="title-line-inner">Beautifully.</span></span>
          </h1>
          <p className="subtext" style={{ marginBottom: 0 }}>
            Award-winning interior design firm in Pune — 850+ homes transformed, 12 years of excellence,
            45-day delivery guaranteed by contract.
          </p>
          <div className="hero-metrics">
            {[
              { target: 850, suffix: '+', label: 'Projects' },
              { target: 12, suffix: ' yrs', label: 'Experience' },
              { target: 45, suffix: 'd', label: 'Delivery' },
              { target: 98, suffix: '%', label: 'Satisfaction' },
            ].map((m, i) => (
              <div className="hero-metric" key={i}>
                <span className="metric-num" data-target={m.target} data-suffix={m.suffix}>0</span>
                <span className="metric-lbl">{m.label}</span>
              </div>
            ))}
          </div>
          <div className="hero-btns">
            <a href="#cta-section" className="btn btn-gold">
              Book Free Site Visit
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </a>
            <a href="#gallery" className="btn btn-outline">View Portfolio</a>
            <a href="https://wa.me/919XXXXXXXXX" className="btn btn-wa" target="_blank" rel="noopener noreferrer">
              <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" /><path d="M12 0C5.373 0 0 5.373 0 12c0 2.125.55 4.118 1.515 5.847L.057 23.5a.5.5 0 00.613.613l5.701-1.447A11.951 11.951 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.6a9.55 9.55 0 01-4.865-1.336l-.35-.208-3.619.918.942-3.543-.228-.362A9.557 9.557 0 012.4 12c0-5.292 4.308-9.6 9.6-9.6s9.6 4.308 9.6 9.6-4.308 9.6-9.6 9.6z" /></svg>
              WhatsApp Us
            </a>
          </div>
        </div>
        <div className="scroll-cue" onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}>
          <span>Scroll</span>
          <div className="scroll-arrow"><div className="scroll-dot" /></div>
        </div>
      </div>

      {/* RIGHT FORM PANEL */}
      <div className="hero-form">
        <div className="form-chip">
          <svg width="8" height="8" viewBox="0 0 8 8"><circle cx="4" cy="4" r="3" fill="#C9A96E" /></svg>
          FREE CONSULTATION
        </div>
        <h2 className="form-h">Get a Free Quote</h2>
        <p className="form-sub">// Response within 2 hours</p>
        <form onSubmit={handleSubmit}>
          <div className="form-group"><input type="text" placeholder="Your Name *" required /></div>
          <div className="form-group"><input type="tel" placeholder="Mobile Number *" required /></div>
          <div className="form-group">
            <select required defaultValue="">
              <option value="" disabled>Project Type</option>
              <option>New Home — Full Interior</option>
              <option>Modular Kitchen Only</option>
              <option>Bedroom Wardrobe</option>
              <option>Office Interior</option>
              <option>Renovation / Makeover</option>
            </select>
          </div>
          <div className="form-group"><input type="text" placeholder="Area in Pune" /></div>
          <div className="form-group"><textarea placeholder="Tell us about your project..." rows={3} /></div>
          {formStatus ? (
            <div style={{ padding: '12px 15px', background: 'rgba(100,180,100,0.85)', color: '#050508', fontSize: 12, fontWeight: 600, borderRadius: 1 }}>{formStatus}</div>
          ) : (
            <button type="submit" className="btn btn-gold" style={{ width: '100%', justifyContent: 'center' }}>
              BOOK FREE SITE VISIT →
            </button>
          )}
        </form>
        <div className="form-trust">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
          100% Free · No Obligation · Pune Only
        </div>
      </div>
    </section>
  )
}

function TrustBar() {
  const items = [
    '✦ 850+ Projects Completed', '✦ 45-Day Delivery Guaranteed', '✦ 10-Year Woodwork Warranty',
    '✦ Free Site Visit', '✦ Transparent Pricing', '✦ 12 Years Experience', '✦ 98% Client Satisfaction',
    '✦ 850+ Projects Completed', '✦ 45-Day Delivery Guaranteed', '✦ 10-Year Woodwork Warranty',
    '✦ Free Site Visit', '✦ Transparent Pricing', '✦ 12 Years Experience', '✦ 98% Client Satisfaction',
  ]
  return (
    <div className="trust-bar">
      <div className="trust-track">
        {items.map((item, i) => (
          <div className="ti" key={i}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#C9A96E" strokeWidth="2"><polyline points="20 6 9 17 4 12" /></svg>
            {item}
          </div>
        ))}
      </div>
    </div>
  )
}

function Services() {
  return (
    <section id="services" className="section">
      <div className="container">
        <div className="reveal" style={{ textAlign: 'center', maxWidth: 540, margin: '0 auto 60px' }}>
          <span className="label">// SERVICES.ARRAY</span>
          <h2 className="heading">What We <em>Design</em></h2>
          <div className="divider" style={{ margin: '18px auto 20px' }} />
          <p className="subtext" style={{ margin: '0 auto' }}>
            From modular kitchens to complete home transformations — every space, crafted with precision.
          </p>
        </div>
        <div className="services-grid">
          {SERVICES.map((s) => (
            <div className="sc" key={s.num}>
              <span className="sc-num">{s.num}</span>
              <div className="sc-icon">
                <span style={{ fontSize: 20 }}>{s.icon}</span>
              </div>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
              <span className="sc-tag">{s.tag}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function About() {
  return (
    <section id="about" className="section">
      <div className="container">
        <div className="about-grid">
          <div className="reveal">
            <span className="label">// ABOUT.AR_INTERIORS</span>
            <h2 className="heading">12 Years of <em>Crafting</em> Dream Homes</h2>
            <div className="divider" />
            <p className="subtext">
              AR Interiors is Pune&apos;s most trusted interior design studio. Since 2012, we have transformed
              850+ homes across Pune — from compact 1BHKs to sprawling bungalows.
            </p>
            <p className="subtext" style={{ marginTop: 12 }}>
              Our team of 35+ designers, project managers, and craftsmen work together to deliver interiors
              that are beautiful, functional, and built to last. Every project gets a dedicated manager,
              a fixed timeline, and our legendary 10-year warranty.
            </p>
            <div style={{ display: 'flex', gap: 12, marginTop: 28, flexWrap: 'wrap' }}>
              <a href="#cta-section" className="btn btn-gold">Start Your Project</a>
              <a href="#process" className="btn btn-outline">Our Process</a>
            </div>
          </div>
          <div className="reveal d2">
            <div className="stat-cube-grid">
              {[
                { num: '850', suffix: '+', label: 'Projects Delivered' },
                { num: '12', suffix: ' Yrs', label: 'In Business' },
                { num: '35', suffix: '+', label: 'Expert Designers' },
                { num: '45', suffix: 'd', label: 'Avg Delivery' },
              ].map((s, i) => (
                <div className="stat-cube" key={i}>
                  <span className="cube-num" data-target={parseInt(s.num)} data-suffix={s.suffix}>0</span>
                  <span className="cube-lbl">{s.label}</span>
                </div>
              ))}
              <div className="stat-cube cube-big">
                <span className="cube-num">10</span>
                <span className="cube-lbl">Year Woodwork Warranty — Industry&apos;s Best</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function USP() {
  return (
    <section id="usp" className="section">
      <div className="container">
        <div className="reveal" style={{ textAlign: 'center', maxWidth: 540, margin: '0 auto' }}>
          <span className="label">// WHY.AR_INTERIORS</span>
          <h2 className="heading">Why Choose <em>Us</em></h2>
          <div className="divider" style={{ margin: '18px auto 20px' }} />
        </div>
        <div className="usp-dashboard">
          {USP_PANELS.map((p) => (
            <div className="usp-panel reveal" key={p.id}>
              <div className="usp-panel-id">{p.id}</div>
              <h4>{p.title}</h4>
              <p>{p.desc}</p>
              <div className="usp-bar">
                <div className="usp-bar-fill" style={{ '--fill': `${p.fill}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

const GALLERY_ITEMS = [
  { cat: 'living', wide: true, title: 'Contemporary Living Room', sub: 'KOTHRUD · 3BHK · ₹3.8L', color: '#0c0c18' },
  { cat: 'kitchen', wide: false, title: 'Modular Kitchen', sub: 'WAKAD · 2BHK · ₹2.1L', color: '#f0ebe3' },
  { cat: 'bedroom', wide: false, title: 'Master Bedroom', sub: 'BANER · VILLA · ₹4.2L', color: '#0c0a0e' },
  { cat: 'dining', wide: false, title: 'Dining Room', sub: 'AUNDH · 3BHK · ₹1.8L', color: '#f7f2ec' },
  { cat: 'office', wide: false, title: 'Modern Office', sub: 'HINJEWADI · COMMERCIAL', color: '#0c1220' },
]

function Gallery() {
  const [activeFilter, setActiveFilter] = useState('all')
  const filters = ['all', 'living', 'kitchen', 'bedroom', 'dining', 'office']

  return (
    <section id="gallery" className="section">
      <div className="container">
        <div className="gallery-hdr">
          <div className="reveal">
            <span className="label">// PORTFOLIO.GALLERY</span>
            <h2 className="heading">Our <em>Work</em></h2>
          </div>
          <div className="filter-tabs reveal d2">
            {filters.map(f => (
              <button
                key={f}
                className={`fb${activeFilter === f ? ' active' : ''}`}
                onClick={() => setActiveFilter(f)}
              >
                {f.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
        <div className="gallery-grid">
          {GALLERY_ITEMS.map((item, i) => (
            <div
              key={i}
              className="gi"
              data-cat={item.cat}
              style={{
                opacity: activeFilter === 'all' || activeFilter === item.cat ? 1 : 0.15,
                transform: activeFilter === 'all' || activeFilter === item.cat ? 'scale(1)' : 'scale(0.97)',
                transition: 'all 0.4s ease',
                gridColumn: item.wide ? '1 / 3' : undefined,
              }}
            >
              <div className="gp" style={{ background: item.color, paddingBottom: item.wide ? '52%' : '68%', position: 'relative' }}>
                <div style={{
                  position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: "'Playfair Display', serif", fontSize: 'clamp(14px,2vw,22px)', color: 'rgba(201,169,110,0.5)',
                  letterSpacing: '0.15em', textTransform: 'uppercase',
                }}>
                  {item.title}
                </div>
              </div>
              <div className="gov">
                <div>
                  <h4>{item.title}</h4>
                  <p>{item.sub}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: 40 }} className="reveal">
          <p style={{ color: 'rgba(232,224,212,0.35)', fontSize: 12, marginBottom: 14, fontFamily: 'monospace', letterSpacing: '0.06em' }}>
            // 200+ PROJECTS ACROSS PUNE
          </p>
          <a href="#cta-section" className="btn btn-gold">VIEW FULL PORTFOLIO →</a>
        </div>
      </div>
    </section>
  )
}

function Process() {
  const steps = [
    { num: '01', tag: 'STEP_ONE', title: 'Free Consultation', desc: 'We visit your site, understand your vision, take measurements, and discuss budget — all at zero cost to you.' },
    { num: '02', tag: 'STEP_TWO', title: 'Design Presentation', desc: 'Our designers present 3D renders and detailed design concepts within 5 working days. Multiple iterations until you love it.' },
    { num: '03', tag: 'STEP_THREE', title: 'Itemized Quotation', desc: 'A transparent, itemized quote with no hidden costs. You know exactly what you\'re getting and at what price.' },
    { num: '04', tag: 'STEP_FOUR', title: 'Execution & Delivery', desc: 'Our skilled craftsmen execute the design with precision. Daily progress updates and a dedicated project manager throughout.' },
    { num: '05', tag: 'STEP_FIVE', title: 'Handover & Warranty', desc: 'Final walkthrough, snagging, and handover. Your 10-year woodwork warranty card is issued on handover day.' },
  ]
  return (
    <section id="process" className="section" style={{ background: 'var(--obsidian, #07070d)' }}>
      <div className="container">
        <div className="reveal" style={{ textAlign: 'center', maxWidth: 540, margin: '0 auto' }}>
          <span className="label">// PROCESS.FLOW</span>
          <h2 className="heading">How We <em>Work</em></h2>
          <div className="divider" style={{ margin: '18px auto 20px' }} />
        </div>
        <div className="process-timeline">
          {steps.map((s, i) => (
            <div className="pt-row reveal" key={i}>
              <div className="pt-num">{s.num}</div>
              <div className="pt-body">
                <div className="pt-tag">{s.tag}</div>
                <h4>{s.title}</h4>
                <p>{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Pricing() {
  return (
    <section id="pricing" className="section">
      <div className="container">
        <div className="reveal" style={{ textAlign: 'center', maxWidth: 540, margin: '0 auto' }}>
          <span className="label">// PRICING.CONFIG</span>
          <h2 className="heading">Transparent <em>Pricing</em></h2>
          <div className="divider" style={{ margin: '18px auto 20px' }} />
          <p className="subtext" style={{ margin: '0 auto' }}>No surprises. Fixed quotes. Quality guaranteed.</p>
        </div>
        <div className="pricing-grid">
          {PRICING_PLANS.map((plan) => (
            <div className={`pc reveal${plan.featured ? ' featured' : ''}`} key={plan.id}>
              {plan.badge && <div className="pop-badge">{plan.badge}</div>}
              <div className="plan-id">{plan.id}</div>
              <div style={{ fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(201,169,110,0.6)', marginBottom: 8 }}>{plan.name}</div>
              <div className="plan-price"><span>Starting</span><br />{plan.price}</div>
              <div className="plan-unit">{plan.unit}</div>
              <ul className="plan-feats">
                {plan.features.map((f, i) => (
                  <li key={i} className={f.on ? '' : 'off'}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      {f.on ? <polyline points="20 6 9 17 4 12" /> : <line x1="18" y1="6" x2="6" y2="18" />}
                    </svg>
                    {f.text}
                  </li>
                ))}
              </ul>
              <a href="#cta-section" className={`btn ${plan.featured ? 'btn-gold' : 'btn-outline'}`} style={{ width: '100%', justifyContent: 'center' }}>
                Get Quote →
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Testimonials() {
  return (
    <section id="testimonials" className="section">
      <div className="container">
        <div className="reveal" style={{ textAlign: 'center', maxWidth: 540, margin: '0 auto' }}>
          <span className="label">// CLIENT.REVIEWS</span>
          <h2 className="heading">What Clients <em>Say</em></h2>
          <div className="divider" style={{ margin: '18px auto 20px' }} />
        </div>
        <div className="test-grid">
          {TESTIMONIALS.map((t, i) => (
            <div className="tc reveal" key={i} style={{ '--delay': `${i * 0.1}s` }}>
              <div className="stars">★★★★★</div>
              <p className="tc-text">&ldquo;{t.text}&rdquo;</p>
              <div className="tc-author">
                <div className="tc-av">{t.initials}</div>
                <div>
                  <div className="tc-name">{t.name}</div>
                  <div className="tc-loc">{t.loc}</div>
                </div>
                <span className="v-badge">VERIFIED</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function CTA() {
  const [formStatus, setFormStatus] = useState('')
  function handleSubmit(e) {
    e.preventDefault()
    setFormStatus('STATUS: RECEIVED · CALLING_WITHIN_2HRS')
    e.target.reset()
  }
  return (
    <section id="cta-section" className="section">
      <div className="container">
        <div className="cta-wrap reveal">
          <div className="cta-left">
            <div className="cta-id">CTA_SECTION · BOOK_NOW</div>
            <h2 className="heading">Ready to Transform Your <em>Space?</em></h2>
            <p className="subtext" style={{ marginTop: 14 }}>
              Book your free site visit today. Our designer will visit your home, understand your vision,
              and present design concepts within 5 working days.
            </p>
            <div className="cta-offers">
              {['Free site visit & measurement', 'No-obligation 3D design concepts', 'Fixed-price transparent quotation'].map((o, i) => (
                <div className="cta-oi" key={i}>
                  <div className="cta-ic">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#C9A96E" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
                  </div>
                  {o}
                </div>
              ))}
            </div>
            <div className="cta-btns">
              <a href="tel:+919XXXXXXXXX" className="btn btn-gold">Call Now →</a>
              <a href="https://wa.me/919XXXXXXXXX" className="btn btn-wa" target="_blank" rel="noopener noreferrer">WhatsApp</a>
            </div>
          </div>
          <div className="cta-right">
            <h3>Book Your Free Visit</h3>
            <p className="sub">// We call back within 2 hours</p>
            <form onSubmit={handleSubmit}>
              <div className="form-group"><input type="text" placeholder="Your Name *" required /></div>
              <div className="form-group"><input type="tel" placeholder="Mobile Number *" required /></div>
              <div className="form-group">
                <select required defaultValue="">
                  <option value="" disabled>Select Area in Pune</option>
                  {['Baner', 'Aundh', 'Hinjewadi', 'Wakad', 'Kothrud', 'Koregaon Park', 'Other'].map(a => <option key={a}>{a}</option>)}
                </select>
              </div>
              {formStatus ? (
                <div style={{ padding: '12px', background: 'rgba(100,180,100,0.85)', color: '#050508', fontSize: 12, fontWeight: 600 }}>{formStatus}</div>
              ) : (
                <button type="submit" className="btn btn-gold" style={{ width: '100%', justifyContent: 'center' }}>
                  BOOK FREE VISIT →
                </button>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

function FAQ() {
  const [openIdx, setOpenIdx] = useState(null)
  return (
    <section id="faq" className="section">
      <div className="container">
        <div className="reveal" style={{ textAlign: 'center', maxWidth: 540, margin: '0 auto' }}>
          <span className="label">// FAQ.DATABASE</span>
          <h2 className="heading">Common <em>Questions</em></h2>
          <div className="divider" style={{ margin: '18px auto 20px' }} />
        </div>
        <div className="faq-grid">
          {FAQS.map((f, i) => (
            <div className="faq-item reveal" key={i}>
              <button className={`faq-q${openIdx === i ? ' open' : ''}`} onClick={() => setOpenIdx(openIdx === i ? null : i)}>
                {f.q}
                <div className="faq-ic">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                    {openIdx === i ? <><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></> : <><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></>}
                  </svg>
                </div>
              </button>
              <div className={`faq-a${openIdx === i ? ' open' : ''}`}>{f.a}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer>
      <div className="container">
        <div className="footer-grid">
          <div>
            <svg width="110" height="36" viewBox="0 0 110 36" fill="none" style={{ marginBottom: 14, opacity: 0.9 }}>
              <text x="4" y="26" fontFamily="'Playfair Display', serif" fontSize="20" fontWeight="700" fill="#C9A96E">AR</text>
              <text x="34" y="26" fontFamily="'DM Sans', sans-serif" fontSize="10" fontWeight="600" fill="rgba(232,224,212,0.7)" letterSpacing="2.5">INTERIORS</text>
            </svg>
            <p className="footer-desc">Pune&apos;s most trusted interior design studio. 850+ projects. 12 years. 45-day delivery guaranteed.</p>
            <div className="fsocial">
              {['IG', 'FB', 'YT', 'IN'].map(s => <a key={s} href="#" className="fsb">{s}</a>)}
            </div>
          </div>
          <div>
            <div className="fh">Services</div>
            <ul className="fl">
              {['Living Room', 'Modular Kitchen', 'Bedroom', 'Office Interiors', 'Full Home Design'].map(l => <li key={l}><a href="#services">{l}</a></li>)}
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
              <li><a href="tel:+919XXXXXXXXX">+91 9X-XXXX-XXXX</a></li>
              <li><a href="mailto:hello@arinteriors.in">hello@arinteriors.in</a></li>
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

function StickyWhatsApp() {
  return (
    <a href="https://wa.me/919XXXXXXXXX" className="swa" target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp">
      <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
        <path d="M12 0C5.373 0 0 5.373 0 12c0 2.125.55 4.118 1.515 5.847L.057 23.5a.5.5 0 00.613.613l5.701-1.447A11.951 11.951 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.6a9.55 9.55 0 01-4.865-1.336l-.35-.208-3.619.918.942-3.543-.228-.362A9.557 9.557 0 012.4 12c0-5.292 4.308-9.6 9.6-9.6s9.6 4.308 9.6 9.6-4.308 9.6-9.6 9.6z" />
      </svg>
    </a>
  )
}

// ─── PAGE ─────────────────────────────────────────────────────────────
export default function Home() {
  useReveal()
  useCountUp()
  useParticles()

  return (
    <>
      <StickyWhatsApp />
      <Navbar />
      <main>
        <Hero />
        <TrustBar />
        <Services />
        <About />
        <USP />
        <Gallery />
        <Process />
        <Pricing />
        <Testimonials />
        <CTA />
        <FAQ />
      </main>
      <Footer />
    </>
  )
} 