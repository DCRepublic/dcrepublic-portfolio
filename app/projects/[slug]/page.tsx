import { notFound } from "next/navigation"
import * as runtime from "react/jsx-runtime"
import { compile, run } from "@mdx-js/mdx"
import { ProjectPageClient } from "./project-client"
import { getProjectBySlug, getProjectStaticParams } from "@/lib/projects"
import { cn } from "@/lib/utils"

export async function generateStaticParams() {
  return getProjectStaticParams()
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string } | Promise<{ slug: string }>
}) {
  const { slug } = await Promise.resolve(params)
  const project = getProjectBySlug(slug)
  if (!project) return {}

  return {
    title: `${project.title} — Damian René`,
    description: project.description,
  }
}

const mdxComponents = {
  h1: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1 className="mt-8 text-3xl font-medium tracking-tight" {...props} />
  ),
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2 className="mt-8 text-2xl font-medium tracking-tight" {...props} />
  ),
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3 className="mt-6 text-xl font-medium" {...props} />
  ),
  h4: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h4 className="mt-6 text-lg font-medium" {...props} />
  ),
  h5: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h5 className="mt-4 text-base font-medium" {...props} />
  ),
  h6: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h6 className="mt-4 text-sm font-medium" {...props} />
  ),
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p
      className="mt-4 text-base leading-relaxed text-muted-foreground"
      {...props}
    />
  ),
  ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
    <ul
      className="my-4 list-disc space-y-2 pl-6 text-base text-muted-foreground"
      {...props}
    />
  ),
  ol: (props: React.HTMLAttributes<HTMLOListElement>) => (
    <ol
      className="my-4 list-decimal space-y-2 pl-6 text-base text-muted-foreground"
      {...props}
    />
  ),
  li: (props: React.HTMLAttributes<HTMLLIElement>) => (
    <li className="pl-2" {...props} />
  ),
  a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a
      className={cn(
        "underline decoration-border underline-offset-4 transition-colors hover:decoration-foreground",
        props.className
      )}
      {...props}
    />
  ),
  blockquote: (props: React.HTMLAttributes<HTMLElement>) => (
    <blockquote
      className="my-4 border-l-2 border-border pl-4 text-muted-foreground italic"
      {...props}
    />
  ),
  hr: (props: React.HTMLAttributes<HTMLHRElement>) => (
    <hr className="my-8 border-border" {...props} />
  ),
  pre: (props: React.HTMLAttributes<HTMLPreElement>) => (
    <pre
      className="my-4 overflow-x-auto rounded-2xl bg-[var(--hover)] p-4 font-mono text-sm"
      {...props}
    />
  ),
  code: ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => (
    <code
      className={cn(
        "rounded-md bg-[var(--hover)] px-1.5 py-0.5 font-mono text-[0.92em]",
        className
      )}
      {...props}
    />
  ),
}

async function renderMarkdown(md: string) {
  const compiled = await compile(md, { outputFormat: "function-body" })
  const { default: Content } = await run(String(compiled), runtime)

  return <Content components={mdxComponents} />
}

export default async function ProjectPage({
  params,
}: {
  params: { slug: string } | Promise<{ slug: string }>
}) {
  const { slug } = await Promise.resolve(params)
  const project = getProjectBySlug(slug)

  if (!project) {
    notFound()
  }

  const content = await renderMarkdown(project.content)

  return <ProjectPageClient project={{ ...project, content }} />
}
