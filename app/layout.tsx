import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

//components
import SideNav from '@/components/sidenav'

//styles
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Inventory Software!',
  description: 'Make warehouse work good.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SideNav />
        {children}
      </body>
    </html>
  )
}
