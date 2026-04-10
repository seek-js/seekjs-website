"use client";

import {
  SiAstro,
  SiBun,
  SiDeno,
  SiNextdotjs,
  SiNodedotjs,
  SiNuxt,
  SiReact,
  SiRemix,
  SiSolid,
  SiSvelte,
  SiVite,
  SiVuedotjs,
} from "@icons-pack/react-simple-icons";
import * as Tabs from "@radix-ui/react-tabs";
import { RiClipboardLine, RiTerminalLine } from "@remixicon/react";
import { useEffect, useRef, useState } from "react";

interface CanvasNode {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  brightness: number;
  lastHitTime: number;
}
interface Pulse {
  cx: number;
  cy: number;
  r: number;
  max: number;
}
interface Spark {
  x: number;
  y: number;
  tx: number;
  ty: number;
  t: number;
  spd: number;
}

const rand = (lo: number, hi: number) => Math.random() * (hi - lo) + lo;
const { hypot, sin, PI, max: fmax, min: fmin } = Math;
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const clamp = (v: number, lo: number, hi: number) => fmin(hi, fmax(lo, v));
const rgba = (r: number, g: number, b: number, a: number) =>
  `rgba(${r | 0},${g | 0},${b | 0},${a})`;

const Z1 = [244, 244, 245] as const;
const Z3 = [212, 212, 216] as const;
const Z5 = [113, 113, 122] as const;
const Z6 = [82, 82, 91] as const;

const mix = (a: readonly number[], b: readonly number[], t: number) =>
  [lerp(a[0], b[0], t), lerp(a[1], b[1], t), lerp(a[2], b[2], t)] as const;

const PULSE_MS = 3800;
const PULSE_V = 2.8;
const DECAY = 0.011;

export default function HeroImage() {
  const cvRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const mouse = useRef({ x: -9e3, y: -9e3 });
  const rafId = useRef(0);

  useEffect(() => {
    const cv = cvRef.current;
    const wrap = wrapRef.current;
    if (!cv || !wrap) return;
    const c = cv.getContext("2d");
    if (!c) return;

    const dpr = fmin(devicePixelRatio ?? 1, 2);
    let W = 0;
    let H = 0;
    let EDGE_R = 155;
    const nn: CanvasNode[] = [];
    const pp: Pulse[] = [];
    const ss: Spark[] = [];
    let lastP = 0;

    function resize() {
      const r = wrap!.getBoundingClientRect();
      W = r.width;
      H = r.height;
      cv!.width = W * dpr;
      cv!.height = H * dpr;
      cv!.style.width = W + "px";
      cv!.style.height = H + "px";
      c!.setTransform(dpr, 0, 0, dpr, 0, 0);
      EDGE_R = W < 500 ? 95 : W < 800 ? 125 : 155;
    }

    function seed() {
      nn.length = 0;
      const count = W < 500 ? 30 : W < 800 ? 50 : 70;
      for (let i = 0; i < count; i++)
        nn.push({
          x: rand(16, W - 16),
          y: rand(16, H - 16),
          vx: rand(-0.28, 0.28),
          vy: rand(-0.16, 0.16),
          r: rand(1.4, 3.4),
          brightness: 0,
          lastHitTime: 0,
        });
    }

    resize();
    seed();

    const ro = new ResizeObserver(() => {
      const prevW = W || 1;
      resize();
      const scale = W / prevW;
      if (nn.length === 0) {
        seed();
      } else {
        for (const n of nn) {
          n.x = clamp(n.x * scale, 10, W - 10);
          n.y = clamp(n.y, 10, H - 10);
        }
      }
    });
    ro.observe(wrap);

    const onMove = (e: MouseEvent) => {
      const r = wrap!.getBoundingClientRect();
      mouse.current = { x: e.clientX - r.left, y: e.clientY - r.top };
    };
    const onLeave = () => (mouse.current = { x: -9e3, y: -9e3 });
    wrap.addEventListener("mousemove", onMove);
    wrap.addEventListener("mouseleave", onLeave);

    function frame(now: number) {
      c!.clearRect(0, 0, W, H);

      /* ambient glow — two focal points for depth */
      const g1 = c!.createRadialGradient(
        W * 0.35,
        H * 0.3,
        0,
        W * 0.35,
        H * 0.3,
        W * 0.45,
      );
      g1.addColorStop(0, "rgba(113,113,122,0.07)");
      g1.addColorStop(0.7, "rgba(63,63,70,0.02)");
      g1.addColorStop(1, "transparent");
      c!.fillStyle = g1;
      c!.fillRect(0, 0, W, H);

      const g2 = c!.createRadialGradient(
        W * 0.7,
        H * 0.6,
        0,
        W * 0.7,
        H * 0.6,
        W * 0.35,
      );
      g2.addColorStop(0, "rgba(82,82,91,0.05)");
      g2.addColorStop(1, "transparent");
      c!.fillStyle = g2;
      c!.fillRect(0, 0, W, H);

      /* ── pulses ── */
      if (now - lastP > PULSE_MS) {
        lastP = now;
        pp.push({
          cx: rand(W * 0.2, W * 0.8),
          cy: rand(H * 0.15, H * 0.75),
          r: 0,
          max: fmax(W, H) * 1.1,
        });
      }

      for (let i = pp.length - 1; i >= 0; i--) {
        const p = pp[i];
        p.r += PULSE_V;
        const life = 1 - p.r / p.max;
        if (life <= 0) {
          pp.splice(i, 1);
          continue;
        }
        const col = mix(Z3, Z1, life);
        c!.beginPath();
        c!.arc(p.cx, p.cy, p.r, 0, PI * 2);
        c!.strokeStyle = rgba(col[0], col[1], col[2], life * 0.18);
        c!.lineWidth = 1.5 + life * 2.5;
        c!.stroke();
        if (p.r > 18) {
          c!.beginPath();
          c!.arc(p.cx, p.cy, p.r - 14, 0, PI * 2);
          c!.strokeStyle = rgba(col[0], col[1], col[2], life * 0.05);
          c!.lineWidth = 0.6;
          c!.stroke();
        }
        for (const n of nn) {
          const d = hypot(n.x - p.cx, n.y - p.cy);
          if (d > p.r - 20 && d < p.r + 8) {
            n.brightness = clamp(n.brightness + 0.6, 0, 1);
            n.lastHitTime = now;
          }
        }
      }

      /* ── update nodes ── */
      const msx = mouse.current.x;
      const msy = mouse.current.y;
      for (const n of nn) {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < -10) n.x = W + 10;
        if (n.x > W + 10) n.x = -10;
        if (n.y < -10) n.y = H + 10;
        if (n.y > H + 10) n.y = -10;

        const md = hypot(n.x - msx, n.y - msy);
        if (md < 130) {
          const f = 1 - md / 130;
          n.brightness = clamp(n.brightness + f * 0.12, 0, 1);
          n.x += (msx - n.x) * f * 0.01;
          n.y += (msy - n.y) * f * 0.01;
        }

        if (n.brightness > 0.3 && now - n.lastHitTime < 550) {
          for (const m of nn) {
            if (m === n) continue;
            const d = hypot(n.x - m.x, n.y - m.y);
            if (d < EDGE_R && m.brightness < 0.2) {
              m.brightness = clamp(m.brightness + 0.018, 0, 0.45);
              if (Math.random() < 0.005)
                ss.push({
                  x: n.x,
                  y: n.y,
                  tx: m.x,
                  ty: m.y,
                  t: 0,
                  spd: rand(0.02, 0.042),
                });
            }
          }
        }
        n.brightness = fmax(0, n.brightness - DECAY);
      }

      /* ── edges ── */
      c!.lineCap = "round";
      for (let i = 0; i < nn.length; i++) {
        const a = nn[i];
        for (let j = i + 1; j < nn.length; j++) {
          const b = nn[j];
          const d = hypot(a.x - b.x, a.y - b.y);
          if (d > EDGE_R) continue;
          const prox = 1 - d / EDGE_R;
          const bright = (a.brightness + b.brightness) / 2;
          const alpha = prox * (0.045 + bright * 0.32);
          const col = mix(Z6, Z3, bright);
          c!.beginPath();
          c!.moveTo(a.x, a.y);
          c!.lineTo(b.x, b.y);
          c!.strokeStyle = rgba(col[0], col[1], col[2], alpha);
          c!.lineWidth = 0.4 + bright * 1.3;
          c!.stroke();
        }
      }

      /* ── sparks ── */
      for (let i = ss.length - 1; i >= 0; i--) {
        const s = ss[i];
        s.t += s.spd;
        if (s.t >= 1) {
          ss.splice(i, 1);
          continue;
        }
        const px = lerp(s.x, s.tx, s.t);
        const py = lerp(s.y, s.ty, s.t);
        const a = sin(s.t * PI);
        c!.beginPath();
        c!.arc(px, py, 1.4, 0, PI * 2);
        c!.fillStyle = rgba(Z1[0], Z1[1], Z1[2], a * 0.9);
        c!.fill();
        const gl = c!.createRadialGradient(px, py, 0, px, py, 8);
        gl.addColorStop(0, rgba(Z1[0], Z1[1], Z1[2], a * 0.2));
        gl.addColorStop(1, "transparent");
        c!.fillStyle = gl;
        c!.fillRect(px - 8, py - 8, 16, 16);
      }

      /* ── draw nodes ── */
      for (const n of nn) {
        const col = mix(Z5, Z1, n.brightness);
        const a = 0.2 + n.brightness * 0.8;
        if (n.brightness > 0.14) {
          const gl = c!.createRadialGradient(
            n.x,
            n.y,
            0,
            n.x,
            n.y,
            n.r * 8,
          );
          gl.addColorStop(0, rgba(col[0], col[1], col[2], n.brightness * 0.2));
          gl.addColorStop(1, "transparent");
          c!.fillStyle = gl;
          const s = n.r * 8;
          c!.fillRect(n.x - s, n.y - s, s * 2, s * 2);
        }
        c!.beginPath();
        c!.arc(n.x, n.y, n.r + n.brightness * 1.6, 0, PI * 2);
        c!.fillStyle = rgba(col[0], col[1], col[2], a);
        c!.fill();
      }

      rafId.current = requestAnimationFrame(frame);
    }

    rafId.current = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(rafId.current);
      ro.disconnect();
      wrap.removeEventListener("mousemove", onMove);
      wrap.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  const [copied, setCopied] = useState(false);
  const [activeMgr, setActiveMgr] = useState("npm");

  const managers = [
    { id: "npm", label: "npm", cmd: "npm install @seekjs/core" },
    { id: "yarn", label: "yarn", cmd: "yarn add @seekjs/core" },
    { id: "pnpm", label: "pnpm", cmd: "pnpm add @seekjs/core" },
    { id: "bun", label: "bun", cmd: "bun add @seekjs/core" },
  ];

  const activeCmd = managers.find((m) => m.id === activeMgr)!.cmd;

  function handleCopy() {
    navigator.clipboard.writeText(activeCmd).then(
      () => {
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
      },
      () => {},
    );
  }

  const iconCls = "size-8 sm:size-9 md:size-10";
  const row1 = [
    { name: "Node.js", icon: <SiNodedotjs className={iconCls} /> },
    { name: "Bun", icon: <SiBun className={iconCls} /> },
    { name: "Deno", icon: <SiDeno className={iconCls} /> },
    { name: "React", icon: <SiReact className={iconCls} /> },
    { name: "Next.js", icon: <SiNextdotjs className={iconCls} /> },
    { name: "Vue", icon: <SiVuedotjs className={iconCls} /> },
  ];
  const row2 = [
    { name: "Svelte", icon: <SiSvelte className={iconCls} /> },
    { name: "Nuxt", icon: <SiNuxt className={iconCls} /> },
    { name: "Astro", icon: <SiAstro className={iconCls} /> },
    { name: "Vite", icon: <SiVite className={iconCls} /> },
    { name: "Remix", icon: <SiRemix className={iconCls} /> },
    { name: "Solid", icon: <SiSolid className={iconCls} /> },
  ];

  return (
    <section aria-label="Hero visual" className="flow-root">
      <div className="rounded-2xl bg-zinc-50/40 p-2 ring-1 ring-inset ring-zinc-200/50 dark:bg-zinc-900/40 dark:ring-zinc-700/20">
        <div
          ref={wrapRef}
          className="relative w-full overflow-hidden rounded-xl bg-zinc-950 ring-1 ring-zinc-300/30 dark:ring-zinc-600/20"
        >
          <canvas
            ref={cvRef}
            className="absolute inset-0 h-full w-full"
          />

          <div className="relative z-10 flex flex-col items-center gap-10 px-4 pt-8 pb-36 sm:gap-12 sm:px-8 sm:pt-12 sm:pb-48 md:gap-16 md:px-12 md:pt-16 md:pb-60">
            {/* ── Package manager tabs (shadcn-style) ── */}
            <Tabs.Root
              value={activeMgr}
              onValueChange={setActiveMgr}
              className="mt-px w-full max-w-xl overflow-hidden rounded-lg border border-zinc-800 bg-zinc-950 shadow-2xl shadow-zinc-950/40"
            >
              <div className="flex items-center border-b border-zinc-800 bg-zinc-900/80">
                <div className="flex items-center border-r border-zinc-800 px-3 py-2.5 text-zinc-500">
                  <RiTerminalLine className="size-4" />
                </div>

                <Tabs.List
                  className="flex items-center"
                  aria-label="Package manager"
                >
                  {managers.map((m) => (
                    <Tabs.Trigger
                      key={m.id}
                      value={m.id}
                      className="cursor-pointer px-3 py-2.5 text-xs font-medium text-zinc-500 transition-colors hover:text-zinc-300 data-[state=active]:rounded-md data-[state=active]:bg-zinc-800 data-[state=active]:text-zinc-200 sm:text-sm"
                    >
                      {m.label}
                    </Tabs.Trigger>
                  ))}
                </Tabs.List>

                <button
                  onClick={handleCopy}
                  className="ml-auto cursor-pointer border-l border-zinc-800 px-3 py-2.5 text-zinc-500 transition-colors hover:text-zinc-300"
                  aria-label="Copy command"
                >
                  {copied ? (
                    <svg
                      className="size-4"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                  ) : (
                    <RiClipboardLine className="size-4" />
                  )}
                </button>
              </div>

              {managers.map((m) => (
                <Tabs.Content
                  key={m.id}
                  value={m.id}
                  className="mx-1 mt-1.5 mb-1 px-5 py-3.5 text-left sm:px-6 sm:py-4"
                >
                  <code className="font-mono text-sm text-zinc-300 sm:text-base">
                    {m.cmd}
                  </code>
                </Tabs.Content>
              ))}
            </Tabs.Root>

            {/* ── Compatible with (two rows) ── */}
            <div className="flex flex-col items-center gap-8 sm:gap-10">
              <p className="text-metallic text-xs font-semibold uppercase tracking-[0.3em] sm:text-sm">
                Compatible with
              </p>
              <div className="flex flex-col items-center gap-8 sm:gap-10">
                <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-10 md:gap-14">
                  {row1.map((l) => (
                    <div
                      key={l.name}
                      className="flex flex-col items-center gap-2.5 text-zinc-400"
                    >
                      {l.icon}
                      <span className="text-metallic text-[10px] font-medium tracking-wider sm:text-xs">
                        {l.name}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-10 md:gap-14">
                  {row2.map((l) => (
                    <div
                      key={l.name}
                      className="flex flex-col items-center gap-2.5 text-zinc-400"
                    >
                      {l.icon}
                      <span className="text-metallic text-[10px] font-medium tracking-wider sm:text-xs">
                        {l.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Bottom fade */}
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-48 bg-linear-to-t from-zinc-950 via-zinc-950/80 to-transparent sm:h-56 md:h-64"
            aria-hidden="true"
          />
        </div>
      </div>
    </section>
  );
}
