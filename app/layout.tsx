import { Geist, Geist_Mono } from "next/font/google"

// declare global plausible to satisfy TypeScript for the inline script
declare let plausible: any

import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { LenisProvider } from "@/components/lenis-provider"
import { ClientLayout } from "@/components/client-layout"
import { cn } from "@/lib/utils"
import localFont from "next/font/local"
import { HeroNav } from "@/components/hero-nav"

const bricolage = Geist({
  subsets: ["latin"],
  variable: "--font-heading",
})

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
      className={cn(
        "antialiased",
        sfPro.variable,
        "font-sans",
        bricolage.variable
      )}
    >
      <head>
        <script
          async
          src="https://plausible.damianrene.dev/js/pa-SDJD1EULdUOFnCWQZoMUC.js"
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
            window.plausible = window.plausible || function () {
              (window.plausible.q = window.plausible.q || []).push(arguments)
            }
            window.plausible.init = window.plausible.init || function (i) {
              window.plausible.o = i || {}
            }
            window.plausible.init()
          `,
          }}
        />
      </head>

      <body>
        {/* <ThemeProvider> */}
        <LenisProvider>
          <HeroNav />
          <ClientLayout>{children}</ClientLayout>
        </LenisProvider>
        {/* </ThemeProvider> */}
      </body>
    </html>
  )
}
