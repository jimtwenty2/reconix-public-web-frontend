import { Hero } from "@/components/sections/hero";
import { ScrollAmbient } from "@/components/scroll-ambient";

export default function Home() {
  return (
    <main>
      {/* fixed glow behind the page; sections pick their tint through SectionShell */}
      <ScrollAmbient />
      <Hero />
    </main>
  );
}
