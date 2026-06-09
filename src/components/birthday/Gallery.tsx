import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const memories = [
  { emoji: "🌸", title: "First Hello", caption: "Where it all began", grad: "from-pink-500/40 to-purple-500/40" },
  { emoji: "☕", title: "Cozy Talks", caption: "Endless conversations", grad: "from-purple-500/40 to-blue-500/40" },
  { emoji: "🌃", title: "City Lights", caption: "Late night walks", grad: "from-blue-500/40 to-pink-500/40" },
  { emoji: "🎶", title: "Our Song", caption: "Melodies of us", grad: "from-fuchsia-500/40 to-indigo-500/40" },
  { emoji: "🌊", title: "Sunset Shore", caption: "Footprints in the sand", grad: "from-rose-500/40 to-violet-500/40" },
];

export function Gallery({ onNext }: { onNext: () => void }) {
  const [idx, setIdx] = useState(0);
  const [dir, setDir] = useState(1);

  const go = (d: number) => {
    setDir(d);
    setIdx((i) => (i + d + memories.length) % memories.length);
  };

  const m = memories[idx];

  return (
    <motion.div
      key="gallery"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      className="relative z-10 flex min-h-[100dvh] flex-col items-center justify-center px-6 py-16"
    >
      <h2 className="mb-6 text-3xl font-bold bg-gradient-to-r from-neon-pink to-neon-blue bg-clip-text text-transparent neon-text">
        Memories ✨
      </h2>

      <div className="relative w-full max-w-sm h-96 perspective-[1000px]">
        <AnimatePresence mode="wait" custom={dir}>
          <motion.div
            key={idx}
            custom={dir}
            initial={{ x: dir * 200, opacity: 0, rotateY: dir * 30 }}
            animate={{ x: 0, opacity: 1, rotateY: 0 }}
            exit={{ x: -dir * 200, opacity: 0, rotateY: -dir * 30 }}
            transition={{ type: "spring", damping: 18 }}
            className={`glass-card absolute inset-0 flex flex-col items-center justify-center p-6 bg-gradient-to-br ${m.grad}`}
          >
            <div className="text-8xl mb-6 drop-shadow-[0_0_25px_rgba(255,100,200,0.6)]">{m.emoji}</div>
            <h3 className="text-2xl font-bold text-white">{m.title}</h3>
            <p className="mt-2 text-sm text-white/80">{m.caption}</p>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="mt-6 flex gap-2">
        {memories.map((_, i) => (
          <span
            key={i}
            className={`h-2 rounded-full transition-all ${i === idx ? "w-8 bg-neon-pink shadow-[0_0_10px_var(--neon-pink)]" : "w-2 bg-white/30"}`}
          />
        ))}
      </div>

      <div className="mt-6 flex gap-3">
        <button
          onClick={() => go(-1)}
          className="glass-card h-12 w-12 rounded-full text-xl"
        >
          ‹
        </button>
        <button
          onClick={() => go(1)}
          className="glass-card h-12 w-12 rounded-full text-xl"
        >
          ›
        </button>
      </div>

      <button
        onClick={onNext}
        className="mt-8 neon-btn px-8 py-3 text-sm"
      >
        Continue →
      </button>
    </motion.div>
  );
}