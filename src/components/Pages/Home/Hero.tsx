import Image from "next/image";
import { Button } from "@/components/ui/button";
import heroImg from "@/assets/hero.png";
import Header from "./Header";
import InteractiveTooltip from "./InteractiveTooltip";
export default function Hero() {
  return (
    <section className="custom-hero-bg text-white relative overflow-hidden">
      {/* Hero */}
      <Header />
      <div className="w-full grid lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-[80vh]">
        <div className="space-y-6 lg:space-y-8 pl-6 lg:pl-12 pt-20">
          <div className="space-y-4">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-light leading-tight">
              Build. Verify.
              <br />
              Liberate
              <br />
              Intelligence.
            </h1>
            <div className="text-gray-400 text-base lg:text-lg max-w-md">
              Theseus is the only platform to enable{" "}
              <InteractiveTooltip
                word="Stateful"
                title="Stateful"
                description="Allows for trustless inference and translation of inference into deterministic bytecode."
              >
                Stateful
              </InteractiveTooltip>{" "}
              <InteractiveTooltip
                word="Sovereign"
                title="Sovereign"
                description="Means Al can exist and perform inference without human owners (no private key)."
              >
                Sovereign
              </InteractiveTooltip>{" "}
              Intelligence
            </div>
          </div>

          <div>
            <a href="https://docsend.com/view/p9fw7vh3ygrrnwgg" target="_blank" rel="noopener noreferrer">
              <Button className="rounded-none bg-white text-black hover:bg-gray-200 px-6 lg:px-8 py-2 lg:py-3 text-sm lg:text-base">
                DOWNLOAD THE WHITEPAPER
              </Button>
            </a>
            <p className="font-semibold text-gray-500 uppercase tracking-wider mt-4">
              PASSWORD PROTECTED
            </p>
          </div>
        </div>
        <div className="flex items-end justify-end h-full flex-col">
          <Image
            src={heroImg}
            alt="3D Shapes of logo"
            width={800}
            height={800}
            className="w-full"
            priority
          />
        </div>
      </div>
    </section>
  );
}
