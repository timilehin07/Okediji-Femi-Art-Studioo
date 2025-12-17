import Header from "@/components/header"
import Portfolio from "@/components/portfolio"
import Footer from "@/components/footer"

export default function WorkPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Header />
      <div className="pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-balance">Our Works</h1>
          <p className="text-lg text-muted-foreground mb-12">
            Explore the sculptural creations of Okediji Femi Art Studio
          </p>
        </div>
        <Portfolio />
      </div>
      <Footer />
    </main>
  )
}
