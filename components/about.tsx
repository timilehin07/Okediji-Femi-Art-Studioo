import Image from "next/image"
import { urlFor } from "@/lib/sanityImage"
import { client } from "@/lib/sanityClient"

interface AboutData {
  artistImage?: any
}

async function getAboutImage(): Promise<AboutData | null> {
  const data = await client.fetch(`
    *[_type == "about"][0]{
      artistImage
    }
  `)
  return data || null
}

export default async function AboutPage() {
  const aboutData = await getAboutImage()
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

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await client.fetch(`
          *[_type == "about"][0]{
            artistImage
          }
        `)
        setArtistImage(data?.artistImage)
      } catch (err) {
        console.error("Failed to fetch about image:", err)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

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
                    In the tactile world of my sculptures, I weave the intricate dance of my surroundings, society's
                    unfolding narratives, and the omnipresent essence of women who grace my everyday life. Each
                    sculpture stands as a testament to my deep immersion in my environment, translating societal
                    happenings and personal interactions into tangible forms. The women I sculpt are both muse and
                    message, embodying resilience, complexity, and the myriad roles they play amidst life's symphony.
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
