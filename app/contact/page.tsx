import Header from "@/components/header"
import Footer from "@/components/footer"

export default function ContactPage() {
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
                <a
                  href="tel:+234812794291"
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

              <div>
                <h3 className="text-xl font-semibold mb-4">Follow</h3>
                <div className="flex gap-6">
                  <a
                    href="https://www.instagram.com/phemcookediji/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                    aria-label="Instagram"
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1 1 12.324 0 6.162 6.162 0 0 1-12.324 0zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm4.965-10.322a1.44 1.44 0 1 1 2.881.001 1.44 1.44 0 0 1-2.881-.001z" />
                    </svg>
                  </a>
                  <a
                    href="https://www.twitter.com/FemiStudio"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                    aria-label="X"
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.514l-5.106-6.694-5.829 6.694h-3.328l7.691-8.793-8.156-10.707h6.655l4.872 6.434 5.329-6.434zM16.369 20.576h2.136L7.362 3.852H5.074l11.295 16.724z" />
                    </svg>
                  </a>
                  <a
                    href="https://www.linkedin.com/in/okediji-femi-art-studio-5a47aa222"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                    aria-label="LinkedIn"
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.475-2.236-1.986-2.236-1.081 0-1.722.722-2.004 1.418-.103.249-.129.597-.129.946v5.441h-3.554s.05-8.81 0-9.728h3.554v1.375c.427-.659 1.191-1.595 2.897-1.595 2.117 0 3.704 1.385 3.704 4.362v5.586zM5.337 8.855c-1.144 0-1.915-.758-1.915-1.704 0-.951.77-1.704 1.956-1.704 1.187 0 1.915.753 1.948 1.704 0 .946-.761 1.704-1.989 1.704zm1.581 11.597H3.635V9.724h3.283v10.728zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-muted/50 p-8 rounded-lg">
              <form className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full px-4 py-2 bg-background border border-border rounded focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-4 py-2 bg-background border border-border rounded focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    className="w-full px-4 py-2 bg-background border border-border rounded focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                    placeholder="Your message..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full px-6 py-3 bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity rounded"
                >
                  Send Message
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
