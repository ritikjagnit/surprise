import { motion } from "framer-motion";

export function Welcome({ name, onStart }: { name: string; onStart: () => void }) {
  const letters = `Happy Birthday`.split("");
  return (
    <motion.div
      key="welcome"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="relative z-10 flex min-h-[100dvh] flex-col items-center justify-center px-6 text-center"
    >
      <motion.div
        initial={{ scale: 0, rotate: -20 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", delay: 0.1 }}
        className="text-6xl mb-4"
      >
        🎂
      </motion.div>

      <h1 className="flex flex-wrap justify-center gap-x-2 text-4xl sm:text-5xl font-bold neon-text">
        {letters.map((l, i) => (
          <motion.span
            key={i}
            initial={{ y: 40, opacity: 0, filter: "blur(8px)" }}
            animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
            transition={{ delay: 0.3 + i * 0.05, type: "spring", damping: 12 }}
            className="inline-block bg-gradient-to-br from-neon-pink via-neon-purple to-neon-blue bg-clip-text text-transparent"
          >
            {l === " " ? "\u00A0" : l}
          </motion.span>
        ))}
      </h1>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.3, duration: 0.8 }}
        className="mt-2 text-5xl sm:text-6xl font-extrabold bg-gradient-to-r from-neon-pink to-neon-blue bg-clip-text text-transparent neon-text"
      >
        {name}
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        className="mt-6 max-w-xs text-sm text-muted-foreground"
      >
        A little surprise made with love just for you ✨
      </motion.p>

      <motion.button
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.1, type: "spring" }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onStart}
        className="mt-10 px-10 py-4 neon-btn text-base"
        style={{ animation: "pulse-glow 2.5s ease-in-out infinite" }}
      >
        Begin the Journey →
      </motion.button>
    </motion.div>
  );
}