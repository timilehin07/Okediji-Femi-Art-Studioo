import { createClient } from "@sanity/client"

export const client = createClient({
  projectId: "dhod8pfr", // ✅ MUST MATCH STUDIO
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: true,
})
