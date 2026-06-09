import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const MESSAGE = `From the moment you walked into my life, everything became brighter. Your laugh is my favorite sound, your smile my favorite view. Today the universe celebrates the day you came into the world — and so do I. Thank you for being you. Happy Birthday Redhima, my love. ✨`;

export function Message({ onNext }: { onNext: () => void }) {
  const [revealed, setRevealed] = useState(false);
  const [typed, setTyped] = useState("");

  useEffect(() => {
    if (!revealed) return;
    let i = 0;
    const t = setInterval(() => {
      i += 1;
      setTyped(MESSAGE.slice(0, i));
      if (i >= MESSAGE.length) clearInterval(t);
    }, 30);
    return () => clearInterval(t);
  }, [revealed]);

  return (
    <motion.div
      key="message"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative z-10 flex min-h-[100dvh] flex-col items-center justify-center px-6"
    >
      {!revealed ? (
        <motion.button
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setRevealed(true)}
          className="neon-btn px-8 py-6 text-base max-w-sm text-center"
          style={{ animation: "pulse-glow 1.8s ease-in-out infinite" }}
        >
          💌 I Have A Special Message For You
        </motion.button>
      ) : (
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="glass-card max-w-sm p-8 text-center"
        >
          <div className="text-4xl mb-4">💖</div>
          <p className="text-base leading-relaxed text-white/90 min-h-[200px]">
            {typed}
            <span className="ml-0.5 inline-block w-0.5 h-5 bg-neon-pink align-middle animate-pulse" />
          </p>
          {typed.length >= MESSAGE.length && (
            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              onClick={onNext}
              className="mt-6 neon-btn px-8 py-3 text-sm"
            >
              One More Surprise →
            </motion.button>
          )}
        </motion.div>
      )}
    </motion.div>
  );
}