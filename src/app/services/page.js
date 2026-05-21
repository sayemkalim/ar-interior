'use client'

import React, { useState, useEffect } from 'react'
import {
  ArrowRight, Shield, Check, Phone, Mail,
  Layout, Home as HomeIcon, Package, Coffee,
  Briefcase, Star, Search, Plus, X,
  Sofa, CookingPot, Bed, Building2, ShowerHead, UtensilsCrossed,
  Layers, Wind, Monitor, Leaf, Hammer
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
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About Us' },
  { href: '/services', label: 'Services' },
  { href: '/#process', label: 'Process' },
  { href: '/#pricing', label: 'Price' },
  { href: '//portfolio', label: 'Gallery' },
  { href: '/#testimonials', label: 'Review' },
  { href: '/blogs', label: 'Blog' },
  { href: '/#faq', label: 'FAQ' },
]

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
  '11': Leaf,
  '12': Hammer,
}

const SERVICES = [
  { num: '01', title: 'Living Room  Design Pune', desc: 'Elegant, personalized spaces designed to match your lifestyle.', tag: 'RESIDENTIAL', img: '/livingroom.jpg', detailedId: 'living-room' },
  { num: '02', title: 'Modular Kitchen Designers Pune', desc: 'Stylish and highly functional kitchens for modern living.', tag: 'MODULAR', img: '/modularkitchen.jpg', detailedId: 'modular-kitchen' },
  { num: '03', title: 'Bedroom Interior Designers Pune', desc: 'Calm, refined spaces crafted for comfort and relaxation.', tag: 'RESIDENTIAL', img: '/masterbedroom.jpg', detailedId: 'master-bedroom' },
  { num: '04', title: 'Office Interiors', desc: 'Smart, productive workspaces that align with your brand identity.', tag: 'COMMERCIAL', img: '/Office.jpg', detailedId: 'office-interior' },
  { num: '05', title: 'Bathroom Design', desc: 'Premium, well-designed bathrooms with modern fixtures and efficient storage.', tag: 'RESIDENTIAL', img: '/Bathroom.jpg', detailedId: 'bathroom-design' },
  { num: '06', title: 'Dining Room', desc: 'Thoughtfully designed spaces that make every meal special.', tag: 'RESIDENTIAL', img: '/Dinningroom.jpg', detailedId: 'dining-room' },
  { num: '07', title: 'False Ceiling', desc: 'Innovative ceiling designs that enhance the look of every room.', tag: 'SPECIALTY', img: '/false-ceiling.png', detailedId: 'false-ceiling' },
  { num: '08', title: 'Full Home Design', desc: 'Complete interior solutions in Pune with a seamless, unified approach.', tag: 'COMPLETE', img: '/fullInterior.jpg', detailedId: 'full-home' },
  { num: '09', title: 'Terrace Design', desc: 'Cozy, well-finished terraces with outdoor seating, BBQ decks, and penthouse styling.', tag: 'SPECIALTY', img: '/terrace.png', detailedId: 'terrace' },
  { num: '10', title: 'Home Theater', desc: 'Sleek, soundproof home theaters with an immersive audio-visual experience.', tag: 'LUXURY', img: '/hometheater.png', detailedId: 'home-theater' },
  { num: '11', title: 'Gardening Design', desc: 'Beautifully curated green spaces that bring freshness, tranquility, and life to your surroundings.', tag: 'LANDSCAPE', img: '/gardening.png', detailedId: 'gardening-design' },
  { num: '12', title: 'Renovation Services', desc: 'Transforming existing spaces with smart upgrades, modern designs, and enhanced functionality.', tag: 'REMODEL', img: '/renovation.png', detailedId: 'renovation-services' },
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
    image: '/false-ceiling.png',
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
  },
  {
    id: 'terrace',
    title: 'Bespoke Terrace Designs',
    subtitle: 'Elevate Your Outdoor Living',
    desc: 'Turn your rooftop into a private oasis. We specialize in luxury terrace transformations featuring BBQ decks, mood lighting, and weather-resistant seating.',
    features: ['Custom BBQ & Bar Decks', 'Weatherproof Outdoor Furniture', 'Automated Mood Lighting', 'Vertical Gardens & Planters'],
    image: '/terrace.png',
    fullDesc: 'We believe your terrace is the ultimate luxury space in an urban environment. Our terrace designs are crafted to provide a seamless transition from indoor comfort to outdoor freedom. We use high-quality, weather-resistant materials for our custom-built BBQ stations and bar decks, ensuring they look great year-round. Our lighting designs create a magical atmosphere at night, while our selection of outdoor furniture and greenery creates a lush, private sanctuary high above the city.',
    benefits: [
      'Increased property value with highly functional and beautiful outdoor space.',
      'A perfect venue for hosting private gatherings, parties, and family dinners.',
      'A personal retreat for relaxation that feels miles away from the city hustle.'
    ]
  },
  {
    id: 'home-theater',
    title: 'Immersive Home Theaters',
    subtitle: 'The Ultimate Cinematic Experience',
    desc: 'Experience the magic of the big screen at home. Our theaters feature professional acoustics, 4K projection, and plush comfort for the ultimate movie night.',
    features: ['Professional Acoustic Paneling', '4K Laser Projection Systems', '7.1 Surround Sound Architecture', 'Luxury Recliner Seating'],
    image: '/hometheater.png',
    fullDesc: 'We bring the professional cinema experience into the intimacy of your home. Our home theater designs focus on the perfect synergy between advanced technology and luxurious comfort. We employ precise acoustic engineering to ensure perfect sound isolation and clarity, using custom wall paneling that complements the aesthetic. With integrated smart controls, you can manage lighting, sound, and projection with a single touch, creating an immersive experience for every screening.',
    benefits: [
      'A private cinema experience tailored to your exact audio-visual preferences.',
      'Superior sound isolation allowing for high-volume viewing without disturbing others.',
      'A versatile entertainment space that adds a significant luxury element to your home.'
    ]
  },
  {
    id: 'gardening-design',
    title: 'Lush Gardening Designs',
    subtitle: 'Nature Reimagined for Your Home',
    desc: 'Bring the serenity of nature into your urban living. We create sustainable, beautiful green spaces that breathe life into your home.',
    features: ['Vertical Green Walls', 'Automated Irrigation Systems', 'Drought-Tolerant Landscaping', 'Custom Planters & Lighting'],
    image: '/gardening.png',
    fullDesc: 'We believe that a well-designed garden is an extension of your home’s soul. Our gardening design service focuses on creating harmonious green retreats that provide psychological tranquility and environmental freshness. We specialize in vertical gardens that maximize small urban spaces and automated irrigation that ensures your plants thrive with minimal effort. Every garden is a bespoke ecosystem designed to flourish in your specific micro-climate.',
    benefits: [
      'Significantly improved air quality and natural temperature regulation.',
      'A private, serene retreat for mental relaxation and stress relief.',
      'Bespoke landscaping that adds immense aesthetic and monetary value.'
    ]
  },
  {
    id: 'renovation-services',
    title: 'Expert Renovation Services',
    subtitle: 'Modernizing Your Legacy Spaces',
    desc: 'Breathe new life into your existing property. We specialize in comprehensive structural and aesthetic upgrades that redefine functionality.',
    features: ['Structural Re-engineering', 'Smart Home Conversions', 'Premium Flooring Upgrades', 'Modern Lighting Integration'],
    image: '/renovation.png',
    fullDesc: 'Renovating a home is about more than just a new coat of paint; it’s about reimagining the potential of your existing space. Our renovation services combine structural integrity with modern design sensibilities. We handle everything from wall removals to open up floor plans to the integration of cutting-edge smart home technologies. We specialize in high-end material upgrades like Italian marble flooring and custom-engineered architectural lighting.',
    benefits: [
      'Complete transformation of outdated layouts into modern, functional spaces.',
      'Enhanced property lifespan with high-quality structural and finish upgrades.',
      'Seamless integration of modern amenities while preserving home character.'
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
                  <s.icon size={16} />
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
              <li><a href="mailto:arinteriorsofficialpune@gmail.com">arinteriorsofficialpune@gmail.com</a></li>
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

  // NEW: Detail Popup State
  const [isDetailOpen, setIsDetailOpen] = useState(false)
  const [activeDetail, setActiveDetail] = useState(null)

  useReveal()

  const openFormForService = (serviceId) => {
    setSelectedService(serviceId)
    setIsFormOpen(true)
  }

  const openDetail = (s) => {
    const detail = DETAILED_SERVICES.find(d => d.id === s.detailedId)
    if (detail) {
      setActiveDetail(detail)
      setIsDetailOpen(true)
    }
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

      <section className="services-grid-section" style={{ padding: '20px 0 40px' }}>
        <div className="container">
          <div className="services-grid">
            {SERVICES.map((s) => (
              <div className="service-card" key={s.num} onClick={() => openDetail(s)}>
                <div className="sc-bg" style={{ backgroundImage: `url(${s.img})` }} />
                <div className="sc-inner">
                  <div className="sc-num">{s.num}</div>
                  <h3 className="sc-title">{s.title.split(' Pune')[0].split(' Designers')[0]}</h3>
                  <div className="sc-link">
                    VIEW DETAILS <span>→</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed Service Popup (Modal) */}
      {isDetailOpen && activeDetail && (
        <div className="detail-modal-overlay" onClick={() => setIsDetailOpen(false)}>
          <div className="detail-modal-content reveal" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setIsDetailOpen(false)}>
              <X size={24} />
            </button>
            <div className="dm-grid">
              <div className="dm-image">
                <img src={activeDetail.image} alt={activeDetail.title} />
              </div>
              <div className="dm-info">
                <span className="dm-badge">ESTABLISHED EXCELLENCE</span>
                <h2 className="dm-title">{activeDetail.title}</h2>
                <h4 className="dm-subtitle">{activeDetail.subtitle}</h4>
                <p className="dm-desc">{activeDetail.fullDesc}</p>

                <div className="dm-features-wrap">
                  <h4>KEY FEATURES</h4>
                  <ul className="dm-features">
                    {activeDetail.features.map((f, i) => (
                      <li key={i}><Star size={14} className="gold-text" /> {f}</li>
                    ))}
                  </ul>
                </div>

                <div className="dm-benefits-wrap">
                  <h4>BENEFITS</h4>
                  <ul className="dm-benefits">
                    {activeDetail.benefits.map((b, i) => (
                      <li key={i}><Check size={14} className="gold-text" /> {b}</li>
                    ))}
                  </ul>
                </div>

                <button className="btn btn-gold" style={{ marginTop: 20, width: '100%', justifyContent: 'center' }} onClick={() => {
                  setIsDetailOpen(false);
                  openFormForService(activeDetail.title);
                }}>
                  ENQUIRE FOR THIS SERVICE →
                </button>
              </div>
            </div>
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
          background: #000000;
          color: #fff;
          overflow-x: hidden;
        }

        .services-hero {
          padding: 80px 0 40px;
          background: linear-gradient(to bottom, #000000, #000000);
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
          font-family: var(--font-poppins);
          font-size: 64px;
          color: rgba(201, 169, 110, 0.1);
          margin-bottom: -10px;
        }

        /* DETAIL MODAL */
        .detail-modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.95);
          backdrop-filter: blur(12px);
          z-index: 9999;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
        }

        .detail-modal-content {
          background: #000000;
          width: 100%;
          max-width: 1100px;
          max-height: 90vh;
          overflow-y: auto;
          position: relative;
          border: 1px solid rgba(201, 169, 110, 0.2);
          border-radius: 4px;
          animation: modalSlide 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }

        @keyframes modalSlide {
          from { opacity: 0; transform: translateY(30px) scale(0.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }

        .modal-close {
          position: absolute;
          top: 24px;
          right: 24px;
          background: none;
          border: none;
          color: #fff;
          cursor: pointer;
          z-index: 10;
          transition: transform 0.3s ease;
        }
        .modal-close:hover { transform: rotate(90deg); color: var(--gold); }

        .dm-grid {
          display: grid;
          grid-template-columns: 1.1fr 1fr;
          min-height: 400px;
        }

        .dm-image {
          position: relative;
          background: #000;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .dm-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          opacity: 0.85;
        }

        .dm-info {
          padding: 40px;
          display: flex;
          flex-direction: column;
        }

        .dm-badge {
          font-size: 10px;
          letter-spacing: 0.4em;
          color: var(--gold);
          margin-bottom: 20px;
        }

        .dm-title {
          font-family: var(--font-display);
          font-size: 38px;
          line-height: 1.1;
          margin-bottom: 8px;
        }

        .dm-subtitle {
          color: rgba(255,255,255,0.4);
          font-size: 14px;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          margin-bottom: 24px;
          font-weight: 500;
        }

        .dm-desc {
          color: rgba(232,224,212,0.7);
          font-size: 15px;
          line-height: 1.7;
          margin-bottom: 32px;
        }

        .dm-features-wrap h4, .dm-benefits-wrap h4 {
           font-size: 12px;
           letter-spacing: 0.15em;
           color: var(--gold);
           margin-bottom: 16px;
           margin-top: 24px;
        }

        .dm-features, .dm-benefits {
          list-style: none;
          display: grid;
          grid-template-columns: 1fr;
          gap: 12px;
        }

        .dm-features li, .dm-benefits li {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          font-size: 14px;
          color: rgba(255,255,255,0.9);
        }

        @media (max-width: 900px) {
          .dm-grid { grid-template-columns: 1fr; }
          .dm-image { height: 300px; }
          .dm-info { padding: 40px 24px; }
          .dm-title { font-size: 28px; }
        }      align-items: center;
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
          background: #000000;
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
