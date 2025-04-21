import type { Metadata } from 'next'
import '@/styles/styles.scss'
import GlobalProvider from './GlobalProvider'
import ModalSearch from '@/components/Modal/ModalSearch'
import { Suspense } from 'react'
import Loading from '@/components/Other/Loading'
import { WhatsApp } from '@/components/Other/WhatsApp'


export const metadata: Metadata = {
  title: 'Zhindaya',
  description: 'one of the biggest umkm fashion store in indonesia',
  keywords: 'umkm, fashion, store, indonesia',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
    const host = process.env.NEXT_PUBLIC_URL;
  return (
    <GlobalProvider>
      <html lang="en">
        <head>
          <link rel="canonical" href="https://zhindaya.com" />
          <link rel="icon" href={`${host}image/favicon.png`} type="image/png" sizes="any" />
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
