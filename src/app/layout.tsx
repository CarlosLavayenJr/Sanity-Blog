import './globals.css'

export const metadata = {
  title: 'Next.js Blog with Sanity',
  description: 'A blog built with Next.js and Sanity.io',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50">{children}</body>
    </html>
  )
}
