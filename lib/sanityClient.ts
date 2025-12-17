import { createClient } from 'next-sanity'

export const sanityClient = createClient({
  projectId: 'dhod8pfr', // from your Sanity Studio config
  dataset: 'production',
  apiVersion: '2025-12-17', // today's date or your chosen API version
  useCdn: true,
})
