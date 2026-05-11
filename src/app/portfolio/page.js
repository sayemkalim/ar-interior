'use client'

import React, { useState } from 'react'
import { ArrowRight, Phone, Plus, X, ChevronRight, Home } from 'lucide-react'
import { FaInstagram, FaFacebookF, FaYoutube, FaLinkedinIn } from 'react-icons/fa6'

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About Us' },
  { href: '/services', label: 'Services' },
  { href: '/#process', label: 'Process' },
  { href: '/#pricing', label: 'Price' },
  { href: '/portfolio', label: 'Gallery' },
  { href: '/#testimonials', label: 'Review' },
  { href: '/blogs', label: 'Blog' },
  { href: '/#faq', label: 'FAQ' },
]

const GALLERY_IMAGES = [
  { src: '/gallery/1.png', h: '450px', title: 'Luxury Living', sub: 'PUNE · PROJECT 01' },
  { src: '/gallery/2.png', h: '320px', title: 'Modern Bedroom', sub: 'WAKAD · 3BHK' },
  { src: '/gallery/3.png', h: '500px', title: 'Modular Kitchen', sub: 'BANER · 2BHK' },
  { src: '/gallery/4.jpg', h: '380px', title: 'Dining Concept', sub: 'KOTHRUD · VILLA' },
  { src: '/gallery/5.png', h: '420px', title: 'Urban Lounge', sub: 'PUNE · FLAT' },
  { src: '/gallery/6.png', h: '350px', title: 'Cosy Bedroom', sub: 'AUNDH · 3BHK' },
  { src: '/gallery/7.png', h: '480px', title: 'Grand Hall', sub: 'HINJEWADI · 2BHK' },
  { src: '/gallery/8.png', h: '310px', title: 'Kitchen Detail', sub: 'PUNE · RESIDENTIAL' },
  { src: '/gallery/9.png', h: '440px', title: 'Living Space', sub: 'WAKAD · VILLA' },
  { src: '/gallery/10.png', h: '330px', title: 'Interior Art', sub: 'BANER · 3BHK' },
  { src: '/gallery/11.png', h: '490px', title: 'Modern Kitchen', sub: 'KOTHRUD · FLAT' },
  { src: '/gallery/12.png', h: '360px', title: 'Master Suite', sub: 'PUNE · PROJECT 02' },
  { src: '/gallery/bedroom - Edited.png', h: '410px', title: 'Design Corner', sub: 'AUNDH · 2BHK' },
  { src: '/gallery/hall- Edited.png', h: '340px', title: 'Elegant Living', sub: 'HINJEWADI · 3BHK' },
  { src: '/gallery/Imag.png', h: '510px', title: 'Pro Kitchen', sub: 'PUNE · VILLA' },
  { src: '/gallery/Image_Edited.png', h: '300px', title: 'Detail View', sub: 'WAKAD · FLAT' },
  { src: '/gallery/20231225_200955.jpg.png', h: '430px', title: 'Living Setup', sub: 'BANER · 2BHK' },
  { src: '/gallery/20231226_204917.jpg.png', h: '370px', title: 'Kitchen View', sub: 'KOTHRUD · 3BHK' },
  { src: '/gallery/20240416_133814.jpg.png', h: '460px', title: 'Main Hall', sub: 'HINJEWADI · VILLA' },
  { src: '/gallery/20240425_182012.jpg.png', h: '320px', title: 'Bedroom Art', sub: 'PUNE · RESIDENTIAL' },
  { src: '/gallery/20240515_164422.jpg.png', h: '400px', title: 'Office Space', sub: 'AUNDH · 2BHK' },
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
              <li><a href="/portfolio">Portfolio</a></li>
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

export default function PortfolioPage() {
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [selectedImg, setSelectedImg] = useState(null)

  return (
    <div className="portfolio-page">
      <Navbar />

      <section className="portfolio-hero">
        <div className="container">
          <div className="hero-badge">OUR MASTERPIECES</div>
          <h1 className="heading">Design <em>Portfolio</em></h1>
          <div className="divider mx-auto" />
          <p className="hero-subtext">A collection of transformed spaces across Pune, showcasing our commitment to quality and aesthetics.</p>
        </div>
      </section>

      <section className="portfolio-grid-section">
        <div className="container">
          <div className="masonry-grid">
            {[0, 1, 2].map((colIdx) => (
              <div key={colIdx} className="masonry-column">
                {GALLERY_IMAGES
                  .filter((_, i) => i % 3 === colIdx)
                  .map((item, i) => (
                    <div key={i} className="gi" onClick={() => setSelectedImg(item)}>
                      <div className="gi-inner">
                        <img
                          src={item.src}
                          alt={item.title}
                          loading="lazy"
                          className="gi-img"
                          style={{ height: item.h, objectFit: 'cover' }}
                        />
                      </div>
                    </div>
                  ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {selectedImg && (
        <div className="lightbox" onClick={() => setSelectedImg(null)}>
          <button className="close-btn"><X size={32} /></button>
          <img src={selectedImg.src} alt={selectedImg.title} className="lightbox-img" onClick={e => e.stopPropagation()} />
          <div className="lightbox-info">
            <h3>{selectedImg.title}</h3>
            <p>{selectedImg.sub}</p>
          </div>
        </div>
      )}

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
        .portfolio-page {
          background: #000;
          color: #fff;
          min-height: 100vh;
        }
        .portfolio-hero {
          padding: 180px 0 80px;
          text-align: center;
          background: radial-gradient(circle at top, rgba(201, 169, 110, 0.05) 0%, transparent 70%);
        }
        .hero-badge {
          display: inline-block;
          font-size: 10px;
          letter-spacing: 0.3em;
          color: var(--gold);
          border: 1px solid rgba(201, 169, 110, 0.3);
          padding: 6px 16px;
          margin-bottom: 24px;
          font-weight: 600;
        }
        .hero-subtext {
          max-width: 600px;
          margin: 20px auto 0;
          color: rgba(255,255,255,0.5);
          font-size: 15px;
          line-height: 1.6;
        }
        .mx-auto { margin-left: auto; margin-right: auto; }

        .portfolio-grid-section {
          padding-bottom: 120px;
        }
        .masonry-grid {
          display: flex;
          gap: 20px;
        }
        .masonry-column {
          display: flex;
          flex-direction: column;
          gap: 20px;
          flex: 1;
        }
        .gi {
          position: relative;
          cursor: pointer;
          overflow: hidden;
          border-radius: 4px;
        }
        .gi-inner {
          position: relative;
          width: 100%;
        }
        .gi-img {
          width: 100%;
          display: block;
        }

        .lightbox {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.95);
          z-index: 5000;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 40px;
          cursor: zoom-out;
        }
        .lightbox-img {
          max-width: 90%;
          max-height: 80vh;
          object-fit: contain;
          box-shadow: 0 30px 60px rgba(0,0,0,0.5);
        }
        .lightbox-info {
          margin-top: 30px;
          text-align: center;
        }
        .lightbox-info h3 { color: var(--gold); margin-bottom: 5px; }
        .lightbox-info p { color: rgba(255,255,255,0.5); font-size: 14px; }
        .close-btn {
          position: absolute;
          top: 40px;
          right: 40px;
          background: none;
          border: none;
          color: #fff;
          cursor: pointer;
          opacity: 0.5;
          transition: opacity 0.3s;
        }
        .close-btn:hover { opacity: 1; }

        @media (max-width: 1024px) {
          .masonry-grid { gap: 15px; }
          .masonry-column { gap: 15px; }
        }
        @media (max-width: 768px) {
          .masonry-column:last-child { display: none; }
          .portfolio-hero { padding: 120px 0 60px; }
        }
        @media (max-width: 480px) {
          .masonry-grid { flex-direction: column; }
          .masonry-column:last-child { display: flex; }
        }
      `}</style>
    </div>
  )
}
