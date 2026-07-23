"use client"

import Image from "next/image"
import Link from "next/link"
import { Section, SectionHeader } from "@/components/section"
import { Code, Link as LinkIcon, X as XIcon, Camera } from "lucide-react"

const socials = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/damianrene",
    icon: LinkIcon,
  },
  { label: "GitHub", href: "https://github.com/dcrepublic", icon: Code },
  { label: "X", href: "https://x.com/dcrepublicx", icon: XIcon },
  {
    label: "Instagram",
    href: "https://www.instagram.com/caffeinated.captures/",
    icon: Camera,
  },
]

export default function AboutPage() {
  return (
    <>
      <Section className="pt-32">
        <SectionHeader label="About" title="Get in touch" />

        <div className="content-max -mt-7">
          <div className="grid gap-16 md:grid-cols-5">
            <div className="md:col-span-2">
              <div className="overflow-hidden rounded-3xl border border-border">
                <Image
                  src="/about.jpeg"
                  alt="Damian René"
                  height={400}
                  width={450}
                  className="object-cover"
                  style={{ backgroundColor: "var(--hover)" }}
                />
              </div>
            </div>

            <div className="md:col-span-3">
              <p className="text-lg leading-relaxed text-muted-foreground">
                I&apos;m a full-stack engineer with a passion for crafting
                polished digital experiences. I believe great software sits at
                the intersection of functionality and aesthetics.
              </p>
              <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
                When I&apos;m not building software, I&apos;m behind a camera —
                exploring light, composition, and the stories that spaces tell.
                Photography has taught me to see the world differently and its
                lessons are reflected in my work as a developer.
              </p>

              <div className="mt-16">
                <h3 className="mb-8 text-xs font-medium tracking-[0.2em] text-muted-foreground uppercase">
                  In my free time
                </h3>
                <p className="text-lg leading-relaxed text-muted-foreground">
                  I spend time making coffee, taking photographs, practicing my
                  videography, swimming, playing guitar, and traveling whenever
                  possible.
                </p>
              </div>

              <div className="mt-16">
                <h3 className="mb-8 text-xs font-medium tracking-[0.2em] text-muted-foreground uppercase">
                  Find me on
                </h3>
                <div className="flex flex-wrap gap-3">
                  {socials.map((social) => (
                    <Link
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 rounded-full border border-border bg-background/80 px-5 py-2.5 text-sm text-foreground transition-all duration-300 hover:border-foreground/30 hover:shadow-[0_8px_32px_rgba(0,0,0,0.08)]"
                    >
                      {social.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>
    </>
  )
}
