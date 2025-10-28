"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false)
  const router = useRouter()

  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      setIsVisible(true)
    } else {
      setIsVisible(false)
    }
  }

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  useEffect(() => {
    const handleRouteChange = () => {
      window.scrollTo(0, 0)
    }

    // Scroll to top immediately when component mounts or route changes
    window.scrollTo(0, 0)

    return () => {
      // Cleanup
    }
  }, [router])

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility)
    return () => {
      window.removeEventListener("scroll", toggleVisibility)
    }
  }, [])

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 p-3 bg-primary text-primary-foreground rounded-full shadow-lg hover:opacity-90 transition-all duration-300 transform hover:scale-110 active:scale-95 animate-fade-in z-50"
          aria-label="Scroll to top"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </button>
      )}
    </>
  )
}
