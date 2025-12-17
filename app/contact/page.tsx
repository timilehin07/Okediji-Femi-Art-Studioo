"use client"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { useState } from "react"
import emailjs from "@emailjs/browser"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  })

  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState("")
  const [error, setError] = useState("")

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    })
  }

  const sendEmail = async (e) => {
    e.preventDefault()
    setLoading(true)
    setSuccess("")
    setError("")

    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      message: formData.message,
    }

    emailjs
      .send(
        "service_94yzq3z",        // your service ID
        "template_44idizi",       // your template ID
        templateParams,
        "K5KXr4vG9x06O5IB9"       // your public key
      )
      .then(
        () => {
          setSuccess("Message sent successfully! 🎉")
          setFormData({ name: "", email: "", message: "" })
        },
        () => {
          setError("Something went wrong. Try again.")
        }
      )
      .finally(() => setLoading(false))
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Header />
      <section className="pt-32 pb-20 px-6 md:pt-40 md:pb-32">
        <div className="max-w-3xl mx-auto">
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-balance">Get in Touch</h1>
            <p className="text-lg text-muted-foreground">
              Interested in commissioning a piece or learning more about Okediji Femi's work? We'd love to hear from
              you.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            
            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-semibold mb-3">Location</h3>
                <p className="text-muted-foreground flex items-start gap-3">
                  <span className="text-2xl mt-1">📍</span>
                  <span>Lagos, Nigeria</span>
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3">Phone</h3>
                <a href="tel:+2348127942916"
                  className="text-primary hover:underline flex items-start gap-3 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <span className="text-2xl mt-1">📞</span>
                  <span>+234 812 794 2916</span>
                </a>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3">Email</h3>
                <a
                  href="mailto:okedijifemi@example.com"
                  className="text-primary hover:underline flex items-start gap-3 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <span className="text-2xl mt-1">✉️</span>
                  <span>okedijifemi@example.com</span>
                </a>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-muted/50 p-8 rounded-lg">
              <form className="space-y-6" onSubmit={sendEmail}>
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-background border border-border rounded focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Your name"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-background border border-border rounded focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="you@example.com"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-background border border-border rounded focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                    placeholder="Your message..."
                    required
                  ></textarea>
                </div>

                {success && <p className="text-green-600">{success}</p>}
                {error && <p className="text-red-600">{error}</p>}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full px-6 py-3 bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity rounded"
                >
                  {loading ? "Sending..." : "Send Message"}
                </button>
              </form>
            </div>

          </div>
        </div>
      </section>
      <Footer />
    </main>
  )
}
