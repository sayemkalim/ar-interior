'use client'

import { useEffect, useRef, useState } from 'react'
import {
  ArrowRight, Sofa, CookingPot, Bed, Building2, ShowerHead, UtensilsCrossed,
  Layers, Home as HomeIcon, Shield, Check, X, Plus, Phone, Star, ChevronDown,
  MessageCircle, Clock, Award, DollarSign, UserCheck, Eye,
  Sparkles, CircleCheck, CircleDot, MapPin, Mail,
  Box, Cpu, Droplet, Wind, Zap, Frame, Globe, Monitor, Tv, Video
} from 'lucide-react'
import { FaInstagram, FaFacebookF, FaYoutube, FaLinkedinIn } from 'react-icons/fa6'
import { motion } from 'framer-motion'

// ─── ICON MAP ────────────────────────────────────────────────────────
const SERVICE_ICONS = {
  '01': Sofa,
  '02': CookingPot,
  '03': Bed,
  '04': Building2,
  '05': ShowerHead,
  '06': UtensilsCrossed,
  '07': Layers,
  '08': HomeIcon,
  '09': Wind,
  '10': Monitor,
}

// ─── DATA ───────────────────────────────────────────────────────────
const NAV_LINKS = [
  { href: '#about', label: 'About' },
  { href: '/services', label: 'Services' },
  { href: '/blogs', label: 'Blogs' },
  { href: '#gallery', label: 'Gallery' },
  { href: '#process', label: 'Process' },
  { href: '#pricing', label: 'Pricing' },
  { href: '#testimonials', label: 'Reviews' },
  { href: '#faq', label: 'FAQ' },
]

const SERVICES = [
  { num: '01', title: 'Living Room Interior Design Pune', desc: 'Elegant, personalized spaces designed to match your lifestyle.', tag: 'RESIDENTIAL' },
  { num: '02', title: 'Modular Kitchen Designers Pune', desc: 'Stylish and highly functional kitchens for modern living.', tag: 'MODULAR' },
  { num: '03', title: 'Bedroom Interior Designers Pune', desc: 'Calm, refined spaces crafted for comfort and relaxation.', tag: 'RESIDENTIAL' },
  { num: '04', title: 'Office Interiors', desc: 'Smart, productive workspaces that align with your brand identity.', tag: 'COMMERCIAL' },
  { num: '05', title: 'Bathroom Design', desc: 'Premium, well-designed bathrooms with modern fixtures and efficient storage.', tag: 'RESIDENTIAL' },
  { num: '06', title: 'Dining Room', desc: 'Thoughtfully designed spaces that make every meal special.', tag: 'RESIDENTIAL' },
  { num: '07', title: 'False Ceiling', desc: 'Innovative ceiling designs that enhance the look of every room.', tag: 'SPECIALTY' },
  { num: '08', title: 'Full Home Design', desc: 'Complete interior solutions in Pune with a seamless, unified approach.', tag: 'COMPLETE' },
  { num: '09', title: 'Terrace Design', desc: 'Cozy, well-finished terraces with outdoor seating, BBQ decks, and penthouse styling.', tag: 'SPECIALTY' },
  { num: '10', title: 'Home Theater', desc: 'Sleek, soundproof home theaters with an immersive audio-visual experience.', tag: 'LUXURY' },
]

const USP_PANELS = [
  { id: 'USP_01', title: '10-Year Structural Warranty', desc: 'Every piece of woodwork is backed by a decade-long warranty, documented in your handover certificate. No fine print.', fill: 100 },
  { id: 'USP_02', title: 'Transparent Pricing & Interior Design Packages', desc: 'No hidden costs. Our interior design packages in Pune come with itemized, fixed-price quotations. What we quote is what you pay.', fill: 95 },
  { id: 'USP_03', title: 'Dedicated Project Manager', desc: 'A single point of contact throughout your project from design consultation to final handover.', fill: 90 },
  { id: 'USP_04', title: 'Labour Safety', desc: 'As trusted interior contractors in Pune, we follow strict on-site safety protocols, with a fully trained and insured workforce.', fill: 98 },
  { id: 'USP_05', title: 'Garbage is our responsibility', desc: 'We ensure all debris generated during the project is cleared and taken away by our team, keeping your space clean and hassle-free.', fill: 100 },
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
      { text: 'Modular kitchen + wardrobes', on: true },
      { text: 'False ceiling in living & master bedroom', on: true },
      { text: 'Premium laminate finish', on: true },
      { text: 'Dedicated project manager', on: true },
      { text: 'Custom furniture pieces', on: true },
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
      { text: 'Complete home interior design', on: true },
      { text: 'Custom furniture & joinery', on: true },
      { text: 'Premium Italian laminates', on: true },
      { text: 'Dedicated project manager', on: true },
      { text: 'Lighting design & installation', on: true },
      { text: 'Smart home integration', on: true },
    ],
    featured: true,
  },
  {
    id: 'PLAN_03',
    name: 'Luxury — Modern Home Interiors Pune',
    price: '₹30 Lakh',
    unit: 'onwards',
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
          <a href="tel:+919XXXXXXXXX" className="nav-phone">+91 9X-XXXX-XXXX</a>
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

      {/* Isometric Room Wireframe Background */}
      <div className="hero-visual">
        <div className="room-wireframe">
          <svg viewBox="0 0 700 500" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Floor */}
            <polygon points="50,320 350,480 650,320 350,160" fill="rgba(201,169,110,0.05)" stroke="rgba(201,169,110,0.35)" strokeWidth="1" />
            {/* Floor grid lines */}
            <line x1="150" y1="267" x2="550" y2="267" stroke="rgba(201,169,110,0.15)" strokeWidth="0.6" />
            <line x1="50" y1="320" x2="650" y2="320" stroke="rgba(201,169,110,0.15)" strokeWidth="0.6" />
            <line x1="200" y1="374" x2="500" y2="214" stroke="rgba(201,169,110,0.12)" strokeWidth="0.6" />
            <line x1="350" y1="160" x2="350" y2="480" stroke="rgba(201,169,110,0.12)" strokeWidth="0.6" />
            <line x1="250" y1="107" x2="250" y2="427" stroke="rgba(201,169,110,0.08)" strokeWidth="0.6" />
            <line x1="450" y1="107" x2="450" y2="427" stroke="rgba(201,169,110,0.08)" strokeWidth="0.6" />
            {/* Left wall */}
            <polygon points="50,60 50,320 350,480 350,220" fill="rgba(201,169,110,0.04)" stroke="rgba(201,169,110,0.3)" strokeWidth="1" />
            {/* Left wall panels */}
            <line x1="50" y1="130" x2="350" y2="290" stroke="rgba(201,169,110,0.18)" strokeWidth="0.6" />
            <line x1="50" y1="200" x2="350" y2="360" stroke="rgba(201,169,110,0.18)" strokeWidth="0.6" />
            <line x1="50" y1="270" x2="350" y2="430" stroke="rgba(201,169,110,0.18)" strokeWidth="0.6" />
            <line x1="150" y1="60" x2="150" y2="320" stroke="rgba(201,169,110,0.1)" strokeWidth="0.6" />
            <line x1="250" y1="60" x2="250" y2="320" stroke="rgba(201,169,110,0.1)" strokeWidth="0.6" />
            {/* Right wall */}
            <polygon points="350,220 650,60 650,320 350,480" fill="rgba(201,169,110,0.03)" stroke="rgba(201,169,110,0.25)" strokeWidth="1" />
            {/* Right wall panels */}
            <line x1="350" y1="290" x2="650" y2="130" stroke="rgba(201,169,110,0.15)" strokeWidth="0.6" />
            <line x1="350" y1="360" x2="650" y2="200" stroke="rgba(201,169,110,0.15)" strokeWidth="0.6" />
            <line x1="450" y1="220" x2="450" y2="480" stroke="rgba(201,169,110,0.1)" strokeWidth="0.6" />
            <line x1="550" y1="220" x2="550" y2="480" stroke="rgba(201,169,110,0.1)" strokeWidth="0.6" />
            {/* Sofa wireframe */}
            <polygon points="160,340 280,400 340,370 220,310" fill="rgba(201,169,110,0.1)" stroke="rgba(201,169,110,0.5)" strokeWidth="1.2" />
            <polygon points="160,310 280,370 280,400 160,340" fill="rgba(201,169,110,0.08)" stroke="rgba(201,169,110,0.4)" strokeWidth="1" />
            <polygon points="160,310 280,370 340,345 220,285" fill="rgba(201,169,110,0.12)" stroke="rgba(201,169,110,0.45)" strokeWidth="1" />
            <polygon points="160,340 280,400 340,370 220,310" fill="none" stroke="rgba(201,169,110,0.8)" strokeWidth="0.5" filter="url(#glow)" />
            {/* Coffee table */}
            <polygon points="260,370 330,405 380,382 310,347" fill="rgba(201,169,110,0.1)" stroke="rgba(201,169,110,0.45)" strokeWidth="1" />
            <line x1="260" y1="370" x2="265" y2="390" stroke="rgba(201,169,110,0.4)" strokeWidth="0.8" />
            <line x1="380" y1="382" x2="385" y2="402" stroke="rgba(201,169,110,0.4)" strokeWidth="0.8" />
            {/* Floor lamp */}
            <line x1="490" y1="200" x2="500" y2="360" stroke="rgba(201,169,110,0.4)" strokeWidth="1.2" />
            <ellipse cx="495" cy="200" rx="18" ry="8" fill="none" stroke="rgba(201,169,110,0.5)" strokeWidth="1" />
            <circle cx="495" cy="200" r="30" fill="none" stroke="rgba(201,169,110,0.08)" strokeWidth="1" />
            <circle cx="495" cy="200" r="50" fill="none" stroke="rgba(201,169,110,0.04)" strokeWidth="1" />
            {/* Window */}
            <polygon points="350,60 470,0 470,160 350,220" fill="rgba(100,160,255,0.04)" stroke="rgba(201,169,110,0.2)" strokeWidth="1" />
            <line x1="410" y1="30" x2="410" y2="190" stroke="rgba(201,169,110,0.12)" strokeWidth="0.8" />
            <line x1="350" y1="140" x2="470" y2="80" stroke="rgba(201,169,110,0.12)" strokeWidth="0.8" />
            {/* Plant */}
            <line x1="105" y1="190" x2="112" y2="280" stroke="rgba(201,169,110,0.3)" strokeWidth="1.2" />
            <circle cx="108" cy="185" r="22" fill="rgba(100,180,100,0.05)" stroke="rgba(100,200,100,0.2)" strokeWidth="1" />
            <circle cx="90" cy="198" r="14" fill="none" stroke="rgba(100,200,100,0.15)" strokeWidth="1" />
            <circle cx="125" cy="195" r="14" fill="none" stroke="rgba(100,200,100,0.15)" strokeWidth="1" />
            {/* Ceiling light */}
            <line x1="350" y1="0" x2="350" y2="60" stroke="rgba(201,169,110,0.2)" strokeWidth="1" />
            <circle cx="350" cy="60" r="8" fill="none" stroke="rgba(201,169,110,0.4)" strokeWidth="1" />
            <circle cx="350" cy="60" r="20" fill="none" stroke="rgba(201,169,110,0.12)" strokeWidth="0.8" />
            <line x1="350" y1="70" x2="200" y2="220" stroke="rgba(201,169,110,0.05)" strokeWidth="0.5" />
            <line x1="350" y1="70" x2="500" y2="220" stroke="rgba(201,169,110,0.05)" strokeWidth="0.5" />
            <line x1="350" y1="70" x2="350" y2="350" stroke="rgba(201,169,110,0.04)" strokeWidth="0.5" />
            {/* Art frame */}
            <polygon points="510,115 580,80 580,155 510,190" fill="rgba(201,169,110,0.03)" stroke="rgba(201,169,110,0.2)" strokeWidth="0.8" />
            {/* Measurement lines */}
            <line x1="50" y1="40" x2="350" y2="200" stroke="rgba(201,169,110,0.08)" strokeWidth="0.5" strokeDasharray="4,6" />
            <circle cx="50" cy="40" r="2" fill="rgba(201,169,110,0.4)" />
            <circle cx="350" cy="200" r="2" fill="rgba(201,169,110,0.4)" />
            <line x1="650" y1="40" x2="350" y2="200" stroke="rgba(201,169,110,0.08)" strokeWidth="0.5" strokeDasharray="4,6" />
            <circle cx="650" cy="40" r="2" fill="rgba(201,169,110,0.4)" />
            {/* Labels */}
            <text x="62" y="36" fontSize="8" fill="rgba(201,169,110,0.5)" fontFamily="monospace" letterSpacing="0.5">3.2m</text>
            <text x="656" y="36" fontSize="8" fill="rgba(201,169,110,0.5)" fontFamily="monospace" letterSpacing="0.5">3.2m</text>
            <text x="356" y="56" fontSize="8" fill="rgba(201,169,110,0.5)" fontFamily="monospace" letterSpacing="0.5">2.8m</text>
            <text x="195" y="315" fontSize="7" fill="rgba(201,169,110,0.4)" fontFamily="monospace">SOFA_01</text>
            <text x="265" y="353" fontSize="7" fill="rgba(201,169,110,0.4)" fontFamily="monospace">TABLE_01</text>
            <text x="472" y="198" fontSize="7" fill="rgba(201,169,110,0.4)" fontFamily="monospace">LAMP_01</text>
            {/* Corner dots */}
            <circle cx="50" cy="60" r="3" fill="rgba(201,169,110,0.6)" />
            <circle cx="50" cy="320" r="3" fill="rgba(201,169,110,0.6)" />
            <circle cx="350" cy="480" r="3" fill="rgba(201,169,110,0.6)" />
            <circle cx="650" cy="320" r="3" fill="rgba(201,169,110,0.6)" />
            <circle cx="350" cy="160" r="3" fill="rgba(201,169,110,0.6)" />
            <circle cx="650" cy="60" r="3" fill="rgba(201,169,110,0.6)" />
            {/* Animated scan dot */}
            <circle r="3" fill="rgba(201,169,110,0.8)">
              <animateMotion dur="6s" repeatCount="indefinite" path="M50,320 L350,160 L650,320 L350,480 Z" />
            </circle>
            {/* Glow filter */}
            <defs>
              <filter id="glow">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
          </svg>
        </div>
      </div>

      {/* LEFT CONTENT */}
      <div className="hero-content">
        <div className="hero-inner">
          <div className="hero-badge">
            <span className="badge-pulse" />
            A R INTERIORS — BEST INTERIOR DESIGNERS IN PUNE SINCE 2012
          </div>
          <h1 className="hero-title">
            <span className="title-line"><span className="title-line-inner">Design Spaces</span></span>
            <span className="title-line"><span className="title-line-inner">That <em>Tell Your Story</em></span></span>
          </h1>
          <p className="hero-body reveal">
            Pune&apos;s most trusted home interior design services studio. We have transformed 850+ homes across Pune from compact 1 BHKs to sprawling bungalows with modern, functional, and beautiful interiors.
          </p>

          <div className="hero-stats-bar reveal">
            <div className="hsb-item">
              <span className="hsb-num">500+</span>
              <span className="hsb-lbl">PROJECTS</span>
            </div>
            <div className="hsb-sep" />
            <div className="hsb-item">
              <span className="hsb-num">12+</span>
              <span className="hsb-lbl">EXPERIENCE</span>
            </div>
            <div className="hsb-sep" />
            <div className="hsb-item">
              <span className="hsb-num">94%</span>
              <span className="hsb-lbl">SATISFACTION</span>
            </div>
          </div>

          <div className="hero-btns reveal">
            <a href="#cta-section" className="btn btn-gold">
              <ArrowRight size={14} strokeWidth={2.5} />
              GET FREE ESTIMATE
            </a>
            <a href="#gallery" className="btn btn-outline">VIEW PORTFOLIO</a>
          </div>
        </div>
        <div className="scroll-cue" onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}>
          <span>SCROLL</span>
          <div className="scroll-mouse">
            <div className="scroll-dot" />
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
        <p className="form-sub">// No obligation. Free site visit included.</p>
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
            <div style={{ padding: '12px 15px', background: 'rgba(100,180,100,0.85)', color: '#050508', fontSize: 12, fontWeight: 600, borderRadius: 1 }}>{formStatus}</div>
          ) : (
            <button type="submit" className="btn btn-gold" style={{ width: '100%', justifyContent: 'center' }}>
              BOOK FREE SITE VISIT →
            </button>
          )}
        </form>
        <div className="form-sep">// OR //</div>
        <a href="https://wa.me/919XXXXXXXXX" className="btn btn-wa" target="_blank" rel="noopener noreferrer" style={{ width: '100%', justifyContent: 'center' }}>
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
    '✦ 850+ Projects Completed', '✦ 45-Day Delivery Guaranteed', '✦ 10-Year Woodwork Warranty',
    '✦ Free Site Visit', '✦ Transparent Pricing', '✦ 12 Years Experience', '✦ 94% Client Satisfaction',
    '✦ 850+ Projects Completed', '✦ 45-Day Delivery Guaranteed', '✦ 10-Year Woodwork Warranty',
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

function Services() {
  return (
    <section id="services" className="section">
      <div className="container">
        <div className="reveal" style={{ textAlign: 'center', maxWidth: 640, margin: '0 auto 60px' }}>
          <span className="label">// SERVICES.ARRAY</span>
          <h2 className="heading">What We <em>Design</em></h2>
          <div className="divider" style={{ margin: '18px auto 20px' }} />
          <p className="subtext" style={{ margin: '0 auto' }}>
            From modular kitchen designers in Pune to complete home transformations - every space, crafted with precision.
          </p>
        </div>
        <div className="services-grid">
          {SERVICES.map((s) => (
            <div className="sc" key={s.num}>
              <span className="sc-num">{s.num}</span>
              <div className="sc-icon">
                {(() => { const Icon = SERVICE_ICONS[s.num]; return <Icon size={20} /> })()}
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
            <span className="label">// ABOUT A R INTERIORS</span>
            <h2 className="heading">12 Years of <em>Crafting</em> Dream Homes in Pune</h2>
            <div className="divider" />
            <p className="subtext">
              A R Interiors is Pune&apos;s most trusted name in home interior design services. Since 2012, our team of 35+ designers, project managers, and skilled craftsmen has delivered modern home interiors in Pune across 850+ projects from compact 2 and 3 BHK apartments to expansive villas.
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
                { num: '45', suffix: 'd', label: 'Fast Delivery' },
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
        <div className="reveal" style={{ textAlign: 'center', maxWidth: 640, margin: '0 auto' }}>
          <span className="label">// WHY.AR_INTERIORS</span>
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
              className={`gi${item.wide ? ' gi-wide' : ''}`}
              data-cat={item.cat}
              style={{
                opacity: activeFilter === 'all' || activeFilter === item.cat ? 1 : 0.15,
                transform: activeFilter === 'all' || activeFilter === item.cat ? 'scale(1)' : 'scale(0.97)',
                transition: 'all 0.4s ease',
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
    <section id="partners" className="section" style={{ background: '#050508', overflow: 'hidden', padding: '40px 0' }}>
      <div className="container">
        <div className="reveal" style={{ textAlign: 'center', maxWidth: 640, margin: '0 auto 40px' }}>
          <span className="label">// BRAND.ECOSYSTEM</span>
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
    <section id="process" className="section" style={{ background: 'var(--obsidian, #07070d)', padding: '120px 0' }}>
      <div className="container">
        <div className="reveal" style={{ textAlign: 'center', maxWidth: 740, margin: '0 auto', marginBottom: 80 }}>
          <span className="label" style={{ fontSize: 10, letterSpacing: '2px', color: 'var(--gold)', marginBottom: 16 }}>// WORKFLOW.STEPS</span>
          <h2 className="heading" style={{ fontSize: '48px', marginBottom: 24 }}>Your Journey With the <em>Best Interior Designers</em> in Pune - Step by Step</h2>
          <p style={{ color: 'rgba(232, 224, 212, 0.6)', fontSize: 16 }}>Clear, stress-free home interior design services from the first call to the final walkthrough.</p>
        </div>
        <div className="process-horiz">
          {steps.map((s, i) => (
            <div className="ph-step reveal" key={i} style={{ transitionDelay: `${i * 0.15}s` }}>
              <div className="ph-circle">{s.num}</div>
              <div className="ph-tag">{s.tag}</div>
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
          background: #07070d;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Playfair Display', serif;
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
          font-family: 'DM Sans', sans-serif;
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
    <section id="pricing" className="section">
      <div className="container">
        <div className="reveal" style={{ textAlign: 'center', maxWidth: 640, margin: '0 auto 60px' }}>
          <span className="label">// PRICING.CONFIG</span>
          <h2 className="heading">Transparent Interior Design <em>Packages</em> in Pune</h2>
          <div className="divider" style={{ margin: '18px auto 20px' }} />
          <p className="subtext" style={{ margin: '0 auto' }}>No surprises. Fixed quotes. Quality guaranteed. We offer affordable interior design packages in Pune for every budget.</p>
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
                    {f.on ? <Check size={14} strokeWidth={2.5} /> : <X size={14} strokeWidth={2.5} />}
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
        <div className="reveal" style={{ textAlign: 'center', maxWidth: 740, margin: '0 auto' }}>
          <span className="label">// CLIENT.REVIEWS</span>
          <h2 className="heading">What Pune Homeowners Say About Our <em>Interior Design Services</em></h2>
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
      <style>{`
        @media (max-width: 1024px) {
          .test-grid {
            display: flex !important;
            overflow-x: auto !important;
            scroll-snap-type: x mandatory !important;
            -webkit-overflow-scrolling: touch !important;
            flex-wrap: nowrap !important;
            gap: 16px !important;
            padding-bottom: 24px !important;
            scrollbar-width: none;
          }
          .test-grid::-webkit-scrollbar {
            display: none !important;
          }
          .tc {
            flex: 0 0 85% !important;
            scroll-snap-align: center !important;
            min-width: 280px;
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
    <section id="cta-section" className="section">
      <div className="container">
        <div className="cta-wrap reveal">
          <div className="cta-left">
            <div className="cta-id">CTA_SECTION · BOOK_NOW</div>
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
        <div className="reveal" style={{ textAlign: 'center', maxWidth: 740, margin: '0 auto' }}>
          <span className="label">// FAQ.DATABASE</span>
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
            <p className="footer-desc">Pune&apos;s most trusted interior design studio. 850+ projects. 12 years. 45-day delivery guaranteed.</p>
            <div className="fsocial">
              {[
                { icon: FaInstagram, label: 'Instagram' },
                { icon: FaFacebookF, label: 'Facebook' },
                { icon: FaYoutube, label: 'Youtube' },
                { icon: FaLinkedinIn, label: 'Linkedin' }
              ].map((s, i) => (
                <a key={i} href="#" className="fsb" aria-label={s.label}>
                  <s.icon size={16} />
                </a>
              ))}
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

function FloatingActions({ isFormOpen, setIsFormOpen }) {
  return (
    <div className="floating-actions">
      <a href="https://wa.me/919XXXXXXXXX" className="swa" target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp">
        <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
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
        <Services />
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