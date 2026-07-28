"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence, LayoutGroup } from "framer-motion"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"
import anime from "animejs"

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
  const navRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches

    if (!reduceMotion && navRef.current) {
      const links =
        navRef.current.querySelectorAll<HTMLElement>("a[data-magnetic]")
      const cleanupFns: Array<() => void> = []

      links.forEach((el) => {
        const onMouseMove = (e: MouseEvent) => {
          const rect = el.getBoundingClientRect()
          const relX = e.clientX - rect.left - rect.width / 2
          const relY = e.clientY - rect.top - rect.height / 2
          anime({
            targets: el,
            translateX: relX * 0.28,
            translateY: relY * 0.5,
            duration: 400,
            easing: "easeOutQuad",
          })
        }

        const onMouseLeave = () => {
          anime({
            targets: el,
            translateX: 0,
            translateY: 0,
            duration: 600,
            easing: "easeOutElastic(1, 0.5)",
          })
        }

        el.addEventListener("mousemove", onMouseMove)
        el.addEventListener("mouseleave", onMouseLeave)
        cleanupFns.push(() => {
          el.removeEventListener("mousemove", onMouseMove)
          el.removeEventListener("mouseleave", onMouseLeave)
        })
      })

      return () => {
        cleanupFns.forEach((fn) => fn())
      }
    }
  }, [pathname])

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
    <LayoutGroup>
      {/* Nav state — compact bar at top with name + buttons */}
      {pathname != "/" && (
        <div>
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

                  <nav
                    ref={navRef}
                    className={`hidden w-full gap-1.5 md:grid ${navItems.length === 4 ? "grid-cols-4" : "grid-cols-5"} md:w-[min(80vw,40rem)] md:gap-2`}
                  >
                    {navItems.map((item) => (
                      <Link
                        data-magnetic
                        key={item.label}
                        href={item.href}
                        target={item.external ? "_blank" : undefined}
                        rel={item.external ? "noopener noreferrer" : undefined}
                        className="hero-nav-link w-full text-center"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </nav>

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
        </div>
      )}

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
