"use client"

import { useState, useEffect, useRef } from "react"
import { urlFor } from "@/lib/sanityImage"

// Interfaces defined locally
interface Work {
  _id: string
  title: string
  year: number
  material: string
  price?: number
  status: "available" | "sold"
  description?: string
  image?: any
}

interface PortfolioProps {
  works: Work[]
}

export default function Portfolio({ works }: PortfolioProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null)
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set())
  const itemRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    if (!works.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = itemRefs.current.indexOf(entry.target as HTMLDivElement)
            setVisibleItems((prev) => new Set(prev).add(index))
          }
        })
      },
      { threshold: 0.1 }
    )

    itemRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref)
    })

    return () => observer.disconnect()
  }, [works])

  return (
    <section className="py-20 px-6 md:py-32 bg-card">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8">
          {works.map((work, index) => (
            <div
              key={work._id}
              ref={(el) => { itemRefs.current[index] = el }} // ✅ fixed
              className={`group cursor-pointer relative transition-smooth ${
                visibleItems.has(index) ? "animate-slide-up" : "opacity-0"
              }`}
              style={{
                animationDelay: visibleItems.has(index) ? `${index * 0.1}s` : "0s",
              }}
              onMouseEnter={() => setHoveredId(work._id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              {work.image && (
                <div className="aspect-square bg-muted rounded-lg overflow-hidden mb-4 relative hover-lift">
                  <img
                    src={urlFor(work.image).width(800).height(800).url()}
                    alt={work.title}
                    className="w-full h-full object-cover transition-smooth duration-500 group-hover:scale-110"
                  />
                  <div
                    className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs sm:text-sm font-semibold transition-all ${
                      work.status === "sold"
                        ? "bg-red-500/90 text-white animate-pulse-soft"
                        : "bg-green-500/90 text-white animate-glow"
                    }`}
                  >
                    {work.status === "sold" ? "Sold" : "Available"}
                  </div>
                </div>
              )}

              <h3 className="text-lg sm:text-xl font-semibold mb-1 transition-smooth group-hover:text-accent">
                {work.title}
              </h3>

              <p className="text-xs sm:text-sm text-muted-foreground mb-1">
                {work.material} • {work.year}
              </p>

              {work.status === "available" && work.price && (
                <p className="text-sm sm:text-base font-semibold text-accent mb-1">
                  ₦{work.price.toLocaleString()}
                </p>
              )}

              {hoveredId === work._id && work.description && (
                <p className="text-xs sm:text-sm leading-relaxed text-foreground/80 animate-fade-in mt-2">
                  {work.description}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
