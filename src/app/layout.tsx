import './globals.css'
import 'the-new-css-reset/css/reset.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Providers from '@/common/config/reactQuery/Providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'next13-boilerplate-v3',
  description: 'next13-boilerplate-v3',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <head>
        <link rel='apple-touch-icon' sizes='180x180' href='/apple-touch-icon.png' />
        <link rel='icon' type='image/png' sizes='32x32' href='/favicon-32x32.png' />
        <link rel='icon' type='image/png' sizes='16x16' href='/favicon-16x16.png' />
        <link rel='manifest' href='/site.webmanifest' />
        <meta name='msapplication-TileColor' content='#da532c' />
        <meta name='theme-color' content='#ffffff' />

        <link rel='shortcut icon' href='/favicon.ico' />
        {/* <link rel='canonical' href='/' /> */}
        <meta name='author' content='author' />
        <meta name='keywords' content='next13-boilerplate-v3' />
        <meta name='application-name' content='next13-boilerplate-v3' />
        <meta name='mobile-web-app-capable' content='yes' />
        <meta name='apple-mobile-web-app-title' content='next13-boilerplate-v3' />
        <meta name='apple-mobile-web-app-capable' content='yes' />
        <meta name='apple-mobile-web-app-status-bar-style' content='black' />
        <meta name='subject' content='next13-boilerplate-v3' />
        <meta name='rating' content='general' />
        <meta name='robots' content='index,follow' />
        <meta name='revisit-after' content='3 days' />
        <meta httpEquiv='X-UA-Compatible' content='IE=edge' />
      </head>
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
