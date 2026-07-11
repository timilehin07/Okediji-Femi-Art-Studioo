"use client"

import { useState } from "react"
import { urlFor } from "@/lib/sanityImage"
import { Work } from "@/lib/types"
import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"

const viewLabels = ["Front View", "Left side View", "Back view", "Right Side view"]

interface WorkDetailProps {
  work: Work
  otherWorks: Work[]
}

export default function WorkDetail({ work, otherWorks }: WorkDetailProps) {
  const [activeIndex, setActiveIndex] = useState(0)

  const currentImage = work.images?.[activeIndex]

  const goNext = () => {
    setActiveIndex((prev) => (prev + 1) % work.images.length)
  }

  const goPrev = () => {
    setActiveIndex((prev) => (prev - 1 + work.images.length) % work.images.length)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
      <Link
        href="/work"
        className="inline-block mb-8 text-sm text-muted-foreground hover:text-accent transition"
      >
        ← Back to all works
      </Link>

      <div className="grid md:grid-cols-2 gap-12">
        {/* Gallery */}
        <div>
          <div className="aspect-square bg-muted rounded-lg overflow-hidden relative mb-4">
            {currentImage && (
              <img
                src={urlFor(currentImage).width(1000).height(1000).url()}
                alt={`${work.title} - ${viewLabels[activeIndex] ?? "View"}`}
                className="w-full h-full object-cover"
              />
            )}

            {work.images.length > 1 && (
              <>
                <button
                  onClick={goPrev}
                  className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/40 backdrop-blur-md text-white p-2 rounded-2xl hover:bg-black/70 transition"
                >
                  <ChevronLeft size={22} strokeWidth={2.5} />
                </button>
                <button
                  onClick={goNext}
                  className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/40 backdrop-blur-md text-white p-2 rounded-2xl hover:bg-black/70 transition"
                >
                  <ChevronRight size={22} strokeWidth={2.5} />
                </button>

                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded text-xs sm:text-sm">
                  {viewLabels[activeIndex] ?? `View ${activeIndex + 1}`}
                </div>
              </>
            )}
          </div>

          {/* Thumbnails */}
          {work.images.length > 1 && (
            <div className="flex gap-3">
              {work.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveIndex(i)}
                  className={`w-16 h-16 rounded-md overflow-hidden border-2 transition ${
                    i === activeIndex ? "border-accent" : "border-transparent opacity-70"
                  }`}
                >
                  <img
                    src={urlFor(img).width(100).height(100).url()}
                    alt={`${work.title} thumbnail ${i + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Details */}
        <div>
          <div className="flex items-start justify-between mb-2">
            <h1 className="text-3xl sm:text-4xl font-bold">{work.title}</h1>
            <span
              className={`px-3 py-1 rounded-full text-xs sm:text-sm font-semibold ${
                work.status === "sold"
                  ? "bg-red-500/90 text-white"
                  : "bg-green-500/90 text-white"
              }`}
            >
              {work.status === "sold" ? "Sold" : "Available"}
            </span>
          </div>

          <p className="text-muted-foreground mb-4">
            {work.material} {work.year && `• ${work.year}`}
          </p>

          {work.status === "available" && work.price?.amount && (
            <p className="text-2xl font-semibold text-accent mb-6">
              {work.price.currency === "USD" ? "$" : "₦"}
              {work.price.amount.toLocaleString()}
            </p>
          )}

          {work.description && (
            <p className="text-base leading-relaxed text-foreground/80 mb-8">
              {work.description}
            </p>
          )}

          <Link
            href={`/commission?work=${encodeURIComponent(work.title)}&slug=${work.slug?.current ?? ""}`}
            className="inline-block px-6 py-3 bg-primary text-white rounded hover:opacity-80 transition text-center"
          >
            Inquire about this piece
          </Link>
        </div>
      </div>

      {/* Related Works */}
      {otherWorks.length > 0 && (
        <div className="mt-24">
          <h2 className="text-2xl font-bold mb-8">More Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {otherWorks.map((w) => {
              const img = w.images?.[0]
              return (
                <Link key={w._id} href={`/work/${w.slug?.current}`} className="group">
                  {img && (
                    <div className="aspect-square bg-muted rounded-lg overflow-hidden mb-3">
                      <img
                        src={urlFor(img).width(500).height(500).url()}
                        alt={w.title}
                        className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
                      />
                    </div>
                  )}
                  <h3 className="font-semibold group-hover:text-accent transition">
                    {w.title}
                  </h3>
                </Link>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}