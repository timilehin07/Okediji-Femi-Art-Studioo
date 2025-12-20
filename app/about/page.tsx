export const revalidate = 60

import Header from "@/components/header"
import Footer from "@/components/footer"
import About from "@/components/about"
import { client } from "@/lib/sanityClient"

async function getAboutImage() {
  return client.fetch(`
    *[_type == "about"][0]{
      artistImage
    }
  `)
}

export default async function AboutPage() {
  const aboutData = await getAboutImage()

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Header />
      <div className="pt-24">
        <About artistImage={aboutData?.artistImage} />
      </div>
      <Footer />
    </main>
  )
}
