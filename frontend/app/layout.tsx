import type { Metadata } from 'next'
import '@/styles/globals.css'

export const metadata: Metadata = {
  title: 'MEMORA - Social Crypto Trading',
  description: 'Remember the moves that matter. Discover, trade, and follow crypto with MEMORA.',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <meta name="theme-color" content="#F5F5F7" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="MEMORA" />
        <script src="https://telegram.org/js/telegram-web-app.js"></script>
      </head>
      <body suppressHydrationWarning>
        {children}
      </body>
    </html>
  )
}
