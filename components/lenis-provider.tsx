"use client"

import { ReactNode, useEffect, useRef } from "react"
import Lenis from "@studio-freight/lenis"

export function LenisProvider({ children }: { children: ReactNode }) {
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    const lenis = new Lenis({
      smoothWheel: true,
      syncTouch: true,
      touchMultiplier: 2,
      lerp: 0.12,
    })

    function raf(time: number) {
      lenis.raf(time)
      rafRef.current = requestAnimationFrame(raf)
    }

    rafRef.current = requestAnimationFrame(raf)

    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current)
      }
      lenis.destroy()
    }
  }, [])

  return <>{children}</>
}
