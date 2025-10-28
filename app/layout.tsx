import type React from "react"
import type { Metadata } from "next"
import { Playfair_Display, Lato } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import ScrollToTop from "@/components/scroll-to-top"
import "./globals.css"

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
})
const lato = Lato({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-sans",
})

export const metadata: Metadata = {
  title: "Okediji Femi Art Studio",
  description: "Contemporary sculpture and artistic expressions",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${playfairDisplay.variable} ${lato.variable}`}>
      <body className={`font-sans antialiased`}>
        {children}
        <ScrollToTop />
        <Analytics />
      </body>
    </html>
  )
}
