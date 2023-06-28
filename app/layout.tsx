import {Navbar, Footer} from '@/components'
import './globals.css'

export const metadata = {
  title: 'Car Core',
  description: 'Driving Your Dreams, One Click at a Time',
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
