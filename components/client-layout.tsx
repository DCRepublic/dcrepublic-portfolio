"use client"

import { useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { LayoutGroup } from "framer-motion"
import { usePathname } from "next/navigation"
import { HeroNav } from "@/components/hero-nav"
import { LoadingScreen } from "@/components/loading-screen"

export function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  useEffect(() => {
    document.body.style.overflow = pathname === "/" ? "hidden" : ""
  }, [pathname])

  return (
    <LayoutGroup id="route-shell">
      <LoadingScreen />
      <HeroNav />

      {pathname === "/" ? (
        children
      ) : (
        <AnimatePresence mode="wait">
          <motion.div
            key={pathname}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}

            transition={{ duration: 0.3, ease: [0.22, 0.61, 0.36, 1] }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      )}
    </LayoutGroup>
  )
}
