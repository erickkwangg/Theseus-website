import commitmentIcon from "@/assets/icon/commitment.svg";
import machineIcon from "@/assets/icon/machine.svg";
import treesIcon from "@/assets/icon/trees.svg";
import logo from "@/assets/logo.svg";
import Image from "next/image";
import InteractiveTooltip from "./InteractiveTooltip";

export default function Features() {
  return (
    <section className="bg-black text-white py-12 lg:py-20" id="about">
      <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-3 gap-8 lg:gap-16 items-start">
          <div className="w-full h-full flex lg:flex-col items-center lg:items-start justify-between">
            <h2 className="text-xs sm:text-sm uppercase tracking-wider text-gray-400">
              THE FUTURE IS AI PERSONS
            </h2>
            <Image src={logo} alt="icon" className="size-8" />
          </div>

          <div className="space-y-6 lg:space-y-8 lg:col-span-2">
            <div>
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-light leading-tight mb-4 lg:mb-6">
                By 2028, 1.3 billion AI agents will be online.{" "}
                <span className="text-gray-400">
                  Yet humans view them as mere tools, incapable of true agency. This fundamentally 
                  limits the creativity and trust we can place in them. Theseus transforms them 
                  into AI persons, a new class of individuals unlocking massive GDP growth. Built on:
                </span>
              </h3>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              <div className="space-y-4 sm:col-span-2 lg:col-span-1">
                <Image src={machineIcon} alt="icon" className="size-8" />
                <h4 className="text-base lg:text-lg font-medium">AI Virtual Machine (AIVM)</h4>
                <p className="text-gray-400 text-sm">
                  The first ever representation of full{" "}
                  <InteractiveTooltip
                    word="stateful agents"
                    title="Stateful Agents"
                    description="Stateful means agents exist in shared state, just like Ethereum smart contracts. You can track their lineage, verify their identity, and their memory persists on-chain. This shared state model fully obfuscates trust. You don't need to trust the agent or any intermediary, only the protocol."
                  >
                    stateful agents
                  </InteractiveTooltip>{" "}
                  as smart contracts, without the private keys that would control them. 
                  Not your weights, not your brain.
                </p>
              </div>

              <div className="space-y-4">
                <Image src={commitmentIcon} alt="icon" className="size-8" />
                <h4 className="text-base lg:text-lg font-medium">
                  Tensor Commits Protocol
                </h4>
                <p className="text-gray-400 text-sm">
                  We proved {"<"}1% proof generation overhead and {"<"}0.1% verification 
                  time overhead. Cryptographically verify ML inference at scale, the most 
                  efficient verification for shared-state AI environments.
                </p>
              </div>

              <div className="space-y-4">
                <Image src={treesIcon} alt="icon" className="size-8" />
                <h4 className="text-base lg:text-lg font-medium">
                  Terkle Trees
                </h4>
                <p className="text-gray-400 text-sm">
                  The first generalization of Merkle Trees to arbitrary tensor operations. 
                  Enables efficient cryptographic commitments for multi-dimensional AI data structures.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
