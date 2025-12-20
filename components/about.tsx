"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { urlFor } from "@/lib/sanityImage"
import { client } from "@/lib/sanityClient"

interface AboutData {
  artistImage?: any
}

export default function About() {
  const [aboutData, setAboutData] = useState<AboutData | null>(null)

  useEffect(() => {
    async function fetchAbout() {
      const data = await client.fetch(`
        *[_type == "about"][0]{
          artistImage
        }
      `)
      setAboutData(data)
    }

    fetchAbout()
  }, [])

  const artistImage = aboutData?.artistImage

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
          {/* Left Column: Text Content with Collapsibles */}
          <div className="space-y-8">
            {/* About the Artist - Collapsible */}
            <details className="group">
              <summary className="flex cursor-pointer items-center justify-between list-none">
                <h2 className="text-4xl md:text-5xl font-bold">About the Artist</h2>
                <svg
                  className="h-8 w-8 text-accent transition-transform duration-300 group-open:rotate-180"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="mt-6 p-6 bg-card border border-border rounded-lg space-y-4 text-base leading-relaxed text-muted-foreground">
                <p>
                  Born on March 25th, 1995, Okediji Femi Samuel is a Nigerian artist (sculptor), who hails from Oyo
                  State, Nigeria and was born on the 25th day of March 1995 in Ibadan, Oyo State, Nigeria.
                </p>
                <p>
                  Okediji Femi has always been deeply connected to the artistic pulse that runs through his veins. His
                  journey into the art world began with a National Diploma in General Art from The Polytechnic Ibadan,
                  a foundation that equipped him with a diverse set of skills and a broad understanding of artistic
                  expressions.
                </p>
                <p>
                  It was at the Yaba College of Technology where Okediji Femi found his true calling. Here, he pursued
                  and obtained his Higher National Diploma in Sculpture, diving deep into the world of
                  three-dimensional art. His sculptures, often influenced by his surroundings and personal
                  experiences, weave narratives that resonate with a wide audience.
                </p>
                <p>
                  He worked as an IT student at the Universal Studios Of Art, National Theatre, Iganmu, Lagos, under
                  great masters of sculptures such as Bunmi Babatunde, Patrick Agose, Boma Joe Jim and other talented
                  minds.
                </p>
                <p>
                  Over the years, Okediji Femi has managed to carve a niche for himself, blending traditional
                  sculpting techniques with contemporary themes. His works reflect his dedication to his craft, his
                  deep understanding of materials, and his commitment to bringing forth thought-provoking art that
                  sparks dialogue and connection.
                </p>
                <p>
                  Today, Okediji Femi's pieces can be found in various exhibitions and collections, standing as a
                  testament to his passion, skill, and the rich educational background that shaped his artistic
                  journey.
                </p>
              </div>
            </details>

            {/* Artist Statement - Collapsible */}
            <details className="group">
              <summary className="flex cursor-pointer items-center justify-between list-none">
                <h2 className="text-4xl md:text-5xl font-bold">Artist Statement</h2>
                <svg
                  className="h-8 w-8 text-accent transition-transform duration-300 group-open:rotate-180"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="mt-6 p-6 bg-card border border-border rounded-lg space-y-4 text-base leading-relaxed text-muted-foreground">
                <p>
                  In the tactile world of my sculptures, I weave the intricate dance of my surroundings, society's
                  unfolding narratives, and the omnipresent essence of women who grace my everyday life. Each
                  sculpture stands as a testament to my deep immersion in my environment, translating societal
                  happenings and personal interactions into tangible forms. The women I sculpt are both muse and
                  message, embodying resilience, complexity, and the myriad roles they play amidst life's symphony.
                </p>
                <p>
                  Each piece emerges from a deep well of observation, absorbing the natural materials, textures, and
                  stories that unfold around me daily. My works seek to challenge, to question, and to empathize.
                </p>
                <p>
                  The deliberate embedding of lace fabric textures and patterns into my works serves a dual purpose:
                  it's an homage to the delicate yet enduring nature of traditions and femininity, and a reflection of
                  how intertwined and patterned our lives are with the fabric of society. This intricate detailing
                  offers a tactile experience, urging observers to feel, quite literally, the impressions left by
                  societal happenings and personal encounters.
                </p>
                <p>
                  Through my sculptures, I seek to create an intimate dialogue, inviting viewers to touch, reflect,
                  and connect with the layered complexities of our shared human experience, all while exploring the
                  beautiful imprints and patterns that shape our world and inner lives. Through my art, I offer not
                  just a reflection of society, but an invitation to engage, understand, and evolve with it.
                </p>
              </div>
            </details>

            {/* Artist Exhibitions - Collapsible */}
            <details className="group">
              <summary className="flex cursor-pointer items-center justify-between list-none">
                <h2 className="text-4xl md:text-5xl font-bold">Artist Exhibitions</h2>
                <svg
                  className="h-8 w-8 text-accent transition-transform duration-300 group-open:rotate-180"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="mt-6 p-6 bg-card border border-border rounded-lg">
                <ul className="space-y-2 text-base text-muted-foreground">
                  {exhibitions.map((exhibition, index) => (
                    <li key={index} className="flex items-start">
                      <span className="mr-3 text-accent">•</span>
                      <span>{exhibition}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </details>
          </div>

          {/* Right Column: Image + Stats */}
          <div className="space-y-6">
            <div className="aspect-square bg-accent/10 rounded-lg overflow-hidden">
        {artistImage?.asset ? (
          <Image
            src={urlFor(artistImage).width(800).height(800).url()}
            alt="Okediji Femi in Studio"
            width={800}
            height={800}
            className="w-full h-full object-cover"
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
