'use client'

import { useEffect, useRef, useState } from 'react'
import {
  ArrowRight, Sofa, CookingPot, Bed, Building2, ShowerHead, UtensilsCrossed,
  Layers, Home as HomeIcon, Shield, Check, X, Plus, Phone, Star, ChevronDown,
  ChevronLeft, ChevronRight,
  MessageCircle, Clock, Award, DollarSign, UserCheck, Eye,
  Sparkles, CircleCheck, CircleDot, MapPin, Mail,
  Box, Cpu, Droplet, Wind, Zap, Frame, Globe, Monitor, Tv, Video, MoreHorizontal
} from 'lucide-react'
import { FaInstagram, FaFacebookF, FaYoutube, FaLinkedinIn } from 'react-icons/fa6'
import { motion } from 'framer-motion'


// ─── DATA ───────────────────────────────────────────────────────────
const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About Us' },
  { href: '/services', label: 'Services' },
  { href: '#process', label: 'Process' },
  { href: '#pricing', label: 'Price' },
  { href: '#gallery', label: 'Gallery' },
  { href: '#testimonials', label: 'Review' },
  { href: '/blogs', label: 'Blog' },
  { href: '#faq', label: 'FAQ' },
]


const USP_PANELS = [
  { id: '01', title: '10-Year Structural Warranty', desc: 'Every piece of woodwork is backed by a decade-long warranty, documented in your handover certificate. No fine print.', fill: 100 },
  { id: '02', title: 'Transparent Pricing & Interior Design Packages', desc: 'No hidden costs. Our interior design packages in Pune come with itemized, fixed-price quotations. What we quote is what you pay.', fill: 95 },
  { id: '03', title: 'Dedicated Project Manager', desc: 'A single point of contact throughout your project from design consultation to final handover.', fill: 90 },
  { id: '04', title: 'Labour Safety', desc: 'As trusted interior contractors in Pune, we follow strict on-site safety protocols, with a fully trained and insured workforce.', fill: 98 },
  { id: '05', title: 'Garbage is our responsibility', desc: 'We ensure all debris generated during the project is cleared and taken away by our team, keeping your space clean and hassle-free.', fill: 100 },
  { id: '06', title: 'On-Time Project Delivery', desc: 'We follow a well-planned timeline and efficient execution process to ensure your project is completed on schedule without compromising on quality.', fill: 100 },
]

const TESTIMONIALS = [
  { name: 'Priya S.', loc: 'Banker, 3 BHK', text: 'A R Interiors delivered our home interior design services in Pune beyond all expectations. The attention to detail is exceptional. Delivered exactly on time!', initials: 'PS' },
  { name: 'Rahul M.', loc: 'Hinjewadi Villa', text: 'The best interior designers in Pune, hands down. Our villa looks straight out of a magazine. Worth every rupee.', initials: 'RM' },
  { name: 'Sneha K.', loc: 'Aundh, 2 BHK', text: 'Extremely professional. The modular kitchen designers in Pune they recommended were brilliant. Beautiful and highly functional.', initials: 'SK' },
  { name: 'Amit P.', loc: 'Koregaon Park', text: 'Hired A R Interiors for our office fit-out. The result is stunning. Our clients are always impressed when they walk in.', initials: 'AP' },
  { name: 'Kavitha R.', loc: 'Wakad, 3 BHK', text: 'Concept to completion in 40 days! The quality of materials and craftsmanship in these modern home interiors is top-notch. Highly recommended.', initials: 'KR' },
  { name: 'Suresh N.', loc: 'Kothrud Bungalow', text: 'A R Interiors delivered a masterpiece. Our bungalow is now the talk of the neighbourhood. Five-star reliable interior contractors in Pune!', initials: 'SN' },
]

const FAQS = [
  {
    q: 'What is your typical project timeline?',
    a: 'We contractually guarantee 45-day delivery for standard 2 BHK and 3 BHK apartments making us one of the most reliable interior contractors in Pune for on-time delivery. Larger projects like villas take 60–90 days. Your dedicated project manager will provide a precise timeline during the free consultation.'
  },
  {
    q: 'How much does 2 BHK interior design cost in Pune?',
    a: 'The 2 BHK interior design cost in Pune starts at ₹699 per sq.ft with our Essential package. For a fully furnished 2 BHK, the typical budget ranges from ₹5L to ₹12L depending on materials, scope, and finishes. We provide fixed, itemized quotes so there are no surprises.'
  },
  {
    q: 'Do you provide a warranty on your work?',
    a: 'Yes, as one of the best interior designers in Pune, we offer an industry-leading 10-year warranty on all woodwork and modular furniture. This covers manufacturing defects and structural issues. Hardware and accessories carry a 2-year warranty.'
  },
  {
    q: 'What areas in Pune do you serve?',
    a: 'As professional interior designers near you across Pune, we serve Baner, Aundh, Hinjewadi, Wakad, Kothrud, Koregaon Park, Viman Nagar, Kalyani Nagar, and surrounding areas. We also take outstation projects.'
  },
  {
    q: 'Is labour safety a priority on your construction sites?',
    a: 'Absolutely, labour safety is our top priority. As safe construction interior services providers in Pune, we follow strict on-site safety protocols on every project. All our workers are trained, equipped with appropriate safety gear, and insured. We conduct regular site safety audits and ensure full compliance with construction safety standards.'
  },
  {
    q: 'Can I customize the designs?',
    a: 'Every project is 100% custom-designed to your preferences, lifestyle, and budget. We do not use template designs, your home will be unique. From living room interior design in Pune to bedroom interior design, every space is tailored to you.'
  },
  {
    q: 'What materials do you use for modular kitchens and interiors?',
    a: 'We use only premium materials - BWR/BWP grade plywood, high-quality laminates, quartz and granite surfaces, and branded hardware. Our modular kitchen designers in Pune are happy to show you samples and explain all specifications during your free site visit.'
  },
  {
    q: 'What is included in the free site visit?',
    a: 'Our free site visit includes measurement of all spaces, discussion of your requirements and budget, preliminary design ideas, and a detailed itemized quotation — all at no charge and with no obligation. Book yours today with Pune\'s best interior designers.'
  },
]

const PRICING_PLANS = [
  {
    id: 'PLAN_01',
    name: 'Essential — Low Cost Interior Designers Pune',
    price: '₹10 Lakh',
    unit: 'onwards',
    features: [
      { text: 'Curated kitchen & wardrobe designs', on: true },
      { text: 'Signature ceiling detailing', on: true },
      { text: 'Luxe laminate finishes', on: true },
      { text: 'White-glove project handling', on: true },
      { text: 'Handcrafted furniture', on: true },
    ],
    featured: false,
  },
  {
    id: 'PLAN_02',
    name: 'Premium — Home Interior Design Services Pune',
    price: '₹20 Lakh',
    unit: 'onwards',
    badge: 'MOST POPULAR',
    features: [
      { text: 'End-to-end home interior design', on: true },
      { text: 'Bespoke furniture & joinery', on: true },
      { text: 'Premium Italian laminates', on: true },
      { text: 'Dedicated project leadership', on: true },
      { text: 'Integrated lighting design', on: true },
      { text: 'Smart home solutions', on: true },
    ],
    featured: true,
  },
  {
    id: 'PLAN_03',
    name: 'Luxury — Modern Home Interiors Pune',
    price: '₹30 Lakh',
    unit: 'onwards',
    features: [
      { text: 'Complete luxury interior experience', on: true },
      { text: 'Imported materials & refined finishes', on: true },
      { text: 'Integrated smart home solutions', on: true },
      { text: 'Bespoke furniture design', on: true },
      { text: 'Art curation & styling', on: true },
      { text: '1-year post-handover support', on: true },
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
    function countUp(el, t, s, p_fix = '', d = 1800) {
      const st = performance.now();
      (function f(n) {
        const p = Math.min((n - st) / d, 1), e = 1 - Math.pow(1 - p, 3)
        el.textContent = p_fix + Math.round(e * t) + (s || '')
        if (p < 1) requestAnimationFrame(f)
        else el.textContent = p_fix + t + (s || '')
      })(st)
    }
    const co = new IntersectionObserver(
      (entries) => entries.forEach(x => {
        if (x.isIntersecting) {
          const el = x.target, t = parseInt(el.dataset.target), s = el.dataset.suffix || '', p_fix = el.dataset.prefix || ''
          if (!isNaN(t)) countUp(el, t, s, p_fix)
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
  const activeAnchor = useActiveAnchor()

  return (
    <nav id="navbar" className={scrolled ? 'scrolled' : ''}>
      <div className="nav-inner">
        {/* Logo as SVG text since base64 is embedded in original */}
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
          <a href="#cta-section" className="nav-btn">
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

function Hero({ isFormOpen, setIsFormOpen }) {
  const [formStatus, setFormStatus] = useState('')
  const [bgIndex, setBgIndex] = useState(0)
  const images = ['/background/website 1.png', '/background/webiste 2.png']

  useEffect(() => {
    const timer = setInterval(() => {
      setBgIndex((prev) => (prev + 1) % images.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [images.length])

  function handleSubmit(e) {
    e.preventDefault()
    setFormStatus('STATUS: RECEIVED · CALLING_WITHIN_2HRS')
    e.target.reset()
  }

  return (
    <section id="hero">
      {/* BACKGROUND SLIDER */}
      <div className="hero-bg-slider">
        {images.map((img, i) => (
          <div
            key={i}
            className={`hero-bg-img ${bgIndex === i ? 'active' : ''}`}
            style={{ backgroundImage: `url("${img}")` }}
          />
        ))}
        <div className="hero-bg-overlay" />
      </div>

      {/* LEFT CONTENT */}
      <div className="hero-content">
        <div className="hero-inner">

          <h1 className="hero-title">
            <span className="title-line"><span className="title-line-inner">Design Spaces</span></span>
            <span className="title-line"><span className="title-line-inner">That <em>Tell Your Story</em></span></span>
          </h1>
          <p className="hero-body reveal">
            Pune&apos;s most trusted home interior design services studio. We have transformed 500+ homes across Pune from compact 1 BHKs to sprawling bungalows with modern, functional, and beautiful interiors.
          </p>



          <div className="hero-btns reveal">
            <a href="#cta-section" className="btn btn-gold">
              <ArrowRight size={14} strokeWidth={2.5} />
              GET FREE ESTIMATE
            </a>
            <a href="#gallery" className="btn btn-outline">VIEW PORTFOLIO</a>
          </div>
        </div>

      </div>

      {/* RIGHT FORM PANEL */}
      <div className={`hero-form${isFormOpen ? ' open' : ' closed'}`}>
        <button className="form-close" onClick={() => setIsFormOpen(false)} aria-label="Close form">
          <X size={20} />
        </button>
        <div className="form-chip">
          <span className="live-dot" />
          LIVE · FREE CONSULTATION
        </div>
        <h2 className="form-h">Transform Your Home Today</h2>
        <p className="form-sub">No obligation. Free site visit included.</p>
        <form onSubmit={handleSubmit}>
          <div className="form-group"><input type="text" placeholder="Full Name *" required /></div>
          <div className="form-group"><input type="tel" placeholder="Mobile Number *" required /></div>
          <div className="form-group">
            <select required defaultValue="">
              <option value="" disabled>— Select Project Type —</option>
              <option>New Home — Full Interior</option>
              <option>Modular Kitchen Only</option>
              <option>Bedroom Wardrobe</option>
              <option>Office Interior</option>
              <option>Renovation / Makeover</option>
            </select>
          </div>
          <div className="form-group">
            <select required defaultValue="">
              <option value="" disabled>— Budget Range —</option>
              <option>₹5L - ₹10L</option>
              <option>₹10L - ₹20L</option>
              <option>₹20L - ₹35L</option>
              <option>₹35L - ₹50L</option>
              <option>Custom / Luxury</option>
            </select>
          </div>
          {formStatus ? (
            <div style={{ padding: '12px 15px', background: 'rgba(100,180,100,0.85)', color: '#000000', fontSize: 12, fontWeight: 600, borderRadius: 1 }}>{formStatus}</div>
          ) : (
            <button type="submit" className="btn btn-gold" style={{ width: '100%', justifyContent: 'center' }}>
              BOOK FREE SITE VISIT →
            </button>
          )}
        </form>
        <div className="form-sep">OR</div>
        <a href="https://wa.me/919822998986?text=Hi,%20I'm%20interested%20in%20your%20design%20services.%20What%20are%20your%20packages?" className="btn btn-wa" target="_blank" rel="noopener noreferrer" style={{ width: '100%', justifyContent: 'center' }}>
          <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
          WHATSAPP NOW
        </a>
        <div className="form-trust">
          <Shield size={12} strokeWidth={2} />
          ENCRYPTED · NO SPAM · FREE VISIT
        </div>
      </div>

    </section>
  )
}

function TrustBar() {
  const items = [
    '✦ 500+ Projects Completed', '✦ 45-Day Delivery Guaranteed', '✦ 10-Year Woodwork Warranty',
    '✦ Free Site Visit', '✦ Transparent Pricing', '✦ 12 Years Experience', '✦ 94% Client Satisfaction',
    '✦ 500+ Projects Completed', '✦ 45-Day Delivery Guaranteed', '✦ 10-Year Woodwork Warranty',
    '✦ Free Site Visit', '✦ Transparent Pricing', '✦ 12 Years Experience', '✦ 94% Client Satisfaction',
  ]
  return (
    <div className="trust-bar">
      <div className="trust-track">
        {items.map((item, i) => (
          <div className="ti" key={i}>
            <Check size={12} color="#C9A96E" strokeWidth={2} />
            {item}
          </div>
        ))}
      </div>
    </div>
  )
}


function About() {
  return (
    <section id="about" className="section" style={{ background: '#000000' }}>
      <div className="container">
        <div className="about-grid">
          <div className="reveal">

            <h2 className="heading">12 Years of <em>Crafting</em> Dream Homes in Pune</h2>
            <div className="divider" />
            <p className="subtext">
              A R Interiors is Pune&apos;s most trusted name in home interior design services. Since 2012, our team of 35+ designers, project managers, and skilled craftsmen has delivered modern home interiors in Pune across 500+ projects from compact 2 and 3 BHK apartments to expansive villas.
            </p>
            <p className="subtext" style={{ marginTop: 12 }}>
              Whether you&apos;re looking for low cost interior designers in Pune or a premium full-home transformation, our team delivers on time, on budget, and beyond expectations. Every project comes with a dedicated project manager, fixed timeline, and our legendary 10-year woodwork warranty.
            </p>
            <div style={{ display: 'flex', gap: 12, marginTop: 28, flexWrap: 'wrap' }}>
              <a href="#cta-section" className="btn btn-gold">Start Your Project</a>
              <a href="#process" className="btn btn-outline">Our Process</a>
            </div>
          </div>
          <div className="reveal d2">
            <div className="stat-cube-grid">
              {[
                { num: '500', suffix: '+', label: 'Projects Delivered' },
                { num: '12', suffix: '+', label: 'Years in Business' },
                { num: '94', suffix: '%', label: 'Client Satisfaction' },
                { num: '45', suffix: 'd *', label: 'Timelines may vary from project to project', },
              ].map((s, i) => (
                <div className="stat-cube" key={i}>
                  <span className="cube-num" data-target={parseInt(s.num)} data-suffix={s.suffix} data-prefix={s.prefix || ''}>0</span>
                  <span className="cube-lbl">{s.label}</span>
                </div>
              ))}
              <div className="stat-cube cube-big">
                <span className="cube-num">10 *</span>
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
    <section id="usp" className="section" style={{ background: '#000000' }}>
      <div className="container">
        <div className="reveal" style={{ textAlign: 'center', maxWidth: 640, margin: '0 auto' }}>

          <h2 className="heading">Why We&apos;re the <em>Best Interior Designers</em> in Pune</h2>
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
  { src: '/gallery/IMG_1621.jpg', h: '450px', title: 'Luxury Living', sub: 'PUNE · PROJECT 01' },
  { src: '/gallery/IMG_1622.jpg', h: '320px', title: 'Modern Bedroom', sub: 'WAKAD · 3BHK' },
  { src: '/gallery/IMG_1623.jpg', h: '500px', title: 'Modular Kitchen', sub: 'BANER · 2BHK' },
  { src: '/gallery/IMG_1624.jpg', h: '380px', title: 'Dining Concept', sub: 'KOTHRUD · VILLA' },
  { src: '/gallery/IMG_1630.jpg', h: '420px', title: 'Urban Lounge', sub: 'PUNE · FLAT' },
  { src: '/gallery/IMG_1631.jpg', h: '350px', title: 'Cosy Bedroom', sub: 'AUNDH · 3BHK' },
  { src: '/gallery/IMG_1632.jpg', h: '480px', title: 'Grand Hall', sub: 'HINJEWADI · 2BHK' },
  { src: '/gallery/IMG_1633.jpg', h: '310px', title: 'Kitchen Detail', sub: 'PUNE · RESIDENTIAL' },
  { src: '/gallery/IMG_1684.jpg', h: '440px', title: 'Living Space', sub: 'WAKAD · VILLA' },
  { src: '/gallery/IMG_1685.jpg', h: '330px', title: 'Interior Art', sub: 'BANER · 3BHK' },
  { src: '/gallery/IMG_1686.jpg', h: '490px', title: 'Modern Kitchen', sub: 'KOTHRUD · FLAT' },
  { src: '/gallery/IMG_1687.jpg', h: '360px', title: 'Master Suite', sub: 'PUNE · PROJECT 02' },
  { src: '/gallery/IMG_1706.jpg', h: '410px', title: 'Design Corner', sub: 'AUNDH · 2BHK' },
  { src: '/gallery/IMG_1710.jpg', h: '340px', title: 'Elegant Living', sub: 'HINJEWADI · 3BHK' },
  { src: '/gallery/modularkitchen1.jpg', h: '510px', title: 'Pro Kitchen', sub: 'PUNE · VILLA' },
  { src: '/gallery/IMG_2089.JPG.jpeg', h: '300px', title: 'Detail View', sub: 'WAKAD · FLAT' },
  { src: '/gallery/IMG_2090.JPG.jpeg', h: '430px', title: 'Living Setup', sub: 'BANER · 2BHK' },
  { src: '/gallery/IMG_2091.JPG.jpeg', h: '370px', title: 'Kitchen View', sub: 'KOTHRUD · 3BHK' },
  { src: '/gallery/IMG_2092.JPG.jpeg', h: '460px', title: 'Main Hall', sub: 'HINJEWADI · VILLA' },
  { src: '/gallery/IMG_2093.JPG.jpeg', h: '320px', title: 'Bedroom Art', sub: 'PUNE · RESIDENTIAL' },
  { src: '/gallery/IMG_2094.JPG.jpeg', h: '400px', title: 'Office Space', sub: 'AUNDH · 2BHK' },
  { src: '/gallery/IMG_2095.JPG.jpeg', h: '350px', title: 'Compact Design', sub: 'WAKAD · 3BHK' },
  { src: '/gallery/IMG_2096.JPG.jpeg', h: '470px', title: 'Luxury Corner', sub: 'KOTHRUD · VILLA' },
  { src: '/gallery/IMG_1729.jpg', h: '440px', title: 'Grand Kitchen', sub: 'PUNE · PROJECT 03' },
]

function Gallery() {
  const [showAll, setShowAll] = useState(false)
  const items = showAll ? GALLERY_ITEMS : GALLERY_ITEMS.slice(0, 9)

  return (
    <section id="gallery" className="section" style={{ background: '#000000' }}>
      <div className="container">
        <div className="gallery-hdr">
          <div className="reveal">
            <h2 className="heading">Our <em>Work</em></h2>
          </div>
        </div>
        <div className="gallery-container">
          <div className="vertical-label reveal">
            <span className="v-line" />
            <span className="v-text">GALLERY</span>
          </div>
          <div className="masonry-grid">
            {[0, 1, 2].map((colIdx) => (
              <div key={colIdx} className="masonry-column">
                {items
                  .filter((_, i) => i % 3 === colIdx)
                  .map((item, i) => (
                    <div key={i} className="gi">
                      <img
                        src={item.src}
                        alt={item.title}
                        loading="lazy"
                        className="gi-img"
                        style={{ height: item.h, objectFit: 'cover' }}
                      />
                    </div>
                  ))}
              </div>
            ))}
          </div>
        </div>
        {!showAll && (
          <div style={{ textAlign: 'center', marginTop: 40 }} className="reveal">
            <p style={{ color: 'rgba(232,224,212,0.35)', fontSize: 12, marginBottom: 14, fontFamily: 'monospace', letterSpacing: '0.06em' }}>
              200+ PROJECTS ACROSS PUNE
            </p>
            <button onClick={() => setShowAll(true)} className="btn btn-gold">VIEW FULL PORTFOLIO →</button>
          </div>
        )}
      </div>
      <style jsx>{`
        .gallery-container {
          display: flex;
          gap: 30px;
          position: relative;
          padding: 0 4%;
        }
        .vertical-label {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 20px;
          padding-top: 20px;
          opacity: 0.3;
        }
        .v-line {
          width: 1px;
          height: 80px;
          background: var(--gold);
        }
        .v-text {
          writing-mode: vertical-rl;
          text-transform: uppercase;
          font-family: var(--font-body);
          font-size: 9px;
          letter-spacing: 0.6em;
          color: var(--gold);
        }
        .masonry-grid {
          display: flex;
          gap: 16px;
          flex: 1;
        }
        .masonry-column {
          display: flex;
          flex-direction: column;
          gap: 16px;
          flex: 1;
        }
        .gi {
          width: 100%;
        }
        .gi-img {
          width: 100%;
          height: auto;
          display: block;
          border: 1px solid rgba(255,255,255,0.05);
        }
        @media (max-width: 900px) {
          .vertical-label { display: none; }
          .masonry-grid { gap: 10px; }
          .masonry-column { gap: 10px; }
        }
        @media (max-width: 600px) {
          .masonry-grid {
            /* On small screens, maybe 2 columns */
          }
          .masonry-column:last-child { display: none; }
        }
      `}</style>
    </section>
  )
}

function Partners() {
  const brands = [
    { name: 'HÄFELE', icon: Cpu },
    { name: 'HETTICH', icon: Zap },
    { name: 'ASIAN PAINTS', icon: Droplet },
    { name: 'KOHLER', icon: ShowerHead },
    { name: 'JAQUAR', icon: Award },
    { name: 'SAINT-GOBAIN', icon: Box },
    { name: 'GREENLAM', icon: Frame },
    { name: 'FABER', icon: Wind },
    { name: 'ARISTO', icon: Layers },
    { name: 'D-DECOR', icon: Globe },
  ]

  // Double the list for seamless loop
  const loopLogos = [...brands, ...brands]

  return (
    <section id="partners" className="section" style={{ background: '#000000', overflow: 'hidden' }}>
      <div className="container">
        <div className="reveal" style={{ textAlign: 'center', maxWidth: 640, margin: '0 auto 40px' }}>

          <h2 className="heading">Our <em>Partners</em></h2>
          <div className="divider" style={{ margin: '18px auto 20px' }} />
        </div>
      </div>

      <div className="marquee-container">
        <motion.div
          className="marquee-track"
          animate={{ x: [0, -1035] }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          {loopLogos.map((b, i) => (
            <div className="brand-logo" key={i}>
              <b.icon size={68} strokeWidth={1} />
              <span>{b.name}</span>
            </div>
          ))}
        </motion.div>
      </div>

      <style>{`
        .marquee-container {
          width: 100%;
          overflow: hidden;
          position: relative;
          padding: 40px 0;
          background: rgba(201, 169, 110, 0.02);
          border-top: 1px solid rgba(201, 169, 110, 0.05);
          border-bottom: 1px solid rgba(201, 169, 110, 0.05);
        }
        .marquee-track {
          display: flex;
          gap: 60px;
          width: max-content;
        }
        .brand-logo {
          display: flex;
          align-items: center;
          gap: 24px;
          color: var(--gold);
          font-family: var(--font-body);
          font-size: 22px;
          font-weight: 800;
          letter-spacing: 0.3em;
          white-space: nowrap;
          opacity: 0.75;
          transition: all 0.4s ease;
        }
        .brand-logo:hover {
          opacity: 1;
          transform: scale(1.03);
          filter: drop-shadow(0 0 10px rgba(201, 169, 110, 0.2));
        }
        .brand-logo svg {
          opacity: 1;
        }
      `}</style>
    </section>
  )
}

function Process() {
  const steps = [
    { num: '01', tag: '// INIT . FREE', title: 'Free Consultation', desc: 'Share your vision. Our professional interior designers near you listen and understand your style, budget, and timeline.' },
    { num: '02', tag: '// SURVEY . ONSITE', title: 'Site Visit', desc: 'Our designer visits for precise measurements and full site assessment at no charge.' },
    { num: '03', tag: '// RENDER . 72HR', title: '3D Design & Quote', desc: 'Photorealistic renders and itemised quote delivered within 72 hours.' },
    { num: '04', tag: '// BUILD . LIVE', title: 'Production', desc: 'Factory and site work run simultaneously. WhatsApp updates every 48 hours.' },
    { num: '05', tag: '// DONE . WARRANTY', title: 'Handover', desc: 'Walkthrough, snag-fixing, and 10-year warranty docs. Move in!' },
  ]
  return (
    <section id="process" className="section" style={{ background: '#000000' }}>
      <div className="container">
        <div className="reveal" style={{ textAlign: 'center', maxWidth: 740, margin: '0 auto', marginBottom: 80 }}>

          <h2 className="heading">Your Journey With the <em>Best Interior Designers</em> in Pune - Step by Step</h2>
          <p style={{ color: 'rgba(232, 224, 212, 0.6)', fontSize: 16 }}>Clear, stress-free home interior design services from the first call to the final walkthrough.</p>
        </div>
        <div className="process-horiz">
          {steps.map((s, i) => (
            <div className="ph-step reveal" key={i} style={{ transitionDelay: `${i * 0.15}s` }}>
              <div className="ph-circle">{s.num}</div>
              {/* <div className="ph-tag">{s.tag}</div> */}
              <h4 className="ph-title">{s.title}</h4>
              <p className="ph-desc">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        .process-horiz {
          position: relative;
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 20px;
          max-width: 1200px;
          margin: 60px auto 0;
        }
        .process-horiz::before {
          content: '';
          position: absolute;
          top: 40px;
          left: 10%;
          right: 10%;
          height: 1px;
          background: rgba(201, 169, 110, 0.2);
          z-index: 1;
        }
        .ph-step {
          text-align: center;
          position: relative;
          z-index: 2;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .ph-circle {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          border: 1px solid rgba(201, 169, 110, 0.3);
          background: #000000;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Poppins', sans-serif;
          font-size: 20px;
          color: #C9A96E;
          font-style: italic;
          font-weight: 600;
          margin-bottom: 24px;
          transition: all 0.4s;
          position: relative;
        }
        .ph-step:hover .ph-circle {
          border-color: #C9A96E;
          box-shadow: 0 0 20px rgba(201, 169, 110, 0.15);
          transform: scale(1.05);
        }
        .ph-tag {
          font-size: 9px;
          font-family: monospace;
          color: rgba(201, 169, 110, 0.5);
          letter-spacing: 0.15em;
          margin-bottom: 12px;
        }
        .ph-title {
          font-family: 'Poppins', sans-serif;
          font-size: 16px;
          font-weight: 600;
          color: #fff;
          margin-bottom: 12px;
        }
        .ph-desc {
          font-size: 13px;
          color: rgba(232, 224, 212, 0.5);
          line-height: 1.6;
          max-width: 220px;
        }
        @media (max-width: 1024px) {
          .process-horiz { grid-template-columns: 1fr; gap: 60px; }
          .process-horiz::before { display: none; }
        }
      `}</style>
    </section>
  )
}

function Pricing() {
  return (
    <section id="pricing" className="section" style={{ background: '#000000' }}>
      <div className="container">
        <div className="reveal" style={{ textAlign: 'center', maxWidth: 640, margin: '0 auto 60px' }}>

          <h2 className="heading">Transparent Interior Design <em>Packages</em> in Pune</h2>
          <div className="divider" style={{ margin: '18px auto 20px' }} />
          <p className="subtext" style={{ margin: '0 auto' }}>No surprises. Fixed quotes. Quality guaranteed. We offer affordable interior design packages in Pune for every budget.</p>
        </div>
        <div className="pricing-grid">
          {PRICING_PLANS.map((plan) => (
            <div className={`pc reveal${plan.featured ? ' featured' : ''}`} key={plan.id}>
              {plan.badge && <div className="pop-badge">{plan.badge}</div>}
              <div className="plan-id"></div>
              <div style={{ fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(201,169,110,0.6)', marginBottom: 8 }}>{plan.name}</div>
              <div className="plan-price"><span>Starting</span><br />{plan.price}</div>
              <div className="plan-unit">{plan.unit}</div>
              <ul className="plan-feats">
                {plan.features.map((f, i) => (
                  <li key={i} className={f.on ? '' : 'off'}>
                    {f.on ? <Check size={14} strokeWidth={2.5} /> : <X size={14} strokeWidth={2.5} />}
                    {f.text}
                  </li>
                ))}
              </ul>
              <a href="#cta-section" className={`btn ${plan.featured ? 'btn-gold' : 'btn-outline'}`} style={{ width: '100%', justifyContent: 'center' }}>
                Get Quote →
              </a>
              <p style={{ fontSize: '9px', color: 'rgba(232, 224, 212, 0.35)', marginTop: '16px', fontStyle: 'italic', lineHeight: '1.4', textAlign: 'center' }}>
                * Pricing may vary depending on project scope, services, and specific requirements.
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Testimonials() {
  const [index, setIndex] = useState(TESTIMONIALS.length * 5)
  const [containerWidth, setContainerWidth] = useState(0)
  const carousel = useRef()
  const intervalRef = useRef(null)

  const total = TESTIMONIALS.length
  const items = Array(10).fill(TESTIMONIALS).flat()

  useEffect(() => {
    const handleResize = () => {
      if (carousel.current) {
        setContainerWidth(carousel.current.offsetWidth)
      }
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const startAutoSlide = () => {
    stopAutoSlide()
    intervalRef.current = setInterval(() => {
      setIndex(prev => prev + 1)
    }, 4000)
  }

  const stopAutoSlide = () => {
    if (intervalRef.current) clearInterval(intervalRef.current)
  }

  useEffect(() => {
    startAutoSlide()
    return () => stopAutoSlide()
  }, [])

  const [transition, setTransition] = useState({ type: 'spring', damping: 30, stiffness: 100 })

  useEffect(() => {
    if (index >= total * 9) {
      setTransition({ duration: 0 })
      setIndex(total * 4)
      setTimeout(() => setTransition({ type: 'spring', damping: 30, stiffness: 100 }), 50)
    } else if (index <= total) {
      setTransition({ duration: 0 })
      setIndex(total * 5)
      setTimeout(() => setTransition({ type: 'spring', damping: 30, stiffness: 100 }), 50)
    }
  }, [index, total])

  const handleNext = () => {
    stopAutoSlide()
    setTransition({ type: 'spring', damping: 30, stiffness: 100 })
    setIndex(prev => prev + 1)
    startAutoSlide()
  }

  const handlePrev = () => {
    stopAutoSlide()
    setTransition({ type: 'spring', damping: 30, stiffness: 100 })
    setIndex(prev => prev - 1)
    startAutoSlide()
  }

  const getX = () => {
    if (typeof window === 'undefined') return 0
    const isMobile = window.innerWidth <= 768
    const cardW = isMobile ? window.innerWidth : 440
    const gap = isMobile ? 0 : 24
    const step = cardW + gap

    const offset = isMobile ? 0 : (containerWidth / 2) - (cardW / 2)
    return offset - (index * step)
  }

  return (
    <section id="testimonials" className="section" style={{ background: '#000000', overflow: 'hidden' }}>
      <div className="container">
        <div className="reveal" style={{ textAlign: 'center', maxWidth: 740, margin: '0 auto 60px' }}>
          <h2 className="heading">What Pune Homeowners Say About Our <em>Interior Design Services</em></h2>
          <div className="divider" style={{ margin: '18px auto 20px' }} />
        </div>

        <div className="carousel-wrapper">
          <motion.div ref={carousel} className="test-carousel" onMouseEnter={stopAutoSlide} onMouseLeave={startAutoSlide}>
            <motion.div
              drag="x"
              dragConstraints={{ left: getX() - 1, right: getX() + 1 }}
              onDragEnd={(e, { offset, velocity }) => {
                const swipeThreshold = 50
                if (offset.x < -swipeThreshold) handleNext()
                else if (offset.x > swipeThreshold) handlePrev()
              }}
              animate={{ x: getX() }}
              transition={transition}
              className="test-inner"
            >
              {items.map((t, i) => {
                return (
                  <div
                    className="tc"
                    key={i}
                    style={{
                      width: 'var(--card-width)',
                      flexShrink: 0,
                      opacity: 1,
                      scale: 1,
                      background: '#000000',
                      borderColor: 'rgba(201, 169, 110, 0.2)',
                      boxShadow: '0 10px 30px rgba(0,0,0,0.4)',
                      transition: 'all 0.4s ease',
                      cursor: 'grab'
                    }}
                  >
                    <div className="stars">★★★★★</div>
                    <p className="tc-text" style={{ color: 'rgba(232, 224, 212, 0.95)', fontWeight: 400 }}>&ldquo;{t.text}&rdquo;</p>
                    <div className="tc-author">
                      <div className="tc-av">{t.initials}</div>
                      <div>
                        <div className="tc-name">{t.name}</div>
                        <div className="tc-loc">{t.loc}</div>
                      </div>
                      <span className="v-badge">VERIFIED</span>
                    </div>
                  </div>
                )
              })}
            </motion.div>
          </motion.div>

          <div className="test-nav-arrows">
            <button className="test-nav-btn prev" onClick={handlePrev} aria-label="Previous">
              <ChevronLeft size={20} />
            </button>
            <button className="test-nav-btn next" onClick={handleNext} aria-label="Next">
              <ChevronRight size={20} />
            </button>
          </div>

          <div className="dots-container">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                className={`dot ${index % total === i ? 'active' : ''}`}
                onClick={() => {
                  stopAutoSlide()
                  setIndex(Math.floor(index / total) * total + i)
                  startAutoSlide()
                }}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .carousel-wrapper {
          position: relative;
          width: 100%;
          --card-width: 440px;
          --gap: 24px;
        }
        .test-carousel {
          overflow: visible;
        }
        .test-inner {
          display: flex;
          gap: var(--gap);
          padding: 40px 0;
        }
        .tc {
          padding: 30px;
          border: 1px solid;
          border-radius: 0;
          position: relative;
        }
        .dots-container {
          display: flex;
          justify-content: center;
          gap: 12px;
          margin-top: 30px;
        }
        .dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: rgba(201, 169, 110, 0.2);
          border: none;
          cursor: pointer;
          padding: 0;
          transition: all 0.3s ease;
        }
        .dot.active {
          background: var(--gold);
          transform: scale(1.2);
        }
        .test-nav-arrows {
          position: absolute;
          top: 50%;
          left: -140px;
          right: -140px;
          transform: translateY(-50%);
          display: flex;
          justify-content: space-between;
          pointer-events: none;
          z-index: 20;
        }
        .test-nav-btn {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: #000000;
          border: 1px solid rgba(201, 169, 110, 0.2);
          color: var(--gold);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          pointer-events: auto;
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(0,0,0,0.4);
        }
        .test-nav-btn:hover {
          background: var(--gold);
          color: #000000;
          border-color: var(--gold);
          transform: scale(1.1);
        }
        @media (max-width: 1280px) {
          .test-nav-arrows {
            left: 10px;
            right: 10px;
          }
          .test-nav-btn {
            background: rgba(8, 8, 15, 0.9);
          }
        }
        @media (max-width: 768px) {
          .carousel-wrapper {
            --card-width: 100vw;
            --gap: 0px;
          }
          .test-inner { padding: 20px 0; }
          .tc { 
            padding: 24px; 
            border-left: none;
            border-right: none;
          }
          .dots-container { margin-top: 20px; }
          .test-nav-btn {
            width: 36px;
            height: 36px;
          }
          .test-nav-arrows {
            left: 5px;
            right: 5px;
          }
        }
      `}</style>
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
    <section id="cta-section" className="section" style={{ background: '#000000' }}>
      <div className="container">
        <div className="cta-wrap reveal">
          <div className="cta-left">
            {/* <div className="cta-id">CTA_SECTION · BOOK_NOW</div> */}
            <h2 className="heading">Ready to Transform Your Space with <em>Pune&apos;s Best Interior Designers?</em></h2>
            <p className="subtext" style={{ marginTop: 14 }}>
              Book your free site visit today. Our professional interior designers near you will visit your home, understand your vision, and present design concepts within 5 working days.
            </p>
            <div className="cta-offers">
              {[
                'Free site visit & measurement',
                'No-obligation 3D design concepts',
                'Fixed-price transparent quotation from reliable interior contractors in Pune'
              ].map((o, i) => (
                <div className="cta-oi" key={i}>
                  <div className="cta-ic">
                    <Check size={14} color="#C9A96E" strokeWidth={2.5} />
                  </div>
                  {o}
                </div>
              ))}
            </div>
            <div className="cta-btns">
              <a href="tel:+919822998986" className="btn btn-gold">Call Now →</a>
              <a href="https://wa.me/919822998986?text=Hi%20AR%20Interiors,%20I'm%20interested%20in%20a%20free%20design%20consultation." className="btn btn-wa" target="_blank" rel="noopener noreferrer">WhatsApp</a>
            </div>
          </div>
          <div className="cta-right">
            <h3>Book Your Free Visit</h3>
            <p className="sub">We call back within 2 hours</p>
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
                <div style={{ padding: '12px', background: 'rgba(100,180,100,0.85)', color: '#000000', fontSize: 12, fontWeight: 600 }}>{formStatus}</div>
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
    <section id="faq" className="section" style={{ background: '#000000' }}>
      <div className="container">
        <div className="reveal" style={{ textAlign: 'center', maxWidth: 740, margin: '0 auto' }}>

          <h2 className="heading">Common Questions About Our <em>Interior Design Services</em> in Pune</h2>
          <div className="divider" style={{ margin: '18px auto 20px' }} />
        </div>
        <div className="faq-grid">
          {FAQS.map((f, i) => (
            <div className="faq-item reveal" key={i}>
              <button className={`faq-q${openIdx === i ? ' open' : ''}`} onClick={() => setOpenIdx(openIdx === i ? null : i)}>
                {f.q}
                <div className="faq-ic">
                  {openIdx === i ? <X size={10} strokeWidth={3} /> : <Plus size={10} strokeWidth={3} />}
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

// ─── PAGE ─────────────────────────────────────────────────────────────
export default function Home() {
  const [isFormOpen, setIsFormOpen] = useState(true)
  useReveal()
  useCountUp()
  useParticles()

  return (
    <>
      <FloatingActions isFormOpen={isFormOpen} setIsFormOpen={setIsFormOpen} />
      <Navbar />
      <main>
        <Hero isFormOpen={isFormOpen} setIsFormOpen={setIsFormOpen} />
        <TrustBar />
        <About />

        <USP />
        <Gallery />
        <Partners />
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