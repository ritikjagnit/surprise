import { useMemo } from "react";

export function Particles({ count = 40 }: { count?: number }) {
  const items = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        size: Math.random() * 6 + 2,
        delay: Math.random() * 8,
        duration: 8 + Math.random() * 10,
        drift: (Math.random() - 0.5) * 120,
        hue: Math.random() > 0.5 ? "var(--neon-pink)" : Math.random() > 0.5 ? "var(--neon-purple)" : "var(--neon-blue)",
      })),
    [count],
  );
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden">
      {items.map((p) => (
        <span
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.left}%`,
            bottom: `-10px`,
            width: p.size,
            height: p.size,
            background: p.hue,
            boxShadow: `0 0 ${p.size * 3}px ${p.hue}`,
            animation: `float-up ${p.duration}s linear ${p.delay}s infinite`,
            // @ts-expect-error css var
            "--drift": `${p.drift}px`,
          }}
        />
      ))}
    </div>
  );
}

export function Stars({ count = 30 }: { count?: number }) {
  const items = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => ({
        id: i,
        top: Math.random() * 100,
        left: Math.random() * 100,
        size: Math.random() * 3 + 1,
        delay: Math.random() * 3,
        duration: 2 + Math.random() * 3,
      })),
    [count],
  );
  return (
    <div className="pointer-events-none fixed inset-0">
      {items.map((s) => (
        <span
          key={s.id}
          className="absolute rounded-full bg-white"
          style={{
            top: `${s.top}%`,
            left: `${s.left}%`,
            width: s.size,
            height: s.size,
            boxShadow: `0 0 ${s.size * 4}px white`,
            animation: `twinkle ${s.duration}s ease-in-out ${s.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
}