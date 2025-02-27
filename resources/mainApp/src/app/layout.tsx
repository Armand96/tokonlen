import type { Metadata } from 'next'
import { Instrument_Sans } from 'next/font/google'
import '@/styles/styles.scss'
import GlobalProvider from './GlobalProvider'
import ModalWishlist from '@/components/Modal/ModalWishlist'
import ModalSearch from '@/components/Modal/ModalSearch'
import ModalQuickview from '@/components/Modal/ModalQuickview'
import ModalCompare from '@/components/Modal/ModalCompare'
import { Suspense } from 'react'
import Loading from '@/components/Other/Loading'
import { WhatsApp } from '@/components/Other/WhatsApp'

const instrument = Instrument_Sans({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Zhindaya',
  description: 'biggest umkm pashion store in indonesia',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
      <GlobalProvider>
        <html lang="en">
          <body className={instrument.className}>
          <Suspense fallback={<Loading />} >
            {children}
            </Suspense>
            <ModalWishlist />
            <ModalSearch />
            <ModalQuickview />
            <ModalCompare />
            <WhatsApp />
          </body>
        </html>
      </GlobalProvider>

  )
}
