import { client } from "./sanityClient"
import { Work } from "./types"

export async function getWorks(): Promise<Work[]> {
  return client.fetch(
    `
*[_type == "work"] | order(_createdAt desc) {
      _id,
      title,
      category,
      slug,
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

export async function getWorkBySlug(slug: string): Promise<Work | null> {
  return client.fetch(
    `
    *[_type == "work" && slug.current == $slug][0] {
      _id,
      title,
      category,
      slug,
      year,
      dimensions,
      weight,
      editionSize,
      material,
      price { amount, currency },
      status,
      description,
      images
    }
    `,
    { slug },
    {
      cache: "no-store",
      next: { revalidate: 0 },
    }
  )
}

export async function getOtherWorks(excludeId: string): Promise<Work[]> {
  return client.fetch(
    `
    *[_type == "work" && _id != $excludeId] | order(_createdAt desc) [0...3] {
      _id,
      title,
      category,
      slug,
      year,
      material,
      price { amount, currency },
      status,
      description,
      images
    }
    `,
    { excludeId },
    {
      cache: "no-store",
      next: { revalidate: 0 },
    }
  )
}

