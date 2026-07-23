"use client"

import { useState, useCallback, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import type { ReactNode } from "react"

interface ProjectData {
  id: string
  title: string
  description: string
  image: string
  tags: string[]
  link: string
}

interface SharedImageTransitionProps {
  project: ProjectData
  children: ReactNode
  isActive: boolean
  onClose: () => void
}

export function SharedImageTransition({
  project,
  children,
  isActive,
  onClose,
}: SharedImageTransitionProps) {
  const [isHovered, setIsHovered] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  const handleOpen = useCallback(() => {
    window.location.href = project.link
  }, [project.link])

  const containerVariants = {
    closed: { opacity: 0, scale: 0.95, filter: "blur(10px)" },
    open: { opacity: 1, scale: 1, filter: "blur(0px)" },
  }

  return (
    <>
      <motion.div
        ref={cardRef}
        className="group cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleOpen}
        whileHover={{ y: -8 }}
        transition={{ duration: 0.5, ease: [0.22, 0.61, 0.36, 1] }}
      >
        <div
          className="overflow-hidden rounded-[24px] border border-border bg-background"
          style={{
            boxShadow: isHovered
              ? "0 16px 48px rgba(0,0,0,0.08)"
              : "0 2px 16px rgba(0,0,0,0.04)",
            transition: "box-shadow 0.5s ease",
          }}
        >
          <div className="relative aspect-[16/10] overflow-hidden">
            <motion.img
              src={project.image}
              alt={project.title}
              className="h-full w-full object-cover"
              animate={isHovered ? { scale: 1.05 } : { scale: 1 }}
              transition={{ duration: 1.2, ease: [0.22, 0.61, 0.36, 1] }}
              style={{ backgroundColor: "var(--hover)" }}
            />
            <motion.div
              className="absolute inset-0 bg-black/0 transition-colors duration-500"
              animate={{ backgroundColor: isHovered ? "rgba(0,0,0,0.05)" : "rgba(0,0,0,0)" }}
            />
          </div>

          <div className="p-8 md:p-10">
            <h3 className="text-2xl font-medium tracking-tight">
              {project.title}
            </h3>
            <p className="mt-2 text-base text-muted-foreground leading-relaxed">
              {project.description}
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {isActive && (
          <motion.div
            className="fixed inset-0 z-[200] flex items-center justify-center"
            initial="closed"
            animate="open"
            exit="closed"
            variants={containerVariants}
            transition={{ duration: 0.7, ease: [0.22, 0.61, 0.36, 1] }}
            onClick={onClose}
          >
            <div className="absolute inset-0 bg-background/90 backdrop-blur-xl" />
            <div className="relative mx-auto max-w-4xl w-full px-6">
              <motion.img
                src={project.image}
                alt={project.title}
                className="h-[60vh] w-full rounded-[24px] object-cover"
                style={{ backgroundColor: "var(--hover)" }}
              />
              <div className="mt-8">
                <h2 className="text-3xl font-medium tracking-tight">
                  {project.title}
                </h2>
                <p className="mt-3 text-base text-muted-foreground">
                  {project.description}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
