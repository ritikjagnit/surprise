import { motion } from "framer-motion";

const PLACES = [
  { title: "Where we first met", desc: "The place where the magic began ✨", top: "20%", left: "30%" },
  { title: "Our First Date", desc: "Butterflies in my stomach 🦋", top: "50%", left: "60%" },
  { title: "Favorite Hangout", desc: "Where we make the best memories ☕", top: "80%", left: "40%" },
];

export function Map({ onNext }: { onNext: () => void }) {
  return (
    <motion.div
      key="map"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      className="relative z-10 flex min-h-[100dvh] flex-col items-center justify-center px-4 py-12"
    >
      <h2 className="mb-2 text-3xl font-bold bg-gradient-to-r from-neon-pink to-neon-purple bg-clip-text text-transparent neon-text text-center">
        Our Memory Map 🗺️
      </h2>
      <p className="mb-10 text-sm text-white/70 text-center">Tap the pins to explore</p>

      <div className="relative w-full max-w-sm h-[400px] glass-card rounded-3xl p-4 overflow-hidden border-white/10 bg-white/5">
        <svg className="absolute inset-0 w-full h-full opacity-30" preserveAspectRatio="none" viewBox="0 0 100 100">
          <path d="M30,20 Q45,35 60,50 T40,80" fill="none" stroke="var(--neon-pink)" strokeWidth="1" strokeDasharray="4,4" className="animate-pulse" />
        </svg>

        {PLACES.map((place, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.5 + 0.5 }}
            className="absolute group"
            style={{ top: place.top, left: place.left, transform: 'translate(-50%, -50%)' }}
          >
            <div className="relative flex flex-col items-center cursor-pointer">
              <span className="text-4xl hover:scale-125 transition-transform origin-bottom drop-shadow-[0_0_10px_var(--neon-pink)] animate-bounce">
                📍
              </span>
              <div className="absolute top-10 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity w-40 glass-card p-3 text-center rounded-xl z-20">
                <h4 className="font-bold text-sm text-neon-pink">{place.title}</h4>
                <p className="text-xs text-white/80 mt-1">{place.desc}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.button onClick={onNext} className="mt-12 neon-btn px-8 py-3 text-sm">
        Next Destination 🚀
      </motion.button>
    </motion.div>
  );
}
