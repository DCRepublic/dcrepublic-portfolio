"use client"

import { useState, useEffect, useCallback } from "react"
import { AnimatePresence, LayoutGroup } from "framer-motion"
import { Menu, X } from "lucide-react"
import { usePathname, useRouter } from "next/navigation"

import { cn } from "@/lib/utils"

const navItems = [
  { label: "Resume", href: "/resume.pdf", external: true },
  { label: "Projects", href: "/projects" },
  { label: "Photography", href: "/photography" },
  { label: "About", href: "/about" },
]

export function Navigation() {
  const router = useRouter()
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  const isHeroMode = pathname === "/" && !scrolled

  useEffect(() => {
    const updateScrollState = () => {
      setScrolled(window.scrollY > 120)
    }

    updateScrollState()
    window.addEventListener("scroll", updateScrollState, { passive: true })

    return () => {
      window.removeEventListener("scroll", updateScrollState)
    }
  }, [])

  useEffect(() => {
    setScrolled(window.scrollY > 120)
    setMenuOpen(false)
  }, [pathname])

  const navigateTo = useCallback(
    (href: string, external?: boolean) => {
      if (external) {
        window.open(href, "_blank", "noopener,noreferrer")
        return
      }

      setMenuOpen(false)
      router.push(href)
    },
    [router]
  )

  const handleHomeClick = useCallback(() => {
    if (pathname === "/" && !scrolled) return

    if (pathname !== "/") {
      router.push("/")
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }, [pathname, router, scrolled])

  return (
    <LayoutGroup id="navigation">
      <header
        className={cn(
          "pointer-events-none fixed inset-x-0 z-50",
          isHeroMode ? "inset-y-0" : "top-3"
        )}
      >
        <div
          className={cn(
            "mx-6 h-full md:mx-[calc(1.5rem+1.5vw)]",
            isHeroMode
              ? "flex items-center justify-center"
              : "flex items-start justify-center"
          )}
        >
          <nav
            className={cn(
              "pointer-events-auto w-full overflow-hidden",
              isHeroMode
                ? "backdrop-blur-0 max-w-3xl border-0 bg-transparent shadow-none"
                : "rounded-4xl border border-border bg-background/80 px-6 py-4 backdrop-blur-xl"
            )}
            style={
              isHeroMode
                ? {
                    borderColor: "transparent",
                    boxShadow: "none",
                    backgroundColor: "transparent",
                    backdropFilter: "none",
                  }
                : {
                    boxShadow:
                      "0 1px 0 rgba(0,0,0,0.08), 0 8px 32px rgba(0,0,0,0.06)",
                  }
            }
          >
            <div
              className={cn(
                "flex w-full",
                isHeroMode
                  ? "items-center justify-center"
                  : "items-center justify-between gap-6"
              )}
            >
              {!isHeroMode && (
                <button
                  onClick={handleHomeClick}
                  className="text-sm font-medium tracking-tight text-foreground"
                >
                  Damian René
                </button>
              )}

              {isHeroMode ? (
                <div className="pointer-events-none hidden" />
              ) : (
                <div className="grid w-full grid-cols-4 gap-2 md:ml-auto md:w-[min(40vw,36rem)]">
                  {navItems.map((item) => (
                    <button
                      key={item.label}
                      onClick={() => navigateTo(item.href, item.external)}
                      className="rounded-full border border-border px-5 py-2.5 text-sm text-foreground transition-all duration-300 hover:border-foreground/30 hover:shadow-[0_8px_32px_rgba(0,0,0,0.08)] w-full bg-background/30 text-center"
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              )}

              {!isHeroMode && (
                <button
                  className="md:hidden"
                  onClick={() => setMenuOpen(!menuOpen)}
                  aria-label="Toggle menu"
                >
                  {menuOpen ? <X size={18} /> : <Menu size={18} />}
                </button>
              )}
            </div>
          </nav>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && !isHeroMode && (
          <div
            className="fixed inset-0 z-40 bg-background/95 backdrop-blur-xl md:hidden"
          >
            <div className="flex h-full flex-col items-center justify-center gap-10">
              {navItems.map((item, index) => (
                <button
                  key={item.label}
                  onClick={() => navigateTo(item.href, item.external)}
                  className="text-3xl font-medium tracking-tight text-muted-foreground transition-colors hover:text-foreground"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </AnimatePresence>
    </LayoutGroup>
  )
}
