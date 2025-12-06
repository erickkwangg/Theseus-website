import commitmentIcon from "@/assets/icon/commitment.svg";
import machineIcon from "@/assets/icon/machine.svg";
import treesIcon from "@/assets/icon/trees.svg";
import Image from "next/image";
import Link from "next/link";
import ScrollReveal from "@/components/ScrollReveal";
import CountUp from "@/components/CountUp";

const features = [
  {
    icon: machineIcon,
    title: "AIVM",
    subtitle: "AI Virtual Machine",
    description: "Full stateful agents as smart contracts, without the private keys that would control them. Not your weights, not your brain.",
    href: "/docs/aivm",
  },
  {
    icon: commitmentIcon,
    title: "Tensor Commits",
    subtitle: "Verification Protocol",
    description: "<1% proof generation overhead. <0.1% verification time. The most efficient verification for shared-state AI.",
    href: "/docs/tensor-commits",
  },
  {
    icon: treesIcon,
    title: "Terkle Trees",
    subtitle: "Data Structures",
    description: "Merkle Trees generalized to tensor operations. Efficient cryptographic commitments for multi-dimensional AI data.",
    href: "/docs/tensor-commits",
  },
];

export default function Features() {
  return (
    <section className="bg-black text-white py-16 lg:py-24 grid-bg" id="about">
      {/* Section divider */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-800 to-transparent mb-16 lg:mb-24" />
      
      <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6">
        {/* Big stat + tagline */}
        <ScrollReveal>
          <div className="text-center mb-16 lg:mb-20">
            <div className="mb-4">
              <CountUp 
                end={13} 
                suffix="B" 
                className="text-7xl sm:text-8xl lg:text-9xl font-extralight tracking-tight gradient-text"
              />
            </div>
            <p className="text-gray-500 text-sm sm:text-base uppercase tracking-widest mb-6">
              AI agents by 2028
            </p>
            <h2 className="text-2xl sm:text-3xl lg:text-5xl font-light max-w-2xl mx-auto">
              Theseus gives them <span className="text-blue-400">personhood</span>.
            </h2>
          </div>
        </ScrollReveal>

        {/* Feature cards - linked to docs */}
        <div className="grid sm:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <ScrollReveal key={index} delay={index + 1}>
              <Link href={feature.href} className="block h-full">
                <div className="group relative p-8 lg:p-10 rounded-xl border border-gray-800 
                               bg-gradient-to-br from-blue-950/30 via-gray-950/50 to-black
                               card-tilt hover:border-blue-500/40 hover:from-blue-950/40 h-full cursor-pointer
                               transition-all duration-300">
                  <div className="flex flex-col items-center text-center h-full">
                    <Image 
                      src={feature.icon} 
                      alt={feature.title} 
                      className="size-14 lg:size-16 mb-5 opacity-80 group-hover:opacity-100 
                                 group-hover:scale-110 transition-all duration-300" 
                    />
                    <h3 className="text-xl lg:text-2xl font-medium mb-1 group-hover:text-blue-400 transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-500 uppercase tracking-wider mb-4">
                      {feature.subtitle}
                    </p>
                    <p className="text-gray-400 text-sm sm:text-base leading-relaxed mb-4">
                      {feature.description}
                    </p>
                    <span className="text-blue-400/0 group-hover:text-blue-400/100 text-sm transition-all duration-300 mt-auto">
                      Learn more →
                    </span>
                  </div>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
