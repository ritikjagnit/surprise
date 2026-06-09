import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

export function ScratchCard({ onNext }: { onNext: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [scratched, setScratched] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Fill with silver/glitter color
    ctx.fillStyle = "#a8a2a8";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Add text on top
    ctx.font = "bold 20px sans-serif";
    ctx.fillStyle = "#555";
    ctx.textAlign = "center";
    ctx.fillText("Scratch to Reveal!", canvas.width / 2, canvas.height / 2);

    let isDrawing = false;

    const scratch = (x: number, y: number) => {
      ctx.globalCompositeOperation = "destination-out";
      ctx.beginPath();
      ctx.arc(x, y, 25, 0, Math.PI * 2);
      ctx.fill();

      // Check how much is scratched
      const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
      let clearPixels = 0;
      // Sampling every 4th pixel for performance
      for (let i = 3; i < data.length; i += 16) {
        if (data[i] === 0) clearPixels++;
      }
      const totalSampled = data.length / 16;
      const percent = clearPixels / totalSampled;
      
      if (percent > 0.4 && !scratched) {
        setScratched(true);
      }
    };

    const handleStart = (e: MouseEvent | TouchEvent) => {
      isDrawing = true;
      handleMove(e);
    };

    const handleMove = (e: MouseEvent | TouchEvent) => {
      if (!isDrawing) return;
      e.preventDefault();
      const rect = canvas.getBoundingClientRect();
      const clientX = "touches" in e ? e.touches[0].clientX : (e as MouseEvent).clientX;
      const clientY = "touches" in e ? e.touches[0].clientY : (e as MouseEvent).clientY;
      scratch(clientX - rect.left, clientY - rect.top);
    };

    const handleEnd = () => { isDrawing = false; };

    canvas.addEventListener("mousedown", handleStart);
    canvas.addEventListener("mousemove", handleMove);
    canvas.addEventListener("mouseup", handleEnd);
    canvas.addEventListener("mouseleave", handleEnd);

    canvas.addEventListener("touchstart", handleStart, { passive: false });
    canvas.addEventListener("touchmove", handleMove, { passive: false });
    canvas.addEventListener("touchend", handleEnd);

    return () => {
      canvas.removeEventListener("mousedown", handleStart);
      canvas.removeEventListener("mousemove", handleMove);
      canvas.removeEventListener("mouseup", handleEnd);
      canvas.removeEventListener("mouseleave", handleEnd);
      canvas.removeEventListener("touchstart", handleStart);
      canvas.removeEventListener("touchmove", handleMove);
      canvas.removeEventListener("touchend", handleEnd);
    };
  }, [scratched]);

  return (
    <motion.div
      key="scratch"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative z-10 flex min-h-[100dvh] flex-col items-center justify-center px-6"
    >
      <h2 className="mb-8 text-3xl font-bold bg-gradient-to-r from-neon-pink to-neon-blue bg-clip-text text-transparent neon-text text-center">
        A Hidden Secret ✨
      </h2>

      <div className="relative w-72 h-72 rounded-2xl overflow-hidden shadow-[0_0_30px_rgba(236,72,153,0.4)]">
        {/* The hidden content */}
        <div className="absolute inset-0 bg-white flex flex-col items-center justify-center p-6 text-center">
          <div className="text-6xl mb-4">🙈</div>
          <h3 className="text-2xl font-bold text-pink-600 mb-2">You found it!</h3>
          <p className="text-gray-600 font-medium leading-tight">You are the best thing that ever happened to me. I love you! ❤️</p>
        </div>

        {/* The scratchable canvas */}
        <canvas
          ref={canvasRef}
          width={288}
          height={288}
          className={`absolute inset-0 cursor-crosshair transition-opacity duration-1000 ${scratched ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
        />
      </div>

      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: scratched ? 1 : 0 }}
        onClick={onNext}
        className="mt-12 neon-btn px-10 py-3 text-sm"
      >
        Continue →
      </motion.button>
    </motion.div>
  );
}
