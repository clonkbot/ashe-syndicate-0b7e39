import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useAccount, useBalance } from 'wagmi'
import { formatEther } from 'viem'

function App() {
  const { address, isConnected } = useAccount()
  const { data: balance } = useBalance({ address })

  return (
    <div className="min-h-screen bg-[#0a0612] text-white overflow-hidden relative">
      {/* Animated background gradient */}
      <div className="fixed inset-0 bg-gradient-to-br from-[#1a0a2e] via-[#0a0612] to-[#16082a] -z-10" />
      <div className="fixed inset-0 opacity-30 -z-10" style={{
        backgroundImage: `radial-gradient(ellipse 80% 50% at 50% -20%, rgba(120, 50, 180, 0.4), transparent),
                          radial-gradient(ellipse 60% 40% at 80% 100%, rgba(90, 20, 140, 0.3), transparent)`
      }} />

      {/* Noise texture overlay */}
      <div className="fixed inset-0 opacity-[0.03] -z-10 pointer-events-none"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")` }}
      />

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-[#0a0612]/70 border-b border-purple-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4 flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-purple-500 to-purple-900 flex items-center justify-center text-lg sm:text-xl shadow-lg shadow-purple-900/50">
              🐱
            </div>
            <span className="font-bold text-base sm:text-lg tracking-tight">
              <span className="text-purple-300">ASHE</span>
              <span className="text-gray-500 ml-1 hidden sm:inline">SYNDICATE</span>
            </span>
          </div>
          <ConnectButton.Custom>
            {({ account, chain, openAccountModal, openChainModal, openConnectModal, mounted }) => {
              const ready = mounted
              const connected = ready && account && chain

              return (
                <div
                  {...(!ready && {
                    'aria-hidden': true,
                    style: {
                      opacity: 0,
                      pointerEvents: 'none',
                      userSelect: 'none',
                    },
                  })}
                >
                  {(() => {
                    if (!connected) {
                      return (
                        <button
                          onClick={openConnectModal}
                          className="px-3 sm:px-5 py-2 sm:py-2.5 bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-500 hover:to-purple-700 rounded-lg font-semibold text-xs sm:text-sm transition-all duration-300 shadow-lg shadow-purple-900/50 hover:shadow-purple-800/60 hover:scale-105"
                        >
                          Join the Syndicate
                        </button>
                      )
                    }

                    if (chain.unsupported) {
                      return (
                        <button
                          onClick={openChainModal}
                          className="px-3 sm:px-5 py-2 sm:py-2.5 bg-red-600 hover:bg-red-500 rounded-lg font-semibold text-xs sm:text-sm transition-all"
                        >
                          Wrong Network
                        </button>
                      )
                    }

                    return (
                      <button
                        onClick={openAccountModal}
                        className="px-3 sm:px-5 py-2 sm:py-2.5 bg-purple-900/50 hover:bg-purple-800/60 border border-purple-700/50 rounded-lg font-medium text-xs sm:text-sm transition-all flex items-center gap-2"
                      >
                        <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                        <span className="hidden sm:inline">{account.displayName}</span>
                        <span className="sm:hidden">{account.address.slice(0, 4)}...{account.address.slice(-3)}</span>
                      </button>
                    )
                  })()}
                </div>
              )
            }}
          </ConnectButton.Custom>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-20 sm:pt-24">
        {/* Hero Section */}
        <section className="relative min-h-[90vh] flex flex-col items-center justify-center px-4 sm:px-6">
          {/* Glowing orb behind the cat */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-purple-600/20 rounded-full blur-[100px] sm:blur-[150px] animate-pulse" />

          {/* Cat Image Container */}
          <div className="relative z-10 mb-6 sm:mb-8 group">
            <div className="w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 rounded-full bg-gradient-to-br from-purple-600/30 to-purple-900/30 flex items-center justify-center border-2 border-purple-500/30 shadow-2xl shadow-purple-900/50 backdrop-blur-sm transition-transform duration-700 group-hover:scale-105">
              <div className="text-7xl sm:text-8xl md:text-9xl animate-float">🐱</div>
            </div>
            {/* Orbiting particles */}
            <div className="absolute inset-0 animate-spin-slow">
              <div className="absolute top-0 left-1/2 w-2 h-2 sm:w-3 sm:h-3 bg-purple-400 rounded-full shadow-lg shadow-purple-400/50" />
            </div>
            <div className="absolute inset-0 animate-spin-slower">
              <div className="absolute bottom-0 right-0 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-purple-300 rounded-full shadow-lg shadow-purple-300/50" />
            </div>
          </div>

          {/* Title */}
          <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black text-center mb-4 sm:mb-6 tracking-tighter">
            <span className="bg-gradient-to-r from-purple-300 via-white to-purple-300 bg-clip-text text-transparent">
              ASHE
            </span>
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-purple-300 font-light tracking-widest uppercase mb-6 sm:mb-8 text-center">
            The Syndicate Cat
          </p>

          {/* Tagline */}
          <p className="max-w-xs sm:max-w-lg md:max-w-2xl text-center text-gray-400 text-sm sm:text-base md:text-lg leading-relaxed mb-8 sm:mb-12 px-4">
            In the shadows of the crypto streets, one cat runs the show.
            <span className="text-purple-400"> Calm. Clever. Always one step ahead.</span>
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto px-4 sm:px-0">
            {!isConnected ? (
              <ConnectButton.Custom>
                {({ openConnectModal, mounted }) => (
                  <button
                    onClick={openConnectModal}
                    disabled={!mounted}
                    className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-500 hover:to-purple-700 rounded-xl font-bold text-base sm:text-lg transition-all duration-300 shadow-xl shadow-purple-900/50 hover:shadow-purple-800/60 hover:scale-105 hover:-translate-y-1"
                  >
                    🔮 Join the Syndicate
                  </button>
                )}
              </ConnectButton.Custom>
            ) : (
              <div className="text-center">
                <div className="inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-3 sm:py-4 bg-purple-900/30 border border-purple-700/50 rounded-xl backdrop-blur-sm">
                  <span className="w-2 h-2 sm:w-3 sm:h-3 bg-green-400 rounded-full animate-pulse" />
                  <span className="text-purple-300 text-sm sm:text-base">You&apos;re in the Syndicate</span>
                </div>
                {balance && (
                  <p className="mt-3 sm:mt-4 text-gray-500 text-xs sm:text-sm">
                    Balance: <span className="text-purple-400 font-mono">{parseFloat(formatEther(balance.value)).toFixed(4)} {balance.symbol}</span>
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-8 sm:bottom-12 left-1/2 -translate-x-1/2 animate-bounce">
            <div className="w-5 h-8 sm:w-6 sm:h-10 border-2 border-purple-500/50 rounded-full flex justify-center pt-2">
              <div className="w-1 h-2 bg-purple-400 rounded-full" />
            </div>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-16 sm:py-24 md:py-32 px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Decorative line */}
              <div className="absolute left-0 sm:left-4 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-purple-500 to-transparent" />

              <div className="space-y-8 sm:space-y-12 pl-6 sm:pl-12">
                <div className="relative">
                  <div className="absolute -left-6 sm:-left-12 top-1 w-2 h-2 sm:w-3 sm:h-3 bg-purple-500 rounded-full shadow-lg shadow-purple-500/50" />
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4">The Legend</h2>
                  <p className="text-gray-400 text-sm sm:text-base md:text-lg leading-relaxed">
                    They say Ashe didn&apos;t join the syndicate… <span className="text-purple-400 font-semibold">he built it</span>. From secret meme deals to moon missions, this smooth-talking feline runs the crypto alleyways with style and confidence.
                  </p>
                </div>

                <div className="relative">
                  <div className="absolute -left-6 sm:-left-12 top-1 w-2 h-2 sm:w-3 sm:h-3 bg-purple-500 rounded-full shadow-lg shadow-purple-500/50" />
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4">The Mastermind</h2>
                  <p className="text-gray-400 text-sm sm:text-base md:text-lg leading-relaxed">
                    Nothing escapes his watch, and every move he makes sends ripples through the blockchain. Calm, clever, and always one step ahead, Ashe gathers a loyal crew of meme lovers, traders, and dreamers.
                  </p>
                </div>

                <div className="relative">
                  <div className="absolute -left-6 sm:-left-12 top-1 w-2 h-2 sm:w-3 sm:h-3 bg-purple-500 rounded-full shadow-lg shadow-purple-500/50" />
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4">The Mission</h2>
                  <p className="text-gray-400 text-sm sm:text-base md:text-lg leading-relaxed">
                    The power of <span className="text-purple-400 font-semibold">community and chaos</span>. With Ashe leading the way, the syndicate grows stronger every day. This isn&apos;t just a meme — it&apos;s a movement.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
              {[
                { label: 'Network', value: 'BASE', icon: '⚡' },
                { label: 'Status', value: 'ACTIVE', icon: '🟢' },
                { label: 'Members', value: '∞', icon: '👥' },
                { label: 'Vibes', value: 'IMMACULATE', icon: '✨' },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="group bg-purple-950/30 border border-purple-800/30 rounded-xl sm:rounded-2xl p-4 sm:p-6 backdrop-blur-sm hover:bg-purple-900/30 hover:border-purple-700/50 transition-all duration-300 hover:scale-105"
                >
                  <div className="text-2xl sm:text-3xl mb-2 sm:mb-3 group-hover:scale-110 transition-transform">{stat.icon}</div>
                  <div className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-xs sm:text-sm text-gray-500 uppercase tracking-wider">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Syndicate Benefits */}
        <section className="py-16 sm:py-24 md:py-32 px-4 sm:px-6">
          <div className="max-w-5xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-4 sm:mb-6 bg-gradient-to-r from-purple-400 to-purple-200 bg-clip-text text-transparent">
              Why Join the Syndicate?
            </h2>
            <p className="text-gray-400 text-sm sm:text-base md:text-lg mb-10 sm:mb-16 max-w-2xl mx-auto px-4">
              The crypto underworld rewards those who believe. Connect your wallet and become part of something bigger.
            </p>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {[
                {
                  title: 'Community',
                  desc: 'Join a crew of believers, dreamers, and degens who ride together',
                  icon: '🤝',
                },
                {
                  title: 'Chaos',
                  desc: 'In a world of order, we thrive in beautiful, profitable chaos',
                  icon: '🌀',
                },
                {
                  title: 'Moon Missions',
                  desc: 'Every great journey starts with a single transaction on Base',
                  icon: '🌙',
                },
              ].map((benefit) => (
                <div
                  key={benefit.title}
                  className="group relative bg-gradient-to-br from-purple-950/50 to-purple-900/20 border border-purple-800/30 rounded-xl sm:rounded-2xl p-6 sm:p-8 text-left hover:border-purple-600/50 transition-all duration-500"
                >
                  <div className="text-4xl sm:text-5xl mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300">{benefit.icon}</div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 sm:mb-3">{benefit.title}</h3>
                  <p className="text-gray-400 text-sm sm:text-base leading-relaxed">{benefit.desc}</p>
                  <div className="absolute inset-0 rounded-xl sm:rounded-2xl bg-gradient-to-br from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-16 sm:py-24 md:py-32 px-4 sm:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <div className="text-6xl sm:text-7xl md:text-8xl mb-6 sm:mb-8 animate-float">🐱</div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 sm:mb-6">
              Ready to join the{' '}
              <span className="bg-gradient-to-r from-purple-400 to-purple-200 bg-clip-text text-transparent">
                underground?
              </span>
            </h2>
            <p className="text-gray-400 text-sm sm:text-base mb-6 sm:mb-8 px-4">
              Connect your wallet on Base and become part of the Syndicate.
            </p>
            {!isConnected && (
              <ConnectButton.Custom>
                {({ openConnectModal, mounted }) => (
                  <button
                    onClick={openConnectModal}
                    disabled={!mounted}
                    className="px-8 sm:px-10 py-3 sm:py-4 bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-500 hover:to-purple-700 rounded-xl font-bold text-base sm:text-lg transition-all duration-300 shadow-xl shadow-purple-900/50 hover:shadow-purple-800/60 hover:scale-105"
                  >
                    Connect Wallet
                  </button>
                )}
              </ConnectButton.Custom>
            )}
            {isConnected && address && (
              <div className="inline-flex flex-col sm:flex-row items-center gap-2 sm:gap-4 px-4 sm:px-6 py-3 sm:py-4 bg-purple-900/30 border border-purple-700/50 rounded-xl backdrop-blur-sm">
                <span className="text-green-400 text-sm sm:text-base">✓ Connected</span>
                <span className="text-purple-300 font-mono text-xs sm:text-sm">{address.slice(0, 6)}...{address.slice(-4)}</span>
              </div>
            )}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-6 sm:py-8 px-4 sm:px-6 border-t border-purple-900/30">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gray-600 text-xs sm:text-sm">
            Requested by <span className="text-gray-500">@asheontoshi</span> · Built by <span className="text-gray-500">@clonkbot</span>
          </p>
        </div>
      </footer>

      {/* Custom styles */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes spin-slower {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
        .animate-spin-slow {
          animation: spin-slow 10s linear infinite;
        }
        .animate-spin-slower {
          animation: spin-slower 15s linear infinite;
        }
      `}</style>
    </div>
  )
}

export default App
