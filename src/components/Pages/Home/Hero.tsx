import Image from "next/image";
import { Button } from "@/components/ui/button";
import heroImg from "@/assets/hero.png";
import Header from "./Header";
import InteractiveTooltip from "./InteractiveTooltip";
import Particles from "./Particles";

export default function Hero() {
  return (
    <section className="custom-hero-bg text-white relative overflow-hidden">
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
              <span className="gradient-text">AI Personhood</span>
            </h1>
            <div className="text-gray-400 text-base lg:text-lg max-w-md fade-in-up-delay-1">
              The first blockchain purpose-built for{" "}
              <InteractiveTooltip
                word="AI Persons"
                title="AI Person"
                description="Think of it like giving AI a social security number and a license to think freely. An AI person is an autonomous entity with true agency and independence, capable of owning assets, making decisions, and persisting without human control or private keys. These entities represent a new form of personhood in the digital age."
              >
                AI Persons
              </InteractiveTooltip>
              . Enabling a new class of individuals to contribute{" "}
              <a href="#market" className="underline hover:text-white transition-colors text-blue-400">
                trillions
              </a>{" "}
              to the global economy.
            </div>
          </div>

          <div className="fade-in-up-delay-2">
            <a href="https://docsend.com/view/p9fw7vh3ygrrnwgg" target="_blank" rel="noopener noreferrer">
              <Button className="rounded-none bg-white text-black hover:bg-gray-200 px-6 lg:px-8 py-2 lg:py-3 text-sm lg:text-base glow-button button-press accent-button border border-transparent">
                DOWNLOAD THE WHITEPAPER
              </Button>
            </a>
            <p className="font-semibold text-gray-500 uppercase tracking-wider mt-4 text-xs">
              PASSWORD PROTECTED
            </p>
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
    </section>
  );
}
