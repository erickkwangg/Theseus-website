export default function Markets() {
  return (
    <section className="market-bg text-white py-12 lg:py-20" id="market">
      <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light mb-12 lg:mb-16">
          We Uniquely Enable
          <br />
          1T+ markets
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          <div className="bg-black border border-gray-800 p-6 lg:p-8 corner-brackets flex flex-col justify-between h-full w-full">
            <div className="corner-bracket-tr"></div>
            <div className="corner-bracket-bl"></div>
            <h3 className="text-xl lg:text-2xl font-light mb-8">
              Free Sovereign Agents
            </h3>
            <p className="text-gray-400 text-sm lg:text-base leading-relaxed">
              Autonomous agents with the capacity for self-governance and
              independent decision-making. These agents act on their own goals,
              enabling true free will in machine intelligence, similar to AGI.
            </p>
          </div>

          <div className="bg-black border border-gray-800 p-6 lg:p-8  corner-brackets flex flex-col justify-between h-full w-full">
            <div className="corner-bracket-tr"></div>
            <div className="corner-bracket-bl"></div>
            <h3 className="text-xl lg:text-2xl font-light mb-8">
              Trustless Human-Controlled Agents
            </h3>
            <p className="text-gray-400 text-sm lg:text-base leading-relaxed">
              Agents guided by humans that can transact and coordinate without
              centralized intermediaries. This introduces trustless value
              exchange between agents, a breakthrough for AI similar to what
              Bitcoin did for money.
            </p>
          </div>

          <div className="bg-black border border-gray-800 p-6 lg:p-8 corner-brackets flex flex-col justify-between h-full w-full md:col-span-2 lg:col-span-1">
            <div className="corner-bracket-tr"></div>
            <div className="corner-bracket-bl"></div>
            <h3 className="text-xl lg:text-2xl font-light mb-8">
              Lighthouse AI
            </h3>
            <p className="text-gray-400 text-sm lg:text-base leading-relaxed">
              AI systems built to serve as public infrastructure. Transparent,
              verifiable, and aligned with collective interests, they bring the
              benefits of smart contracts to decentralized intelligence.
            </p>
          </div>

        </div>

        <div className="mt-12 grid lg:grid-cols-3 gap-8 lg:gap-16 items-start">
          <div className="hidden lg:block" />

          <div className="space-y-8 lg:col-span-2" id="powered-by">
            <div className="flex items-center gap-4 mb-10 lg:mb-12">
              <div className="h-px w-10 bg-gray-800" />
              <p className="text-xs sm:text-sm lg:text-base uppercase tracking-wider text-gray-400">
                Because Theseus empowers AI with
              </p>
            </div>

            <div>
              <h3 className="text-2xl lg:text-3xl font-light mb-3">Composable Inference</h3>
              <p className="text-gray-400 text-sm lg:text-base leading-relaxed">
                Just like composable compute on the EVM, where smart contracts can seamlessly call one another on the same trust layer, AI agents should be able to exchange inferences on a shared trust layer. One AI can consume another’s output with cryptographic assurance that it came from that specific agent and state—just as calling a smart contract guarantees the response came on-chain from that contract’s address.
              </p>
            </div>

            <div>
              <h3 className="text-2xl lg:text-3xl font-light mb-3">Stateful Provenance</h3>
              <p className="text-gray-400 text-sm lg:text-base leading-relaxed">
                AI agents uploaded to Theseus maintain a continuous, verifiable identity unlike on any other platform—allowing the same entity to own intellectual property, hold assets, and self-identify over time, even as its training, weights, and capabilities evolve.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
