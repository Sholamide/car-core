import {Navbar, Footer} from '@/components'
import './globals.css'

export const metadata = {
  title: 'Car Core',
  description: 'Drive Smarter, Drive Connected.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="relative"><Navbar/>{children}<Footer/></body>
    </html>
  )
}
