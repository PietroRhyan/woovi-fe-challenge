import type { Metadata } from 'next'
import { Nunito } from 'next/font/google'
import './globals.css'

import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'

import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'

const nunito = Nunito({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Woovi | Método de Pagamento',
  description: 'Code Challenge da Woovi para o cargo de Frontend Júnior',
  authors: {
    name: 'Pietro Rhyan',
  },
  robots: 'index, folow',
}

export default async function RootLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode
  params: { locale: string }
}>) {
  const messages = await getMessages()

  return (
    <html lang={locale}>
      <body className={`${nunito.className} bg-white text-black`}>
        <NextIntlClientProvider messages={messages}>
          <Navbar />
          {children}
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
