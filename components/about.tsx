"use client"

import { useEffect, useState } from "react"
import { ChevronDown } from "lucide-react"
import Image from "next/image"
import { getAboutImage } from "@/lib/getAboutImage"
import { urlFor } from "@/lib/sanityImage"

export default function About() {
  const [expandedSection, setExpandedSection] = useState<string | null>(null)
  const [artistImage, setArtistImage] = useState<any>(null)

  useEffect(() => {
    async function fetchImage() {
      const data = await getAboutImage()
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
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-8">About the Artist</h2>

            <div className="space-y-4">
              {/* Artist Biography */}
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
                    Born on March 25th, 1995, Okediji Femi Samuel is a Nigerian artist (sculptor), hailing from Oyo State, Nigeria.
                  </p>
                  <p>
                    He studied at The Polytechnic Ibadan and Yaba College of Technology, specializing in sculpture.
                  </p>
                  <p>
                    His works blend traditional sculpting with contemporary themes and can be found in various exhibitions.
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
                    In the tactile world of my sculptures, I weave societal narratives and personal experiences into tangible forms.
                  </p>
                  <p>
                    My works invite viewers to feel, reflect, and connect with the layered complexities of our shared human experience.
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

          {/* Artist Image and Stats */}
          <div className="space-y-6">
            <div className="aspect-square bg-accent/10 rounded-lg overflow-hidden">
              {artistImage ? (
                <Image
                  src={urlFor(artistImage).width(800).height(800).url()!}
                  alt="Okediji Femi in Studio"
                  width={500}
                  height={500}
                  className="w-full h-full object-cover"
                  priority
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                  Loading image...
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
