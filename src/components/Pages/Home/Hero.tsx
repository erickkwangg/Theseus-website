import Image from "next/image";
import { Button } from "@/components/ui/button";
import heroImg from "@/assets/hero.png";
import Header from "./Header";
import Particles from "./Particles";
import { EXTERNAL_LINKS } from "@/config/links";
import AIPersonTooltip from "./AIPersonTooltip";

export default function Hero() {
  return (
    <section className="text-white relative overflow-hidden min-h-screen section-soft-divider">
      {/* Floating particles */}
      <Particles />
      <div className="absolute inset-0 soft-grid opacity-20 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/20 via-slate-950/55 to-slate-950/85 pointer-events-none" />
      
      {/* Hero */}
      <Header />
      <div className="w-full grid lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-[78vh] relative z-10">
        <div className="space-y-6 lg:space-y-8 pl-6 lg:pl-12 pt-20 lg:pt-24">
          <div className="space-y-4">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-light leading-tight fade-in-up">
              The Cloud for
              <br />
              <AIPersonTooltip>
                <span className="hero-title-gradient cursor-help">AI Personhood</span>
              </AIPersonTooltip>
            </h1>
            <p className="text-slate-200 text-lg lg:text-xl max-w-xl leading-relaxed fade-in-up-delay-1">
              A platform where AI agents own assets, make decisions, 
              and persist without human control.
            </p>
          </div>

          <div className="flex flex-wrap gap-4 fade-in-up-delay-2">
            <a href={EXTERNAL_LINKS.whitepaper} target="_blank" rel="noopener noreferrer">
              <Button className="primary-cta px-8 py-6 text-base font-medium rounded-md transition-all duration-300 button-press">
                Read the Whitepaper
              </Button>
            </a>
            <a href="#about">
              <Button className="ghost-cta px-8 py-6 text-base font-medium rounded-md transition-all duration-300">
                Learn More
              </Button>
            </a>
          </div>
        </div>
        <div className="relative flex items-center justify-center lg:justify-end h-full">
          {/* Glow behind the image */}
          <div className="hero-glow absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />

          <div className="relative w-full max-w-[760px] aspect-square mx-auto lg:ml-auto overflow-hidden rounded-3xl">
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-slate-900/70 to-slate-950/80 shadow-[0_20px_60px_rgba(2,6,23,0.45)] backdrop-blur-[8px] pointer-events-none" />
            <Image
              src={heroImg}
              alt="3D Shapes of logo"
              width={800}
              height={800}
              className="absolute z-10 left-1/2 top-1/2 w-[106%] h-[106%] lg:w-[108%] lg:h-[108%] xl:w-[110%] xl:h-[110%] -translate-x-1/2 -translate-y-1/2 object-cover object-center drop-shadow-[0_34px_90px_rgba(14,165,233,0.2)]"
              priority
            />
            <div className="absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-slate-950/55 to-transparent z-20 pointer-events-none" />
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-9 left-6 lg:left-12 flex items-center gap-3 z-20 opacity-85">
        <div className="w-5 h-9 rounded-full border border-slate-500/70 flex justify-center pt-1.5">
          <div className="w-1 h-2 rounded-full bg-slate-300/70 animate-pulse" />
        </div>
        <div className="flex items-center gap-2">
          <span className="text-slate-400 text-xs tracking-[0.14em]">Scroll to explore</span>
          <div className="w-12 h-px bg-slate-500/60" />
        </div>
      </div>
    </section>
  );
}
