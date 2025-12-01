import Evolution from "@/components/Pages/Home/Evolution";
import Features from "@/components/Pages/Home/Features";
import Footer from "@/components/Pages/Home/Footer";
import Hero from "@/components/Pages/Home/Hero";
import Markets from "@/components/Pages/Home/Markets";

export default function Home() {
  return (
    <main className="min-h-screen bg-black">
      <Hero />
      <Features />
      <Evolution />
      <Markets />
      <Footer />
    </main>
  );
}
