"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"
import { urlFor } from "@/lib/sanityImage"
import Image from "next/image"

export default function Hero({ heroData }: { heroData: any }) {
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const buttonsRef = useRef<HTMLDivElement>(null)

  const heroImage = heroData?.heroImage
  ? urlFor(heroData.heroImage)
      .width(2000)
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
    <section className="relative min-h-[400px] sm:min-h-[520px] md:min-h-0">
     
  {heroImage && (
    <Image
      src={heroImage}
      alt="Okediji Femi Art Studio Hero"
      width={2000}
      height={1499}
      priority
      className="w-full h-[400px] sm:h-[500px] md:h-auto object-cover"
    />
  )}

      <div className="absolute inset-0 bg-black/40" />
      <div className="absolute inset-0 flex items-center justify-center px-6 z-20">
  <div className="max-w-xs sm:max-w-2xl mx-auto text-center">
        <h1
          ref={titleRef}
         className="text-xl sm:text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight mb-3 sm:mb-6 text-white"
        >
          Okediji Femi Art Studio
        </h1>

        <p
          ref={subtitleRef}
          className="text-xs sm:text-sm md:text-base lg:text-lg text-white/90 mb-5 sm:mb-12 px-4"
        >
          Weaving narratives through sculptural forms
        </p>

        <div
  ref={buttonsRef}
  className="flex flex-row flex-wrap gap-3 justify-center items-center"
>
          <Link href="/work">
            <button className="px-3 py-2 sm:px-6 sm:py-3 text-xs sm:text-base bg-primary text-white rounded">
              Gallery
            </button>
          </Link>
          <Link href="/about">
            <button className="px-3 py-2 sm:px-6 sm:py-3 text-xs sm:text-base bg-white/20 text-white rounded border">
              About Artist
            </button>
          </Link>
        </div>
        </div>
      </div>
    </section>
  )
}