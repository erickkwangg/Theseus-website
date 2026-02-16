"use client"

import { useEffect, useState } from "react"

export function OnChainAgentsSection() {
  const [visibleEvents, setVisibleEvents] = useState<number[]>([])
  const [showResponse, setShowResponse] = useState(false)
  const [verifiedStates, setVerifiedStates] = useState<{ [key: number]: boolean }>({})
  const [greenPulseStates, setGreenPulseStates] = useState<{ [key: number]: boolean }>({})
  const [agentCallPending, setAgentCallPending] = useState(true)

  const events = [
    {
      title: "AgentCallQueued",
      desc: "Weather Agent initiated with user request.",
      indent: 0,
    },
    {
      title: "InferenceQueued",
      titleVerified: "Verified",
      desc: "GPT-OSS processes query and returns verified output.",
      indent: 1,
      dual: true,
    },
    {
      title: "ToolCallQueued",
      titleVerified: "Verified",
      desc: 'get_weather("San Francisco") executed and result posted.',
      indent: 1,
      dual: true,
    },
    {
      title: "InferenceQueued",
      titleVerified: "Verified",
      desc: "Model integrates weather data into final response.",
      indent: 1,
      dual: true,
    },
    {
      title: "AgentCallCompleted",
      desc: "Execution finalized, ready for user delivery.",
      indent: 0,
    },
  ]

  const resetAnimation = () => {
    setVisibleEvents([])
    setShowResponse(false)
    setVerifiedStates({})
    setGreenPulseStates({})
    setAgentCallPending(true)
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    const interval = setInterval(() => {
      setVisibleEvents((prev) => {
        if (prev.length < events.length) {
          return [...prev, prev.length]
        }
        clearInterval(interval)
        return prev
      })
    }, 1400)

    return () => clearInterval(interval)
  }, [visibleEvents.length])

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    visibleEvents.forEach((index) => {
      const event = events[index]
      if (event.dual && !verifiedStates[index]) {
        setTimeout(() => {
          setVerifiedStates((prev) => ({ ...prev, [index]: true }))
          setGreenPulseStates((prev) => ({ ...prev, [index]: true }))
          setTimeout(() => {
            setGreenPulseStates((prev) => ({ ...prev, [index]: false }))
          }, 600)
        }, 1200)
      }
    })
  }, [visibleEvents])

  useEffect(() => {
    if (visibleEvents.length === events.length) {
      setAgentCallPending(false)
      setGreenPulseStates((prev) => ({ ...prev, [events.length - 1]: true }))
      setTimeout(() => {
        setGreenPulseStates((prev) => ({ ...prev, [events.length - 1]: false }))
      }, 600)

      const timeout = setTimeout(() => {
        setShowResponse(true)
      }, 800)
      return () => clearTimeout(timeout)
    }
  }, [visibleEvents.length, events.length])

  useEffect(() => {
    if (showResponse) {
      const loopTimeout = setTimeout(() => {
        resetAnimation()
      }, 5000)
      return () => clearTimeout(loopTimeout)
    }
  }, [showResponse])

  return (
    <section className="relative py-24 lg:py-32 px-6 overflow-hidden section-soft-divider">
      <div className="absolute inset-0 soft-grid opacity-15 pointer-events-none" />
      {/* Title Section */}
      <div className="max-w-7xl mx-auto mb-20 text-center relative z-10">
        <h2 className="text-5xl md:text-6xl font-light text-white mb-4 tracking-tight">On-Chain Agents</h2>
        <p className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto">
          Agents powered by SHIP DSL, executed and verified on Theseus Chain.
        </p>
      </div>

      {/* Two Column Layout */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 relative z-10">
        {/* Left Column - IDE Window */}
        <div className="relative">
          <div className="rounded-lg overflow-hidden bg-[#0A0A0C] border border-slate-700/60 shadow-2xl">
            {/* IDE Chrome */}
            <div className="bg-[#111115] px-4 py-2 flex items-center gap-2 border-b border-gray-800/50">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
              </div>
              <div className="ml-4 px-3 py-0.5 bg-[#0A0A0C] rounded text-sm text-gray-400 font-mono">
                weather_agent.ship
              </div>
            </div>

            {/* Code Content */}
            <div className="p-4 font-mono text-sm leading-[1.4] overflow-x-auto">
              <div className="flex">
                {/* Line Numbers */}
                <div className="select-none text-gray-600 pr-3 text-right leading-[1.4]">
                  {Array.from({ length: 30 }, (_, i) => (
                    <div key={i}>{i + 1}</div>
                  ))}
                </div>

                {/* Code */}
                <div className="flex-1">
                  <div className="text-[#4BD3FF]">ship 0.1</div>
                  <div className="mb-2"></div>
                  <div>
                    <span className="text-[#4BD3FF]">agent</span>{" "}
                    <span className="text-[#B794F4]">&quot;Weather Agent&quot;</span>
                  </div>
                  <div>
                    <span className="text-[#4BD3FF]">version</span> <span className="text-[#FFD166]">1</span>
                  </div>
                  <div>
                    <span className="text-[#4BD3FF]">entry</span> <span className="text-[#5AE3FF]">model_main</span>
                  </div>
                  <div>
                    <span className="text-[#4BD3FF]">system</span> <span className="text-[#B794F4]">&quot;&quot;&quot;</span>
                  </div>
                  <div className="pl-4 text-[#B794F4]">
                    You are a concise weather assistant. Use tools when necessary.
                  </div>
                  <div className="mb-2">
                    <span className="text-[#B794F4]">&quot;&quot;&quot;</span>
                  </div>
                  <div className="mb-2"></div>
                  <div>
                    <span className="text-[#4BD3FF]">tools</span> <span className="text-[#FFD166]">{"{"}</span>
                  </div>
                  <div className="pl-4 text-[#B794F4]">{`"""Get the current weather for a city"""`}</div>
                  <div className="pl-4">
                    <span className="text-[#5AE3FF]">get_weather</span>(<span className="text-gray-300">city:</span>{" "}
                    <span className="text-[#4BD3FF]">string</span>, <span className="text-gray-300">unit?:</span>{" "}
                    <span className="text-[#B794F4]">&quot;c&quot;</span> | <span className="text-[#B794F4]">&quot;f&quot;</span>)
                  </div>
                  <div className="mb-2">
                    <span className="text-[#FFD166]">{"}"}</span>
                  </div>
                  <div className="mb-2"></div>
                  <div>
                    <span className="text-[#4BD3FF]">graph</span> <span className="text-[#FFD166]">{"{"}</span>
                  </div>
                  <div className="pl-4 text-gray-500">{`// 1. Agent Entrypoint`}</div>
                  <div className="pl-4">
                    <span className="text-[#5AE3FF]">model_main</span>:{" "}
                    <span className="text-[#5AE3FF]">model_call</span>(<span className="text-[#B794F4]">&quot;gpt-oss&quot;</span>
                    ) <span className="text-[#FFD166]">{"{"}</span>
                  </div>
                  <div className="pl-8">
                    <span className="text-gray-300">next</span> {"->"}{" "}
                    <span className="text-[#5AE3FF]">check_tools</span>
                  </div>
                  <div className="pl-8">
                    <span className="text-gray-300">on_error</span> {"->"} <span className="text-[#5AE3FF]">end</span>
                  </div>
                  <div className="pl-4">
                    <span className="text-[#FFD166]">{"}"}</span>
                  </div>
                  <div className="mb-2"></div>
                  <div className="pl-4 text-gray-500">{`// 2. Check if the model response has tool calls.`}</div>
                  <div className="pl-4">
                    <span className="text-[#5AE3FF]">check_tools</span>:{" "}
                    <span className="text-[#5AE3FF]">has_tool_calls</span> ?{" "}
                    <span className="text-[#5AE3FF]">tool_exec</span> : <span className="text-[#5AE3FF]">end</span>
                  </div>
                  <div className="mb-2"></div>
                  <div className="pl-4 text-gray-500">{`// 3. Execute the tool call.`}</div>
                  <div className="pl-4">
                    <span className="text-[#5AE3FF]">tool_exec</span>: <span className="text-[#5AE3FF]">tool_call</span>{" "}
                    <span className="text-[#FFD166]">{"{"}</span>
                  </div>
                  <div className="pl-8">
                    <span className="text-gray-300">next</span> {"->"}{" "}
                    <span className="text-[#5AE3FF]">model_main</span>
                  </div>
                  <div className="pl-8">
                    <span className="text-gray-300">on_error</span> {"->"} <span className="text-[#5AE3FF]">end</span>
                  </div>
                  <div className="pl-4">
                    <span className="text-[#FFD166]">{"}"}</span>
                  </div>
                  <div>
                    <span className="text-[#FFD166]">{"}"}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Animated Execution Flow */}
        <div className="relative flex flex-col gap-6">
          <svg
            className="absolute inset-0 w-full h-full opacity-30 pointer-events-none"
            viewBox="0 0 600 800"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Connected Blocks Pattern */}
            <g className="animate-pulse" style={{ animationDuration: "4s" }}>
              {/* Block 1 */}
              <rect
                x="80"
                y="120"
                width="60"
                height="60"
                rx="8"
                stroke="url(#gradient1)"
                strokeWidth="2"
                fill="#0A0A0C"
              />
              <path d="M110 135 L110 145 M95 150 L125 150" stroke="#4BD3FF" strokeWidth="1.5" opacity="0.6" />

              {/* Block 2 */}
              <rect
                x="220"
                y="160"
                width="60"
                height="60"
                rx="8"
                stroke="url(#gradient1)"
                strokeWidth="2"
                fill="#0A0A0C"
              />
              <path d="M250 175 L250 185 M235 190 L265 190" stroke="#4BD3FF" strokeWidth="1.5" opacity="0.6" />

              {/* Block 3 */}
              <rect
                x="380"
                y="200"
                width="60"
                height="60"
                rx="8"
                stroke="url(#gradient1)"
                strokeWidth="2"
                fill="#0A0A0C"
              />
              <path d="M410 215 L410 225 M395 230 L425 230" stroke="#4BD3FF" strokeWidth="1.5" opacity="0.6" />

              {/* Block 4 */}
              <rect
                x="220"
                y="340"
                width="60"
                height="60"
                rx="8"
                stroke="url(#gradient1)"
                strokeWidth="2"
                fill="#0A0A0C"
              />
              <path d="M250 355 L250 365 M235 370 L265 370" stroke="#4BD3FF" strokeWidth="1.5" opacity="0.6" />

              {/* Block 5 */}
              <rect
                x="380"
                y="420"
                width="60"
                height="60"
                rx="8"
                stroke="url(#gradient1)"
                strokeWidth="2"
                fill="#0A0A0C"
              />
              <path d="M410 435 L410 445 M395 450 L425 450" stroke="#4BD3FF" strokeWidth="1.5" opacity="0.6" />

              {/* Block 6 */}
              <rect
                x="80"
                y="520"
                width="60"
                height="60"
                rx="8"
                stroke="url(#gradient1)"
                strokeWidth="2"
                fill="#0A0A0C"
              />
              <path d="M110 535 L110 545 M95 550 L125 550" stroke="#4BD3FF" strokeWidth="1.5" opacity="0.6" />
            </g>

            {/* Connecting Lines (Chain Links) */}
            <g stroke="#4BD3FF" strokeWidth="1.5" opacity="0.3" strokeDasharray="4 4">
              <path
                d="M140 150 L220 180"
                className="animate-pulse"
                style={{ animationDuration: "3s", animationDelay: "0s" }}
              />
              <path
                d="M280 190 L380 220"
                className="animate-pulse"
                style={{ animationDuration: "3s", animationDelay: "0.5s" }}
              />
              <path
                d="M410 260 L250 340"
                className="animate-pulse"
                style={{ animationDuration: "3s", animationDelay: "1s" }}
              />
              <path
                d="M280 370 L380 420"
                className="animate-pulse"
                style={{ animationDuration: "3s", animationDelay: "1.5s" }}
              />
              <path
                d="M380 450 L140 540"
                className="animate-pulse"
                style={{ animationDuration: "3s", animationDelay: "2s" }}
              />
            </g>

            {/* Network Nodes */}
            <g>
              <circle
                cx="110"
                cy="150"
                r="4"
                fill="#5AE3FF"
                className="animate-pulse"
                style={{ animationDuration: "2s" }}
              >
                <animate attributeName="opacity" values="0.3;1;0.3" dur="2s" repeatCount="indefinite" />
              </circle>
              <circle
                cx="250"
                cy="190"
                r="4"
                fill="#5AE3FF"
                className="animate-pulse"
                style={{ animationDuration: "2s", animationDelay: "0.4s" }}
              >
                <animate attributeName="opacity" values="0.3;1;0.3" dur="2s" repeatCount="indefinite" begin="0.4s" />
              </circle>
              <circle
                cx="410"
                cy="230"
                r="4"
                fill="#5AE3FF"
                className="animate-pulse"
                style={{ animationDuration: "2s", animationDelay: "0.8s" }}
              >
                <animate attributeName="opacity" values="0.3;1;0.3" dur="2s" repeatCount="indefinite" begin="0.8s" />
              </circle>
              <circle
                cx="250"
                cy="370"
                r="4"
                fill="#5AE3FF"
                className="animate-pulse"
                style={{ animationDuration: "2s", animationDelay: "1.2s" }}
              >
                <animate attributeName="opacity" values="0.3;1;0.3" dur="2s" repeatCount="indefinite" begin="1.2s" />
              </circle>
              <circle
                cx="410"
                cy="450"
                r="4"
                fill="#5AE3FF"
                className="animate-pulse"
                style={{ animationDuration: "2s", animationDelay: "1.6s" }}
              >
                <animate attributeName="opacity" values="0.3;1;0.3" dur="2s" repeatCount="indefinite" begin="1.6s" />
              </circle>
            </g>

            {/* Gradient Definitions */}
            <defs>
              <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#4BD3FF" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#5AE3FF" stopOpacity="0.2" />
              </linearGradient>
            </defs>
          </svg>

          {/* User Message */}
          <div className="opacity-100 translate-y-0 relative z-10">
            <div className="flex items-start gap-3">
              {/* User Avatar */}
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-semibold text-sm shadow-lg shadow-purple-500/30">
                A
              </div>
              <div className="flex flex-col gap-1">
                <div className="text-sm text-gray-400 font-medium">Alice</div>
                <div className="bg-gray-800/50 rounded-2xl rounded-tl-sm px-5 py-3 max-w-md border border-gray-700/50">
                  <p className="text-white">What&apos;s the weather in San Francisco?</p>
                </div>
              </div>
            </div>
          </div>

          {/* Event Timeline */}
          <div className="space-y-2 relative z-10">
            {visibleEvents.map((index) => {
              const event = events[index]
              const isVerified = verifiedStates[index]
              const isFirstEvent = index === 0
              const isPending = isFirstEvent ? agentCallPending : event.dual && !isVerified
              const hasGreenPulse = greenPulseStates[index]

              return (
                <div
                  key={index}
                  className="animate-in fade-in slide-in-from-bottom-2 duration-400"
                  style={{
                    animationDelay: `${index * 40}ms`,
                    marginLeft: event.indent === 1 ? "1.5rem" : "0",
                  }}
                >
                  <div
                    className={`bg-[#0A0A0C] border rounded-lg p-3 shadow-lg relative overflow-hidden transition-all duration-500 ${
                      isPending ? "border-amber-400/40 shadow-amber-400/10" : "border-[#4BD3FF]/50 shadow-[#4BD3FF]/15"
                    }`}
                  >
                    {isPending && (
                      <div className="absolute inset-0 bg-gradient-to-r from-amber-400/5 via-amber-400/10 to-amber-400/5 animate-pulse"></div>
                    )}

                    {hasGreenPulse && (
                      <div className="absolute inset-0 bg-gradient-to-r from-green-400/20 via-green-400/30 to-green-400/20 animate-pulse"></div>
                    )}

                    <div
                      className={`absolute left-0 top-0 bottom-0 w-0.5 transition-all duration-500 ${
                        hasGreenPulse
                          ? "bg-gradient-to-b from-green-400 to-green-500"
                          : isPending
                            ? "bg-gradient-to-b from-amber-400 to-amber-500 animate-pulse"
                            : "bg-gradient-to-b from-[#5AE3FF] to-[#4BD3FF]"
                      }`}
                    ></div>
                    <div className="pl-3 relative z-10">
                      <div
                        className={`font-mono text-xs font-semibold mb-0.5 tracking-wide transition-all duration-500 ${
                          hasGreenPulse ? "text-green-400" : isPending ? "text-amber-400" : "text-[#4BD3FF]"
                        }`}
                      >
                        {event.dual ? (
                          <span className="flex items-center gap-2">
                            <span>{event.title}</span>
                            {isVerified && (
                              <span className="animate-in fade-in slide-in-from-left-2 duration-300 flex items-center gap-1">
                                <span className="text-gray-500">→</span>
                                <span className="text-[#4BD3FF]">{event.titleVerified}</span>
                              </span>
                            )}
                          </span>
                        ) : (
                          event.title
                        )}
                      </div>
                      <div className="text-gray-400 text-xs leading-relaxed">{event.desc}</div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Final Response */}
          {showResponse && (
            <div className="flex items-start gap-3 animate-in slide-in-from-bottom duration-500 ease-out relative z-10">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-[#4BD3FF] to-[#5AE3FF] flex items-center justify-center shadow-lg shadow-[#4BD3FF]/30">
                <svg
                  className="w-5 h-5 text-black"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <div className="flex flex-col gap-1">
                <div className="text-sm text-[#4BD3FF] font-medium">Weather Agent</div>
                <div className="bg-gradient-to-br from-[#4BD3FF]/10 to-[#5AE3FF]/5 border border-[#4BD3FF]/30 rounded-2xl rounded-tl-sm px-6 py-4 max-w-md shadow-lg shadow-[#4BD3FF]/10">
                  <div className="flex items-center gap-3">
                    <div className="text-4xl">☀️</div>
                    <div>
                      <p className="text-white font-medium">San Francisco: 18°C and sunny.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
