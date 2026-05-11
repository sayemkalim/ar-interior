'use client'

import React, { useState, useEffect } from 'react'
import { ArrowRight, Phone, Plus, X, ChevronRight, AlertCircle } from 'lucide-react'
import { FaInstagram, FaFacebookF, FaYoutube, FaLinkedinIn } from 'react-icons/fa6'

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About Us' },
  { href: '/services', label: 'Services' },
  { href: '/#process', label: 'Process' },
  { href: '/#pricing', label: 'Price' },
  { href: '/#gallery', label: 'Gallery' },
  { href: '/#testimonials', label: 'Review' },
  { href: '/blogs', label: 'Blog' },
  { href: '/#faq', label: 'FAQ' },
]

const SECTIONS = [
  { id: 'general', label: '1. General Info' },
  { id: 'pricing', label: '2. Pricing Disclaimer' },
  { id: 'delivery', label: '3. Delivery & Timelines' },
  { id: 'warranty', label: '4. Warranty' },
  { id: 'intellectual', label: '5. Intellectual Property' },
  { id: 'payment', label: '6. Payment Terms' },
  { id: 'client', label: '7. Client Responsibilities' },
  { id: 'refund', label: '8. Cancellation & Refund' },
  { id: 'thirdparty', label: '9. Third-Party Services' },
  { id: 'disclaimer', label: '10. Website Disclaimer' },
]

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav id="navbar" className="scrolled">
      <div className="nav-inner">
        <a href="/" className="nav-logo" style={{ textDecoration: 'none' }}>
          <img src="/logo.png" alt="AR Interiors" style={{ height: '40px', width: 'auto', display: 'block' }} />
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
  const currentYear = new Date().getFullYear()
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
          <span>© {currentYear} AR Interiors. All rights reserved.</span>
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

export default function TermsAndConditions() {
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id)
        })
      },
      { threshold: 0.5 }
    )
    SECTIONS.forEach((s) => {
      const el = document.getElementById(s.id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  return (
    <div className="legal-page">
      <Navbar />

      <section className="legal-hero">
        <div className="hero-pattern" />
        <div className="container">
          <div className="hero-badge">LEGAL COMPLIANCE</div>
          <h1 className="heading">Terms & <em>Conditions</em></h1>
          <p className="hero-subtitle">Effective Date: May 10, 2026</p>
          <div className="divider mx-auto" />
        </div>
      </section>

      <section className="legal-body">
        <div className="container">
          <div className="legal-layout">
            {/* Sidebar Table of Contents */}
            <aside className="legal-sidebar">
              <div className="sidebar-inner">
                <h4>QUICK NAVIGATION</h4>
                <nav>
                  {SECTIONS.map((s) => (
                    <a
                      key={s.id}
                      href={`#${s.id}`}
                      className={activeSection === s.id ? 'active' : ''}
                    >
                      <ChevronRight size={14} className="icon" />
                      {s.label}
                    </a>
                  ))}
                </nav>
              </div>
            </aside>

            {/* Main Content Card */}
            <main className="legal-main">
              <div className="legal-card">
                <div className="intro">
                  <p>Welcome to <a href="https://www.arinteriorsofficial.com" style={{ color: 'var(--gold)', textDecoration: 'underline' }}>AR Interiors Official</a>. By accessing our website and availing our services, you agree to comply with the following Terms & Conditions. Please read them carefully before proceeding with any enquiry, booking, or service confirmation.</p>
                </div>

                <div id="general" className="clause">
                  <h3>1. General Information</h3>
                  <p>AR Interiors provides interior design, modular solutions, customized furniture, renovation, and related consultation services. All information, images, designs, pricing, and specifications displayed on the website are for general reference purposes and may be updated without prior notice.</p>
                </div>

                <div id="pricing" className="clause">
                  <h3>2. Pricing Disclaimer</h3>
                  <div className="disclaimer-box">
                    <AlertCircle className="disclaimer-icon" size={20} />
                    <p>All prices mentioned are indicative and may vary depending on project size, material selection, customization, and site conditions.</p>
                  </div>
                  <p>Final pricing will be shared only after detailed discussion, site evaluation, and design confirmation.</p>
                </div>

                <div id="delivery" className="clause">
                  <h3>3. Delivery & Project Timelines</h3>
                  <p>Project timelines and delivery schedules are estimated and may vary based on design approvals, material availability, and site readiness.</p>
                  <div className="status-grid">
                    <div className="status-card">
                      <span className="status-dot" />
                      <strong>Estimated Timelines</strong>
                      <p>Varies by project scope</p>
                    </div>
                    <div className="status-card">
                      <span className="status-dot" />
                      <strong>Delay Policy</strong>
                      <p>Subject to external factors</p>
                    </div>
                  </div>
                </div>

                <div id="warranty" className="clause">
                  <h3>4. Warranty Disclaimer</h3>
                  <p>Warranty terms vary depending on products and materials. Specific details will be provided during project finalization.</p>
                  <p className="note">Warranty does not cover normal wear and tear, physical damage, or unauthorized modifications.</p>
                </div>

                <div id="intellectual" className="clause">
                  <h3>5. Design & Intellectual Property</h3>
                  <p>All designs, layouts, concepts, and graphics remain the intellectual property of AR Interiors. Unauthorized reproduction is strictly prohibited.</p>
                </div>

                <div id="payment" className="clause">
                  <h3>6. Payment Terms</h3>
                  <p>Clients are required to follow the payment schedule agreed upon during project confirmation. Delayed payments may affect project timelines.</p>
                </div>

                <div id="client" className="clause">
                  <h3>7. Client Responsibilities</h3>
                  <ul>
                    <li>Provide accurate project information</li>
                    <li>Ensure site accessibility and readiness</li>
                    <li>Approve designs within agreed timelines</li>
                    <li>Coordinate for required permissions</li>
                  </ul>
                </div>

                <div id="refund" className="clause">
                  <h3>8. Cancellation & Refund Policy</h3>
                  <p>Cancellation requests must be in writing. Refund eligibility depends on project stage and contractual agreements.</p>
                </div>

                <div id="thirdparty" className="clause">
                  <h3>9. Third-Party Materials & Services</h3>
                  <p>AR Interiors is not directly responsible for manufacturer-specific defects beyond applicable warranty terms for third-party items.</p>
                </div>

                <div id="disclaimer" className="clause">
                  <h3>10. Website Content Disclaimer</h3>
                  <p>We strive for accuracy but do not guarantee the completeness or reliability of website content at all times.</p>
                </div>

                <div className="contact-footer">
                  <p>For any questions regarding these Terms & Conditions, please contact us through our official channels.</p>
                </div>
              </div>
            </main>
          </div>
        </div>
      </section>

      {/* Hero Form Overlay */}
      {isFormOpen && (
        <div className="form-overlay" onClick={() => setIsFormOpen(false)}>
          <div className="hero-form open" onClick={e => e.stopPropagation()}>
            <button className="form-close" onClick={() => setIsFormOpen(false)}>
              <X size={20} />
            </button>
            <h2 className="form-h" style={{ color: '#fff' }}>Consult With Specialists</h2>
            <p className="form-sub" style={{ opacity: 0.6, marginBottom: 20 }}>// No-obligation. Free site visit.</p>
            <form onSubmit={e => { e.preventDefault(); alert('Request Received!'); setIsFormOpen(false); }}>
              <div className="form-group"><input type="text" placeholder="Name" required /></div>
              <div className="form-group"><input type="tel" placeholder="Mobile Number" required /></div>
              <div className="form-group">
                <select required defaultValue="">
                  <option value="" disabled>Select Project Area</option>
                  <option>Modular Kitchen</option>
                  <option>Full Home Interior</option>
                  <option>Office / Commercial</option>
                  <option>Luxury Villa</option>
                </select>
              </div>
              <button type="submit" className="btn btn-gold" style={{ width: '100%', justifyContent: 'center' }}>
                SUBMIT REQUEST →
              </button>
            </form>
          </div>
        </div>
      )}

      <FloatingActions isFormOpen={isFormOpen} setIsFormOpen={setIsFormOpen} />
      <Footer />

      <style jsx global>{`
        .legal-page {
          background: #000;
          color: #fff;
          min-height: 100vh;
        }
        .legal-hero {
          position: relative;
          padding: 180px 0 80px;
          text-align: center;
          overflow: hidden;
        }
        .hero-pattern {
          position: absolute;
          inset: 0;
          background-image: radial-gradient(rgba(201, 169, 110, 0.05) 1px, transparent 1px);
          background-size: 30px 30px;
          z-index: 0;
        }
        .hero-badge {
          display: inline-block;
          font-size: 10px;
          letter-spacing: 0.2em;
          color: var(--gold);
          border: 1px solid rgba(201, 169, 110, 0.3);
          padding: 4px 12px;
          margin-bottom: 20px;
          font-weight: 600;
        }
        .hero-subtitle {
          color: rgba(255,255,255,0.4);
          font-size: 14px;
          margin-top: 10px;
        }
        .mx-auto { margin-left: auto; margin-right: auto; }

        .legal-body {
          padding-bottom: 120px;
        }
        .legal-layout {
          display: grid;
          grid-template-columns: 280px 1fr;
          gap: 60px;
          align-items: start;
        }

        .legal-sidebar {
          position: sticky;
          top: 120px;
        }
        .sidebar-inner h4 {
          font-size: 11px;
          letter-spacing: 0.15em;
          color: rgba(255,255,255,0.4);
          margin-bottom: 25px;
          font-weight: 600;
        }
        .legal-sidebar nav {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .legal-sidebar a {
          display: flex;
          align-items: center;
          gap: 10px;
          color: rgba(255,255,255,0.6);
          text-decoration: none;
          font-size: 13px;
          transition: all 0.3s;
          padding: 8px 12px;
          border-radius: 4px;
        }
        .legal-sidebar a .icon { opacity: 0; transform: translateX(-5px); transition: all 0.3s; }
        .legal-sidebar a:hover { color: var(--gold); background: rgba(201, 169, 110, 0.05); }
        .legal-sidebar a.active { color: var(--gold); background: rgba(201, 169, 110, 0.1); font-weight: 500; }
        .legal-sidebar a.active .icon { opacity: 1; transform: translateX(0); }

        .legal-main {
          max-width: 840px;
        }
        .legal-card {
          background: rgba(10, 10, 15, 0.5);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.05);
          padding: 60px;
          border-radius: 8px;
          box-shadow: 0 40px 100px rgba(0,0,0,0.4);
        }
        .intro { margin-bottom: 50px; border-bottom: 1px solid rgba(255,255,255,0.05); padding-bottom: 30px; }
        .intro p { font-size: 18px; line-height: 1.7; color: rgba(255,255,255,0.85); }
        
        .clause { margin-bottom: 60px; scroll-margin-top: 140px; }
        .clause h3 {
          font-family: var(--font-display);
          color: var(--gold);
          font-size: 22px;
          margin-bottom: 25px;
          display: flex;
          align-items: center;
        }
        .clause p {
          color: rgba(232, 224, 212, 0.7);
          font-size: 16px;
          line-height: 1.8;
          margin-bottom: 20px;
        }
        .clause ul {
          padding-left: 20px;
          margin-bottom: 24px;
        }
        .clause li {
          color: rgba(232, 224, 212, 0.7);
          font-size: 16px;
          margin-bottom: 12px;
          list-style: disc;
        }
        
        .disclaimer-box {
          background: rgba(201, 169, 110, 0.1);
          border: 1px solid rgba(201, 169, 110, 0.2);
          padding: 20px;
          border-radius: 4px;
          display: flex;
          gap: 15px;
          margin-bottom: 25px;
        }
        .disclaimer-icon { color: var(--gold); flex-shrink: 0; margin-top: 2px; }
        .disclaimer-box p { margin-bottom: 0; font-size: 14px; }

        .status-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
          margin-top: 20px;
        }
        .status-card {
          background: rgba(255,255,255,0.02);
          padding: 20px;
          border-radius: 4px;
        }
        .status-dot { display: block; width: 8px; height: 8px; background: var(--gold); border-radius: 50%; margin-bottom: 12px; }
        .status-card strong { display: block; font-size: 13px; color: #fff; margin-bottom: 5px; }
        .status-card p { font-size: 12px; margin-bottom: 0; }

        .note {
          background: rgba(201, 169, 110, 0.05);
          border-left: 3px solid var(--gold);
          padding: 15px 20px;
          font-style: italic;
          border-radius: 0 4px 4px 0;
        }
        .contact-footer {
          margin-top: 80px;
          padding-top: 40px;
          border-top: 1px solid rgba(255,255,255,0.05);
          text-align: center;
          font-style: italic;
          color: var(--gold);
        }

        @media (max-width: 1024px) {
          .legal-layout { grid-template-columns: 1fr; }
          .legal-sidebar { display: none; }
          .legal-card { padding: 40px 25px; }
        }
      `}</style>
    </div>
  )
}
