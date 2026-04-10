import Balancer from "react-wrap-balancer"

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <main
      className="mx-auto mt-36 max-w-3xl animate-slide-up-fade px-3"
      style={{
        animationDuration: "600ms",
        animationFillMode: "backwards",
      }}
    >
      <div className="text-center">
        <h1 className="text-metallic inline-block py-2 text-4xl font-bold tracking-tighter sm:text-5xl">
          Changelog
        </h1>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
          <Balancer>
            New releases and notes for the Seek.js site and documentation.
          </Balancer>
        </p>
      </div>
      <div className="mt-16">{children}</div>
    </main>
  )
}
