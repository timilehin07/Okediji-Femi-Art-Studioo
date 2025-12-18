import { client } from "./sanityClient"

export async function getWorks() {
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
