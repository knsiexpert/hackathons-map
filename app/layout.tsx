import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'Hackathons Calendar - Kalendarz Hackathonów',
  description: 'Interaktywna mapa i kalendarz hackathonów zbudowana w Next.js z TypeScript i Tailwind CSS. Dwa widoki: miesięczny kalendarz oraz lista z filtrowaniem i sortowaniem.',
  openGraph: {
    title: 'Hackathons Calendar - Kalendarz Hackathonów',
    description: 'Interaktywna mapa i kalendarz hackathonów. Sortuj, filtruj i planuj swoją przygodę!',
    url: 'https://knsiexpert.github.io/hackathons-calendar/',
    siteName: 'Hackathons Calendar',
    images: [
      {
        url: 'https://knsiexpert.github.io/hackathons-calendar/open-graph-image.jpg',
        width: 1920,
        height: 1080,
        alt: 'Hackathons Calendar Preview',
      },
    ],
    locale: 'pl_PL',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hackathons Calendar - Kalendarz Hackathonów',
    description: 'Interaktywna mapa i kalendarz hackathonów. Sortuj, filtruj i planuj swoją przygodę!',
    images: ['https://knsiexpert.github.io/hackathons-calendar/open-graph-image.jpg'],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
