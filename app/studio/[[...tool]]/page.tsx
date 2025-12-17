import { NextStudio } from 'next-sanity/studio'
import config from '@/lib/sanity.config' // <-- updated path

export const dynamic = 'force-static'
export { metadata, viewport } from 'next-sanity/studio'

export default function StudioPage() {
  return <NextStudio config={config} />
}
