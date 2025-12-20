"use client"

import { useState, useEffect, useRef } from "react"
import { urlFor } from "@/lib/sanityImage"

interface Work {
  _id: string
  title: string
  year?: string
  material?: string
  price?: number
  status: "available" | "sold"
  description?: string
  images: any[]
}

interface PortfolioProps {
  works: Work[]
}

// Map indices to labels (you can expand if you want more)
const viewLabels = ["Front View", "Back View", "Left Side", "Right Side"]

export default function Portfolio({ works }: PortfolioProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null)
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set())
  const [activeImage, setActiveImage] = useState<Record<string, number>>({})
  const intervalRefs = useRef<Record<string, NodeJS.Timeout>>({})
  const itemRefs = useRef<(HTMLDivElement | null)[]>([])

  /* ---------------- Intersection Observer ---------------- */
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

    itemRefs.current.forEach((ref) => ref && observer.observe(ref))
    return () => observer.disconnect()
  }, [works])

  /* ---------------- Hover Auto Slider ---------------- */
  const startSlider = (work: Work) => {
    if (!work.images || work.images.length <= 1) return

    intervalRefs.current[work._id] = setInterval(() => {
      setActiveImage((prev) => ({
        ...prev,
        [work._id]: ((prev[work._id] ?? 0) + 1) % work.images.length,
      }))
    }, 1200)
  }

  const stopSlider = (workId: string) => {
    clearInterval(intervalRefs.current[workId])
  }

  /* ---------------- Manual Navigation ---------------- */
  const goNext = (work: Work) => {
    setActiveImage((prev) => ({
      ...prev,
      [work._id]: ((prev[work._id] ?? 0) + 1) % work.images.length,
    }))
  }

  const goPrev = (work: Work) => {
    setActiveImage((prev) => ({
      ...prev,
      [work._id]:
        ((prev[work._id] ?? 0) - 1 + work.images.length) % work.images.length,
    }))
  }

  /* ---------------- Render ---------------- */
  return (
    <section className="py-20 px-6 md:py-32 bg-card">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-16 animate-fade-in">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Selected Works
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-2xl">
            A curated selection of recent sculptural projects exploring form,
            material, and the human experience.
          </p>
        </div>

        {/* Works Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {works.map((work, index) => {
            const currentIndex = activeImage[work._id] ?? 0
            const currentImage = work.images?.[currentIndex]

            return (
              <div
                key={work._id}
                ref={(el) => (itemRefs.current[index] = el)}
                className={`group cursor-pointer relative transition-smooth ${
                  visibleItems.has(index) ? "animate-slide-up" : "opacity-0"
                }`}
                style={{
                  animationDelay: visibleItems.has(index)
                    ? `${index * 0.1}s`
                    : "0s",
                }}
                onMouseEnter={() => {
                  setHoveredId(work._id)
                  startSlider(work)
                }}
                onMouseLeave={() => {
                  setHoveredId(null)
                  stopSlider(work._id)
                }}
              >
                {/* Image */}
                {currentImage && (
                  <div className="aspect-square bg-muted rounded-lg overflow-hidden mb-4 relative hover-lift">
                    <img
                      src={urlFor(currentImage).width(800).height(800).url()}
                      alt={`${work.title} - ${viewLabels[currentIndex] ?? "View"}`}
                      className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                    />

                    {/* Status Badge */}
                    <div
                      className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs sm:text-sm font-semibold ${
                        work.status === "sold"
                          ? "bg-red-500/90 text-white"
                          : "bg-green-500/90 text-white"
                      }`}
                    >
                      {work.status === "sold" ? "Sold" : "Available"}
                    </div>

                    {/* Slider Dots */}
                    {work.images.length > 1 && (
                      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
                        {work.images.map((_, i) => (
                          <button
                            key={i}
                            onClick={(e) => {
                              e.stopPropagation()
                              setActiveImage((prev) => ({
                                ...prev,
                                [work._id]: i,
                              }))
                            }}
                            className={`w-2 h-2 rounded-full transition-all ${
                              i === currentIndex
                                ? "bg-white scale-125"
                                : "bg-white/50"
                            }`}
                          />
                        ))}
                      </div>
                    )}

                    {/* Next / Prev Buttons */}
                    {work.images.length > 1 && (
                      <>
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            goPrev(work)
                          }}
                          className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-1 rounded hover:bg-black/70 transition"
                        >
                          ◀
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            goNext(work)
                          }}
                          className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-1 rounded hover:bg-black/70 transition"
                        >
                          ▶
                        </button>

                        {/* View Label */}
                        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 bg-black/50 text-white px-2 py-1 rounded text-xs sm:text-sm">
                          {viewLabels[currentIndex] ?? `View ${currentIndex + 1}`}
                        </div>
                      </>
                    )}
                  </div>
                )}

                {/* Info */}
                <h3 className="text-lg sm:text-xl font-semibold mb-1 group-hover:text-accent transition">
                  {work.title}
                </h3>

                <p className="text-xs sm:text-sm text-muted-foreground mb-1">
                  {work.material} {work.year && `• ${work.year}`}
                </p>

                {work.status === "available" && work.price && (
                  <p className="text-sm sm:text-base font-semibold text-accent mb-1">
                    ₦{work.price.toLocaleString()}
                  </p>
                )}

                {hoveredId === work._id && work.description && (
                  <p className="text-xs sm:text-sm leading-relaxed text-foreground/80 mt-2 animate-fade-in">
                    {work.description}
                  </p>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
