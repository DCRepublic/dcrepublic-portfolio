"use client"

import { forwardRef, type ReactNode } from "react"

const SectionInner = forwardRef<
  HTMLElement,
  { children: ReactNode; id?: string; className?: string }
>(({ children, id, className = "" }, ref) => {
  return (
    <section
      id={id}
      ref={ref as React.Ref<HTMLElement>}
      className={`px-6 py-24 content-max mx-auto ${className}`}
    >
      {children}
    </section>
  )
})

SectionInner.displayName = "Section"

export { SectionInner as Section }

export function SectionHeader({
  label,
  title,
  description,
}: {
  label?: string
  title: string
  description?: string
}) {
  return (
    <div className="mb-16">
      {label && (
        <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
          {label}
        </p>
      )}
      <h2 className="text-4xl md:text-[56px] font-medium tracking-tight leading-[1.1]">
        {title}
      </h2>
      {description && (
        <p className="mt-4 max-w-xl text-base text-muted-foreground leading-relaxed">
          {description}
        </p>
      )}
    </div>
  )
}
