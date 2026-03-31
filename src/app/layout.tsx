import type { Metadata } from 'next'
import '@/styles/globals.css'

export const metadata: Metadata = {
  title: 'JustFyle.ai — AI Tax Filing',
  description: 'File your taxes in 10 minutes with AI. CPA-reviewed. Free tax planning report included.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-surface-100 text-gray-900 min-h-screen">
        {children}
      </body>
    </html>
  )
}
