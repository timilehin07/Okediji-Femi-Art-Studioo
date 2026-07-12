import Header from "@/components/header"
import Footer from "@/components/footer"
import Process from "@/components/process"
import { client } from "@/lib/sanityClient"

export const revalidate = 60

async function getProcess() {
  return client.fetch(`
    *[_type == "process"][0]{
      title,
      intro,
      steps[]{
        stepNumber,
        title,
        description,
        caption,
        image
      }
    }
  `)
}

export default async function ProcessPage() {
  const process = await getProcess()

  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col">
      <Header />

      <div className="pt-24 flex-1">
        <Process process={process} />
      </div>

      <Footer />
    </main>
  )
}