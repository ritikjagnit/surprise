import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const REASONS = [
  "I love your beautiful smile that brightens my day.",
  "I love how you care for me even when I'm annoying.",
  "I love your cute random voice notes.",
  "I love how safe I feel when I'm with you.",
  "I love your stupid but adorable jokes.",
  "I love the way your eyes sparkle when you're happy.",
  "I love how you understand me without me saying a word.",
  "I love our late-night deep conversations.",
  "I love the way you get mad at me, it's so cute.",
  "I love you just for being you, my favorite person."
];

export function Reasons({ onNext }: { onNext: () => void }) {
  const [opened, setOpened] = useState<number[]>([]);
  const [selected, setSelected] = useState<number | null>(null);

  const handleOpen = (index: number) => {
    setSelected(index);
    if (!opened.includes(index)) {
      setOpened([...opened, index]);
    }
  };

  return (
    <motion.div
      key="reasons"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      className="relative z-10 flex min-h-[100dvh] flex-col items-center justify-center px-4 py-12"
    >
      <h2 className="mb-2 text-3xl font-bold bg-gradient-to-r from-neon-pink to-neon-purple bg-clip-text text-transparent neon-text text-center">
        10 Reasons I Love You
      </h2>
      <p className="mb-10 text-sm text-white/70 text-center">Tap each envelope to open my heart 💌</p>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 sm:gap-6 max-w-3xl">
        {REASONS.map((_, i) => (
          <motion.button
            key={i}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1, type: "spring", stiffness: 200 }}
            onClick={() => handleOpen(i)}
            className={`relative flex h-20 w-24 sm:h-24 sm:w-28 flex-col items-center justify-center rounded-xl border border-white/20 transition-all ${
              opened.includes(i) ? "bg-white/10" : "glass-card bg-gradient-to-br from-pink-500/30 to-purple-500/30"
            }`}
            style={{
              boxShadow: opened.includes(i) ? "none" : "0 0 15px rgba(236,72,153,0.3)"
            }}
          >
            <span className="text-3xl sm:text-4xl drop-shadow-md">
              {opened.includes(i) ? "💖" : "💌"}
            </span>
            <span className="absolute -bottom-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-neon-pink text-xs font-bold text-white shadow-[0_0_10px_var(--neon-pink)]">
              {i + 1}
            </span>
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {selected !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-6 backdrop-blur-sm"
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ scale: 0.8, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 50 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-card relative max-w-sm w-full p-8 text-center bg-gradient-to-b from-white/10 to-pink-500/10 border-pink-500/30"
            >
              <button
                onClick={() => setSelected(null)}
                className="absolute right-4 top-4 text-white/60 hover:text-white"
              >
                ✕
              </button>
              <div className="text-5xl mb-4 animate-bounce">💖</div>
              <p className="text-lg font-medium text-white drop-shadow-sm leading-relaxed">
                {REASONS[selected]}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: opened.length === REASONS.length ? 1 : 0.5 }}
        onClick={onNext}
        className="mt-12 neon-btn px-8 py-3 text-sm"
      >
        {opened.length === REASONS.length ? "Continue ✨" : "Skip for now →"}
      </motion.button>
    </motion.div>
  );
}
