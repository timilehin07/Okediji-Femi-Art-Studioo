"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { getHomeHero } from "@/lib/getHomeHero"
import { urlFor } from "@/lib/sanityImage"

export default function Hero() {
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const buttonsRef = useRef<HTMLDivElement>(null)

  const [heroImage, setHeroImage] = useState<string | null>(null)

  useEffect(() => {
    async function fetchHero() {
      const data = await getHomeHero()
      if (data?.heroImage) {
        setHeroImage(
          urlFor(data.heroImage).width(2000).height(1200).quality(90).url()
        )
      }
    }
    fetchHero()
  }, [])

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
      className="relative min-h-screen pt-32 pb-20 px-6 flex items-center justify-center bg-cover bg-center parallax"
      style={{
        backgroundImage: heroImage
          ? `url('${heroImage}')`
          : "url('')",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/40 to-black/50"></div>

      <div className="relative z-10 max-w-2xl mx-auto text-center">
        <h1
          ref={titleRef}
          className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight mb-6 text-white text-balance"
        >
          Okediji Femi Art Studio
        </h1>

        <p
          ref={subtitleRef}
          className="text-xs sm:text-sm md:text-base lg:text-lg text-white/90 mb-12 leading-relaxed max-w-xl mx-auto"
        >
          Weaving narratives through sculptural forms
        </p>

        <div ref={buttonsRef} className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link href="/work">
            <button className="px-6 sm:px-8 py-2.5 sm:py-3 bg-primary text-primary-foreground text-xs sm:text-sm md:text-base font-medium rounded transition-smooth hover:shadow-lg hover:scale-105 active:scale-95">
              Gallery
            </button>
          </Link>
          <Link href="/about">
            <button className="px-6 sm:px-8 py-2.5 sm:py-3 bg-white/20 text-white text-xs sm:text-sm md:text-base font-medium rounded border border-white/30 transition-smooth hover:bg-white/30 hover:shadow-lg hover:scale-105 active:scale-95 backdrop-blur-sm">
              About Artist
            </button>
          </Link>
        </div>
      </div>
    </section>
  )
}
