import { Geist, Geist_Mono, Inter } from "next/font/google"

import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { LenisProvider } from "@/components/lenis-provider"
import { ClientLayout } from "@/components/client-layout"
import { cn } from "@/lib/utils"
import localFont from "next/font/local"

//const inter = Inter({ subsets: ["latin"], variable: "--font-sans" })
const sfPro = localFont({
  src: [
    {
      path: "../fonts/SF-Pro-Display-Regular.otf",
      weight: "100",
      style: "normal",
    },
  ],
  variable: "--font-sans", // Creates a CSS variable
})
const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export const metadata = {
  title: "Damian René — Full Stack Developer & Photographer",
  description: "Building software, designing experiences, capturing moments.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn("antialiased", sfPro.variable, "font-sans", sfPro.variable)}
    >
      <body>
        <ThemeProvider>
          <LenisProvider>
            <ClientLayout>{children}</ClientLayout>
          </LenisProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
