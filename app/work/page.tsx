// app/page.tsx
import Header from "@/components/header"
import Hero from "@/components/hero"
import Portfolio from "@/components/portfolio"
import Contact from "@/components/contact"
import Footer from "@/components/footer"
import { getHeroData } from "@/lib/getHeroData"
import { getWorks } from "@/lib/getWorks"

export default async function HomePage() {
  // fetch hero data
  const heroData = await getHeroData()

  // fetch works data
  const works = await getWorks()

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Header />
      <Hero heroData={heroData} />
      <Portfolio works={works} /> {/* ✅ pass the works prop */}
      <Contact />
      <Footer />
    </main>
  )
}
