import Header from "@/components/header"
import Footer from "@/components/footer"
import Commission from "@/components/commission"

export default function CommissionPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Header />
      <div className="pt-24">
        <Commission />
      </div>
      <Footer />
    </main>
  )
}
