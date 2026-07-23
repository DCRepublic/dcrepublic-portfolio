"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { usePathname } from "next/navigation"
import { NoiseGrain } from "@/components/noise-grain"

const fullName = "Damian René"
const typingSpeed = 80
const pauseBeforeExit = 500

export function LoadingScreen({ duration = 1500 }: { duration?: number }) {
  const pathname = usePathname()

  // Only show loading screen on home page — bail out immediately for everything else
  if (pathname !== "/") return null

  const [loaded, setLoaded] = useState(false)
  const [typedIndex, setTypedIndex] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), duration)
    return () => clearTimeout(timer)
  }, [duration])

  useEffect(() => {
    if (loaded) return

    const typingTimer = setInterval(() => {
      setTypedIndex((prev) => {
        if (prev >= fullName.length - 1) {
          clearInterval(typingTimer)
          setTimeout(() => setLoaded(true), pauseBeforeExit)
          return prev
        }
        return prev + 1
      })
    }, typingSpeed)

    return () => clearInterval(typingTimer)
  }, [loaded])

  const displayedText = fullName.slice(0, typedIndex + 1)

  return (
    <AnimatePresence>
      {!loaded && (
        <motion.div
          className="fixed inset-0 z-9999 flex items-center justify-center overflow-hidden bg-background"
          initial={{ opacity: 1 }}
          animate={{ opacity: loaded ? 0 : 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
        >
          <NoiseGrain
            className="pointer-events-none absolute inset-0 h-full w-full"
            opacity={0.035}
          />
          <motion.div
            initial={{ scale: 1, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3, ease: [0.22, 0.61, 0.36, 1] }}
            className="relative z-10 text-center"
          >
            <p className="mb-31 text-[clamp(56px,10vw,120px)] leading-[0.9] font-medium tracking-tighter text-foreground">
              {displayedText}
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
