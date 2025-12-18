"use client"

import { useState, useEffect, useRef } from "react"
import { urlFor } from "@/lib/sanityImage"
import { client } from "@/lib/sanityClient"

// Define Work interface here
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

// Props interface
interface PortfolioProps {
  works: Work[]
}

export default function Portfolio({ works }: PortfolioProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null)
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set())
  const itemRefs = useRef<(HTMLDivElement | null)[]>([])

  // Intersection Observer for animations
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
        {/* Heading */}
        <div className="mb-16 animate-fade-in text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            Our Works
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore the sculptural creations of Okediji Femi Art Studio
          </p>
        </div>

        {/* Selected Works */}
        <div className="mb-12 animate-fade-in text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Selected Works
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
            A curated selection of recent sculptural projects exploring form, material,
            and the human experience.
          </p>
        </div>

        {/* Portfolio Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {works.map((work, index) => (
            <div
              key={work._id}
              ref={(el) => (itemRefs.current[index] = el)}
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
