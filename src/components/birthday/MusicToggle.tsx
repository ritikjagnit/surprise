import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

// Soft ambient track (royalty-free / public domain feel). Replace src as needed.
const TRACK_URL = "/song.mp3";

export function MusicToggle() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const a = new Audio(TRACK_URL);
    a.loop = true;
    a.volume = 0.45;
    audioRef.current = a;
    return () => {
      a.pause();
      audioRef.current = null;
    };
  }, []);

  const toggle = () => {
    const a = audioRef.current;
    if (!a) return;
    if (playing) {
      a.pause();
      setPlaying(false);
    } else {
      a.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
    }
  };

  return (
    <motion.button
      onClick={toggle}
      whileTap={{ scale: 0.9 }}
      className="fixed top-4 right-4 z-50 h-11 w-11 rounded-full glass-card flex items-center justify-center text-lg"
      aria-label={playing ? "Pause music" : "Play music"}
    >
      <span className={playing ? "animate-pulse" : ""}>{playing ? "🔊" : "🔇"}</span>
    </motion.button>
  );
}