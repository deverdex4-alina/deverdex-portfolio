import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGetExperiments } from '@workspace/api-client-react';
import { RotateCcw, Pause, Play as PlayIcon, Zap, Sliders, Palette, Bot } from 'lucide-react';

/* ─── tiny inline experiment UIs ─────────────────────────────────── */

/** EX-001 — Route the Brief: card-routing game */
function RouteTheBrief() {
  const routes = [
    { key: 'landing', label: 'Landing Page', sub: 'Clarity + conversion' },
    { key: 'webapp', label: 'Web App', sub: 'Tools + workflows' },
    { key: 'store', label: 'Online Store', sub: 'Products + checkout' },
  ];
  const briefs = [
    { text: 'We sell handmade candles online and need a place to take orders.', answer: 'store' },
    { text: "We're launching a SaaS tool for invoice automation.", answer: 'webapp' },
    { text: 'We need a single-page site to capture leads for our consultancy.', answer: 'landing' },
    { text: 'I want a subscription box service with monthly billing.', answer: 'store' },
    { text: 'Our team needs an internal dashboard to track project status.', answer: 'webapp' },
  ];
  const [idx, setIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);
  const brief = briefs[idx % briefs.length];

  function pick(key: string) {
    if (feedback) return;
    if (key === brief.answer) {
      setScore(s => s + 1);
      setStreak(s => s + 1);
      setFeedback('correct');
    } else {
      setStreak(0);
      setFeedback('wrong');
    }
    setTimeout(() => { setFeedback(null); setIdx(i => i + 1); }, 900);
  }

  return (
    <div className="w-full h-full flex flex-col select-none">
      {/* chrome bar */}
      <div className="px-5 py-3 border-b border-white/8 flex items-center justify-between shrink-0">
        <span className="font-mono text-[10px] text-[#5A6B8A] uppercase tracking-widest">FOYER PLAY STUDY</span>
        <div className="flex gap-2">
          <span className="font-mono text-[10px] bg-white/6 border border-white/8 px-2.5 py-1 rounded text-white">SCORE {String(score).padStart(2, '0')}</span>
          <span className="font-mono text-[10px] bg-white/6 border border-white/8 px-2.5 py-1 rounded text-[#00DCB9]">STREAK {streak}</span>
        </div>
      </div>
      {/* heading inside */}
      <div className="px-5 pt-4 pb-3 shrink-0">
        <h3 className="text-white font-bold text-lg">Route the brief</h3>
      </div>
      {/* brief card */}
      <div className="px-5 flex-1 flex flex-col justify-center gap-5">
        <AnimatePresence mode="wait">
          <motion.div key={idx}
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="bg-[#0A1220] border border-white/8 rounded-xl p-5">
            <div className="font-mono text-[10px] text-[#00DCB9] uppercase tracking-wider mb-3">INCOMING BRIEF</div>
            <p className="text-white text-sm leading-relaxed">"{brief.text}"</p>
          </motion.div>
        </AnimatePresence>
        <div className="grid grid-cols-3 gap-2">
          {routes.map(r => (
            <button key={r.key} onClick={() => pick(r.key)}
              className={`group border rounded-xl p-3 text-left transition-all duration-200 text-sm font-semibold
                ${feedback === 'correct' && r.key === brief.answer ? 'border-[#00DCB9] bg-[#00DCB9]/10 text-[#00DCB9]' :
                  feedback === 'wrong' && r.key === brief.answer ? 'border-[#00DCB9] bg-[#00DCB9]/10 text-[#00DCB9]' :
                    'border-white/10 bg-white/4 text-white hover:border-[#00DCB9]/50 hover:bg-[#00DCB9]/8'}`}>
              <div>{r.label}</div>
              <div className="text-[10px] font-normal text-[#5A6B8A] mt-0.5">{r.sub}</div>
            </button>
          ))}
        </div>
        <p className="text-center text-[#3A4B66] font-mono text-[10px] uppercase tracking-widest">
          Click a route or use keys 1–3
        </p>
      </div>
    </div>
  );
}

/** EX-002 — Scroll Physics: animated momentum balls */
function ScrollPhysics({ paused }: { paused: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const balls = useRef(
    Array.from({ length: 8 }, (_, i) => ({
      x: 80 + Math.random() * 440, y: 80 + Math.random() * 280,
      vx: (Math.random() - 0.5) * 3, vy: (Math.random() - 0.5) * 3,
      r: 14 + Math.random() * 22,
      color: ['#00DCB9', '#4FC3F7', '#A78BFA', '#FF6B35', '#34D399'][i % 5],
    }))
  );
  const raf = useRef<number>();
  const pausedRef = useRef(paused);
  pausedRef.current = paused;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;
    function draw() {
      if (!pausedRef.current) {
        ctx.clearRect(0, 0, canvas!.width, canvas!.height);
        balls.current.forEach(b => {
          b.x += b.vx; b.y += b.vy;
          if (b.x - b.r < 0) { b.x = b.r; b.vx *= -0.92; }
          if (b.x + b.r > canvas!.width) { b.x = canvas!.width - b.r; b.vx *= -0.92; }
          if (b.y - b.r < 0) { b.y = b.r; b.vy *= -0.92; }
          if (b.y + b.r > canvas!.height) { b.y = canvas!.height - b.r; b.vy *= -0.92; }
          const g = ctx.createRadialGradient(b.x - b.r * 0.3, b.y - b.r * 0.3, b.r * 0.1, b.x, b.y, b.r);
          g.addColorStop(0, b.color + 'CC');
          g.addColorStop(1, b.color + '22');
          ctx.beginPath(); ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
          ctx.fillStyle = g; ctx.fill();
        });
      }
      raf.current = requestAnimationFrame(draw);
    }
    raf.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(raf.current!);
  }, []);

  return (
    <div className="w-full h-full flex flex-col">
      <div className="px-5 py-3 border-b border-white/8 shrink-0">
        <span className="font-mono text-[10px] text-[#5A6B8A] uppercase tracking-widest">PHYSICS STUDY / MOMENTUM + FRICTION</span>
      </div>
      <canvas ref={canvasRef} width={600} height={360}
        className="w-full flex-1 bg-[#05080C]" style={{ display: 'block' }} />
    </div>
  );
}

/** EX-003 — Typographic Scale Generator */
function TypeScaleGen() {
  const [base, setBase] = useState(16);
  const [ratio, setRatio] = useState(1.25);
  const ratios = [{ label: 'Minor Third', val: 1.2 }, { label: 'Major Third', val: 1.25 }, { label: 'Perfect Fourth', val: 1.333 }, { label: 'Golden Ratio', val: 1.618 }];
  const steps = [4, 3, 2, 1, 0, -1];
  const size = (step: number) => Math.round(base * Math.pow(ratio, step));

  return (
    <div className="w-full h-full flex flex-col overflow-hidden">
      <div className="px-5 py-3 border-b border-white/8 flex items-center gap-4 shrink-0 flex-wrap">
        <span className="font-mono text-[10px] text-[#5A6B8A] uppercase tracking-widest">TYPE SCALE GENERATOR</span>
        <div className="flex items-center gap-2 ml-auto">
          <span className="text-[10px] font-mono text-[#5A6B8A]">BASE {base}px</span>
          <input type="range" min={12} max={24} value={base} onChange={e => setBase(+e.target.value)}
            className="w-20 accent-[#00DCB9]" />
        </div>
        <select value={ratio} onChange={e => setRatio(+e.target.value)}
          className="bg-[#0A1220] border border-white/10 text-white text-[10px] font-mono rounded px-2 py-1">
          {ratios.map(r => <option key={r.val} value={r.val}>{r.label}</option>)}
        </select>
      </div>
      <div className="flex-1 overflow-y-auto px-6 py-4 space-y-3">
        {steps.map(step => (
          <div key={step} className="flex items-baseline gap-4 border-b border-white/4 pb-3 last:border-0">
            <span className="font-mono text-[9px] text-[#3A4B66] w-16 shrink-0 uppercase">{step >= 0 ? `+${step}` : step} / {size(step)}px</span>
            <span className="text-white leading-tight font-bold truncate"
              style={{ fontSize: Math.min(size(step), 48) }}>
              {step === 0 ? 'Body text' : step > 0 ? 'Heading' : 'Caption'}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/** EX-004 — AI Colour Pairing */
function AIColourPairing() {
  const moods = [
    { label: 'Tech / SaaS', palette: ['#080E14', '#0D1826', '#00DCB9', '#4FC3F7', '#FFFFFF'] },
    { label: 'Luxury / Finance', palette: ['#0A0805', '#1A1408', '#C9A84C', '#E8D5A3', '#FFFFFF'] },
    { label: 'Health / Wellness', palette: ['#071410', '#0D2318', '#22C55E', '#86EFAC', '#FFFFFF'] },
    { label: 'Creative / Agency', palette: ['#0F0814', '#1A0E24', '#A855F7', '#F472B6', '#FFFFFF'] },
    { label: 'E-commerce / Bold', palette: ['#100808', '#200E0E', '#EF4444', '#FCA5A5', '#FFFFFF'] },
  ];
  const [active, setActive] = useState(0);
  const p = moods[active].palette;

  return (
    <div className="w-full h-full flex flex-col">
      <div className="px-5 py-3 border-b border-white/8 shrink-0">
        <span className="font-mono text-[10px] text-[#5A6B8A] uppercase tracking-widest">AI COLOUR PAIRING / WCAG CHECKED</span>
      </div>
      <div className="flex-1 flex flex-col gap-4 px-5 py-5">
        {/* mood selector */}
        <div className="flex flex-wrap gap-2">
          {moods.map((m, i) => (
            <button key={m.label} onClick={() => setActive(i)}
              className={`text-[10px] font-mono px-3 py-1.5 rounded-full border transition-all
                ${i === active ? 'border-[#00DCB9] text-[#00DCB9] bg-[#00DCB9]/10' : 'border-white/10 text-[#5A6B8A] hover:border-white/20'}`}>
              {m.label}
            </button>
          ))}
        </div>
        {/* palette swatches */}
        <AnimatePresence mode="wait">
          <motion.div key={active} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            className="grid grid-cols-5 gap-2 flex-1">
            {p.map((color, i) => (
              <div key={color + i} className="flex flex-col gap-1.5">
                <div className="flex-1 rounded-xl border border-white/8 min-h-[80px]" style={{ background: color }} />
                <span className="font-mono text-[9px] text-[#5A6B8A] uppercase text-center">{color}</span>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
        {/* preview strip */}
        <div className="rounded-xl overflow-hidden border border-white/8" style={{ background: p[0] }}>
          <div className="px-4 py-3 flex items-center justify-between" style={{ background: p[1] }}>
            <span className="text-xs font-bold" style={{ color: p[4] }}>Preview</span>
            <span className="px-3 py-1 rounded-full text-xs font-bold" style={{ background: p[2], color: p[0] }}>CTA</span>
          </div>
          <div className="px-4 py-3">
            <p className="text-xs" style={{ color: p[3] }}>Sample body text with accent colour applied correctly.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── status helpers ─────────────────────────────────────────────── */
const STATUS_COLORS: Record<string, string> = {
  prototype: '#00DCB9', running: '#34D399', stable: '#4FC3F7', wip: '#FF6B35',
};
const STATUS_BG: Record<string, string> = {
  prototype: 'rgba(0,220,185,0.12)', running: 'rgba(52,211,153,0.12)',
  stable: 'rgba(79,195,247,0.12)', wip: 'rgba(255,107,53,0.12)',
};

/* ─── main component ─────────────────────────────────────────────── */
export function Experiments() {
  const { data: experimentsResponse } = useGetExperiments();

  const experiments = Array.isArray(experimentsResponse)
    ? experimentsResponse
    : Array.isArray((experimentsResponse as any)?.data)
      ? (experimentsResponse as any).data
      : Array.isArray((experimentsResponse as any)?.experiments)
        ? (experimentsResponse as any).experiments
        : [];

  const [activeId, setActiveId] = useState<number | null>(null);
  const [paused, setPaused] = useState(false);
  const [key, setKey] = useState(0); // force-remount on restart

  useEffect(() => {
    if (experiments?.length && activeId === null) setActiveId(experiments[0].id);
  }, [experiments, activeId]);

  const active = experiments?.find(e => e.id === activeId);

  // Map experiment id → inline component
  const PREVIEWS: Record<number, React.ReactNode> = {
    1: <RouteTheBrief />,
    2: <ScrollPhysics paused={paused} />,
    3: <TypeScaleGen />,
    4: <AIColourPairing />,
  };

  const EXP_ICONS: Record<number, React.ComponentType<{ size?: number; className?: string }>> = {
    1: Bot, 2: Zap, 3: Sliders, 4: Palette,
  };

  function restart() { setPaused(false); setKey(k => k + 1); }

  return (
    <div className="w-full pb-32 bg-[#080E14]">

      {/* ══ HERO ════════════════════════════════════════════════════ */}
      <section className="pt-28 pb-20 relative overflow-hidden border-b border-white/5">
        {/* grid */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.018]"
          style={{
            backgroundImage: 'linear-gradient(rgba(0,220,185,1) 1px,transparent 1px),linear-gradient(90deg,rgba(0,220,185,1) 1px,transparent 1px)',
            backgroundSize: '60px 60px',
          }} />
        <div className="absolute top-0 right-1/4 w-[500px] h-[400px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(ellipse,rgba(0,220,185,0.06) 0%,transparent 70%)' }} />

        <div className="container mx-auto px-6 md:px-12 max-w-5xl relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}>
            <div className="font-mono text-[11px] text-[#00DCB9] uppercase tracking-[0.22em] mb-6 flex items-center gap-2">
              <span className="w-5 h-px bg-[#00DCB9]/50" />
              SIG.18 / EXPERIMENTS
            </div>
            <h1 className="font-bold leading-[1.05] mb-5">
              <span className="block text-white text-5xl md:text-7xl">Experiments.</span>
              <span className="block text-5xl md:text-7xl mt-1"
                style={{
                  background: 'linear-gradient(90deg, #00DCB9 0%, #4FC3F7 40%, #FF6B35 100%)',
                  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                }}>
                Ideas you can touch.
              </span>
            </h1>
            <p className="text-[#7A8BAA] text-lg leading-relaxed max-w-lg mt-2">
              Interactive studies in motion, physics, colour, typography and AI interfaces.
              Portfolio shows delivered client work; this is the R&amp;D bench.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ══ FLAGSHIP STUDY ══════════════════════════════════════════ */}
      <section className="pt-16 pb-6 border-b border-white/5">
        <div className="container mx-auto px-6 md:px-12 max-w-6xl">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.55 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-end">
            <div>
              <div className="font-mono text-[10px] text-[#FF6B35] uppercase tracking-[0.25em] mb-4">
                FLAGSHIP STUDY
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
                {active?.title ?? 'Route the brief.'}
              </h2>
            </div>
            <p className="text-[#7A8BAA] text-base leading-relaxed">
              Match each incoming project need to a delivery path. Click a route or use keys 1–3.
              Every study runs directly on this page inside an isolated frame.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ══ TWO-PANEL INTERACTIVE AREA ══════════════════════════════ */}
      <section className="py-8">
        <div className="container mx-auto px-6 md:px-12 max-w-6xl">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6 }}
            className="flex flex-col lg:flex-row border border-white/8 rounded-2xl overflow-hidden"
            style={{ minHeight: 500 }}>

            {/* LEFT — experiment list */}
            <div className="lg:w-[280px] shrink-0 border-r border-white/8 flex flex-col">
              {experiments?.map((exp, idx) => {
                const Icon = EXP_ICONS[exp.id] ?? Bot;
                const isActive = exp.id === activeId;
                const dotColor = STATUS_COLORS[exp.status] ?? '#5A6B8A';
                return (
                  <button key={exp.id} onClick={() => { setActiveId(exp.id); setPaused(false); setKey(k => k + 1); }}
                    className={`group text-left p-5 border-b border-white/5 last:border-0 transition-all duration-200 relative
                      ${isActive ? 'bg-[#0D1826]' : 'bg-[#080E14] hover:bg-[#0A1220]'}`}>
                    {/* Active left bar */}
                    {isActive && <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-[#00DCB9]" />}
                    {/* Top row */}
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-mono text-[10px] text-[#5A6B8A] uppercase tracking-wider">
                        EX-{String(exp.id).padStart(3, '0')}
                      </span>
                      <span className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 rounded"
                        style={{ color: dotColor, background: STATUS_BG[exp.status] ?? 'rgba(255,255,255,0.05)' }}>
                        <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: dotColor }} />
                        {exp.status}
                      </span>
                    </div>
                    {/* Title */}
                    <h3 className={`text-sm font-bold mb-2 leading-snug transition-colors ${isActive ? 'text-white' : 'text-white/60 group-hover:text-white/80'}`}>
                      {exp.title}
                    </h3>
                    {/* Tags at bottom */}
                    <div className="flex flex-wrap gap-1 mt-3">
                      {exp.tags.slice(0, 3).map(tag => (
                        <span key={tag}
                          className="font-mono text-[9px] text-[#5A6B8A] border border-white/8 px-1.5 py-0.5 rounded uppercase tracking-wide">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* RIGHT — preview frame */}
            <div className="flex-1 flex flex-col bg-[#05080C] min-h-[460px]">
              {/* Browser chrome bar */}
              <div className="h-12 border-b border-white/8 flex items-center justify-between px-5 bg-[#080E14] shrink-0">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full"
                    style={{ background: paused ? '#FF6B35' : '#34D399' }} />
                  <span className="font-mono text-[10px] text-[#5A6B8A] uppercase tracking-widest">
                    {paused ? 'PAUSED' : 'RUNNING LOCALLY'}
                  </span>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => setPaused(p => !p)}
                    className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider px-3 py-1.5 bg-white/5 border border-white/10 rounded text-white hover:bg-white/10 transition-colors">
                    {paused ? <PlayIcon size={11} /> : <Pause size={11} />}
                    {paused ? 'Resume' : 'Pause'}
                  </button>
                  <button onClick={restart}
                    className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider px-3 py-1.5 bg-white/5 border border-white/10 rounded text-white hover:bg-white/10 transition-colors">
                    <RotateCcw size={11} /> Restart
                  </button>
                </div>
              </div>

              {/* Experiment content */}
              <div className="flex-1 relative overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.div key={`${activeId}-${key}`}
                    initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }} transition={{ duration: 0.25 }}
                    className="absolute inset-0 flex flex-col">
                    {PREVIEWS[activeId ?? 1] ?? (
                      <div className="flex-1 flex items-center justify-center text-[#3A4B66] font-mono text-sm">
                        No preview available
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </motion.div>

          {/* Experiment type + description strip */}
          {active && (
            <motion.div key={activeId} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              className="mt-4 flex flex-wrap items-center gap-4 px-1">
              <span className="font-mono text-[10px] text-[#5A6B8A] uppercase tracking-wider border border-white/8 px-3 py-1.5 rounded-full">
                {active.type}
              </span>
              <span className="text-sm text-[#5A6B8A] leading-relaxed">{active.description}</span>
            </motion.div>
          )}
        </div>
      </section>

      {/* ══ ALL EXPERIMENTS GRID ════════════════════════════════════ */}
      <section className="py-20 border-t border-white/5 mt-12">
        <div className="container mx-auto px-6 md:px-12 max-w-6xl">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5 }}
            className="mb-10">
            <div className="font-mono text-[11px] text-[#00DCB9] uppercase tracking-[0.22em] mb-3 flex items-center gap-2">
              <span className="w-5 h-px bg-[#00DCB9]/50" />
              ALL STUDIES
            </div>
            <h2 className="text-3xl font-bold text-white">The full bench.</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {experiments?.map((exp, i) => {
              const Icon = EXP_ICONS[exp.id] ?? Bot;
              const dotColor = STATUS_COLORS[exp.status] ?? '#5A6B8A';
              return (
                <motion.div key={exp.id}
                  initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.07 }}
                  onClick={() => { setActiveId(exp.id); setPaused(false); setKey(k => k + 1); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="group cursor-pointer bg-[#0A1220] border border-white/6 rounded-2xl p-6 hover:border-[#00DCB9]/25 hover:bg-[#0D1826] transition-all duration-300">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center border border-white/8 bg-white/5 group-hover:border-[#00DCB9]/30 group-hover:bg-[#00DCB9]/8 transition-all">
                      <Icon size={18} className="text-[#5A6B8A] group-hover:text-[#00DCB9] transition-colors" />
                    </div>
                    <span className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 rounded"
                      style={{ color: dotColor, background: STATUS_BG[exp.status] ?? 'rgba(255,255,255,0.05)' }}>
                      <span className="w-1.5 h-1.5 rounded-full" style={{ background: dotColor }} />
                      {exp.status}
                    </span>
                  </div>
                  <div className="font-mono text-[10px] text-[#5A6B8A] uppercase tracking-wider mb-2">
                    EX-{String(exp.id).padStart(3, '0')} / {exp.type}
                  </div>
                  <h3 className="font-bold text-white text-lg mb-2 group-hover:text-[#00DCB9] transition-colors">{exp.title}</h3>
                  <p className="text-sm text-[#5A6B8A] leading-relaxed line-clamp-2 mb-4">{exp.description}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {exp.tags.map(tag => (
                      <span key={tag} className="font-mono text-[9px] text-[#5A6B8A] border border-white/8 px-2 py-0.5 rounded uppercase tracking-wide">
                        {tag}
                      </span>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

    </div>
  );
}
