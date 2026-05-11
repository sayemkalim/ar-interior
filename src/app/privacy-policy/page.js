'use client'

import React, { useState, useEffect } from 'react'
import { ArrowRight, Phone, Plus, X, ChevronRight } from 'lucide-react'
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
  { id: 'collect', label: '1. Information We Collect' },
  { id: 'use', label: '2. How We Use Information' },
  { id: 'protection', label: '3. Data Protection' },
  { id: 'sharing', label: '4. Sharing of Data' },
  { id: 'cookies', label: '5. Cookies & Analytics' },
  { id: 'thirdparty', label: '6. Third-Party Links' },
  { id: 'marketing', label: '7. Marketing' },
  { id: 'retention', label: '8. Data Retention' },
  { id: 'rights', label: '9. User Rights' },
  { id: 'changes', label: '10. Policy Changes' },
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

export default function PrivacyPolicy() {
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
          <div className="hero-badge">OFFICIAL DOCUMENT</div>
          <h1 className="heading">Privacy <em>Policy</em></h1>
          <p className="hero-subtitle">Last updated: May 10, 2026</p>
          <div className="divider mx-auto" />
        </div>
      </section>

      <section className="legal-body">
        <div className="container">
          <div className="legal-layout">
            {/* Sidebar Table of Contents */}
            <aside className="legal-sidebar">
              <div className="sidebar-inner">
                <h4>TABLE OF CONTENTS</h4>
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
                  <p>Welcome to <a href="https://www.arinteriorsofficial.com" style={{ color: 'var(--gold)', textDecoration: 'underline' }}>AR Interiors Official</a>. Your privacy is important to us, and we are committed to protecting the personal information you share with us through our website and communication channels.</p>
                  <p>This Privacy Policy explains how AR Interiors collects, uses, stores, and protects your information when you visit our website or interact with our services.</p>
                </div>

                <div id="collect" className="clause">
                  <h3>1. Information We Collect</h3>
                  <p>We may collect personal and non-personal information including:</p>
                  <ul>
                    <li>Name and contact details</li>
                    <li>Phone number & Email address</li>
                    <li>Location or project address details</li>
                    <li>Specific interior requirements and design preferences</li>
                    <li>Any information submitted through enquiry forms, WhatsApp, or phone</li>
                  </ul>
                  <p className="note">We also collect technical data like browser type and IP address for analytics and performance optimization.</p>
                </div>

                <div id="use" className="clause">
                  <h3>2. How We Use Your Information</h3>
                  <p>The information collected may be used for:</p>
                  <div className="use-grid">
                    <div className="use-item">
                      <div className="dot" />
                      <span>Responding to enquiries and consultation requests</span>
                    </div>
                    <div className="use-item">
                      <div className="dot" />
                      <span>Providing quotations and project-related communication</span>
                    </div>
                    <div className="use-item">
                      <div className="dot" />
                      <span>Improving our services and website experience</span>
                    </div>
                    <div className="use-item">
                      <div className="dot" />
                      <span>Sharing updates, offers, or promotional communication</span>
                    </div>
                  </div>
                </div>

                <div id="protection" className="clause">
                  <h3>3. Data Protection & Security</h3>
                  <div className="info-box">
                    <p>AR Interiors takes reasonable security measures to protect user information from unauthorized access, misuse, disclosure, or alteration. However, no digital platform or online transmission can guarantee complete security.</p>
                  </div>
                </div>

                <div id="sharing" className="clause">
                  <h3>4. Sharing of Information</h3>
                  <p>We do not sell, rent, or trade your personal information to third parties. Information may only be shared with:</p>
                  <ul>
                    <li>Trusted service providers or vendors involved in project execution</li>
                    <li>Legal authorities if required by applicable law</li>
                    <li>Internal teams for project coordination and communication</li>
                  </ul>
                </div>

                <div id="cookies" className="clause">
                  <h3>5. Cookies & Website Analytics</h3>
                  <p>Our website may use cookies and analytics tools to enhance user experience, monitor website performance, and understand visitor behavior. Users may choose to disable cookies through their browser settings.</p>
                </div>

                <div id="thirdparty" className="clause">
                  <h3>6. Third-Party Links</h3>
                  <p>Our website may contain links to third-party websites, social media platforms, or external services. AR Interiors is not responsible for the privacy practices or content of external websites.</p>
                </div>

                <div id="marketing" className="clause">
                  <h3>7. Marketing Communication</h3>
                  <p>By submitting your contact details, you may receive calls, emails, WhatsApp messages, or promotional updates from AR Interiors. Users may opt out of marketing communication at any time.</p>
                </div>

                <div id="retention" className="clause">
                  <h3>8. Data Retention</h3>
                  <p>We may retain user information for business, legal, analytical, or project-related purposes as required.</p>
                </div>

                <div id="rights" className="clause">
                  <h3>9. User Rights</h3>
                  <p>Users may request to access their personal information, correct inaccurate details, or request deletion of personal data, subject to legal or operational requirements.</p>
                </div>

                <div id="changes" className="clause">
                  <h3>10. Changes to Privacy Policy</h3>
                  <p>AR Interiors reserves the right to update or modify this Privacy Policy at any time without prior notice. Users are encouraged to review this page periodically.</p>
                </div>

                <div className="contact-footer">
                  <p>For any privacy-related concerns or queries, please contact us through the official contact details mentioned on <a href="https://www.arinteriorsofficial.com" style={{ color: 'var(--gold)', textDecoration: 'underline' }}>AR Interiors Official</a>.</p>
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
        .note {
          background: rgba(201, 169, 110, 0.05);
          border-left: 3px solid var(--gold);
          padding: 15px 20px;
          font-style: italic;
          border-radius: 0 4px 4px 0;
        }

        .use-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }
        .use-item {
          display: flex;
          align-items: center;
          gap: 12px;
          background: rgba(255,255,255,0.02);
          padding: 15px;
          border-radius: 4px;
          font-size: 14px;
          color: rgba(255,255,255,0.7);
        }
        .use-item .dot { width: 6px; height: 6px; background: var(--gold); border-radius: 50%; flex-shrink: 0; }

        .info-box {
          border: 1px dashed rgba(201, 169, 110, 0.3);
          padding: 25px;
          border-radius: 8px;
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
