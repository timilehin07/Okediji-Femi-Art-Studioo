"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { ChevronDown } from "lucide-react"
import { client } from "@/lib/sanityClient"
import { urlFor } from "@/lib/sanityImage"

interface AboutData {
  artistImage?: any
}

export default function AboutPage() {
  const [expandedSection, setExpandedSection] = useState<string | null>(null)
  const [artistImage, setArtistImage] = useState<any>(null)

  // Fetch artist image from Sanity
  useEffect(() => {
    async function fetchImage() {
      const data: AboutData = await client.fetch(`
        *[_type == "about"][0]{
          artistImage
        }
      `)
      setArtistImage(data?.artistImage)
    }
    fetchImage()
  }, [])

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section)
  }

  const exhibitions = [
    "ICAF ART EXHIBITION (2017)",
    "GUSTO ART CHALLENGE (2017)",
    "OGIRIKAN MINIATURE ART EXHIBITION (2018)",
    "CONVERGENCE (2018)",
    "YABA TECH FINAL YEAR SCULPTURE EXHIBITION (2019)",
    "PADE BY ECOBANK (2022)",
    "ARTMOSPHERE ART & NFT EXHIBITION (2022)",
    "PSHAN ART EXHIBITION AND AUCTION (2023)",
    "AGA ART EXHIBITION (2023)",
    "+234 ART FAIR (ECOBANK) (2024)",
    "LAGOS CANVAS (British Consulate) 2025",
    "+234 ART FAIR (ECOBANK) 2025",
    "VSS FUTURE LABS 2025",
    "GENERATION 7 (Mydrim Gallery) 2025",
  ]

  return (
    <section className="py-20 px-6 md:py-32">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-start">
          {/* Artist Details */}
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-8">About the Artist</h2>

            <div className="space-y-4">
              {/* Biography */}
              <button
                onClick={() => toggleSection("bio")}
                className="w-full flex items-center justify-between p-6 bg-card border border-border rounded-lg hover:bg-accent/5 transition-colors"
              >
                <h3 className="text-xl font-semibold">Artist Biography</h3>
                <ChevronDown
                  className={`w-5 h-5 transition-transform ${expandedSection === "bio" ? "rotate-180" : ""}`}
                />
              </button>

              {expandedSection === "bio" && (
                <div className="p-6 bg-card border border-border rounded-lg space-y-4 text-base leading-relaxed text-muted-foreground">
                  <p>
                    Born on March 25th, 1995, Okediji Femi Samuel is a Nigerian sculptor from Oyo State, Nigeria.
                  </p>
                  <p>
                    He began his art journey with a National Diploma in General Art from The Polytechnic Ibadan and
                    later earned his Higher National Diploma in Sculpture from Yaba College of Technology.
                  </p>
                  <p>
                    Okediji Femi blends traditional sculpting techniques with contemporary themes, creating works
                    that resonate with diverse audiences.
                  </p>
                </div>
              )}

              {/* Artist Statement */}
              <button
                onClick={() => toggleSection("statement")}
                className="w-full flex items-center justify-between p-6 bg-card border border-border rounded-lg hover:bg-accent/5 transition-colors"
              >
                <h3 className="text-xl font-semibold">Artist Statement</h3>
                <ChevronDown
                  className={`w-5 h-5 transition-transform ${expandedSection === "statement" ? "rotate-180" : ""}`}
                />
              </button>

              {expandedSection === "statement" && (
                <div className="p-6 bg-card border border-border rounded-lg space-y-4 text-base leading-relaxed text-muted-foreground">
                  <p>
                    My sculptures reflect society, surroundings, and the omnipresent essence of women in daily life. I
                    embed textures like lace to explore resilience, tradition, and interconnected patterns of human
                    experience.
                  </p>
                  <p>
                    Each piece invites viewers to touch, reflect, and connect with the layered complexities of
                    human experience.
                  </p>
                </div>
              )}

              {/* Exhibitions */}
              <button
                onClick={() => toggleSection("exhibitions")}
                className="w-full flex items-center justify-between p-6 bg-card border border-border rounded-lg hover:bg-accent/5 transition-colors"
              >
                <h3 className="text-xl font-semibold">Exhibitions</h3>
                <ChevronDown
                  className={`w-5 h-5 transition-transform ${expandedSection === "exhibitions" ? "rotate-180" : ""}`}
                />
              </button>

              {expandedSection === "exhibitions" && (
                <div className="p-6 bg-card border border-border rounded-lg">
                  <ul className="space-y-2 text-base text-muted-foreground">
                    {exhibitions.map((exhibition, index) => (
                      <li key={index} className="flex items-start">
                        <span className="mr-3 text-accent">•</span>
                        <span>{exhibition}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Artist Image & Stats */}
          <div className="space-y-6">
            <div className="aspect-square bg-accent/10 rounded-lg overflow-hidden">
              {artistImage?.asset ? (
                <Image
                  src={urlFor(artistImage).width(800).height(800).url()!}
                  alt="Okediji Femi in Studio"
                  width={800}
                  height={800}
                  className="w-full h-full object-cover"
                  priority
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                  No image found
                </div>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-6 bg-card border border-border rounded-lg">
                <p className="text-3xl font-bold mb-2">15+</p>
                <p className="text-sm text-muted-foreground">Years of Practice</p>
              </div>
              <div className="p-6 bg-card border border-border rounded-lg">
                <p className="text-3xl font-bold mb-2">50+</p>
                <p className="text-sm text-muted-foreground">Works Created</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
