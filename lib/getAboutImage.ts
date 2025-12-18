import { client } from "./sanityClient"

export interface AboutData {
  artistImage?: any
}

export async function getAboutImage(): Promise<AboutData | null> {
  const data = await client.fetch(`
    *[_type == "about"][0]{
      artistImage
    }
  `)
  return data || null
}
