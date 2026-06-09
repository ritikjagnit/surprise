import { useState } from "react";
import { motion } from "framer-motion";

export function Lock({ onUnlock }: { onUnlock: () => void }) {
  const PASSCODE = "2023"; // Example passcode (e.g. 14th Feb)
  const [input, setInput] = useState("");
  const [error, setError] = useState(false);

  const handleInput = (num: string) => {
    if (input.length < 4) {
      const newVal = input + num;
      setInput(newVal);
      if (newVal.length === 4) {
        if (newVal === PASSCODE) {
          setTimeout(onUnlock, 500);
        } else {
          setError(true);
          setTimeout(() => {
            setInput("");
            setError(false);
          }, 800);
        }
      }
    }
  };

  return (
    <motion.div
      key="lock"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative z-10 flex min-h-[100dvh] flex-col items-center justify-center px-4"
    >
      <h2 className="mb-2 text-2xl font-bold text-white text-center">
        Enter Secret Passcode 🔐
      </h2>
      <p className="mb-8 text-xs text-white/50 text-center">Hint: Something special (e.g., 2023)</p>

      <div className="flex gap-4 mb-8">
        {[0, 1, 2, 3].map((i) => (
          <motion.div
            key={i}
            animate={error ? { x: [-10, 10, -10, 10, 0] } : {}}
            transition={{ duration: 0.4 }}
            className={`w-12 h-16 rounded-xl flex items-center justify-center text-3xl font-bold border-2 transition-colors ${input[i] ? "border-neon-pink text-neon-pink shadow-[0_0_15px_var(--neon-pink)]" : "border-white/20 text-transparent"
              }`}
          >
            {input[i] ? "•" : ""}
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-4 max-w-[250px]">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
          <button
            key={num}
            onClick={() => handleInput(num.toString())}
            className="w-16 h-16 rounded-full glass-card text-xl text-white hover:bg-white/20 active:scale-95 transition-all"
          >
            {num}
          </button>
        ))}
        <div />
        <button
          onClick={() => handleInput("0")}
          className="w-16 h-16 rounded-full glass-card text-xl text-white hover:bg-white/20 active:scale-95 transition-all"
        >
          0
        </button>
        <button
          onClick={() => setInput(input.slice(0, -1))}
          className="w-16 h-16 rounded-full glass-card text-xl text-white/50 hover:bg-white/20 active:scale-95 transition-all"
        >
          ⌫
        </button>
      </div>
    </motion.div>
  );
}
