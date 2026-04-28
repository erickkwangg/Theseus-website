import Evolution from "@/components/Pages/Home/Evolution";
import Features from "@/components/Pages/Home/Features";
import Footer from "@/components/Pages/Home/Footer";
import Hero from "@/components/Pages/Home/Hero";
import Markets from "@/components/Pages/Home/Markets";
import { SovereignAgentsSection } from "@/components/Pages/Home/SovereignAgents";

export default function Home() {
  return (
    <main className="min-h-screen site-shell">
      <Hero />
      <Features />
      <SovereignAgentsSection />
      <Evolution />
      <Markets />
      <Footer />
    </main>
  );
}
