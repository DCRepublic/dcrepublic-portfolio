"use client"

import Image from "next/image"
import Link from "next/link"
import { Section, SectionHeader } from "@/components/section"

interface Project {
  slug: string
  title: string
  description: string
  image: string
  tags: string[]
}

export function ProjectsPageClient({ projects }: { projects: Project[] }) {
  return (
    <>
      <Section id="projects" className="pt-32">
        <SectionHeader label="Selected Work" title="Projects" description="" />

        <div className="grid gap-8 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </Section>
    </>
  )
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="group h-full cursor-pointer">
      <Link href={`/projects/${project.slug}`} className="block h-full">
        <div
          className="flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-background transition-shadow duration-500 group-hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)]"
          style={{ boxShadow: "0 2px 16px rgba(0,0,0,0.04)" }}
        >
          <div className="relative aspect-16/10 overflow-hidden">
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              style={{ backgroundColor: "var(--hover)" }}
            />
          </div>

          <div className="flex flex-1 flex-col p-8 md:p-10">
            <h3 className="text-2xl font-medium tracking-tight">
              {project.title}
            </h3>
            <p className="mt-2 text-base leading-relaxed text-muted-foreground">
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
      </Link>
    </article>
  )
}
