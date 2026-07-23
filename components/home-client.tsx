"use client"

import { NoiseGrain } from "@/components/noise-grain"
import type { ProjectSummary } from "@/lib/projects"

export function HomeClient({ projects }: { projects: ProjectSummary[] }) {
  return (
    <main className="relative h-screen overflow-hidden">
      <NoiseGrain />
    </main>
  )
}
