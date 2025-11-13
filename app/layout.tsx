import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'AI Social Media Agent',
  description: 'Intelligent agent for managing all your social media platforms',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
