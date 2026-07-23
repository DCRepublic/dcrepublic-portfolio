"use client"

import Image from "next/image"
import Link from "next/link"
import { Section, SectionHeader } from "@/components/section"
import type { ReactNode } from "react"

interface ProjectData {
  slug: string
  title: string
  description: string
  image: string
  tags: string[]
  content: ReactNode
}

export function ProjectPageClient({ project }: { project: ProjectData }) {
  return (
    <>
      <Section className="pt-30 pb-28">
        <div className="mx-auto max-w-7xl px-6">
          <Link
            href="/projects"
            className="mb-7 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            ← Back to Projects
          </Link>

          <div className="grid gap-10 lg:grid-cols-[280px_1fr]">
            {/* Left sidebar — sticky card */}
            <div className="relative">
              <div className="sticky top-24 overflow-hidden rounded-3xl border border-border bg-background shadow-xl">
                <div className="relative min-h-50 w-full overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}

                    fill
                    className="object-cover"
                    style={{ backgroundColor: "var(--hover)" }}
                  />
                </div>

                <div className="p-6">
                  <h2 className="text-xl font-medium tracking-tight">
                    {project.title}
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {project.description}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-2">
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
            </div>

            {/* Right side — scrollable content */}
            <div className="prose prose-lg dark:prose-invert max-w-none">
              {project.content}
            </div>
          </div>
        </div>
      </Section>
    </>
  )
}
