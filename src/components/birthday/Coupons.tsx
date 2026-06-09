import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";

const COUPONS = [
  { id: 1, title: "Free Foot Massage 💆‍♀️", desc: "Valid for 1 relaxing foot massage by me." },
  { id: 2, title: "Movie Night 🎬", desc: "Your choice of movie. I promise not to fall asleep or complain!" },
  { id: 3, title: "Free Pizza Date 🍕", desc: "One large pizza of your choice, completely on me." },
  { id: 4, title: "Win an Argument 😂", desc: "Use this to instantly win any one argument. No questions asked." }
];

export function Coupons({ onNext }: { onNext: () => void }) {
  const [claimed, setClaimed] = useState<number[]>([]);

  const handleClaim = (id: number) => {
    if (claimed.includes(id)) return;
    setClaimed([...claimed, id]);
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#ec4899', '#a855f7', '#3b82f6']
    });
  };

  return (
    <motion.div
      key="coupons"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      className="relative z-10 flex min-h-[100dvh] flex-col items-center justify-center px-4 py-12"
    >
      <h2 className="mb-2 text-3xl font-bold bg-gradient-to-r from-neon-pink to-neon-purple bg-clip-text text-transparent neon-text text-center">
        Love Coupons 🎟️
      </h2>
      <p className="mb-8 text-sm text-white/70 text-center">Claim them now, redeem whenever you want!</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl w-full">
        {COUPONS.map((c) => {
          const isClaimed = claimed.includes(c.id);
          return (
            <motion.div
              key={c.id}
              whileHover={{ scale: isClaimed ? 1 : 1.02 }}
              whileTap={{ scale: isClaimed ? 1 : 0.98 }}
              className={`relative overflow-hidden rounded-xl border-2 border-dashed p-6 cursor-pointer transition-all ${
                isClaimed
                  ? "border-green-500 bg-green-500/20"
                  : "border-neon-pink bg-pink-500/10 glass-card"
              }`}
              onClick={() => handleClaim(c.id)}
            >
              <div className="relative z-10 text-center">
                <h3 className="text-xl font-bold text-white mb-2">{c.title}</h3>
                <p className="text-sm text-white/80 mb-4">{c.desc}</p>
                
                <AnimatePresence mode="wait">
                  {isClaimed ? (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="inline-block bg-green-500 text-white px-4 py-1 rounded-full text-xs font-bold shadow-[0_0_15px_rgba(34,197,94,0.5)]"
                    >
                      ✓ CLAIMED (Screenshot this!)
                    </motion.div>
                  ) : (
                    <motion.div
                      className="inline-block bg-neon-pink text-white px-4 py-1 rounded-full text-xs font-bold shadow-[0_0_10px_var(--neon-pink)]"
                    >
                      Tap to Claim
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              
              {/* Cutout circles for coupon effect */}
              <div className="absolute top-1/2 -left-3 w-6 h-6 bg-[#0a0a0a] rounded-full -translate-y-1/2" />
              <div className="absolute top-1/2 -right-3 w-6 h-6 bg-[#0a0a0a] rounded-full -translate-y-1/2" />
            </motion.div>
          );
        })}
      </div>

      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: claimed.length > 0 ? 1 : 0 }}
        onClick={onNext}
        className="mt-10 neon-btn px-8 py-3 text-sm"
      >
        Finish Surprise ✨
      </motion.button>
    </motion.div>
  );
}
