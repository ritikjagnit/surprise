import { useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";

export function Final({ onReplay }: { onReplay: () => void }) {
  const hearts = useMemo(
    () =>
      Array.from({ length: 25 }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 5,
        duration: 6 + Math.random() * 6,
        size: 16 + Math.random() * 24,
      })),
    [],
  );

  useEffect(() => {
    const fire = () => {
      const origins = [
        { x: 0.2, y: 0.4 },
        { x: 0.8, y: 0.4 },
        { x: 0.5, y: 0.3 },
      ];
      origins.forEach((o, i) =>
        setTimeout(
          () =>
            confetti({
              particleCount: 80,
              startVelocity: 45,
              spread: 360,
              ticks: 80,
              origin: o,
              colors: ["#ec4899", "#a855f7", "#3b82f6", "#f472b6", "#facc15"],
              shapes: ["circle", "star"],
            }),
          i * 250,
        ),
      );
    };
    fire();
    const t = setInterval(fire, 3500);
    return () => clearInterval(t);
  }, []);

  return (
    <motion.div
      key="final"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative z-10 flex min-h-[100dvh] flex-col items-center justify-center px-6 text-center overflow-hidden"
    >
      <div className="pointer-events-none absolute inset-0">
        {hearts.map((h) => (
          <span
            key={h.id}
            className="absolute"
            style={{
              left: `${h.left}%`,
              bottom: 0,
              fontSize: h.size,
              animation: `float-up ${h.duration}s linear ${h.delay}s infinite`,
              filter: "drop-shadow(0 0 8px #ec4899)",
            }}
          >
            💖
          </span>
        ))}
      </div>

      <motion.h2
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", damping: 12 }}
        className="text-4xl sm:text-5xl font-extrabold bg-gradient-to-r from-neon-pink via-neon-purple to-neon-blue bg-clip-text text-transparent neon-text leading-tight"
      >
        Thank You
      </motion.h2>
      <motion.p
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="mt-4 max-w-xs text-lg text-white/90"
      >
        For being part of my life ✨
      </motion.p>

      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        onClick={onReplay}
        className="mt-12 neon-btn px-8 py-3 text-sm"
      >
        ↺ Replay Experience
      </motion.button>
    </motion.div>
  );
}