"use client"

import { useState, useEffect, useRef } from "react"
import { urlFor } from "@/lib/sanityImage"
import { Work } from "@/lib/types"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"

interface PortfolioProps {
  works: Work[]
  showSeeMore?: boolean
  seeMoreHref?: string
}

const viewLabels = ["Front View", "Left side View", "Back view", "Right Side view"]

export default function Portfolio({ works, showSeeMore = true, seeMoreHref = "/work" }: PortfolioProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null)
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set())
  const [activeImage, setActiveImage] = useState<Record<string, number>>({})
  const intervalRefs = useRef<Record<string, NodeJS.Timeout>>({})
  const itemRefs = useRef<(HTMLDivElement | null)[]>([])
  const [selectedCategory, setSelectedCategory] = useState<
  "all" | "abstract" | "figurative"
>("all")

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

    itemRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref)
    })

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

  const filteredWorks =
  selectedCategory === "all"
    ? works
    : works.filter((work) => work.category === selectedCategory)

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
          <div className="flex flex-wrap justify-center md:justify-start gap-3 mt-8">
  {[
    { label: "All", value: "all" },
    { label: "Abstract", value: "abstract" },
    { label: "Figurative", value: "figurative" },
  ].map((category) => (
    <button
      key={category.value}
      onClick={() =>
        setSelectedCategory(
          category.value as "all" | "abstract" | "figurative"
        )
      }
      className={`px-5 py-2 rounded-full border transition-all duration-300 ${
        selectedCategory === category.value
          ? "bg-primary text-white border-primary"
          : "bg-transparent text-foreground hover:bg-primary/10"
      }`}
    >
      {category.label}
    </button>
  ))}
</div>
        </div>

        {/* Works Grid */}
        {filteredWorks.length === 0 ? (
  <div className="text-center py-20 text-muted-foreground">
    No artworks found in this category.
  </div>
) : (
        <div className="grid md:grid-cols-3 gap-8">
          {filteredWorks.map((work, index) => {
            const currentIndex = activeImage[work._id] ?? 0
            const currentImage = work.images?.[currentIndex]

            return (
              <div
                key={work._id}
                ref={(el) => { itemRefs.current[index] = el }} // ✅ error-free
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
    <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs sm:text-sm font-semibold ${
      work.status === "sold"
        ? "bg-red-500/90 text-white"
        : "bg-green-500/90 text-white"
    }`}>
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
              setActiveImage((prev) => ({ ...prev, [work._id]: i }))
            }}
            className={`w-2 h-2 rounded-full transition-all ${
              i === currentIndex ? "bg-white scale-125" : "bg-white/50"
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
          className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/40 backdrop-blur-md text-white p-2 rounded-2xl hover:bg-black/70 transition-all duration-300 opacity-0 group-hover:opacity-100"
        >
          <ChevronLeft size={20} strokeWidth={2.5} />
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation()
            goNext(work)
          }}
          className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/40 backdrop-blur-md text-white p-2 rounded-2xl hover:bg-black/70 transition-all duration-300 opacity-0 group-hover:opacity-100"
        >
          <ChevronRight size={20} strokeWidth={2.5} />
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

                {work.status === "available" && work.price?.amount && (
                  <p className="text-sm sm:text-base font-semibold text-accent mb-1">
                  {work.price.currency === "USD" ? "$" : "₦"}
                  {work.price.amount.toLocaleString()}
                </p>
                )}

                {hoveredId === work._id && work.description ? (
                  <p className="text-xs sm:text-sm leading-relaxed text-foreground/80 mt-2 animate-fade-in line-clamp-2">
                    {work.description}
                  </p>
                ) : null}

                 <Link href={`/work/${work.slug?.current}`}>
                  <button className="mt-3 text-sm font-medium underline text-accent hover:opacity-70 transition">
                    Read more/Buy
                  </button>
               </Link>
              </div>
            )
          })}
        </div>
)}
        {showSeeMore && (
          <div className="flex justify-center mt-16">
            <Link href={seeMoreHref}>
              <button className="px-6 py-3 bg-primary text-white rounded hover:opacity-80 transition">
                See More Arts
              </button>
            </Link>
          </div>
        )}

      </div>
    </section>
  )
}
