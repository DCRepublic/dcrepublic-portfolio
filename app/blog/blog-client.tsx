"use client"

import Image from "next/image"

import { Section, SectionHeader } from "@/components/section"

interface BlogPost {
  title: string
  link: string
  pubDate: string
  description: string
  image: string
}

export function BlogPageClient({ posts }: { posts: BlogPost[] }) {
  return (
    <>
      <Section id="blog" className="pt-32">
        <SectionHeader
          label="Writing"
          title="Blog"
          description="Thoughts on development, server management, and building things."
        />

        <div className="grid gap-8 lg:grid-cols-3">
          {posts.map((post, i) => (
            <BlogCard key={i} post={post} />
          ))}
        </div>
      </Section>
    </>
  )
}

function BlogCard({ post }: { post: BlogPost }) {
  const formattedDate = new Date(post.pubDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  const plainText = stripHtml(post.description).slice(0, 150)

  return (
    <article className="group h-full cursor-pointer">
      <a
        href={post.link}
        target="_blank"
        rel="noopener noreferrer"
        className="block h-full"
      >
        <div
          className="flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-background transition-shadow duration-500 group-hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)]"
          style={{ boxShadow: "0 2px 16px rgba(0,0,0,0.04)" }}
        >
          <div className="relative aspect-16/10 overflow-hidden">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              style={{ backgroundColor: "var(--hover)" }}
            />
          </div>

          <div className="flex flex-1 flex-col p-8 md:p-10">
            <time className="text-sm text-muted-foreground">
              {formattedDate}
            </time>
            <h3 className="mt-2 text-2xl font-medium tracking-tight">
              {post.title}
            </h3>
            <p className="mt-2 text-base leading-relaxed text-muted-foreground">
              {plainText}...
            </p>
          </div>
        </div>
      </a>
    </article>
  )
}

function stripHtml(html: string) {
  return html
    .replace(/<[^>]+>/g, "")
    .replace(/\s+/g, " ")
    .trim()
}
