import { Poppins } from 'next/font/google'
import './globals.css'

const poppins = Poppins({
  subsets: ['latin'],
  variable: '--font-poppins',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700', '800'],
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
    <html lang="en" className={`${poppins.variable}`}>
      <body style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
        {children}
      </body>
    </html>
  )
}

