import { createClient } from "@sanity/client";

export const sanityClient = createClient({
  projectId: "dhod8pfr",
  dataset: "production",
  apiVersion: "2025-12-17",
  useCdn: false,
});
