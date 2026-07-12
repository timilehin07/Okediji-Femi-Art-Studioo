import { urlFor } from "@/lib/sanityImage"

interface ProcessProps {
  process: {
    title: string
    intro: string
    steps: {
      stepNumber: number
      title: string
      description: string
      caption?: string
      image: any
    }[]
  }
}

export default function Process({ process }: ProcessProps) {
  return (
    <section className="py-20 px-6">
      <div className="max-w-6xl mx-auto">

        <div className="max-w-3xl mb-20">
          <h1 className="text-5xl font-bold mb-6">
            {process.title}
          </h1>

          <p className="text-lg text-muted-foreground leading-relaxed">
            {process.intro}
          </p>
        </div>

        <div className="space-y-24">
          {process.steps?.map((step, index) => (
            <div
              key={index}
              className={`grid lg:grid-cols-2 gap-12 items-center ${
                index % 2 === 1
                  ? "lg:[&>*:first-child]:order-2"
                  : ""
              }`}
            >
              <div className="overflow-hidden rounded-xl">
                <img
                  src={urlFor(step.image).width(1200).url()}
                  alt={step.title}
                  className="w-full h-[500px] object-cover hover:scale-105 transition duration-700"
                />
              </div>

              <div>
                <span className="text-sm uppercase tracking-[0.25em] text-muted-foreground">
                  Process
                </span>

                <h2 className="text-4xl font-bold mt-2 mb-6">
                  Step {step.stepNumber} · {step.title}
                </h2>

                <p className="text-lg leading-8 text-muted-foreground">
                  {step.description}
                </p>

                {step.caption && (
                  <p className="mt-6 italic text-muted-foreground">
                    {step.caption}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}