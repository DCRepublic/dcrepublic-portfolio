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

  return <></>
}
