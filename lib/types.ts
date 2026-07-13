export interface Work {
  _id: string
  title: string
   category: "abstract" | "figurative"
  year?: string
  dimensions?: string
  weight?: string
  editionSize?: string
  material?: string
  price?: {
    amount: number
    currency: "USD" | "NGN"
  } | null
  status: "available" | "sold"
  description?: string
  images: any[]
   slug?: {
    current: string}
}
