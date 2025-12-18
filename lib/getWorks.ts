import { client } from "./sanityClient"
xport async function getWorks() {
  console.log("PROJECT ID:", process.env.NEXT_PUBLIC_SANITY_PROJECT_ID)
  console.log("DATASET:", process.env.NEXT_PUBLIC_SANITY_DATASET)

  return client.fetch(`*[_type == "work"]{..., image}`)
}

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
