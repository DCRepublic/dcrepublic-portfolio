import { getProjectStaticParams, getProjects } from "@/lib/projects"
import { ProjectsPageClient } from "./projects-client"

export async function generateStaticParams() {
  return getProjectStaticParams()
}

export default function ProjectsPage() {
  return <ProjectsPageClient projects={getProjects()} />
}
