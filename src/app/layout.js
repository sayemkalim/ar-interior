import { Poppins } from 'next/font/google'
import Script from 'next/script'
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
      <head>
        {/* Google Analytics */}
        <Script async src="https://www.googletagmanager.com/gtag/js?id=G-FRLLHZ1W61" strategy="afterInteractive" />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-FRLLHZ1W61');
          `}
        </Script>

        {/* Meta Pixel */}
        <Script id="meta-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '1556594385893673');
            fbq('track', 'PageView');
          `}
        </Script>
        <noscript>
          <img height="1" width="1" style={{ display: 'none' }}
            src="https://www.facebook.com/tr?id=1556594385893673&ev=PageView&noscript=1"
          />
        </noscript>
      </head>
      <body style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
        {children}
      </body>
    </html>
  )
}

