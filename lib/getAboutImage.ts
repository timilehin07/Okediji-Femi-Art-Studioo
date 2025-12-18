import { client } from "./sanityClient"

export async function getAboutImage() {
  // Fetch the first about document with the artistImage
  const data = await client.fetch(`
    *[_type == "about"][0]{
      artistImage
    }
  `)
  return data
}
