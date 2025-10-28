"use client"

import { useState, useEffect, useRef } from "react"

const works = [
  {
    id: 1,
    title: "Feminine Form",
    year: "2024",
    material: "Bronze",
    image: "/sculpture-1.png",
    description: "Exploring resilience and complexity through sculptural form.",
    status: "available",
  },
  {
    id: 2,
    title: "Lace & Presence",
    year: "2023",
    material: "Bronze with Lace Texture",
    image: "/sculpture-2.png",
    description: "Embedding lace fabric textures as homage to tradition and femininity.",
    status: "sold",
  },
  {
    id: 3,
    title: "Verdant Spirit",
    year: "2023",
    material: "Patinated Bronze",
    image: "/sculpture-3.png",
    description: "A meditation on growth and natural forms.",
    status: "available",
  },
  {
    id: 4,
    title: "Geometric Contemplation",
    year: "2022",
    material: "Bronze",
    image: "/sculpture-4.png",
    description: "Where geometric precision meets human emotion.",
    status: "sold",
  },
  {
    id: 5,
    title: "Narrative Form",
    year: "2022",
    material: "Bronze",
    image: "/sculpture-5.png",
    description: "Translating societal happenings into tangible sculptural forms.",
    status: "available",
  },
  {
    id: 6,
    title: "Gallery Exhibition",
    year: "2024",
    material: "Mixed Media Installation",
    image: "/sculpture-6.png",
    description: "A curated collection exploring the intersection of space and presence.",
    status: "available",
  },
  {
    id: 7,
    title: "Suspended Moment",
    year: "2023",
    material: "Bronze & Woven Elements",
    image: "/sculpture-7.png",
    description: "Capturing the essence of human connection and introspection.",
    status: "sold",
  },
]

export default function Portfolio() {
  const [hoveredId, setHoveredId] = useState<number | null>(null)
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set())
  const itemRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = itemRefs.current.indexOf(entry.target as HTMLDivElement)
            setVisibleItems((prev) => new Set([...prev, index]))
          }
        })
      },
      { threshold: 0.1 },
    )

    itemRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <section className="py-20 px-6 md:py-32 bg-card">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 animate-fade-in">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4">Selected Works</h2>
          <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-2xl">
            A curated selection of recent sculptural projects exploring form, material, and the human experience.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {works.map((work, index) => (
            <div
              key={work.id}
              ref={(el) => {
                itemRefs.current[index] = el
              }}
              className={`group cursor-pointer relative transition-smooth ${
                visibleItems.has(index) ? "animate-slide-up" : "opacity-0"
              }`}
              style={{
                animationDelay: visibleItems.has(index) ? `${index * 0.1}s` : "0s",
              }}
              onMouseEnter={() => setHoveredId(work.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <div className="aspect-square bg-muted rounded-lg overflow-hidden mb-4 relative hover-lift">
                <img
                  src={work.image || "/placeholder.svg"}
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
              <h3 className="text-lg sm:text-xl font-semibold mb-2 transition-smooth group-hover:text-accent">
                {work.title}
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground mb-3">
                {work.material} • {work.year}
              </p>
              {hoveredId === work.id && (
                <p className="text-xs sm:text-sm leading-relaxed text-foreground/80 animate-fade-in">
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
