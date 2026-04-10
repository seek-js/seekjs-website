"use client";

import createGlobe from "cobe";
import { FunctionComponent, useEffect, useRef } from "react";

export const GlobalDatabase: FunctionComponent = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let phi = 4.7;
    let globe: ReturnType<typeof createGlobe> | null = null;

    try {
      // Match tremorlabs/template-database COBE buffer sizing
      globe = createGlobe(canvas, {
        devicePixelRatio: 2,
        width: 1200 * 2,
        height: 1200 * 2,
        phi: 0,
        theta: -0.3,
        dark: 1,
        diffuse: 1.2,
        mapSamples: 25000,
        mapBrightness: 13,
        mapBaseBrightness: 0.05,
        baseColor: [0.38, 0.38, 0.42],
        glowColor: [0.12, 0.12, 0.14],
        markerColor: [0.72, 0.72, 0.76],
        markers: [],
        onRender: (state: { phi?: number }) => {
          state.phi = phi;
          phi += 0.0002;
        },
      });
    } catch (error) {
      console.warn("COBE globe initialization failed", error);
    }

    return () => {
      globe?.destroy();
    };
  }, []);

  const features = [
    {
      name: "Static .msp on the CDN",
      description:
        "Ship the compiled index beside your HTML\u2014cached at the edge like any other asset, no query-time database.",
    },
    {
      name: "Hybrid search in-browser",
      description:
        "BM25 plus vectors run in WASM with IndexedDB caching so retrieval stays local and fast.",
    },
    {
      name: "Edge AI when you need it",
      description:
        "Stream cited answers from Workers only after local search returns chunks\u2014no LLM on every keystroke.",
    },
  ];

  return (
    <div className="w-full px-3">
      <section
        id="architecture"
        aria-labelledby="global-database-title"
        className="relative mx-auto flex w-full max-w-6xl flex-col items-center justify-center overflow-hidden rounded-3xl bg-zinc-950 pt-24 shadow-xl shadow-zinc-950/25"
      >
        <div className="absolute top-[17rem] size-[40rem] rounded-full bg-zinc-500/25 blur-3xl md:top-[20rem]" />
        <div className="z-10 inline-block rounded-lg border border-zinc-500/30 bg-zinc-800/40 px-3 py-1.5 font-semibold uppercase leading-4 tracking-tight sm:text-sm">
          <span className="bg-linear-to-b from-zinc-100 to-zinc-400 bg-clip-text text-transparent">
            Made for your website
          </span>
        </div>
        <h2
          id="global-database-title"
          className="z-10 mt-6 inline-block bg-linear-to-b from-white to-zinc-300 bg-clip-text px-2 text-center text-5xl font-bold tracking-tighter text-transparent md:text-8xl"
        >
          The global <br /> AI Search Widget
        </h2>
        <canvas
          className="absolute top-[7.1rem] z-20 aspect-square size-full max-w-fit md:top-[12rem]"
          ref={canvasRef}
          style={{ width: 1200, height: 1200 }}
        />
        <div className="z-20 -mt-32 h-[36rem] w-full overflow-hidden md:-mt-36">
          <div className="absolute bottom-0 left-0 h-3/5 w-full bg-linear-to-b from-transparent via-zinc-950/95 to-zinc-950" />
          <div className="absolute inset-x-6 bottom-12 z-30 m-auto max-w-4xl md:top-2/3">
            <div className="grid grid-cols-1 gap-x-10 gap-y-6 rounded-lg border border-zinc-400/20 bg-zinc-950/40 px-6 py-6 shadow-xl shadow-zinc-600/10 blur-subtle md:grid-cols-3 md:p-8">
              {features.map((item) => (
                <div key={item.name} className="flex flex-col gap-2">
                  <h3 className="bg-linear-to-b from-zinc-200 to-zinc-500 bg-clip-text text-lg font-semibold text-transparent md:text-xl">
                    {item.name}
                  </h3>
                  <p className="text-sm leading-6 text-zinc-400/80">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
