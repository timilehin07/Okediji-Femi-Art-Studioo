import { client } from "./sanityClient"

export interface Work {
  _id: string
  title: string
  year?: string
  material?: string
  price?: number
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
      price,
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
