"use client"

import { useEffect, useRef } from "react"
import anime from "animejs"
import { NoiseGrain } from "./noise-grain"

export function HeroHome() {
  const headingRef = useRef<HTMLHeadingElement>(null)
  const blobState = useRef({ scale: 0 })

  useEffect(() => {
    if (!headingRef.current) return

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches
    const words = headingRef.current.querySelectorAll<HTMLSpanElement>(".word")

    // Split words into characters
    words.forEach((word) => {
      const text = word.textContent || ""
      word.textContent = ""
      for (let i = 0; i < text.length; i++) {
        const ch = text[i]
        const span = document.createElement("span")
        span.className = "char"
        span.textContent = ch === " " ? "\u00A0" : ch
        word.appendChild(span)
      }
    })

    const heading = headingRef.current
    if (!heading) return

    const newChars = Array.from(heading.querySelectorAll<HTMLElement>(".char"))

    if (!reduceMotion) {
      // Randomize each char's starting rotation/offset for a scattered burst-in
      newChars.forEach((el) => {
        el.dataset.rz = (Math.random() * 50 - 25).toFixed(1)
        el.dataset.y = (40 + Math.random() * 60).toFixed(0)
        el.dataset.x = (Math.random() * 30 - 15).toFixed(1)
      })

      const tl = anime.timeline({ easing: "easeOutExpo" })

      // Viewfinder brackets snap in like an autofocus lock
      tl.add({
        targets: ".vf-corner",
        opacity: [0, 0.4],
        scale: [1.6, 1],
        duration: 550,
        delay: anime.stagger(70),
      })
        // Blob eases in from center
        .add(
          {
            targets: blobState.current,
            scale: [0, 1],
            duration: 1000,
            easing: "easeOutElastic(1, 0.6)",
          } as any,
          "-=350"
        )
        .add(
          {
            targets: ".eyebrow",
            opacity: [0, 1],
            translateY: [-16, 0],
            scale: [0.85, 1],
            duration: 550,
          },
          "-=800"
        )
        // Characters fly in scattered, rotated and blurred, then snap into place
        .add(
          {
            targets: newChars,
            translateY: (el: HTMLElement) => [
              `${(el as HTMLElement).dataset.y}px`,
              "0px",
            ],
            translateX: (el: HTMLElement) => [
              `${(el as HTMLElement).dataset.x}px`,
              "0px",
            ],
            rotateZ: (el: HTMLElement) => [
              `${(el as HTMLElement).dataset.rz}deg`,
              "0deg",
            ],
            scale: [1.6, 1],
            filter: ["blur(14px)", "blur(0px)"],
            opacity: [0, 1],
            duration: 900,
            delay: anime.stagger(26),
            easing: "easeOutElastic(1, 0.75)",
          } as any,
          "-=350"
        )
        .add(
          {
            targets: ".subtitle",
            opacity: [0, 1],
            translateY: [18, 0],
            duration: 650,
          },
          "-=500"
        )
        .add(
          {
            targets: "nav a",
            opacity: [0, 1],
            translateY: [30, 0],
            rotateZ: (_: HTMLElement, i: number) => (i % 2 === 0 ? -6 : 6),
            scale: [0.7, 1],
            duration: 750,
            delay: anime.stagger(90),
            easing: "easeOutElastic(1, 0.6)",
          } as any,
          "-=400"
        )
        .add(
          {
            targets: ".hud",
            opacity: [0, 0.6],
            duration: 500,
            delay: anime.stagger(120),
          },
          "-=350"
        )

      // Magnetic nav buttons
      const navLinks = document.querySelectorAll<HTMLElement>("[data-magnetic]")
      navLinks.forEach((el) => {
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
      })
    } else {
      blobState.current.scale = 1
      document.querySelectorAll(".eyebrow, .subtitle, nav a").forEach((el) => {
        ;(el as HTMLElement).style.opacity = "1"
      })
    }

    // Ambient cursor-following blob
    const blob = document.getElementById("blob") as HTMLElement | null
    if (!blob) return

    let mouseX = window.innerWidth / 2
    let mouseY = window.innerHeight / 2
    let blobX = mouseX
    let blobY = mouseY

    const animateBlob = () => {
      blobX += (mouseX - blobX) * 0.06
      blobY += (mouseY - blobY) * 0.06
      blob.style.transform = `translate(${blobX}px, ${blobY}px) scale(${blobState.current.scale})`
      requestAnimationFrame(animateBlob)
    }
    animateBlob()

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
    }

    window.addEventListener("mousemove", onMouseMove)

    return () => {
      window.removeEventListener("mousemove", onMouseMove)
    }
  }, [])

  return (
    <main className="relative z-20 flex min-h-screen flex-col items-center justify-center px-8 text-center">
      {/* Viewfinder corners */}
      <NoiseGrain
        className="pointer-events-none absolute inset-0 h-full w-full"
        opacity={0.035}
      />
      <div className="vf-corner tl" id="vfTL" />
      <div className="vf-corner tr" id="vfTR" />
      <div className="vf-corner bl" id="vfBL" />
      <div className="vf-corner br" id="vfBR" />

      {/* HUD tags */}
      <p className="hud left" id="hudLeft">
        85mm — f/2.8 — ISO 200
      </p>
      <p className="hud right" id="hudRight">
        shot on caffeine ☕
      </p>

      {/* Ambient blob */}
      <div className="blob" id="blob" />

      {/* Eyebrow
      <p className="eyebrow" id="eyebrow">
        <span className="dot" />
        Available for new projects
      </p> */}

      {/* Heading */}
      <h1 ref={headingRef} className="heading">
        <span className="word" id="word-1">
          Damian
        </span>{" "}
        <span className="word" id="word-2">
          René
        </span>
      </h1>

      {/* Subtitle */}
      <p className="subtitle" id="subtitle">
        Full Stack Developer
      </p>

      {/* Navigation */}
      <nav id="nav" className="nav">
        <a href="/resume" data-magnetic>
          Resume
        </a>
        <a href="/projects" data-magnetic>
          Projects
        </a>
        <a href="/photography" data-magnetic>
          Photography
        </a>
        <a href="/about" data-magnetic>
          About
        </a>
      </nav>
    </main>
  )
}
