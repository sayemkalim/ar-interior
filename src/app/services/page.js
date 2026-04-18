'use client'

import React, { useState, useEffect } from 'react'
import { 
  ArrowRight, Shield, Check, Phone, Mail, 
  Layout, Home as HomeIcon, Package, Coffee, 
  Briefcase, Star, Search, Plus, X 
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

// ─── SHARED DATA ──────────────────────────────────────────────────────

const NAV_LINKS = [
  { href: '/#about', label: 'About' },
  { href: '/services', label: 'Services' },
  { href: '/blogs', label: 'Blogs' },
  { href: '/#gallery', label: 'Gallery' },
  { href: '/#process', label: 'Process' },
  { href: '/#pricing', label: 'Pricing' },
  { href: '/#testimonials', label: 'Reviews' },
  { href: '/#faq', label: 'FAQ' },
]

// ─── SERVICES DATA ───────────────────────────────────────────────────

const DETAILED_SERVICES = [
  {
    id: 'living-room',
    title: 'Living Room Masterpieces',
    subtitle: 'Where Elegance Meets Comfort',
    desc: 'The heart of your home deserves a design that speaks volumes. We create living spaces that balance aesthetics with family-centric comfort, using premium materials and lighting architectures.',
    features: ['Custom TV Units & Paneling', 'Ambient & Statement Lighting', 'Ergonomic Furniture Layout', 'Premium Wall Textures'],
    image: '/livingroom.jpg',
    fullDesc: 'Your living room is the showcase of your home, setting the tone for your entire living space. Our approach to living room design is rooted in the belief that these spaces must be both stunningly beautiful and supremely livable. We go beyond simply placing furniture; we craft holistic environments. We design custom feature walls that might include integrated modern fireplaces, bespoke shelving, or seamless TV units with hidden cable management.',
    benefits: [
      'Tailored layouts that maximize your specific room dimensions and family needs.',
      'Sourcing of exclusive, high-end furniture pieces and decor that elevate the space.',
      'Expert color paletting to create the exact mood and atmosphere you desire.'
    ]
  },
  {
    id: 'modular-kitchen',
    title: 'Smart Modular Kitchens',
    subtitle: 'Precision Engineering for Your Culinary Journey',
    desc: 'Transform your cooking experience with our German-engineered modular kitchens. We prioritize workflow efficiency, high-grade hardware, and heat-resistant finishes.',
    features: ['Heat & Water Resistant Materials', 'Soft-close Blum Hardware', 'Intelligent Larder Units', 'Anti-scratch Acrylic Finishes'],
    image: '/modularkitchen.jpg',
    fullDesc: 'We believe the kitchen is more than a place to cook; it’s a space where precision engineering meets daily life. Our modular kitchens are built on the principles of ergonomic efficiency and enduring quality. We deeply analyze your cooking habits to design the layout—optimizing the classic "work triangle" to minimize wasted movement. Our material selection focuses on combining striking aesthetics with extreme durability.',
    benefits: [
      'Ergonomically designed workflows to make cooking more enjoyable and less tiring.',
      'Maximized storage solutions tailored to your specific utensils and pantry items.',
      'Long-lasting durability ensuring your investment looks and functions flawlessly.'
    ]
  },
  {
    id: 'master-bedroom',
    title: 'Serene Master Bedrooms',
    subtitle: 'Your Personal Sanctuary',
    desc: 'Retreat to a space designed for deep rest. Our bedroom designs focus on tranquility, clutter-free wardrobes, and luxury bedding textures.',
    features: ['Walk-in Closets & Wardrobes', 'Upholstered Designer Headboards', 'Integrated Bedside Control', 'Acoustic Soundproofing'],
    image: '/masterbedroom.jpg',
    fullDesc: 'Your master bedroom should be an absolute sanctuary—a retreat from the world designed specifically for relaxation and rejuvenation. Our design philosophy here centers on creating a calming, restorative atmosphere. We pay meticulous attention to acoustics, employing sound-dampening materials. We design custom walk-in closets or built-in wardrobes that not only look elegant but are highly functional.',
    benefits: [
      'A deeply relaxing environment scientifically proven to improve sleep quality.',
      'Highly organized, bespoke storage solutions that eliminate daily stress.',
      'A personalized aesthetic that reflects your unique taste in a private setting.'
    ]
  },
  {
    id: 'office-interior',
    title: 'High-Performance Offices',
    subtitle: 'Efficiency Redefined',
    desc: 'Commercial spaces that inspire productivity. We blend corporate branding with ergonomic excellence to create workspaces people love to visit.',
    features: ['Ergonomic Task Seating', 'Cable Management Solutions', 'Collaborative Zone Designs', 'Brand-Inspired Aesthetics'],
    image: '/Office.jpg',
    fullDesc: 'We understand that exceptional office design is a strategic business tool. It impacts employee productivity, well-being, and serves as a powerful physical representation of your brand to visiting clients. Our commercial interior design focuses on creating high-performance environments. We balance the need for focused, quiet work zones with vibrant, collaborative areas.',
    benefits: [
      'Increased team productivity through optimized layouts and ergonomic design.',
      'Enhanced employee retention by providing a desirable and healthy workspace.',
      'A strong, professional first impression that reinforces your brand to clients.'
    ]
  },
  {
    id: 'bathroom-design',
    title: 'Luxury Bathroom Remodels',
    subtitle: 'Spa-Like Elegance at Home',
    desc: 'Transform your daily routine into a spa-like experience. We specialize in high-end bathroom renovations featuring premium fixtures and stunning tilework.',
    features: ['Custom Vanities', 'Walk-in Rain Showers', 'Freestanding Soaking Tubs', 'Radiant Floor Heating'],
    image: '/Bathroom.jpg',
    fullDesc: 'We view the modern bathroom as a personal wellness retreat. Our luxury bathroom remodels are designed to evoke the ambiance of a five-star spa. We specialize in significant structural changes to optimize space, often replacing cramped tubs with expansive, curbless walk-in showers featuring rainfall heads and body jets. We utilize premium materials like large-format porcelain slabs or natural stone to create seamless surfaces.',
    benefits: [
      'A daily spa-like experience that significantly enhances your quality of life.',
      'Substantial increase in overall property value—bathrooms are key selling points.',
      'Improved functionality and storage tailored to your specific grooming routines.'
    ]
  },
  {
    id: 'dining-room',
    title: 'Exquisite Dining Rooms',
    subtitle: 'Where Every Meal is an Occasion',
    desc: 'Design beautiful dining spaces that cultivate connection and celebration with breathtaking central tables and ambient statement lighting.',
    features: ['Custom Dining Tables', 'Statement Chandeliers', 'Wine Cellar Integration', 'Flow-Oriented Layouts'],
    image: '/Dinningroom.jpg',
    fullDesc: 'A dining room is the social anchor of a home. We craft dining spaces that balance opulence with welcoming warmth, ensuring every dinner party or family meal feels special. By utilizing striking lighting fixtures to anchor the room perfectly over custom-crafted dining tables, we create a distinct focal point. We also incorporate curated display cabinetry to elegantly showcase premium dishware or bar collections.',
    benefits: [
      'Perfectly scaled dining tables that fit your space and hosting needs seamlessly.',
      'Atmospheric lighting design to adjust from bright brunches to intimate dinners.',
      'Sophisticated material choices that are highly resistant to spills and stains.'
    ]
  },
  {
    id: 'false-ceiling',
    title: 'Architectural False Ceilings',
    subtitle: 'Elevating the Fifth Wall',
    desc: 'Transform plain ceilings into architectural masterpieces. Experience intricate false ceiling designs engineered to enhance both lighting and acoustics.',
    features: ['Intricate Cove Lighting', 'Acoustic Sound Baffling', 'Luxury Drop Chandeliers', 'Climate-Control Concealment'],
    image: '/False Ceiling.jpg',
    fullDesc: 'The ceiling—often called the fifth wall—provides an immense opportunity to impact the feel of a room without utilizing floor space. Our designers specialize in creating dimensional false ceiling structures that intelligently conceal wiring, ductwork, and HVAC systems while delivering stunning visual interest. Integrated, multi-layered warm LED strip lighting highlights elegant geometric or organic ceiling contours, adding dramatic depth.',
    benefits: [
      'Dramatic enhancement of room height perception and architectural depth.',
      'Flawless concealment of all functional services to maintain a pristine aesthetic.',
      'Superior ambient room illumination that flatters skin tones and textures.'
    ]
  },
  {
    id: 'full-home',
    title: 'Full Home Design Transformations',
    subtitle: 'One Vision, Flawless Execution',
    desc: 'Experience pure peace of mind with our turnkey full home design service. From laying out conceptual blueprints to absolute final finishing, we handle it all.',
    features: ['Turnkey Execution', 'Dedicated Project Manager', 'Styling & Art Curation', 'Smart Home Integration'],
    image: '/fullInterior.jpg',
    fullDesc: 'Our flagship full-home service is designed for unmatched convenience and spectacular, cohesive results. We provide comprehensive, end-to-end design and execution for your entire property. Treating your home as a singular canvas ensures consistency of materials, architectural language, and color palettes across all rooms. A dedicated project manager handles everything from initial civil changes to the ultimate styling of art and accessories on handover day.',
    benefits: [
      'A completely cohesive design language that flows perfectly from room to room.',
      'Zero-stress execution with a single point of professional contact.',
      'Absolute control over budget and precisely guaranteed delivery timelines.'
    ]
  }
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

// ─── COMPONENTS ──────────────────────────────────────────────────────

function Navbar() {
  const scrolled = useScrolled()
  const [menuOpen, setMenuOpen] = useState(false)
  const activeAnchor = useActiveAnchor()

  return (
    <nav id="navbar" className={scrolled ? 'scrolled' : ''}>
      <div className="nav-inner">
        <a href="/" className="nav-logo" style={{ textDecoration: 'none' }}>
          <svg width="120" height="40" viewBox="0 0 120 40" fill="none">
            <text x="4" y="28" fontFamily="'Playfair Display', serif" fontSize="22" fontWeight="700" fill="#C9A96E">AR</text>
            <text x="38" y="28" fontFamily="'DM Sans', sans-serif" fontSize="11" fontWeight="600" fill="rgba(232,224,212,0.8)" letterSpacing="3">INTERIORS</text>
            <line x1="4" y1="33" x2="116" y2="33" stroke="rgba(201,169,110,0.3)" strokeWidth="0.5" />
          </svg>
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

function FAQ() {
  const [openIdx, setOpenIdx] = useState(null)
  return (
    <section id="faq" className="section" style={{ background: '#050508' }}>
      <div className="container">
        <div className="reveal" style={{ textAlign: 'center', maxWidth: 740, margin: '0 auto' }}>
          <span className="label">// FAQ.DATABASE</span>
          <h2 className="heading">Common Questions About Our <em>Interior Design Services</em> in Pune</h2>
          <div className="divider" style={{ margin: '18px auto 20px' }} />
        </div>
        <div className="faq-grid" style={{ maxWidth: 800, margin: '60px auto 0' }}>
          {FAQS.map((f, i) => (
            <div className={`faq-item${openIdx === i ? ' open' : ''}`} key={i}>
              <button className="faq-q" onClick={() => setOpenIdx(openIdx === i ? null : i)}>
                {f.q}
                <span>{openIdx === i ? '−' : '+'}</span>
              </button>
              <div className="faq-a">{f.a}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Footer() {
  const currentYear = new Date().getFullYear()
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
              <a href="#" className="fsb" aria-label="Instagram"><FaInstagram size={16} /></a>
              <a href="#" className="fsb" aria-label="Facebook"><FaFacebookF size={15} /></a>
              <a href="#" className="fsb" aria-label="YouTube"><FaYoutube size={17} /></a>
              <a href="#" className="fsb" aria-label="LinkedIn"><FaLinkedinIn size={16} /></a>
            </div>
          </div>
          <div>
            <div className="fh">Services</div>
            <ul className="fl">
              {['Living Room', 'Modular Kitchen', 'Bedroom', 'Office Interiors', 'Full Home Design'].map(l => <li key={l}><a href="/#services">{l}</a></li>)}
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
          <span>© {currentYear} AR Interiors. All rights reserved.</span>
          <span>45-DAY DELIVERY · 10-YEAR WARRANTY · FREE SITE VISIT</span>
        </div>
      </div>
    </footer>
  )
}

// ─── SERVICES PAGE ───────────────────────────────────────────────────

export default function ServicesPage() {
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [selectedService, setSelectedService] = useState(null)
  
  useReveal()

  const openFormForService = (serviceId) => {
    setSelectedService(serviceId)
    setIsFormOpen(true)
  }

  return (
    <div className="services-detailed-page">
      <Navbar />
      <FloatingActions isFormOpen={isFormOpen} setIsFormOpen={setIsFormOpen} />

      {/* Hero Header */}
      <section className="services-hero">
        <div className="container">
          <div className="sh-content reveal">
            <div className="hero-badge">OUR EXPERTISE — PRECISION IN EVERY DETAIL</div>
            <h1 className="hero-title">World-Class <span className="gold-text">Interior Solutions</span></h1>
            <p className="hero-sub">From concept to reality, we deliver masterpieces that stand the test of time.</p>
          </div>
        </div>
      </section>

      {/* Detailed Services Sections (The "Pehle Jaisa" Staggered UI) */}
      <section className="services-detail-list">
        {DETAILED_SERVICES.map((s, i) => (
          <div className="sd-row" key={s.id} style={{ flexDirection: i % 2 !== 0 ? 'row-reverse' : 'row' }}>
            <div className="sd-text reveal">
              <span className="sd-num">0{i + 1}</span>
              <h2 className="sd-title">{s.title}</h2>
              <h3 className="sd-subtitle">{s.subtitle}</h3>
              <p className="sd-desc" style={{ fontWeight: 500, color: '#e8e0d4' }}>{s.desc}</p>
              
              <div className="sd-full-desc">
                 <p>{s.fullDesc}</p>
                 <div className="sd-benefits">
                    <h4 style={{ color: 'var(--gold)', marginBottom: '8px', fontSize: '14px', letterSpacing: '1px' }}>KEY BENEFITS</h4>
                    <ul>
                      {s.benefits.map((b, idx) => (
                        <li key={idx}><Check size={14} className="gold-text" style={{ flexShrink: 0, marginTop: '4px' }} /> <span>{b}</span></li>
                      ))}
                    </ul>
                 </div>
              </div>

              <ul className="sd-features">
                {s.features.map((f, idx) => (
                  <li key={idx}><Star size={14} className="gold-text" /> {f}</li>
                ))}
              </ul>
              
              <button className="btn btn-gold" style={{ marginTop: 32 }} onClick={() => openFormForService(s.id)}>
                GET A QUOTE FOR THIS SERVICE
              </button>
            </div>
            <div className="sd-image-wrap reveal">
              <div className="sd-img-frame">
                <img src={s.image} alt={s.title} className="sd-img" />
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Hero Form Overlay */}
      {isFormOpen && (
        <div className="form-overlay" onClick={() => setIsFormOpen(false)}>
           <div className="hero-form open" onClick={e => e.stopPropagation()}>
             <button className="form-close" onClick={() => setIsFormOpen(false)}>
               <X size={20} />
             </button>
             <h2 className="form-h">Consult With Specialists</h2>
             <form onSubmit={e => { e.preventDefault(); alert('Request Received!'); setIsFormOpen(false); }}>
               <div className="form-group"><input type="text" placeholder="Name" required /></div>
               <div className="form-group"><input type="tel" placeholder="Mobile" required /></div>
               <div className="form-group">
                  <select required value={selectedService || ''} onChange={e => setSelectedService(e.target.value)}>
                    <option value="" disabled>Select Service</option>
                    {DETAILED_SERVICES.map(s => <option key={s.id} value={s.id}>{s.title}</option>)}
                  </select>
               </div>
               <button type="submit" className="btn btn-gold" style={{ width: '100%', justifyContent: 'center' }}>
                 SUBMIT REQUEST →
               </button>
             </form>
           </div>
        </div>
      )}

      <FAQ />
      <Footer />

      <style jsx global>{`
        .services-detailed-page {
          background: #050508;
          color: #fff;
          overflow-x: hidden;
        }

        .services-hero {
          padding: 160px 0 100px;
          background: linear-gradient(to bottom, #0a0a0f, #050508);
          text-align: center;
        }

        .sh-content {
          max-width: 800px;
          margin: 0 auto;
        }

        .services-detail-list {
          padding-bottom: 120px;
        }

        .sd-row {
          display: flex;
          align-items: flex-start;
          gap: 80px;
          max-width: 1400px;
          margin: 0 auto 160px;
          padding: 0 6%;
        }

        .sd-text {
          flex: 1.2;
        }

        .sd-num {
          display: block;
          font-family: serif;
          font-size: 64px;
          color: rgba(201, 169, 110, 0.1);
          margin-bottom: -10px;
        }

        .sd-title {
          font-size: 42px;
          font-family: var(--font-playfair);
          color: #fff;
          margin-bottom: 8px;
        }

        .sd-subtitle {
          font-size: 14px;
          color: var(--gold);
          letter-spacing: 2px;
          text-transform: uppercase;
          margin-bottom: 24px;
          font-weight: 600;
        }

        .sd-desc {
          font-size: 18px;
          margin-bottom: 24px;
          line-height: 1.6;
        }

        .sd-full-desc {
          color: rgba(232, 224, 212, 0.7);
          line-height: 1.8;
          font-size: 15px;
          margin-bottom: 32px;
          padding-left: 20px;
          border-left: 2px solid rgba(201, 169, 110, 0.3);
        }

        .sd-full-desc p {
          margin-bottom: 20px;
        }

        .sd-benefits ul {
          list-style: none;
          padding: 0;
        }

        .sd-benefits li {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          margin-bottom: 10px;
          color: rgba(232, 224, 212, 0.85);
        }

        .sd-features {
          list-style: none;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
          margin-top: 32px;
          padding-top: 24px;
          border-top: 1px solid rgba(255,255,255,0.05);
        }

        .sd-features li {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 14px;
          color: #fff;
          font-weight: 500;
        }

        .sd-image-wrap {
          flex: 1;
          position: sticky;
          top: 120px;
        }

        .sd-img-frame {
          position: relative;
          overflow: hidden;
          border-radius: 4px;
          box-shadow: 0 30px 60px rgba(0,0,0,0.3);
          border: 1px solid rgba(255, 255, 255, 0.05);
        }

        .sd-img {
          display: block;
          width: 100%;
          height: auto;
          object-fit: contain;
          transition: transform 1.2s cubic-bezier(0.2, 0, 0.2, 1);
        }

        .sd-img:hover {
          transform: scale(1.05);
        }

        .reveal {
          opacity: 1;
          transform: translateY(0);
        }
        .reveal.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .form-overlay {
          position: fixed;
          top: 0; left: 0; width: 100%; height: 100%;
          background: rgba(0,0,0,0.8);
          backdrop-filter: blur(5px);
          z-index: 3000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
        }

        .hero-form.open {
          position: relative;
          min-width: 400px;
          opacity: 1;
          transform: translateX(0);
          background: #0a0a0f;
          border: 1px solid rgba(201, 169, 110, 0.2);
        }

        @media (max-width: 1024px) {
          .sd-row {
            flex-direction: column !important;
            gap: 40px;
            margin-bottom: 100px;
          }
          .sd-image-wrap {
            position: relative;
            top: 0;
            width: 100%;
          }
          .sd-img-frame {
             padding-bottom: 60%;
          }
          .sd-title { font-size: 32px; }
          .sd-num { font-size: 48px; }
        }

        @media (max-width: 480px) {
          .sd-features {
            grid-template-columns: 1fr;
          }
          .sd-img-frame {
             padding-bottom: 75%;
          }
           .hero-form.open {
            min-width: 100%;
          }
        }
      `}</style>
    </div>
  )
}
