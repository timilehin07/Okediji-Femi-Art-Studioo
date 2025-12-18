import { client } from "./sanityClient"
import { Work } from "@/types/work"

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
