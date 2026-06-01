export const revalidate = 60

import Header from "@/components/header"
import Hero from "@/components/hero"
import Portfolio from "@/components/portfolio"
import Contact from "@/components/contact"
import Footer from "@/components/footer"
import { getHomeHero } from "@/lib/getHomeHero"
import { getWorks } from "@/lib/getWorks"

export default async function Home() {
  const heroData = await getHomeHero()
  const works = await getWorks()  

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Header />
      <Hero heroData={heroData} />
      <Portfolio works={works} />  
      <Contact />
      <Footer />
    </main>
  )
}
