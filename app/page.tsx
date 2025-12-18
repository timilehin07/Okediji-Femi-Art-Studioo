import Header from "@/components/header"
import Hero from "@/components/hero"
import Portfolio from "@/components/portfolio"
import Contact from "@/components/contact"
import Footer from "@/components/footer"
import { getHomeHero } from "@/lib/getHomeHero"

export default async function Home() {
  const heroData = await getHomeHero()

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Header />
      <Hero heroData={heroData} />
      <Portfolio />
      <Contact />
      <Footer />
    </main>
  )
}
