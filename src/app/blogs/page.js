'use client'

import React, { useState, useEffect } from 'react'
import {
  ArrowRight, Search, Clock, User, Calendar,
  ChevronRight, ArrowLeft, X, Plus
} from 'lucide-react'
import { FaInstagram, FaFacebookF, FaYoutube, FaLinkedinIn } from 'react-icons/fa6'

// ─── DATA ───────────────────────────────────────────────────────────

const NAV_LINKS = [
  { href: '/services', label: 'Services' },
  { href: '/blogs', label: 'Blogs' },
  { href: '/#about', label: 'About' },
  { href: '/#gallery', label: 'Gallery' },
  { href: '/#process', label: 'Process' },
  { href: '/#pricing', label: 'Pricing' },
  { href: '/#testimonials', label: 'Reviews' },
  { href: '/#faq', label: 'FAQ' },
]

const BLOGS = [
  {
    id: 1,
    title: 'Top 5 Modular Kitchen Trends in Pune for 2026',
    excerpt: 'Discover why handleless designs and built-in appliances are taking over Pune homes this year.',
    date: 'April 15, 2026',
    author: 'A R Interiors Editorial',
    readTime: '6 min read',
    image: '/modularkitchen.jpg',
    category: 'Modular Kitchen'
  },
  {
    id: 2,
    title: 'How to Design a Small 2 BHK in Pune: Expert Tips',
    excerpt: 'Maximize every square foot with smart multifunctional furniture and space-saving layouts.',
    date: 'April 12, 2026',
    author: 'Project Manager - Baner',
    readTime: '8 min read',
    image: '/livingroom.jpg',
    category: 'Interior Design'
  },
  {
    id: 3,
    title: 'Why Woodwork Quality Matters: The AR Standard',
    excerpt: 'Learn about BWR vs BWP grade plywood and why our 10-year warranty is industry-leading.',
    date: 'April 08, 2026',
    author: 'Technical Team',
    readTime: '5 min read',
    image: '/masterbedroom.jpg',
    category: 'Materials'
  },
  {
    id: 4,
    title: 'Creating a Productive Home Office in Hinjewadi',
    excerpt: 'Ergonomic tips and design inspiration for professionals working from home in Pune IT hubs.',
    date: 'April 05, 2026',
    author: 'A R Interiors Editorial',
    readTime: '7 min read',
    image: '/Office.jpg',
    category: 'Commercial'
  },
  {
    id: 5,
    title: 'The Art of False Ceilings: Elevating Your Living Room',
    excerpt: 'From cove lighting to minimalist patterns, find the perfect ceiling for your dream home.',
    date: 'March 28, 2026',
    author: 'Design Team',
    readTime: '4 min read',
    image: '/False Ceiling.jpg',
    category: 'Specialty'
  },
  {
    id: 6,
    title: 'Luxury Villa Transformations in Koregaon Park',
    excerpt: 'A walkthrough of our latest premium project blending traditional elegance with modern luxury.',
    date: 'March 22, 2026',
    author: 'Head Designer',
    readTime: '10 min read',
    image: '/fullInterior.jpg',
    category: 'Luxury'
  }
]

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

// ─── COMPONENTS ──────────────────────────────────────────────────────

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

function Navbar() {
  const scrolled = useScrolled()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav id="navbar" className={scrolled ? 'scrolled' : ''}>
      <div className="nav-inner">
        <a href="/" className="nav-logo" style={{ textDecoration: 'none' }}>
          <img src="/logo.png" alt="AR Interiors" style={{ height: '40px', width: 'auto', display: 'block' }} />
        </a>
        <div className="nav-sep" />
        <ul className={`nav-links${menuOpen ? ' mobile-open' : ''}`}>
          {NAV_LINKS.map((l, i) => (
            <li key={i}>
              <a href={l.href} className={l.href === '/blogs' ? 'active' : ''} onClick={() => setMenuOpen(false)}>{l.label}</a>
            </li>
          ))}
        </ul>
        <div className="nav-cta">
          <a href="tel:+919XXXXXXXXX" className="nav-phone">+91 9X-XXXX-XXXX</a>
          <a href="/#cta-section" className="nav-btn">
            Free Visit
            <ArrowRight size={14} strokeWidth={3} />
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
            <img src="/logo.png" alt="AR Interiors" style={{ height: '36px', width: 'auto', marginBottom: 14, opacity: 0.9, display: 'block' }} />
            <p className="footer-desc">Pune&apos;s most trusted interior design studio. 850+ projects. 12 years. 45-day delivery guaranteed.</p>
            <div className="fsocial">
              <a href="#" className="fsb" aria-label="Instagram"><FaInstagram size={16} /></a>
              <a href="#" className="fsb" aria-label="Facebook"><FaFacebookF size={15} /></a>
              <a href="#" className="fsb" aria-label="YouTube"><FaYoutube size={17} /></a>
              <a href="#" className="fsb" aria-label="LinkedIn"><FaLinkedinIn size={16} /></a>
            </div>
          </div>
          <div>
            <div className="fh">Quick Links</div>
            <ul className="fl">
              {['Home', 'Services', 'Blogs', 'About Us', 'Contact'].map(l => <li key={l}><a href={l === 'Home' ? '/' : `/${l.toLowerCase()}`}>{l}</a></li>)}
            </ul>
          </div>
          <div>
            <div className="fh">Popular Posts</div>
            <ul className="fl">
              {BLOGS.slice(0, 3).map(b => <li key={b.id}><a href="#">{b.title}</a></li>)}
            </ul>
          </div>
          <div>
            <div className="fh">Office</div>
            <ul className="fl">
              <li><a href="tel:+919XXXXXXXXX">+91 9X-XXXX-XXXX</a></li>
              <li><a href="mailto:hello@arinteriors.in">hello@arinteriors.in</a></li>
              <li><a href="#">Pune, Maharashtra</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {currentYear} AR Interiors. All rights reserved.</span>
          <span>BEST INTERIOR DESIGNERS IN PUNE</span>
        </div>
      </div>
    </footer>
  )
}

function FloatingActions({ isFormOpen, setIsFormOpen }) {
  return (
    <div className="floating-actions">
      {/* <a href="https://wa.me/919XXXXXXXXX" className="swa" target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp">
        <svg viewBox="0 0 24 24" width="28" height="38" fill="#fff" style={{ padding: '8px' }}>
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </a> */}
      {/* {!isFormOpen && (
        <button className="bottom-quote-btn" onClick={() => setIsFormOpen(true)} aria-label="Open form">
          <Plus size={24} />
        </button>
      )} */}
    </div>
  )
}

export default function BlogPage() {
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [activeCategory, setActiveCategory] = useState('All')

  const categories = ['All', 'Interior Design', 'Modular Kitchen', 'Materials', 'Commercial', 'Luxury', 'Specialty']

  const filteredBlogs = BLOGS.filter(blog => {
    const matchesSearch = blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = activeCategory === 'All' || blog.category === activeCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="blog-page">
      <Navbar />

      <section className="blog-hero">
        <div className="container">
          <div className="bh-content">
            <span className="label">// INSIGHTS . IDEAS</span>
            <h1>Knowledge <em>Center</em></h1>
            <p>Expert tips, design trends, and professional advice to help you build your dream home in Pune.</p>
          </div>
        </div>
      </section>

      <section className="blog-controls">
        <div className="container">
          <div className="bc-flex">
            <div className="bc-search">
              <Search size={18} className="search-icon" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchTerm && <X size={16} className="clear-icon" onClick={() => setSearchTerm('')} />}
            </div>
            <div className="bc-cats">
              {categories.map(c => (
                <button
                  key={c}
                  className={`cat-btn ${activeCategory === c ? 'active' : ''}`}
                  onClick={() => setActiveCategory(c)}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="blog-grid-section">
        <div className="container">
          {filteredBlogs.length > 0 ? (
            <div className="blog-grid">
              {filteredBlogs.map(blog => (
                <article className="blog-card" key={blog.id}>
                  <div className="bc-img-wrap">
                    <img src={blog.image} alt={blog.title} className="bc-img" />
                    <span className="bc-cat-tag">{blog.category}</span>
                  </div>
                  <div className="bc-inner">
                    <div className="bc-meta">
                      <span><Calendar size={12} /> {blog.date}</span>
                      <span><Clock size={12} /> {blog.readTime}</span>
                    </div>
                    <h2 className="bc-title">{blog.title}</h2>
                    <p className="bc-excerpt">{blog.excerpt}</p>
                    <div className="bc-footer">
                      <div className="bc-author">
                        <User size={12} /> {blog.author}
                      </div>
                      <a href="#" className="bc-link">
                        Read Story <ChevronRight size={14} />
                      </a>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="no-results">
              <h3>No articles found matching your criteria.</h3>
              <button className="btn btn-outline" onClick={() => { setSearchTerm(''); setActiveCategory('All') }}>
                Clear All Filters
              </button>
            </div>
          )}
        </div>
      </section>

      <section className="blog-newsletter">
        <div className="container">
          <div className="bn-card">
            <div className="bn-left">
              <h2>Join the <em>Inner Circle</em></h2>
              <p>Get monthly design inspiration and early access to our latest projects delivered to your inbox.</p>
            </div>
            <div className="bn-right">
              <form className="bn-form" onSubmit={(e) => { e.preventDefault(); alert('Thank you for subscribing!') }}>
                <input type="email" placeholder="Email Address" required />
                <button type="submit" className="btn btn-gold">SUBSCRIBE</button>
              </form>
              <p className="bn-privacy">No spam. Only high-quality design inspiration.</p>
            </div>
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

      <FAQ />
      <Footer />

      <style jsx global>{`
        .blog-page {
          background: #050508;
          color: #fff;
          min-height: 100vh;
        }

        .blog-hero {
          padding: 160px 0 80px;
          background: linear-gradient(to bottom, #0a0a0f, #050508);
          text-align: center;
        }

        .bh-content h1 {
          font-family: var(--font-playfair);
          font-size: clamp(40px, 6vw, 72px);
          margin: 20px 0;
        }

        .bh-content h1 em {
          font-style: italic;
          color: var(--gold);
        }

        .bh-content p {
          color: rgba(232, 224, 212, 0.6);
          font-size: 18px;
          max-width: 600px;
          margin: 0 auto;
        }

        .blog-controls {
          padding: 40px 0;
          border-bottom: 1px solid rgba(255,255,255,0.05);
          position: sticky;
          top: 80px;
          z-index: 90;
          background: rgba(5, 5, 8, 0.95);
          backdrop-filter: blur(20px);
        }

        .bc-flex {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 40px;
        }

        .bc-search {
          position: relative;
          flex: 1;
          max-width: 400px;
        }

        .bc-search input {
          width: 100%;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.1);
          padding: 12px 40px;
          border-radius: 4px;
          color: #fff;
          font-size: 14px;
          transition: all 0.3s;
        }

        .bc-search input:focus {
          border-color: var(--gold);
          background: rgba(255,255,255,0.05);
          outline: none;
        }

        .search-icon {
          position: absolute;
          left: 12px;
          top: 50%;
          transform: translateY(-50%);
          color: rgba(201, 169, 110, 0.6);
        }

        .clear-icon {
          position: absolute;
          right: 12px;
          top: 50%;
          transform: translateY(-50%);
          cursor: pointer;
          color: rgba(232, 224, 212, 0.4);
        }

        .bc-cats {
          display: flex;
          gap: 12px;
          overflow-x: auto;
          scrollbar-width: none;
          padding: 4px;
        }

        .bc-cats::-webkit-scrollbar { display: none; }

        .cat-btn {
          background: none;
          border: 1px solid rgba(255,255,255,0.1);
          color: rgba(232, 224, 212, 0.6);
          padding: 8px 18px;
          border-radius: 20px;
          font-size: 13px;
          white-space: nowrap;
          cursor: pointer;
          transition: all 0.3s;
        }

        .cat-btn:hover {
          border-color: rgba(201, 169, 110, 0.5);
          color: #fff;
        }

        .cat-btn.active {
          background: var(--gold);
          border-color: var(--gold);
          color: #000;
          font-weight: 600;
        }

        .blog-grid-section {
          padding: 80px 0 120px;
        }

        .blog-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 40px;
        }

        .blog-card {
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(255,255,255,0.05);
          border-radius: 4px;
          overflow: hidden;
          transition: all 0.5s cubic-bezier(0.2, 0, 0.2, 1);
          display: flex;
          flex-direction: column;
        }

        .blog-card:hover {
          transform: translateY(-10px);
          border-color: rgba(201, 169, 110, 0.3);
          background: rgba(255,255,255,0.03);
          box-shadow: 0 20px 40px rgba(0,0,0,0.3);
        }

        .bc-img-wrap {
          position: relative;
          padding-bottom: 60%;
          overflow: hidden;
        }

        .bc-img {
          position: absolute;
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 1s;
        }

        .blog-card:hover .bc-img {
          transform: scale(1.1);
        }

        .bc-cat-tag {
          position: absolute;
          top: 16px;
          left: 16px;
          background: var(--gold);
          color: #000;
          font-size: 10px;
          font-weight: 800;
          text-transform: uppercase;
          padding: 4px 10px;
          letter-spacing: 1px;
          border-radius: 2px;
        }

        .bc-inner {
          padding: 24px;
          flex: 1;
          display: flex;
          flex-direction: column;
        }

        .bc-meta {
          display: flex;
          gap: 16px;
          font-size: 12px;
          color: rgba(232, 224, 212, 0.4);
          margin-bottom: 12px;
          align-items: center;
        }

        .bc-meta span {
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .bc-title {
          font-family: var(--font-playfair);
          font-size: 22px;
          margin-bottom: 14px;
          line-height: 1.4;
          color: #fff;
        }

        .bc-excerpt {
          font-size: 14px;
          color: rgba(232, 224, 212, 0.6);
          line-height: 1.6;
          margin-bottom: 24px;
          flex: 1;
        }

        .bc-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 20px;
          border-top: 1px solid rgba(255,255,255,0.05);
        }

        .bc-author {
          font-size: 11px;
          color: rgba(232, 224, 212, 0.4);
          display: flex;
          align-items: center;
          gap: 6px;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .bc-link {
          color: var(--gold);
          font-size: 13px;
          font-weight: 600;
          text-decoration: none;
          display: flex;
          align-items: center;
          gap: 4px;
          transition: all 0.3s;
        }

        .bc-link:hover {
          gap: 8px;
        }

        .blog-newsletter {
          padding: 80px 0 160px;
        }

        .bn-card {
          background: linear-gradient(135deg, rgba(201, 169, 110, 0.1), rgba(5, 5, 8, 0.5));
          border: 1px solid rgba(201, 169, 110, 0.2);
          padding: 60px;
          border-radius: 4px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 80px;
        }

        .bn-left h2 {
          font-family: var(--font-playfair);
          font-size: 42px;
          margin-bottom: 16px;
        }

        .bn-left h2 em {
          font-style: italic;
          color: var(--gold);
        }

        .bn-left p {
          color: rgba(232, 224, 212, 0.6);
          font-size: 16px;
          max-width: 440px;
        }

        .bn-right {
          flex: 1;
          max-width: 500px;
        }

        .bn-form {
          display: flex;
          gap: 12px;
          margin-bottom: 16px;
        }

        .bn-form input {
          flex: 1;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.1);
          padding: 16px 20px;
          color: #fff;
          border-radius: 1px;
          font-size: 14px;
        }

        .bn-form input:focus {
          border-color: var(--gold);
          outline: none;
        }

        .bn-privacy {
          font-size: 11px;
          color: rgba(232, 224, 212, 0.4);
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .no-results {
          text-align: center;
          padding: 100px 0;
        }

        .no-results h3 {
          font-family: var(--font-playfair);
          font-size: 24px;
          margin-bottom: 30px;
        }

        @media (max-width: 1024px) {
          .blog-grid { grid-template-columns: repeat(2, 1fr); }
          .bn-card { flex-direction: column; text-align: center; gap: 40px; padding: 40px; }
          .bn-left p { margin: 0 auto; }
          .bc-flex { flex-direction: column; align-items: stretch; }
          .bc-search { max-width: none; }
        }

        @media (max-width: 640px) {
          .blog-grid { grid-template-columns: 1fr; }
          .bh-content h1 { font-size: 42px; }
          .bn-form { flex-direction: column; }
        }
      `}</style>
    </div>
  )
}
