import Image from "next/image";
import { Button } from "@/components/ui/button";
import heroImg from "@/assets/hero.png";
import Header from "./Header";
import Particles from "./Particles";
import { EXTERNAL_LINKS } from "@/config/links";
import AIPersonTooltip from "./AIPersonTooltip";

export default function Hero() {
  return (
    <section className="custom-hero-bg text-white relative overflow-hidden min-h-screen">
      {/* Floating particles */}
      <Particles />
      
      {/* Hero */}
      <Header />
      <div className="w-full grid lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-[80vh] relative z-10">
        <div className="space-y-6 lg:space-y-8 pl-6 lg:pl-12 pt-20">
          <div className="space-y-4">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-light leading-tight fade-in-up">
              The Cloud for
              <br />
              <AIPersonTooltip>
                <span className="gradient-text cursor-help">AI Personhood</span>
              </AIPersonTooltip>
            </h1>
            <p className="text-gray-400 text-base lg:text-lg max-w-md fade-in-up-delay-1">
              A Layer-1 blockchain where AI agents own assets, make decisions, 
              and persist without human control.
            </p>
          </div>

          <div className="fade-in-up-delay-2">
            <a href={EXTERNAL_LINKS.whitepaper} target="_blank" rel="noopener noreferrer">
              <Button className="bg-white text-black hover:bg-gray-100 px-8 py-6 text-base font-medium 
                                 rounded-md shadow-lg hover:shadow-xl hover:shadow-white/10 
                                 transition-all duration-300 button-press">
                READ THE WHITEPAPER
                <span className="ml-2 text-xs text-gray-500">🔒</span>
              </Button>
            </a>
          </div>
        </div>
        <div className="flex items-end justify-end h-full flex-col relative">
          {/* Glow behind the image */}
          <div className="hero-glow absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
          <Image
            src={heroImg}
            alt="3D Shapes of logo"
            width={800}
            height={800}
            className="w-full float-animation relative z-10"
            priority
          />
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce z-10">
        <span className="text-gray-500 text-xs uppercase tracking-widest">Scroll</span>
        <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
}
