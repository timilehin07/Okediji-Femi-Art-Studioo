import { client } from "./sanityClient"

export async function getAboutImage() {
  return client.fetch(`
    *[_type == "about"][0]{
      artistImage
    }
  `)
}
