import { client } from "./sanityClient"
import { Work } from "./types"

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
