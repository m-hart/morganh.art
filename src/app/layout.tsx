import NavBar from '@/components/nav/NavBar'
import { Inter } from 'next/font/google'
import NavLink from '@/components/nav/NavLink'
import './globals.scss'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'morganh.art',
  description: 'portfolio and dog generator',
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
        {/* Some times I'm just lazy */}
        <div style={{ margin: 'var(--small-gutter)' }}>
          {children}
        </div>
      </body>
    </html>
  )
}
