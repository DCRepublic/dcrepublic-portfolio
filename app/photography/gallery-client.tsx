"use client"

import Image from "next/image"

import { useState, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, ChevronLeft, ChevronRight } from "lucide-react"

import { Section, SectionHeader } from "@/components/section"

interface Photo {
  src: string
}

export function PhotographyGallery({ photos }: { photos: Photo[] }) {
  const [selected, setSelected] = useState<number | null>(null)

  const openViewer = useCallback((index: number) => setSelected(index), [])
  const closeViewer = useCallback(() => setSelected(null), [])

  const goNext = useCallback(() => {
    if (selected === null) return
    setSelected((prev) => (prev === photos.length - 1 ? 0 : prev! + 1))
  }, [selected, photos.length])

  const goPrev = useCallback(() => {
    if (selected === null) return
    setSelected((prev) => (prev === 0 ? photos.length - 1 : prev! - 1))
  }, [selected, photos.length])

  return (
    <>
      <Section id="photography" className="pt-32">
        <SectionHeader
          label="Gallery"
          title="Photography"
          description="I find that photography helps me slow down and truly appreciate the moments around me. A welcome break from the everyday bustle."
        />

        {/* Masonry-style mosaic */}
        <div className="columns-2 gap-4 md:columns-3 lg:columns-3 xl:columns-3">
          {photos.map((photo, i) => (
            <button
              key={i}
              onClick={() => openViewer(i)}
              className="mb-4 block w-full overflow-hidden rounded-sm transition-shadow duration-300 hover:shadow-[0_8px_32px_rgba(0,0,0,0.15)]"
            >
              <Image
                src={photo.src}
                alt="Photography"
                width={600}
                height={400}
                className="w-full rounded-sm transition-transform duration-500 hover:scale-105"
                loading="lazy"
              />
            </button>
          ))}
        </div>
      </Section>

      {/* Fullscreen viewer */}
      <AnimatePresence>
        {selected !== null && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 0.61, 0.36, 1] }}
              className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm"
              onClick={closeViewer}
            />

            {/* Close button */}
            <button
              onClick={closeViewer}
              className="fixed top-6 right-6 z-[101] rounded-full bg-white/10 p-2 text-white backdrop-blur-sm transition-colors hover:bg-white/20"
            >
              <X size={24} />
            </button>

            {/* Previous */}
            {selected > 0 && (
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  goPrev()
                }}
                className="fixed top-1/2 left-4 z-[101] -translate-y-1/2 rounded-full bg-white/10 p-3 text-white backdrop-blur-sm transition-colors hover:bg-white/20"
              >
                <ChevronLeft size={28} />
              </button>
            )}

            {/* Next */}
            {selected < photos.length - 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  goNext()
                }}
                className="fixed top-1/2 right-4 z-[101] -translate-y-1/2 rounded-full bg-white/10 p-3 text-white backdrop-blur-sm transition-colors hover:bg-white/20"
              >
                <ChevronRight size={28} />
              </button>
            )}

            {/* Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3, ease: [0.22, 0.61, 0.36, 1] }}
              className="fixed inset-0 z-[101] flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={photos[selected].src}
                alt="Photography"
                fill
                className="object-contain"
              />
            </motion.div>

            {/* Counter */}
            <div className="fixed bottom-6 left-1/2 z-[101] -translate-x-1/2 rounded-full bg-white/10 px-4 py-2 text-sm text-white backdrop-blur-sm">
              {selected + 1} / {photos.length}
            </div>

            {/* Keyboard navigation */}
            <KeyboardHandler
              onPrev={selected > 0 ? goPrev : undefined}
              onNext={selected < photos.length - 1 ? goNext : undefined}
              onClose={closeViewer}
            />
          </>
        )}
      </AnimatePresence>
    </>
  )
}

function KeyboardHandler({
  onPrev,
  onNext,
  onClose,
}: {
  onPrev?: () => void
  onNext?: () => void
  onClose: () => void
}) {
  useState(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
      if (e.key === "ArrowLeft" && onPrev) onPrev()
      if (e.key === "ArrowRight" && onNext) onNext()
    }
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  })

  return null
}
