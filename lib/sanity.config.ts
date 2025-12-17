import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from 'next-sanity/studio/desk' // optional if you use schemas

export default defineConfig({
  name: 'default',
  title: 'Okediji Femi headless cms',

  projectId: 'dhod8pfr', // your Sanity project ID
  dataset: 'production',

  plugins: [structureTool(), visionTool()],

  schema: {
    types: schemaTypes || [],
  },
})
