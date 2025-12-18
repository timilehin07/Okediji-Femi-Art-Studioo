"use client"

import { useState, useEffect, useRef } from "react"
import { getWorks } from "@/lib/getWorks"
import { urlFor } from "@/lib/sanityImage"

interface Work {
  _id: string
  title: string
  description: string
  image: any
}

export default function Portfolio() {
  const [works, setWorks] = useState<Work[]>([])
  const [hoveredId, setHoveredId] = useState<string | null>(null)
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set())
  const itemRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    getWorks().then((data) => setWorks(data))
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = itemRefs.current.findIndex((el) => el === entry.target)
            setVisibleItems((prev) => new Set(prev).add(index))
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1 }
    )

    itemRefs.current.forEach((el) => {
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [works])

  return (
    <section className="py-20 px-6 md:py-32 bg-card">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-16 animate-fade-in">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Selected Works
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-2xl">
            A curated selection of recent sculptural projects exploring form, material,
            and the human experience.
          </p>
        </div>

        {/* Works Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
                className="w-full h-auto rounded-lg"
              />
              {hoveredId === work._id && (
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-white p-4 rounded-lg transition-opacity">
                  <div>
                    <h3 className="text-lg font-semibold">{work.title}</h3>
                    <p className="text-sm">{work.description}</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
