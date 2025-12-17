import { client } from "./sanity"

export async function getHomeHero() {
  return client.fetch(`
    *[_type == "home"][0]{
      heroImage
    }
  `)
}
