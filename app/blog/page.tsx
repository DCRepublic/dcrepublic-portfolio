import { BlogPageClient } from "./blog-client"

export const revalidate = 3600

interface RSSItem {
  title: string
  link: string
  pubDate: string
  description: string
  image: string
}

interface RSSFeed {
  items: RSSItem[]
  error?: boolean
}

function extractTag(text: string, tag: string): string {
  const regex = new RegExp(`<${tag}[^>]*>([\\s\\S]*)</${tag}>`, "i")
  const match = text.match(regex)
  if (!match) return ""
  let content = match[1]
  content = content.replace(/<!\[CDATA\[/g, "").replace(/\]\]>/g, "")
  return content.trim()
}

function extractMediaUrl(text: string): string {
  const match = text.match(/<media:content[^>]+url="([^"]+)"/)
  return match ? match[1] : ""
}

async function fetchBlogFeed(): Promise<RSSFeed> {
  try {
    const res = await fetch("https://damianrene.dev/rss/", {
      next: { revalidate: 3600 },
    })
    if (!res.ok) return { items: [], error: true }

    const text = await res.text()
    const itemBlocks = text.split(/<item[^>]*>/)

    const items: RSSItem[] = []
    for (const block of itemBlocks.slice(1, 13)) {
      const title = extractTag(block, "title")
      const link = extractTag(block, "link")
      const pubDate = extractTag(block, "pubDate")
      const description = extractTag(block, "content") || extractTag(block, "description")
      const image = extractMediaUrl(block)

      if (title && link) {
        items.push({ title, link, pubDate, description, image })
      }
    }

    return { items }
  } catch {
    return { items: [], error: true }
  }
}

export default async function BlogPage() {
  const feed = await fetchBlogFeed()

  if (feed.error || feed.items.length === 0) {
    return null
  }

  return <BlogPageClient posts={feed.items} />
}
