import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import Header from '@/components/UI/layout/header'
import { Providers } from '@/providers/hero-ui-provider'
import { siteConfig } from '@/config/site.config'
import { layoutConfig } from '@/config/layout.config'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: siteConfig.title,
  description: siteConfig.description,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ru">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          <Header />
          <main
            className={`flex flex-col h-[calc(100vh-${layoutConfig.headerHeight}-${layoutConfig.footerHeight})] w-full justify-start items-center`}
          >
            {children}
          </main>
          <footer
            className={`flex h-[${layoutConfig.footerHeight}] justify-center items-center`}
          >
            <p>
              {siteConfig.description} | {new Date().getFullYear()}
            </p>
          </footer>
        </Providers>
      </body>
    </html>
  )
}
