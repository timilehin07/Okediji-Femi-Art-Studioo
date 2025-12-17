"use client"

import type React from "react"
import { useState } from "react"
import emailjs from "@emailjs/browser"

export default function Commission() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    projectType: "",
    currency: "NGN",
    budget: "",
    timeline: "",
    description: "",
  })

  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState("")
  const [error, setError] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setSuccess("")
    setError("")

    // Map form fields to template variables (adjust these variable names to match your EmailJS template)
    const templateParams = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone || "Not provided",
      project_type: formData.projectType,
      currency: formData.currency,
      budget: formData.budget,
      timeline: formData.timeline || "Not specified",
      description: formData.description,
    }

    try {
      await emailjs.send(
        "service_94yzq3z",      // Service ID
        "template_v6ogzkq",     // Template ID
        templateParams,
        "K5KXr4vG9x06O5IB9"     // Public Key
      )

      setSuccess("Thank you for your commission inquiry! We will get back to you soon. 🎉")
      setFormData({
        name: "",
        email: "",
        phone: "",
        projectType: "",
        currency: "NGN",
        budget: "",
        timeline: "",
        description: "",
      })
    } catch (err) {
      setError("Something went wrong. Please try again later.")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const currencies = [
    { code: "NGN", symbol: "₦", name: "Naira" },
    { code: "USD", symbol: "$", name: "US Dollar" },
    { code: "EUR", symbol: "€", name: "Euro" },
    { code: "GBP", symbol: "£", name: "Pound" },
  ]

  const budgetRanges: Record<string, { label: string; value: string }[]> = {
    NGN: [
      { label: "Under ₦200,000", value: "under-200k" },
      { label: "₦200,000 - ₦500,000", value: "200k-500k" },
      { label: "₦500,000 - ₦1,000,000", value: "500k-1m" },
      { label: "₦1,000,000+", value: "1m-plus" },
      { label: "Flexible", value: "flexible" },
    ],
    USD: [
      { label: "Under $500", value: "under-500" },
      { label: "$500 - $1,500", value: "500-1500" },
      { label: "$1,500 - $3,000", value: "1500-3000" },
      { label: "$3,000+", value: "3000-plus" },
      { label: "Flexible", value: "flexible" },
    ],
    EUR: [
      { label: "Under €500", value: "under-500" },
      { label: "€500 - €1,500", value: "500-1500" },
      { label: "€1,500 - €3,000", value: "1500-3000" },
      { label: "€3,000+", value: "3000-plus" },
      { label: "Flexible", value: "flexible" },
    ],
    GBP: [
      { label: "Under £400", value: "under-400" },
      { label: "£400 - £1,200", value: "400-1200" },
      { label: "£1,200 - £2,500", value: "1200-2500" },
      { label: "£2,500+", value: "2500-plus" },
      { label: "Flexible", value: "flexible" },
    ],
  }

  const processSteps = [
    {
      number: "01",
      title: "Initial Consultation",
      description: "Share your vision, ideas, and requirements. We discuss concept, size, materials, and placement.",
    },
    {
      number: "02",
      title: "Design & Proposal",
      description: "Receive detailed sketches, 3D renders, material samples, and a comprehensive project quote.",
    },
    {
      number: "03",
      title: "Creation Process",
      description: "Your sculpture is crafted with precision. Regular updates keep you connected to the journey.",
    },
    {
      number: "04",
      title: "Delivery & Installation",
      description: "Professional delivery and installation ensure your commissioned piece is perfectly positioned.",
    },
  ]

  const pricingTiers = [
    {
      name: "Small Scale",
      size: "Up to 2 feet",
      price: "From ₦150,000",
      features: [
        "Tabletop sculptures",
        "Portrait busts",
        "Decorative pieces",
        "4-6 weeks completion",
        "Free consultation",
      ],
    },
    {
      name: "Medium Scale",
      size: "2-5 feet",
      price: "From ₦500,000",
      features: [
        "Garden sculptures",
        "Indoor installations",
        "Corporate pieces",
        "8-12 weeks completion",
        "3D rendering included",
      ],
      featured: true,
    },
    {
      name: "Large Scale",
      size: "5+ feet",
      price: "Custom Quote",
      features: [
        "Public monuments",
        "Architectural pieces",
        "Major installations",
        "Timeline by project",
        "Full project management",
      ],
    },
  ]

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Hero Section */}
      <div className="text-center mb-16 animate-fade-in">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 text-balance">
          Commission Your Sculpture
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
          Transform your vision into a timeless work of art. Each commissioned piece is crafted with precision, passion,
          and a deep understanding of form and narrative.
        </p>
      </div>

      {/* Process Section */}
      <div className="mb-20 animate-slide-up" style={{ animationDelay: "0.2s" }}>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-12">The Commission Process</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {processSteps.map((step, index) => (
            <div
              key={step.number}
              className="bg-card p-6 rounded-lg border border-border hover:shadow-xl transition-smooth hover:-translate-y-2 animate-slide-up"
              style={{ animationDelay: `${0.1 * index}s` }}
            >
              <div className="text-4xl font-bold text-accent mb-4 opacity-50">{step.number}</div>
              <h3 className="text-lg sm:text-xl font-semibold mb-3">{step.title}</h3>
              <p className="text-sm sm:text-base text-muted-foreground">{step.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Pricing Section */}
      <div className="mb-20 animate-slide-up" style={{ animationDelay: "0.4s" }}>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-4">Investment Guide</h2>
        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          Each sculpture is priced based on size, complexity, materials, and time. Contact us for a personalized quote.
        </p>
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {pricingTiers.map((tier, index) => (
            <div
              key={tier.name}
              className={`bg-card p-6 sm:p-8 rounded-lg border transition-smooth hover:shadow-xl hover:-translate-y-2 animate-slide-up ${
                tier.featured ? "border-accent shadow-lg" : "border-border"
              }`}
              style={{ animationDelay: `${0.1 * index}s` }}
            >
              {tier.featured && (
                <div className="bg-accent text-accent-foreground text-xs font-semibold px-3 py-1 rounded-full inline-block mb-4">
                  Most Popular
                </div>
              )}
              <h3 className="text-xl sm:text-2xl font-bold mb-2">{tier.name}</h3>
              <p className="text-muted-foreground mb-2">{tier.size}</p>
              <div className="text-2xl sm:text-3xl font-bold mb-6">{tier.price}</div>
              <ul className="space-y-3 mb-6">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-sm sm:text-base">
                    <svg
                      className="w-5 h-5 text-accent flex-shrink-0 mt-0.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Commission Form */}
      <div className="max-w-3xl mx-auto animate-slide-up" style={{ animationDelay: "0.6s" }}>
        <div className="bg-card p-6 sm:p-8 lg:p-10 rounded-lg border border-border shadow-lg">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-center">Start Your Commission</h2>
          <p className="text-center text-muted-foreground mb-8">
            Tell us about your project and we will get back to you within 48 hours.
          </p>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2.5 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent bg-background transition-smooth"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2.5 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent bg-background transition-smooth"
                  placeholder="john@example.com"
                />
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="phone" className="block text-sm font-medium mb-2">
                  Phone Number (with country code)
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent bg-background transition-smooth"
                  placeholder="+234 812 794 2916"
                />
                <p className="text-xs text-muted-foreground mt-1">Include your country code (e.g., +1, +44, +234)</p>
              </div>
              <div>
                <label htmlFor="projectType" className="block text-sm font-medium mb-2">
                  Project Type *
                </label>
                <select
                  id="projectType"
                  name="projectType"
                  value={formData.projectType}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2.5 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent bg-background transition-smooth"
                >
                  <option value="">Select type</option>
                  <option value="portrait">Portrait / Bust</option>
                  <option value="figurative">Figurative Sculpture</option>
                  <option value="abstract">Abstract Piece</option>
                  <option value="installation">Installation Art</option>
                  <option value="monument">Monument / Public Art</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="currency" className="block text-sm font-medium mb-2">
                  Currency
                </label>
                <select
                  id="currency"
                  name="currency"
                  value={formData.currency}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent bg-background transition-smooth"
                >
                  {currencies.map((curr) => (
                    <option key={curr.code} value={curr.code}>
                      {curr.symbol} {curr.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="budget" className="block text-sm font-medium mb-2">
                  Budget Range
                </label>
                <select
                  id="budget"
                  name="budget"
                  value={formData.budget}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent bg-background transition-smooth"
                >
                  <option value="">Select budget</option>
                  {budgetRanges[formData.currency].map((range) => (
                    <option key={range.value} value={range.value}>
                      {range.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <label htmlFor="timeline" className="block text-sm font-medium mb-2">
                Preferred Timeline
              </label>
              <select
                id="timeline"
                name="timeline"
                value={formData.timeline}
                onChange={handleChange}
                className="w-full px-4 py-2.5 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent bg-background transition-smooth"
              >
                <option value="">Select timeline</option>
                <option value="1-3-months">1-3 months</option>
                <option value="3-6-months">3-6 months</option>
                <option value="6-12-months">6-12 months</option>
                <option value="flexible">Flexible</option>
              </select>
            </div>
            <div>
              <label htmlFor="description" className="block text-sm font-medium mb-2">
                Project Description *
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows={6}
                className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent bg-background resize-none transition-smooth"
                placeholder="Tell us about your vision, inspiration, intended location, and any specific requirements..."
              />
            </div>

            {success && <p className="text-green-600 text-center font-medium">{success}</p>}
            {error && <p className="text-red-600 text-center font-medium">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-accent text-accent-foreground font-semibold py-3 px-6 rounded-lg hover:shadow-lg transition-smooth hover:scale-105 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? "Sending Inquiry..." : "Submit Commission Inquiry"}
            </button>
          </form>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="mt-20 animate-slide-up" style={{ animationDelay: "0.8s" }}>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-12">Frequently Asked Questions</h2>
        <div className="max-w-3xl mx-auto space-y-6">
          {[
            {
              q: "How long does a commission take?",
              a: "Timeline varies based on size and complexity. Small pieces typically take 4-6 weeks, medium pieces 8-12 weeks, and large installations 3-6 months or more.",
            },
            {
              q: "What materials do you work with?",
              a: "I work with clay, bronze, resin, stone, wood, and mixed media. Material selection depends on your vision, location, and budget.",
            },
            {
              q: "Do you ship internationally?",
              a: "Yes, I can arrange professional international shipping and installation services for commissioned pieces.",
            },
            {
              q: "What is your payment structure?",
              a: "Typically 50% deposit to begin, 40% at completion, and 10% upon delivery and installation. Payment plans can be discussed for larger projects.",
            },
          ].map((faq, index) => (
            <div key={index} className="bg-card p-6 rounded-lg border border-border">
              <h3 className="font-semibold text-lg mb-2">{faq.q}</h3>
              <p className="text-muted-foreground">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}