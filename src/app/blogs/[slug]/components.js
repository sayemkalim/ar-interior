'use client'

import React, { useState, useEffect } from 'react'
import { ArrowRight } from 'lucide-react'
import { FaInstagram, FaFacebookF, FaYoutube, FaLinkedinIn } from 'react-icons/fa6'

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

function useScrolled() {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const handle = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handle)
    return () => window.removeEventListener('scroll', handle)
  }, [])
  return scrolled
}

export function Navbar() {
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

export function Footer() {
  const currentYear = new Date().getFullYear()
  return (
    <footer>
      <div className="container">
        <div className="footer-grid">
          <div>
            <img src="/logo.png" alt="AR Interiors" style={{ height: '36px', width: 'auto', marginBottom: 14, opacity: 0.9, display: 'block' }} />
            <p className="footer-desc">Pune's most trusted interior design studio. 850+ projects. 12 years. 45-day delivery guaranteed.</p>
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
