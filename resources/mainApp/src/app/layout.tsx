import type { Metadata } from 'next'
import '@/styles/styles.scss'
import GlobalProvider from './GlobalProvider'
import ModalSearch from '@/components/Modal/ModalSearch'
import { Suspense } from 'react'
import Loading from '@/components/Other/Loading'
import { WhatsApp } from '@/components/Other/WhatsApp'


export const metadata: Metadata = {
  title: 'Zhindaya',
  description: 'biggest umkm pashion store in indonesia',
  keywords: 'umkm, pashion, store, indonesia',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
      <GlobalProvider>
        <html lang="en">
          <head>
          <link rel="canonical" href="https://zhindaya.com" />
          </head>
          <body >
          <Suspense fallback={<Loading />} >
            {children}
            </Suspense>
            <ModalSearch />
            <WhatsApp />
          </body>
        </html>
      </GlobalProvider>

  )
}
