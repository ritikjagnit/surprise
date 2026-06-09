import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { Particles, Stars } from "@/components/birthday/Particles";
import { MusicToggle } from "@/components/birthday/MusicToggle";
import { Welcome } from "@/components/birthday/Welcome";
import { Gallery } from "@/components/birthday/Gallery";
import { Reasons } from "@/components/birthday/Reasons";
import { BalloonGame } from "@/components/birthday/BalloonGame";
import { Cake } from "@/components/birthday/Cake";
import { Message } from "@/components/birthday/Message";
import { Final } from "@/components/birthday/Final";
import { Lock } from "@/components/birthday/Lock";
import { Map } from "@/components/birthday/Map";
import { Promises } from "@/components/birthday/Promises";
import { ScratchCard } from "@/components/birthday/ScratchCard";
import { Coupons } from "@/components/birthday/Coupons";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "A Birthday Surprise ✨" },
      { name: "description", content: "An immersive personal birthday surprise experience." },
      { property: "og:title", content: "A Birthday Surprise ✨" },
      { property: "og:description", content: "An immersive personal birthday surprise experience." },
    ],
  }),
  component: Index,
});

const NAME = "Redhima";
const SCREENS = ["lock", "welcome", "gallery", "map", "reasons", "promises", "scratch", "balloons", "cake", "message", "coupons", "final"] as const;
type Screen = typeof SCREENS[number];

function Index() {
  const [screen, setScreen] = useState<Screen>("lock");
  const go = (s: Screen) => setScreen(s);

  return (
    <main className="relative min-h-[100dvh] w-full overflow-hidden text-foreground">
      <Stars />
      <Particles />
      <MusicToggle />
      <AnimatePresence mode="wait">
        {screen === "lock" && <Lock key="l" onUnlock={() => go("welcome")} />}
        {screen === "welcome" && <Welcome key="w" name={NAME} onStart={() => go("gallery")} />}
        {screen === "gallery" && <Gallery key="g" onNext={() => go("map")} />}
        {screen === "map" && <Map key="map" onNext={() => go("reasons")} />}
        {screen === "reasons" && <Reasons key="r" onNext={() => go("promises")} />}
        {screen === "promises" && <Promises key="p" onNext={() => go("scratch")} />}
        {screen === "scratch" && <ScratchCard key="s" onNext={() => go("balloons")} />}
        {screen === "balloons" && <BalloonGame key="b" onNext={() => go("cake")} />}
        {screen === "cake" && <Cake key="c" onNext={() => go("message")} />}
        {screen === "message" && <Message key="m" onNext={() => go("coupons")} />}
        {screen === "coupons" && <Coupons key="coup" onNext={() => go("final")} />}
        {screen === "final" && <Final key="f" onReplay={() => go("lock")} />}
      </AnimatePresence>
    </main>
  );
}
