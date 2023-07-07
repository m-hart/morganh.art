import NavBar from '@/components/nav/NavBar'
import './globals.scss'
import { Inter } from 'next/font/google'
import NavLink from '@/components/nav/NavLink'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'morganh.art',
  description: 'dog generator',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NavBar>
          <NavLink
            href='/'
            title='home'
          />
          <NavLink
            href='/about'
            title='about'
          />
          <NavLink 
            href='/portfolio'
            title='portfolio'
          />
        </NavBar>
        {children}
      </body>
    </html>
  )
}
