import Balancer from "react-wrap-balancer"

export default function Testimonial() {
  return (
    <section id="testimonial" aria-label="Project philosophy">
      <figure className="mx-auto">
        <blockquote className="mx-auto max-w-2xl text-center text-xl font-semibold leading-8 text-zinc-950 sm:text-2xl sm:leading-9 dark:text-gray-50">
          <p>
            <Balancer>
              &ldquo;Search should be a static asset, not a running service.
              Ship an index next to your HTML and let the browser do the
              work.&rdquo;
            </Balancer>
          </p>
        </blockquote>
        <figcaption className="mt-10 flex items-center justify-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            The Seek.js philosophy
          </p>
        </figcaption>
      </figure>
    </section>
  )
}
