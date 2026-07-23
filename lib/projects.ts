import fs from "fs"
import path from "path"

const projectsDir = path.join(process.cwd(), "content/projects")

export interface ProjectSummary {
  slug: string
  title: string
  description: string
  image: string
  tags: string[]
}

export interface ProjectDocument extends ProjectSummary {
  content: string
}

function getProjectSlugs(): string[] {
  if (!fs.existsSync(projectsDir)) return []

  return fs
    .readdirSync(projectsDir)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""))
}

function parseFrontmatter(source: string) {
  const match = source.match(/^---\n([\s\S]*?)\n---/)
  if (!match) return {}

  const frontmatterStr = match[1]
  const fields: Record<string, string> = {}

  frontmatterStr.split("\n").forEach((line) => {
    const colonIndex = line.indexOf(":")
    if (colonIndex === -1) return

    const key = line.slice(0, colonIndex).trim()
    const value = line.slice(colonIndex + 1).trim()
    fields[key] = value.replace(/^["']|["']$/g, "")
  })

  return fields
}

function parseTags(tagsValue?: string) {
  if (!tagsValue) return []

  return tagsValue
    .replace(/\[|\]/g, "")
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean)
}

export function getProjects(): ProjectSummary[] {
  return getProjectSlugs()
    .map((slug) => {
      const filePath = path.join(projectsDir, `${slug}.mdx`)
      if (!fs.existsSync(filePath)) return null

      const source = fs.readFileSync(filePath, "utf-8")
      const frontmatter = parseFrontmatter(source)

      return {
        slug,
        title: frontmatter.title || slug,
        description: frontmatter.description || "",
        image: frontmatter.image || "",
        tags: parseTags(frontmatter.tags),
      }
    })
    .filter(Boolean) as ProjectSummary[]
}

export function getProjectBySlug(slug: string): ProjectDocument | null {
  const filePath = path.join(projectsDir, `${slug}.mdx`)
  if (!fs.existsSync(filePath)) return null

  const source = fs.readFileSync(filePath, "utf-8")
  const frontmatter = parseFrontmatter(source)
  const content = source.replace(/^---\n[\s\S]*?\n---\n?/, "")

  return {
    slug,
    title: frontmatter.title || slug,
    description: frontmatter.description || "",
    image: frontmatter.image || "",
    tags: parseTags(frontmatter.tags),
    content,
  }
}

export function getProjectStaticParams() {
  return getProjectSlugs().map((slug) => ({ slug }))
}
