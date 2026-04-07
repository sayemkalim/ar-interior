import { Playfair_Display, DM_Sans } from 'next/font/google'
import './globals.css'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
  weight: ['400', '600', '700'],
  style: ['normal', 'italic'],
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
  weight: ['300', '400', '500', '600'],
})

export const metadata = {
  title: 'A R Interiors – Premium Interior Designers in Pune',
  description: 'Award-winning interior designers in Pune. Modular kitchens, living rooms, bedrooms. Free site visit. 45-day delivery.',
  keywords: 'interior designers pune, modular kitchen pune, home interior design, AR Interiors',
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${playfair.variable} ${dmSans.variable}`}>
      <body style={{ fontFamily: 'var(--font-dm-sans), sans-serif' }}>
        {children}
      </body>
    </html>
  )
}
