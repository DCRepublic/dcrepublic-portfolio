import { HomeClient } from "@/components/home-client"
import { getProjects } from "@/lib/projects"

export default function Home() {
  return <HomeClient projects={getProjects()} />
}