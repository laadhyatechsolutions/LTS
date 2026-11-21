"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { BadgeCheck, CalendarCheck, Zap } from "lucide-react";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";

/* Build → Automate → Grow: a looping 12-second story of what LTS does. Decorative only. */

const STAGES = [
  { label: "Build", ms: 3600 },
  { label: "Automate", ms: 5200 },
  { label: "Grow", ms: 4400 },
] as const;

const ease = "cubic-bezier(0.2, 0.7, 0.2, 1)";
const pop = (delay: number, name = "lts-pop", dur = 0.5): CSSProperties => ({
  animation: `${name} ${dur}s ${ease} ${delay}s both`,
});

function BuildPanel() {
  return (
    <div className="flex h-full flex-col gap-3">
      <div className="lts-anim flex items-center gap-2" style={pop(0)}>
        <span className="size-5 rounded-md bg-ink" />
        <span className="h-2.5 w-14 rounded bg-ink/80" />
        <span className="ml-auto flex gap-2">
          {[0, 1, 2].map((i) => <span key={i} className="h-2 w-8 rounded bg-mist-200" />)}
        </span>
      </div>
      <div className="lts-anim flex flex-col gap-2.5 rounded-xl bg-ink p-4" style={pop(0.25)}>
        <span className="h-3.5 w-3/4 rounded bg-white" />
        <span className="h-3.5 w-1/2 rounded bg-white/80" />
        <span className="h-2 w-2/3 rounded bg-white/25" />
        <span className="lts-anim mt-1 h-6 w-24 rounded-full bg-lime-400" style={pop(0.9)} />
      </div>
      <div className="grid grid-cols-3 gap-2">
        {["bg-violet-200", "bg-violet-300", "bg-mist-200"].map((tone, i) => (
          <div key={tone} className="lts-anim flex flex-col gap-1.5 rounded-xl border border-ink/10 p-2" style={pop(0.5 + i * 0.15)}>
            <span className={`h-10 rounded-lg sm:h-12 ${tone}`} />
            <span className="h-1.5 w-3/4 rounded bg-mist-200" />
            <span className="h-1.5 w-1/2 rounded bg-mist-200" />
          </div>
        ))}
      </div>
      <p className="lts-anim mt-auto flex items-center gap-1.5 text-[12px] font-semibold text-gray-600" style={pop(1.4)}>
        <BadgeCheck className="size-4 text-lime-700" aria-hidden="true" />
        Website live · fast on every phone
      </p>
    </div>
  );
}

function Bubble({ side, children, style }: { side: "in" | "out"; children: ReactNode; style?: CSSProperties }) {
  return (
    <div
      className={`lts-anim max-w-[84%] rounded-2xl px-3 py-2 text-[12px] leading-snug sm:text-[13px] ${
        side === "in" ? "self-start rounded-tl-md bg-white text-ink shadow-sm" : "self-end rounded-tr-md bg-[#d9fdd3] text-ink"
      }`}
      style={style}
    >
      {children}
    </div>
  );
}

function AutomatePanel() {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-xl bg-[#efeae2]">
      <div className="flex items-center gap-2 bg-[#075e54] px-3 py-2 text-white">
        <span className="grid size-7 place-items-center rounded-full bg-white/15">
          <WhatsAppIcon className="size-4" />
        </span>
        <span className="flex flex-col leading-tight">
          <span className="text-[12px] font-semibold">Your Business</span>
          <span className="text-[10px] text-white/70">AI assistant · online</span>
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-2 p-3">
        <Bubble side="in" style={pop(0.2)}>Hi! How much for a clinic website? 🙂</Bubble>
        <div className="grid">
          <div
            className="lts-anim self-end justify-self-end rounded-2xl rounded-tr-md bg-[#d9fdd3] px-3 py-2.5 [grid-area:1/1] motion-reduce:hidden"
            style={{ animation: `lts-typing 1.3s linear 0.9s both` }}
          >
            <span className="flex gap-1">
              {[0, 1, 2].map((i) => (
                <span key={i} className="lts-anim size-1.5 rounded-full bg-ink/60" style={{ animation: `lts-dot 0.9s ease-in-out ${i * 0.15}s infinite` }} />
              ))}
            </span>
          </div>
          <Bubble side="out" style={{ ...pop(2.2), gridArea: "1 / 1", justifySelf: "end" }}>
            Hi Priya 👋 Happy to help! I can share sample designs and book a free 10-min call. Tomorrow 11 am?
          </Bubble>
        </div>
        <span className="lts-anim self-end flex items-center gap-1 rounded-full bg-ink px-2 py-0.5 text-[10px] font-semibold text-white" style={pop(2.7)}>
          <Zap className="size-3 text-lime-400" aria-hidden="true" /> AI replied in 3 sec
        </span>
        <Bubble side="in" style={pop(3.4)}>Yes, 11 works 👍</Bubble>
        <span className="lts-anim mt-auto self-center flex items-center gap-1.5 rounded-full bg-white px-3 py-1 text-[11px] font-semibold text-ink shadow-sm" style={pop(4.1)}>
          <CalendarCheck className="size-3.5 text-lime-700" aria-hidden="true" /> Call booked · reminder sent
        </span>
      </div>
    </div>
  );
}

const bars = [38, 52, 44, 60, 55, 72, 92];

function GrowPanel() {
  return (
    <div className="flex h-full flex-col gap-3">
      <div className="flex items-center justify-between">
        <span className="text-[13px] font-bold text-ink">Leads</span>
        <span className="lts-anim rounded-full bg-[#BFFF00]/60 px-2 py-0.5 text-[11px] font-bold text-ink" style={pop(0.6)}>+1 new</span>
      </div>
      <ul className="flex flex-col gap-1.5 text-[12px]">
        <li className="lts-anim flex items-center gap-2 rounded-lg border border-lime-500/50 bg-lime-50 px-2.5 py-2" style={pop(0.2, "lts-drop", 0.6)}>
          <span className="grid size-6 place-items-center rounded-full bg-violet-200 text-[10px] font-bold text-ink">P</span>
          <span className="font-semibold text-ink">Priya · Clinic website</span>
          <span className="ml-auto rounded-full bg-ink px-2 py-0.5 text-[10px] font-semibold text-white">Call booked</span>
        </li>
        {[["R", "Ravi · Delivery app", "Quoted"], ["A", "Anita · Ads campaign", "Won"]].map(([i, n, s]) => (
          <li key={n} className="flex items-center gap-2 rounded-lg border border-line px-2.5 py-2 text-gray-600">
            <span className="grid size-6 place-items-center rounded-full bg-mist-200 text-[10px] font-bold text-ink">{i}</span>
            {n}
            <span className="ml-auto rounded-full bg-mist-100 px-2 py-0.5 text-[10px] font-semibold">{s}</span>
          </li>
        ))}
      </ul>
      <div className="flex flex-1 items-end gap-1.5 rounded-xl border border-line p-2.5">
        {bars.map((h, i) => {
          const last = i === bars.length - 1;
          return (
            <span
              key={i}
              className={`lts-anim flex-1 origin-bottom rounded-t-md ${last ? "bg-lime-400" : "bg-ink/85"}`}
              style={{ height: `${h}%`, ...(last ? { animation: `lts-rise 0.9s ${ease} 1s both` } : {}) }}
            />
          );
        })}
      </div>
    </div>
  );
}

const panels = [BuildPanel, AutomatePanel, GrowPanel];

/** Instagram-style glyph (lucide no longer ships brand icons) */
function InstagramGlyph() {
  return (
    <span aria-hidden="true" className="grid size-[18px] place-items-center rounded-[5px] bg-[linear-gradient(45deg,#feda75,#fa7e1e,#d62976,#962fbf,#4f5bd5)]">
      <span className="relative size-[9px] rounded-full border-[1.6px] border-white">
        <span className="absolute -right-[3.5px] -top-[3.5px] size-[2px] rounded-full bg-white" />
      </span>
    </span>
  );
}

function Notification({ icon, title, meta, className, delay }: { icon: ReactNode; title: string; meta: string; className: string; delay: number }) {
  return (
    <div
      className={`lts-anim absolute z-10 hidden items-center gap-2.5 rounded-2xl border border-white/60 bg-white/95 py-2 pl-2 pr-3.5 shadow-lift backdrop-blur sm:flex ${className}`}
      style={{ animation: `lts-float 6s ease-in-out ${delay}s infinite` }}
    >
      <span className="grid size-8 shrink-0 place-items-center rounded-xl bg-mist-100">{icon}</span>
      <span className="flex flex-col leading-tight">
        <span className="text-[12px] font-semibold text-ink">{title}</span>
        <span className="text-[11px] text-gray-500">{meta}</span>
      </span>
    </div>
  );
}

export function HeroStory({ founder }: { founder?: ReactNode }) {
  const [stage, setStage] = useState(0);
  const [run, setRun] = useState(0); // bumps to replay the same stage
  const [paused, setPaused] = useState(false); // off screen or tab hidden
  const playing = !paused;
  const root = useRef<HTMLDivElement>(null);
  const tilt = useRef<HTMLDivElement>(null);

  // Pause while scrolled away or the tab is in the background
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    let onScreen = true;
    const sync = () => setPaused(!onScreen || document.visibilityState !== "visible");
    const io = new IntersectionObserver(([e]) => {
      onScreen = e.isIntersecting;
      sync();
    }, { threshold: 0.25 });
    io.observe(el);
    document.addEventListener("visibilitychange", sync);
    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", sync);
    };
  }, []);

  useEffect(() => {
    if (paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setTimeout(() => {
      setStage((s) => (s + 1) % STAGES.length);
      setRun((r) => r + 1);
    }, STAGES[stage].ms);
    return () => clearTimeout(t);
  }, [stage, run, paused]);

  // Gentle 3D tilt toward the pointer (mouse/trackpad only)
  const onMove = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse" || !tilt.current || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const r = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    tilt.current.style.transform = `perspective(1200px) rotateX(${(-y * 5).toFixed(2)}deg) rotateY(${(x * 7).toFixed(2)}deg)`;
  };
  const onLeave = () => {
    if (tilt.current) tilt.current.style.transform = "";
  };

  const Panel = panels[stage];
  return (
    <div ref={root} className="relative mx-auto w-full max-w-[440px] sm:max-w-[540px]" onPointerMove={onMove} onPointerLeave={onLeave}>
      <p className="sr-only">
        Illustration: we build your website, an AI assistant answers a WhatsApp enquiry and books a call, and the lead lands in your CRM.
      </p>
      <div ref={tilt} aria-hidden="true" className="relative transition-transform duration-300 ease-out [transform-style:preserve-3d]">
        <Notification
          className="-right-3 -top-12 md:-right-10"
          delay={0}
          icon={<InstagramGlyph />}
          title="New lead from Instagram"
          meta="just now"
        />
        <Notification
          className="-bottom-9 -right-3 md:-right-8"
          delay={3}
          icon={<BadgeCheck className="size-4 text-lime-700" aria-hidden="true" />}
          title="Invoice paid ✓"
          meta="auto-reminder worked"
        />

        <div className="overflow-hidden rounded-[22px] border border-white/10 bg-white shadow-[0_40px_80px_-30px_rgba(167,139,250,0.45)]">
          <div className="flex items-center gap-2 border-b border-line bg-mist-50 px-3 py-2.5 sm:px-4">
            <span className="hidden gap-1.5 sm:flex">
              {[0, 1, 2].map((i) => <span key={i} className="size-2.5 rounded-full border border-ink/15 bg-white" />)}
            </span>
            <div className="flex flex-1 gap-1 rounded-full bg-mist-100 p-1 sm:ml-2">
              {STAGES.map((s, i) => {
                const on = i === stage;
                return (
                  <button
                    key={s.label}
                    type="button"
                    tabIndex={-1}
                    onClick={() => {
                      setStage(i);
                      setRun((r) => r + 1);
                    }}
                    className={`relative flex-1 overflow-hidden rounded-full px-2 py-1 text-[11px] font-semibold transition-colors sm:text-[12px] ${on ? "bg-ink text-white" : "text-gray-600 hover:text-ink"}`}
                  >
                    <span className="relative z-10">{i + 1}. {s.label}</span>
                    {on && (
                      <span
                        key={run}
                        className="lts-anim absolute inset-x-2 bottom-0.5 h-0.5 origin-left rounded-full bg-lime-400"
                        style={{ animation: `lts-progress ${s.ms}ms linear both`, animationPlayState: playing ? "running" : "paused" }}
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
          <div className="h-[280px] p-3 sm:h-[320px] sm:p-4">
            <div key={`${stage}-${run}`} className="lts-anim h-full" style={pop(0, "lts-pop", 0.35)}>
              <Panel />
            </div>
          </div>
        </div>
      </div>
      {founder && <div className="absolute -bottom-11 left-3 z-20 sm:-left-6 md:-left-10">{founder}</div>}
    </div>
  );
}
