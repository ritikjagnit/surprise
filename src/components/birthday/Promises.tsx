import { useState } from "react";
import { motion } from "framer-motion";

const PROMISES = [
  "Main promise karta hu ki main tumhare mood swings jhelunga.",
  "Main promise karta hu ki main humesha tumhara last slice of pizza tumhe dunga.",
  "I promise to always be your safe place.",
  "Main promise karta hu ki main tumhari long stories bina interrupt kiye sununga.",
  "I promise to love you more everyday."
];

export function Promises({ onNext }: { onNext: () => void }) {
  const [active, setActive] = useState(0);

  return (
    <motion.div
      key="promises"
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      className="relative z-10 flex min-h-[100dvh] flex-col items-center justify-center px-6"
    >
      <h2 className="mb-8 text-3xl font-bold bg-gradient-to-r from-neon-pink to-neon-blue bg-clip-text text-transparent neon-text text-center">
        My Promises 🤞
      </h2>

      <div className="relative w-full max-w-sm h-[300px]">
        {PROMISES.map((promise, i) => (
          active === i && (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 1.2, rotate: 5 }}
              className="absolute inset-0 flex items-center justify-center text-center p-8 glass-card border-pink-500/30"
              style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.1), rgba(236,72,153,0.1))" }}
            >
              <div className="absolute top-4 left-4 text-3xl opacity-50">❝</div>
              <p className="text-xl font-medium text-white leading-relaxed drop-shadow-md">
                {promise}
              </p>
              <div className="absolute bottom-4 right-4 text-3xl opacity-50">❞</div>
            </motion.div>
          )
        ))}
      </div>

      <div className="mt-8 flex gap-3">
        {PROMISES.map((_, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`h-3 w-3 rounded-full transition-all ${active === i ? "bg-neon-pink scale-125 shadow-[0_0_10px_var(--neon-pink)]" : "bg-white/30 hover:bg-white/50"}`}
          />
        ))}
      </div>

      <button onClick={onNext} className="mt-12 neon-btn px-10 py-3 text-sm">
        Promise Accepted 💖
      </button>
    </motion.div>
  );
}
