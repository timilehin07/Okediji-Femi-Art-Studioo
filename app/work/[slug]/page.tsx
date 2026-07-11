import Header from "@/components/header"
import Footer from "@/components/footer"
import WorkDetail from "@/components/WorkDetail"
import { getWorkBySlug, getOtherWorks } from "@/lib/getWorks"
import { notFound } from "next/navigation"

export const revalidate = 60

export default async function WorkDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const work = await getWorkBySlug(slug)

  if (!work) {
    notFound()
  }

  const otherWorks = await getOtherWorks(work._id)

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Header />
      <div className="pt-24 pb-12">
        <WorkDetail work={work} otherWorks={otherWorks} />
      </div>
      <Footer />
    </main>
  )
}