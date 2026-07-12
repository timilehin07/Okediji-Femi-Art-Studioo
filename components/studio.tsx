import { urlFor } from "@/lib/sanityImage"

interface StudioProps {
  studio: {
    title: string
    intro: string
    heroImage: any
    gallery: any[]
  }
}

export default function Studio({ studio }: StudioProps) {
  return (
    <section className="py-20 px-6">
      <div className="max-w-6xl mx-auto">

        <h1 className="text-5xl font-bold mb-10">
          {studio.title}
        </h1>

        <div className="grid lg:grid-cols-2 gap-16 items-center">

          <div>
            <img
              src={urlFor(studio.heroImage).width(1200).url()}
              alt={studio.title}
              className="w-full rounded-xl object-cover"
            />
          </div>

          <div>
            <p className="text-lg leading-8 text-muted-foreground whitespace-pre-line">
              {studio.intro}
            </p>
          </div>

        </div>
        {studio.gallery?.length > 0 && (
  <div className="mt-20">
    <h2 className="text-3xl font-bold mb-8">
      Inside the Studio
    </h2>

    <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
      {studio.gallery.map((image, index) => (
        <img
          key={index}
          src={urlFor(image).width(800).url()}
          alt={`Studio ${index + 1}`}
          className="rounded-xl object-cover h-72 w-full hover:scale-105 transition duration-500"
        />
      ))}
    </div>
  </div>
)}
      </div>
    </section>
  )
}