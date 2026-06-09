import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";

type Balloon = { id: number; x: number; color: string; duration: number; size: number };

const COLORS = ["var(--neon-pink)", "var(--neon-purple)", "var(--neon-blue)", "#f472b6", "#a78bfa", "#60a5fa"];
const TARGET = 10;

export function BalloonGame({ onNext }: { onNext: () => void }) {
  const [balloons, setBalloons] = useState<Balloon[]>([]);
  const [score, setScore] = useState(0);

  useEffect(() => {
    let id = 0;
    const t = setInterval(() => {
      id += 1;
      setBalloons((b) => [
        ...b,
        {
          id,
          x: Math.random() * 80 + 5,
          color: COLORS[Math.floor(Math.random() * COLORS.length)],
          duration: 6 + Math.random() * 4,
          size: 50 + Math.random() * 30,
        },
      ]);
    }, 700);
    return () => clearInterval(t);
  }, []);

  const pop = useCallback((id: number, x: number) => {
    setBalloons((b) => b.filter((bal) => bal.id !== id));
    setScore((s) => s + 1);
    confetti({
      particleCount: 40,
      spread: 70,
      startVelocity: 30,
      origin: { x: x / 100, y: 0.5 },
      colors: ["#ec4899", "#a855f7", "#3b82f6", "#f472b6"],
      disableForReducedMotion: true,
    });
  }, []);

  useEffect(() => {
    if (score >= TARGET) {
      confetti({ particleCount: 150, spread: 100, origin: { y: 0.6 } });
    }
  }, [score]);

  return (
    <motion.div
      key="balloons"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative z-10 min-h-[100dvh] overflow-hidden"
    >
      <div className="absolute top-6 left-0 right-0 z-20 flex flex-col items-center gap-2 px-6">
        <div className="glass-card px-6 py-2 text-center">
          <p className="text-xs text-white/70">Pop the balloons!</p>
          <p className="text-2xl font-bold bg-gradient-to-r from-neon-pink to-neon-blue bg-clip-text text-transparent">
            {score} / {TARGET}
          </p>
        </div>
      </div>

      <div className="absolute inset-0">
        <AnimatePresence>
          {balloons.map((b) => (
            <motion.button
              key={b.id}
              initial={{ y: "110vh", opacity: 0 }}
              animate={{ y: "-20vh", opacity: 1 }}
              exit={{ scale: 1.6, opacity: 0 }}
              transition={{ duration: b.duration, ease: "linear", opacity: { duration: 0.4 } }}
              onAnimationComplete={() => setBalloons((bs) => bs.filter((x) => x.id !== b.id))}
              onClick={() => pop(b.id, b.x)}
              className="absolute"
              style={{ left: `${b.x}%`, width: b.size, height: b.size * 1.2 }}
            >
              <div
                className="w-full h-full rounded-full relative"
                style={{
                  background: `radial-gradient(circle at 30% 30%, white, ${b.color} 60%, transparent 100%), ${b.color}`,
                  boxShadow: `0 0 25px ${b.color}, inset -8px -10px 20px rgba(0,0,0,0.25)`,
                }}
              >
                <span
                  className="absolute left-1/2 top-full h-10 w-px -translate-x-1/2"
                  style={{ background: "rgba(255,255,255,0.4)" }}
                />
              </div>
            </motion.button>
          ))}
        </AnimatePresence>
      </div>

      {score >= TARGET && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute bottom-10 left-0 right-0 flex justify-center z-30"
        >
          <button onClick={onNext} className="neon-btn px-10 py-4 text-sm">
            Make a Wish 🎂
          </button>
        </motion.div>
      )}
    </motion.div>
  );
}