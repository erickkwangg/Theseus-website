import Architecture from "@/components/Pages/Home/Architecture";
import Footer from "@/components/Pages/Home/Footer";
import Hero from "@/components/Pages/Home/Hero";
import Markets from "@/components/Pages/Home/Markets";
import { SovereignAgentsSection } from "@/components/Pages/Home/SovereignAgents";

export default function Home() {
  return (
    <main className="min-h-screen site-shell">
      <Hero />
      <SovereignAgentsSection />
      <Architecture />
      <Markets />
      <Footer />
    </main>
  );
}
