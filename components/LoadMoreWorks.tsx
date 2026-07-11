"use client"

import { useState } from "react"
import Portfolio from "./portfolio"
import { Work } from "@/lib/types"

export default function LoadMoreWorks({ works }: { works: Work[] }) {
  const [visibleCount, setVisibleCount] = useState(6)
  const visibleWorks = works.slice(0, visibleCount)

  return (
    <>
      <Portfolio works={visibleWorks} showSeeMore={false} />

      {visibleCount < works.length && (
        <div className="flex justify-center mt-16">
          <button
            onClick={() => setVisibleCount((prev) => prev + 6)}
            className="px-6 py-3 bg-primary text-white rounded hover:opacity-80 transition"
          >
            See More Arts
          </button>
        </div>
      )}
    </>
  )
}