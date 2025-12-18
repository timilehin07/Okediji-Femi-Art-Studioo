import { client } from "./sanityClient"

// Define Work interface here
interface Work {
  _id: string
  title: string
  year: number
  material: string
  price?: number
  status: "available" | "sold"
  description?: string
  image?: any
}

export async function getWorks(): Promise<Work[]> {
  return client.fetch(`
    *[_type == "work"] | order(_createdAt desc) {
      _id,
      title,
      year,
      material,
      price,
      status,
      description,
      image
    }
  `)
}
