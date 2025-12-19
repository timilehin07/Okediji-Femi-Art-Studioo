"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"
import { urlFor } from "@/lib/sanityImage"

export default function Hero({ heroData }: { heroData: any }) {
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const buttonsRef = useRef<HTMLDivElement>(null)

  const heroImage = heroData?.heroImage
    ? urlFor(heroData.heroImage)
        .width(2000)
        .height(1200)
        .quality(90)
        .url()
    : null

  useEffect(() => {
    const elements = [titleRef.current, subtitleRef.current, buttonsRef.current]
    elements.forEach((el, index) => {
      if (el) {
        el.style.opacity = "0"
        el.style.animation = `slide-up 0.7s ease-out forwards`
        el.style.animationDelay = `${index * 0.2}s`
      }
    })
  }, [])

  return (
    <section
      className="relative min-h-screen pt-32 pb-20 px-6 flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage: heroImage ? `url('${heroImage}')` : undefined,
        backgroundAttachment: "fixed",
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/40 to-black/50" />

      <div className="relative z-10 max-w-2xl mx-auto text-center">
        <h1
          ref={titleRef}
          className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight mb-6 text-white"
        >
          Okediji Femi Art Studio
        </h1>

        <p
          ref={subtitleRef}
          className="text-xs sm:text-sm md:text-base lg:text-lg text-white/90 mb-12"
        >
          Weaving narratives through sculptural forms
        </p>

        <div
          ref={buttonsRef}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Link href="/work">
            <button className="px-6 py-3 bg-primary text-white rounded">
              Gallery
            </button>
          </Link>
          <Link href="/about">
            <button className="px-6 py-3 bg-white/20 text-white rounded border">
              About Artist
            </button>
          </Link>
        </div>
      </div>
    </section>
  )
}
