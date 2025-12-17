import { client } from "./sanity"

export async function getAboutImage() {
  return client.fetch(`
    *[_type == "about"][0]{
      artistImage
    }
  `)
}
