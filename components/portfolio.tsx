"use client"

import { useState, useEffect, useRef } from "react"
import { urlFor } from "@/lib/sanityImage"

// Define Work type (replace fields as needed)
interface Work {
  _id: string
  title: string
  description?: string
  image: any
}

// Props interface
interface PortfolioProps {
  works: Work[]
}

export default function Portfolio({ works }: PortfolioProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null)
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set())
  const itemRefs = useRef<Array<HTMLDivElement | null>>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = itemRefs.current.indexOf(entry.target as HTMLDivElement)
            setVisibleItems((prev) => new Set(prev.add(index)))
          }
        })
      },
      { threshold: 0.1 }
    )

    itemRefs.current.forEach((el) => {
      if (el) observer.observe(el)
    })

    return () => {
      itemRefs.current.forEach((el) => {
        if (el) observer.unobserve(el)
      })
    }
  }, [works])

  return (
    <section className="py-20 px-6 md:py-32 bg-card">
      <div className="max-w-7xl mx-auto">
        {/* Main Header */}
        <div className="mb-8 text-center animate-fade-in">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-2">
            Our Works
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore the sculptural creations of Okediji Femi Art Studio
          </p>
        </div>

        {/* Selected Works Section */}
        <div className="mb-16 animate-fade-in">
          <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Selected Works
          </h3>
          <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-2xl">
            A curated selection of recent sculptural projects exploring form, material,
            and the human experience.
          </p>
        </div>

        {/* Works Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {works.map((work, index) => (
            <div
              key={work._id}
              ref={(el) => { itemRefs.current[index] = el }}
              className={`group cursor-pointer relative transition-smooth ${
                visibleItems.has(index) ? "animate-slide-up" : "opacity-0"
              }`}
              style={{
                animationDelay: visibleItems.has(index) ? `${index * 0.1}s` : "0s",
              }}
              onMouseEnter={() => setHoveredId(work._id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <img
                src={urlFor(work.image).url()}
                alt={work.title}
                className="w-full h-auto object-cover rounded-lg shadow-lg"
              />
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-black bg-opacity-50 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                <h4 className="font-semibold">{work.title}</h4>
                {work.description && <p className="text-sm">{work.description}</p>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
