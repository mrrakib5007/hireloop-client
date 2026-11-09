import type { Metadata, Viewport } from "next"
import { Geist, Geist_Mono } from "next/font/google"

import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils"
import { Toaster } from "react-hot-toast"

export const metadata: Metadata = {
  title: "HireLoop - Find Your Dream Job Today",
  description:
    "HireLoop connects top talent with world-class companies. Browse thousands of curated opportunities and land your next role - faster.",
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
}

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" })

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "dark antialiased",
        fontMono.variable,
        "font-sans",
        geist.variable
      )}
    >
      <body
        suppressHydrationWarning
        className="overflow-x-hidden bg-neutral-950 text-white"
      >
        <ThemeProvider>          
          <Toaster position="top-center" reverseOrder={false} />
          {children}          
        </ThemeProvider>
      </body>
    </html>
  )
}
