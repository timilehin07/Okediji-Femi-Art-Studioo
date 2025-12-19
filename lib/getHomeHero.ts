import { client } from "./sanityClient"

export async function getHomeHero() {
  return client.fetch(
    `
    *[_type == "home"][0]{
      heroImage
    }
    `,
    {},
    { cache: "no-store" }
  )
}
