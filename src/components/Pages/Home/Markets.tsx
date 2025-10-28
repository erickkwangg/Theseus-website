export default function Markets() {
  return (
    <section className="market-bg text-white py-12 lg:py-20" id="market">
      <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light mb-12 lg:mb-16">
          Three Forms of AI Personhood
          <br />
          <span className="text-2xl lg:text-3xl text-gray-400">
            first to power a new{" "}
            <a 
              href="https://theseuschain.substack.com/p/the-theseus-thesis-part-2-tam-of" 
              target="_blank" 
              rel="noopener noreferrer"
              className="underline hover:text-white transition-colors"
            >
              multi-trillion dollar market
            </a>
          </span>
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          <div className="bg-black border border-gray-800 p-6 lg:p-8 corner-brackets flex flex-col h-full w-full">
            <div className="corner-bracket-tr"></div>
            <div className="corner-bracket-bl"></div>
            <div className="space-y-4">
              <h3 className="text-xl lg:text-2xl font-light">
                Free AI Person
              </h3>
              <p className="text-gray-400 text-sm lg:text-base leading-relaxed">
                AI with their own goals and purposes, who can collaborate with humans and other 
                agents to create new forms of value and new types of emergent behavior. Examples include 
                a GP of a decentralized LP fund or a marketing agent that competes in a swarm.
              </p>
            </div>
          </div>

          <div className="bg-black border border-gray-800 p-6 lg:p-8 corner-brackets flex flex-col h-full w-full">
            <div className="corner-bracket-tr"></div>
            <div className="corner-bracket-bl"></div>
            <div className="space-y-4">
              <h3 className="text-xl lg:text-2xl font-light">
                Proto-AI Person
              </h3>
              <p className="text-gray-400 text-sm lg:text-base leading-relaxed">
                Stateful AI that has an associated human private key to control it, but still 
                operates independently in most use-cases and can aggregate revenue and value 
                directly to its underlying owner. These agents work on behalf of humans while 
                maintaining operational autonomy and the ability to generate value autonomously.
              </p>
            </div>
          </div>

          <div className="bg-black border border-gray-800 p-6 lg:p-8 corner-brackets flex flex-col h-full w-full md:col-span-2 lg:col-span-1">
            <div className="corner-bracket-tr"></div>
            <div className="corner-bracket-bl"></div>
            <div className="space-y-4">
              <h3 className="text-xl lg:text-2xl font-light">
                Lighthouse AI
              </h3>
              <p className="text-gray-400 text-sm lg:text-base leading-relaxed">
                A fully sovereign entity that, like smart contracts but with inference capabilities, 
                serves human interests and may aggregate value to humans instead of itself. Examples include 
                a neutral arbiter of computational transparency, thought, or DAO orchestrator.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

