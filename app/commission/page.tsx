import Header from "@/components/header"
import Footer from "@/components/footer"
import Commission from "@/components/commission"
import { client } from "@/lib/sanityClient"

async function getCommissionWorks() {
  return client.fetch(`
    *[_type == "commissionWork"] | order(order asc){
      title,
      material,
      year,
      location,
      description,
      image
    }
  `)
}

export default async function CommissionPage() {
  const commissionWorks = await getCommissionWorks()

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Header />

      <div className="pt-24">
        <Commission commissionWorks={commissionWorks} />
      </div>

      <Footer />
    </main>
  )
}