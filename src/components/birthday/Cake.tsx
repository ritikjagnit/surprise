import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";

export function Cake({ onNext }: { onNext: () => void }) {
  const [blown, setBlown] = useState(false);
  const [listening, setListening] = useState(false);
  const streamRef = useRef<MediaStream | null>(null);

  const blowOut = () => {
    if (blown) return;
    setBlown(true);
    confetti({ particleCount: 200, spread: 120, origin: { y: 0.4 }, colors: ["#ec4899", "#a855f7", "#3b82f6"] });
    streamRef.current?.getTracks().forEach((t) => t.stop());
  };

  const tryMic = async () => {
    setListening(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const src = ctx.createMediaStreamSource(stream);
      const an = ctx.createAnalyser();
      an.fftSize = 512;
      src.connect(an);
      const data = new Uint8Array(an.frequencyBinCount);
      const tick = () => {
        an.getByteFrequencyData(data);
        const avg = data.reduce((a, b) => a + b, 0) / data.length;
        if (avg > 55) {
          blowOut();
          ctx.close();
          return;
        }
        if (!blown) requestAnimationFrame(tick);
      };
      tick();
    } catch {
      setListening(false);
    }
  };

  useEffect(() => () => streamRef.current?.getTracks().forEach((t) => t.stop()), []);

  return (
    <motion.div
      key="cake"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      className="relative z-10 flex min-h-[100dvh] flex-col items-center justify-center px-6"
    >
      <h2 className="mb-2 text-3xl font-bold bg-gradient-to-r from-neon-pink to-neon-blue bg-clip-text text-transparent neon-text">
        Make a Wish
      </h2>
      <p className="mb-8 text-xs text-muted-foreground">Blow into your mic or tap a candle</p>

      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="relative"
        style={{ perspective: 600 }}
      >
        {/* Candles */}
        <div className="absolute left-1/2 -top-16 -translate-x-1/2 flex gap-4">
          {[0, 1, 2].map((i) => (
            <div key={i} className="flex flex-col items-center">
              {!blown && (
                <div
                  className="w-3 h-5 rounded-full"
                  style={{
                    background: "radial-gradient(circle at 50% 30%, #fff8c4, #ffb347 50%, #ff5e00 80%, transparent)",
                    boxShadow: "0 0 16px #ffb347, 0 0 30px #ff5e00",
                    animation: `flicker ${0.4 + i * 0.15}s ease-in-out infinite`,
                    transformOrigin: "bottom",
                  }}
                />
              )}
              {blown && (
                <motion.div
                  initial={{ opacity: 1 }}
                  animate={{ opacity: 0, y: -30 }}
                  className="w-2 h-2 rounded-full bg-gray-400/70"
                />
              )}
              <div className="w-2 h-12 rounded-sm" style={{ background: "linear-gradient(180deg, #fde68a, #f59e0b)" }} />
            </div>
          ))}
        </div>

        {/* Cake layers */}
        <div className="relative">
          <div
            className="w-64 h-20 rounded-t-3xl rounded-b-md mx-auto relative overflow-hidden"
            style={{
              background: "linear-gradient(180deg, #fce7f3 0%, #f9a8d4 50%, #ec4899 100%)",
              boxShadow: "0 10px 30px rgba(236,72,153,0.5), inset 0 -10px 20px rgba(0,0,0,0.15)",
            }}
          >
            <div className="absolute top-0 left-0 right-0 h-4 bg-white/40 rounded-b-2xl" />
          </div>
          <div
            className="w-72 h-24 -mt-2 rounded-3xl mx-auto relative overflow-hidden"
            style={{
              background: "linear-gradient(180deg, #ddd6fe 0%, #a78bfa 50%, #7c3aed 100%)",
              boxShadow: "0 15px 40px rgba(124,58,237,0.5), inset 0 -10px 20px rgba(0,0,0,0.15)",
            }}
          >
            <div className="absolute top-0 left-0 right-0 h-5 bg-white/40 rounded-b-3xl" />
            <div className="absolute inset-x-0 bottom-3 flex justify-around">
              {Array.from({ length: 6 }).map((_, i) => (
                <span key={i} className="w-3 h-3 rounded-full bg-pink-300 shadow-[0_0_8px_#f9a8d4]" />
              ))}
            </div>
          </div>
          <div
            className="w-80 h-28 -mt-2 rounded-3xl mx-auto relative overflow-hidden"
            style={{
              background: "linear-gradient(180deg, #bfdbfe 0%, #60a5fa 50%, #3b82f6 100%)",
              boxShadow: "0 20px 50px rgba(59,130,246,0.5), inset 0 -10px 20px rgba(0,0,0,0.15)",
            }}
          >
            <div className="absolute top-0 left-0 right-0 h-5 bg-white/40 rounded-b-3xl" />
          </div>
        </div>
      </motion.div>

      <div className="mt-10 flex flex-col items-center gap-3">
        {!blown ? (
          <>
            <button onClick={blowOut} className="neon-btn px-8 py-3 text-sm">
              Tap to blow candles 🕯️
            </button>
            {!listening && (
              <button onClick={tryMic} className="text-xs text-white/60 underline">
                or use your microphone
              </button>
            )}
            {listening && <p className="text-xs text-white/60 animate-pulse">Listening... blow! 🎤</p>}
          </>
        ) : (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            onClick={onNext}
            className="neon-btn px-10 py-4 text-sm"
          >
            Continue ✨
          </motion.button>
        )}
      </div>
    </motion.div>
  );
}