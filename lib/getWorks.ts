import { client } from "./sanityClient"
import { Work } from "./types"

export interface Work {
_id: string
  title: string
  year?: string
  material?: string
  price?: {
    amount: number
    currency: "USD" | "NGN"
  } | null
  status: "available" | "sold"
  description?: string
  images: any[]
}

export async function getWorks(): Promise<Work[]> {
  return client.fetch(
    `
*[_type == "work"] | order(_createdAt desc) {
      _id,
      title,
      year,
      material,
      price { amount, currency },   // ← Important: explicitly fetch subfields
      status,
      description,
      images
    }
    `,
    {},
    {
      cache: "no-store",
      next: { revalidate: 0 },
    }
  )
}
