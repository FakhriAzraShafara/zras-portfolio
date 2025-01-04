import './globals.css'
import { Inter } from 'next/font/google'
import { ThemeProvider } from "@/components/theme-provider"
import { Navigation } from "@/components/navigation"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Fakhri Azra Shafara - Portfolio',
  description: 'Portfolio of Fakhri Azra Shafara, a Computer Science graduate specializing in web and application development.',
  icons: {
    // Favicon ICO
    icon: '/favicon_io/favicon.ico',
    // Favicon PNG dengan ukuran berbeda
    shortcut: [
      { url: '/favicon_io/favicon-16x16.png', sizes: '16x16' },
      { url: '/favicon_io/favicon-32x32.png', sizes: '32x32' }
    ],
    // Icon untuk Chrome Android
    android: [
      { url: '/favicon_io/android-chrome-192x192.png', sizes: '192x192' },
      { url: '/favicon_io/android-chrome-512x512.png', sizes: '512x512' },
    ],
    // Icon untuk Apple Touch
    apple: '/favicon_io/apple-touch-icon.png',
  },
  // Manifest untuk PWA
  manifest: '/favicon_io/site.webmanifest',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <style>
          {`
            .bg-dot-pattern {
              background-image: radial-gradient(circle, currentColor 1px, transparent 1px);
              background-size: 24px 24px;
            }
            .bg-grid-pattern {
              background-image: linear-gradient(currentColor 1px, transparent 1px),
                              linear-gradient(to right, currentColor 1px, transparent 1px);
              background-size: 24px 24px;
            }
          `}
        </style>
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="min-h-screen bg-background font-sans antialiased">
            <Navigation />
            <main>
              {children}
            </main>
          </div>
        </ThemeProvider>
        <Toaster />
      </body>
    </html>
  )
}

