"use client"

import { useEffect, useRef } from "react"

export function NoiseGrain({
  className = "film-grain",
  opacity = 0.035,
}: {
  className?: string
  opacity?: number
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const generateGrain = () => {
      const w = 256
      const h = 256
      canvas.width = w
      canvas.height = h
      const imageData = ctx.createImageData(w, h)
      const data = imageData.data

      for (let i = 0; i < data.length; i += 4) {
        const value = Math.random() * 255
        data[i] = value
        data[i + 1] = value
        data[i + 2] = value
        data[i + 3] = 255
      }

      ctx.putImageData(imageData, 0, 0)
    }

    generateGrain()
    const interval = setInterval(generateGrain, 100)

    return () => clearInterval(interval)
  }, [])

  return <canvas ref={canvasRef} className={className} style={{ opacity }} />
}
