import { InstaxImage } from "./InstaxImage"

export default function TeamGallery() {
  return (
    <section
      aria-labelledby="teamwork-title"
      className="mx-auto mt-5 max-w-4xl animate-slide-up-fade"
      style={{
        animationDuration: "600ms",
        animationDelay: "200ms",
        animationFillMode: "backwards",
      }}
    >
      <div className="mt-20">
        <div className="flex w-full flex-col items-center justify-between md:flex-row">
          <InstaxImage
            className="w-100 -rotate-6 sm:-ml-10"
            src="/images/working.webp"
            alt="Building search at build time"
            width={640}
            height={427}
            caption="Build-time indexing in action"
          />
          <InstaxImage
            className="w-60 rotate-3"
            src="/images/workplace.webp"
            alt="A quiet place to focus"
            width={640}
            height={853}
            caption="Deep work, zero databases"
          />
          <InstaxImage
            className="-mr-10 w-60 rotate-1"
            src="/images/home.webp"
            alt="Open source from day one"
            width={640}
            height={960}
            caption="Open source, always"
          />
        </div>
        <div className="mt-8 hidden w-full justify-between gap-4 md:flex">
          <InstaxImage
            className="-ml-16 w-100 rotate-1"
            src="/images/break.webp"
            alt="Taking a moment between sprints"
            width={640}
            height={360}
            caption="Ship, iterate, repeat"
          />
          <InstaxImage
            className="-mt-10 w-60 -rotate-3"
            src="/images/cool.webp"
            alt="Focused contributor"
            width={640}
            height={965}
            caption="In the zone"
          />
          <InstaxImage
            className="-mr-20 -mt-2 w-120 rotate-[8deg]"
            src="/images/release.webp"
            alt="Celebrating a milestone"
            width={1920}
            height={1281}
            caption="Every merge to main is a small victory"
          />
        </div>
      </div>
      <div className="mt-28">
        <div className="flex w-full flex-col items-center justify-between md:flex-row">
          <InstaxImage
            className="w-full rotate-1"
            src="/images/founders.webp"
            alt="The Seek.js community"
            width={1819}
            height={998}
            caption="Search that pays for itself"
          />
        </div>
      </div>
    </section>
  )
}
