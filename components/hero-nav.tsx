"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence, LayoutGroup } from "framer-motion"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"

interface NavItem {
  label: string
  href: string
  external?: boolean
}

const defaultNavItems = [
  { label: "Resume", href: "/resume.pdf", external: true },
  { label: "Projects", href: "/projects" },
  { label: "Photography", href: "/photography" },
  { label: "About", href: "/about" },
]

const ease = [0.22, 0.61, 0.36, 1] as const

export function HeroNav() {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)
  const [blogAvailable, setBlogAvailable] = useState<boolean | null>(null)

  useEffect(() => {
    fetch("https://damianrene.dev/rss/")
      .then((res) => {
        if (res.ok) setBlogAvailable(true)
        else setBlogAvailable(false)
      })
      .catch(() => setBlogAvailable(false))
  }, [])

  const navItems =
    blogAvailable === true
      ? [...defaultNavItems, { label: "Blog", href: "/blog" }]
      : defaultNavItems

  const isHero = pathname === "/"
  const isSubpage = !isHero

  return (
    <LayoutGroup id="hero-nav">
      {pathname === "/" && (
        <div>
          {/* Hero state — centered on screen with title + subtitle + buttons */}
          <motion.div
            className="pointer-events-none fixed inset-0 z-50"
            animate={{
              opacity: isHero ? 1 : 0,
              scale: isHero ? 1 : 0.95,
              y: isHero ? 0 : -30,
            }}
            transition={{ duration: 0.3, ease }}
            style={{ pointerEvents: isHero ? "auto" : "none" }}
          >
            <div className="flex h-[100dvh] w-full items-center justify-center">
              <div className="pointer-events-auto mx-6 md:mx-[calc(1.5rem+1.5vw)]">
                <div className="text-center text-[clamp(56px,10vw,120px)] leading-[0.9] font-medium tracking-tighter text-foreground">
                  Damian René
                </div>

                <motion.p
                  layoutId="hero-subtitle"
                  className="mt-4 text-center text-lg text-muted-foreground md:text-xl"
                >
                  Full Stack Developer
                </motion.p>

                <motion.div
                  layoutId="hero-buttons"
                  className="mt-10 flex flex-wrap items-center justify-center gap-3"
                >
                  {navItems.map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      className="rounded-full border border-border bg-background/80 px-5 py-2.5 text-sm text-foreground transition-all duration-300 hover:border-foreground/30 hover:shadow-[0_8px_32px_rgba(0,0,0,0.08)]"
                    >
                      {item.label}
                    </Link>
                  ))}
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Nav state — compact bar at top with name + buttons */}
      <motion.div
        className="pointer-events-none fixed inset-x-0 z-50"
        animate={{
          opacity: isSubpage ? 1 : 0,
          y: isSubpage ? 0 : -20,
        }}
        transition={{ duration: 0.7, ease }}
        style={{ pointerEvents: isSubpage ? "auto" : "none" }}
      >
        <div className="pt-3 md:pt-[calc(1rem+0.5vw)]">
          <div className="pointer-events-auto mx-3 md:mx-[calc(0.75rem+0.5vw)]">
            <div
              className="rounded-4xl border border-border bg-background/80 px-6 py-3 backdrop-blur-xl"
              style={{
                boxShadow:
                  "0 1px 0 rgba(0,0,0,0.08), 0 8px 32px rgba(0,0,0,0.06)",
              }}
            >
              <div className="flex w-full items-center justify-between gap-4 md:gap-6">
                <Link
                  href="/"
                  className="text-sm font-medium tracking-tight text-foreground"
                >
                  <motion.span layoutId="hero-title" className="inline">
                    Damian René
                  </motion.span>
                </Link>

                <div
                  className={`grid w-full gap-1.5 ${navItems.length === 4 ? "grid-cols-4" : "grid-cols-5"} md:w-[min(80vw,40rem)] md:gap-2`}
                >
                  {navItems.map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      target={item.external ? "_blank" : undefined}
                      rel={item.external ? "noopener noreferrer" : undefined}
                      className="w-full rounded-full border border-border bg-background/30 px-5 py-2.5 text-center text-sm text-foreground shadow-sm transition-all duration-300 hover:border-foreground/30 hover:shadow-[0_8px_32px_rgba(0,0,0,0.08)]"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>

                <button
                  className="md:hidden"
                  onClick={() => setMenuOpen(!menuOpen)}
                  aria-label="Toggle menu"
                >
                  {menuOpen ? <X size={18} /> : <Menu size={18} />}
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {menuOpen && isSubpage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, ease }}
            className="fixed inset-0 z-40 bg-background/95 backdrop-blur-xl md:hidden"
          >
            <div className="flex h-full flex-col items-center justify-center gap-10">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  target={item.external ? "_blank" : undefined}
                  rel={item.external ? "noopener noreferrer" : undefined}
                  className="text-3xl font-medium tracking-tight text-muted-foreground transition-colors hover:text-foreground"
                  onClick={() => setMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </LayoutGroup>
  )
}
