import Beliefs from "@/components/Pages/Home/Beliefs";
import Build from "@/components/Pages/Home/Build";
import Footer from "@/components/Pages/Home/Footer";
import Hero from "@/components/Pages/Home/Hero";
import Markets from "@/components/Pages/Home/Markets";

export default function Home() {
  return (
    <main className="min-h-screen site-shell">
      <Hero />
      <Beliefs />
      <Build />
      <Markets />
      <Footer />
    </main>
  );
}
