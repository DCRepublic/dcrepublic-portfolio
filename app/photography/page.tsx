import { getPhotos } from "@/lib/photos"
import { PhotographyGallery } from "./gallery-client"

export default function PhotographyPage() {
  const photos = getPhotos()

  return <PhotographyGallery photos={photos} />
}
