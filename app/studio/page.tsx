import Header from "@/components/header"
import Footer from "@/components/footer"
import Studio from "@/components/studio"
import { client } from "@/lib/sanityClient"

export const revalidate = 60

async function getStudio() {
  return client.fetch(`
    *[_type == "studio"][0]{
      title,
      intro,
      heroImage,
      gallery
    }
  `)
}
export default async function StudioPage() {
  const studio = await getStudio()

  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col">
      <Header />

      <div className="pt-24 flex-1">
        <Studio studio={studio} />
      </div>

      <Footer />
    </main>
  )
}