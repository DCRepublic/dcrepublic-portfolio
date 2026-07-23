import fs from "fs"
import path from "path"

const photosDir = path.join(process.cwd(), "public/photos")

export interface Photo {
  src: string
}

function scanPhotos(dir: string, base: string = ""): Photo[] {
  if (!fs.existsSync(dir)) return []

  const entries = fs.readdirSync(dir, { withFileTypes: true })
  let photos: Photo[] = []

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name)
    const relativePath = base ? `${base}/${entry.name}` : entry.name

    if (entry.isDirectory()) {
      photos = [...photos, ...scanPhotos(fullPath, relativePath)]
    } else if (entry.isFile() && /\.(jpg|jpeg|png|webp|gif)$/i.test(entry.name)) {
      photos.push({ src: `/photos/${relativePath}` })
    }
  }

  return photos.sort((a, b) => a.src.localeCompare(b.src))
}

export function getPhotos(): Photo[] {
  return scanPhotos(photosDir)
}
