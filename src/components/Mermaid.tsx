"use client";

import { useTheme } from "next-themes";
import { useEffect, useId, useRef, useState } from "react";

type MermaidProps = {
  chart: string;
};

export function Mermaid({ chart }: MermaidProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const reactId = useId();
  const graphId = `mermaid-${reactId.replace(/[^a-zA-Z0-9_-]/g, "")}`;
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || !containerRef.current) return;

    const el = containerRef.current;
    let cancelled = false;

    void (async () => {
      const mermaid = (await import("mermaid")).default;
      mermaid.initialize({
        startOnLoad: false,
        securityLevel: "loose",
        theme: resolvedTheme === "dark" ? "dark" : "default",
      });
      el.innerHTML = "";
      try {
        const { svg } = await mermaid.render(graphId, chart);
        if (!cancelled && containerRef.current) {
          containerRef.current.innerHTML = svg;
        }
      } catch (err) {
        console.error("Mermaid render failed:", err);
        if (!cancelled && containerRef.current) {
          containerRef.current.textContent = "Could not render diagram.";
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [chart, graphId, mounted, resolvedTheme]);

  if (!mounted) {
    return (
      <div
        className="bg-fd-muted/40 my-6 rounded-lg border border-dashed p-8 text-center text-sm text-fd-muted-foreground not-prose"
        aria-hidden
      >
        Loading diagram…
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="my-6 flex justify-center overflow-x-auto not-prose [&_svg]:max-w-full"
    />
  );
}
