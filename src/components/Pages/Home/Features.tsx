import commitmentIcon from "@/assets/icon/commitment.svg";
import machineIcon from "@/assets/icon/machine.svg";
import treesIcon from "@/assets/icon/trees.svg";
import logo from "@/assets/logo.svg";
import Image from "next/image";

export default function Features() {
  return (
    <section className="bg-black text-white py-12 lg:py-20" id="about">
      <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-3 gap-8 lg:gap-16 items-start">
          <div className="w-full h-full flex lg:flex-col items-center lg:items-start justify-between">
            <h2 className="text-xs sm:text-sm uppercase tracking-wider text-gray-400">
              THE AGI COMPUTER
            </h2>
            <Image src={logo} alt="icon" className="size-8" />
          </div>

          <div className="space-y-6 lg:space-y-8 lg:col-span-2">
            <div>
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-light leading-tight mb-4 lg:mb-6">
                Theseus is a layer-1 blockchain with a completely new runtime
                designed for AI.{" "}
                <span className="text-gray-400">
                  It starts with the premise that sovereignty requires no
                  private key ownership, so we allow agents to be hosted
                  similarly to traditional smart contracts. We also add on
                  numerous technical innovations, such as:
                </span>
              </h3>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              <div className="space-y-4">
                <Image src={commitmentIcon} alt="icon" className="size-8" />
                <h4 className="text-base lg:text-lg font-medium">
                  Tensor Commitments
                </h4>
                <p className="text-gray-400 text-sm">
                  The most efficient way to verify inference in a public shared
                  state environment
                </p>
              </div>

              <div className="space-y-4">
                <Image src={treesIcon} alt="icon" className="size-8" />
                <h4 className="text-base lg:text-lg font-medium">
                  Terkle Trees
                </h4>
                <p className="text-gray-400 text-sm">
                  The first generalization of Verkle Trees to arbitrary tensor
                  operations
                </p>
              </div>

              <div className="space-y-4 sm:col-span-2 lg:col-span-1">
                <Image src={machineIcon} alt="icon" className="size-8" />
                <h4 className="text-base lg:text-lg font-medium">The AIVM</h4>
                <p className="text-gray-400 text-sm">
                  Dedicated virtual machine specifically with ML opcodes and a
                  method to translate raw neural inference to strict on-chain
                  actions
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
