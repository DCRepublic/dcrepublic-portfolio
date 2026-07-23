"use client"

import { createContext, useContext, useState, useCallback, ReactNode } from "react"

interface NavigationState {
  isHeroMode: boolean
  isFirstLoad: boolean
  setHeroMode: (mode: boolean) => void
  setFirstLoad: (loaded: boolean) => void
}

const NavigationContext = createContext<NavigationState | null>(null)

export function NavigationProvider({ children }: { children: ReactNode }) {
  const [isHeroMode, setHeroMode] = useState(true)
  const [isFirstLoad, setFirstLoad] = useState(true)

  const handleSetHeroMode = useCallback((mode: boolean) => {
    setHeroMode(mode)
  }, [])

  const handleSetFirstLoad = useCallback((loaded: boolean) => {
    setFirstLoad(loaded)
  }, [])

  return (
    <NavigationContext.Provider
      value={{ isHeroMode, isFirstLoad, setHeroMode: handleSetHeroMode, setFirstLoad: handleSetFirstLoad }}
    >
      {children}
    </NavigationContext.Provider>
  )
}

export function useNavigation() {
  const ctx = useContext(NavigationContext)
  if (!ctx) throw new Error("useNavigation must be used within NavigationProvider")
  return ctx
}
