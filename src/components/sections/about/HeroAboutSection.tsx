export function HeroAboutSection() {
  return (
    <section className="relative w-full min-h-[60vh] md:min-h-[70vh] flex items-center justify-center pt-32 pb-20 bg-gradient-to-br from-primary via-[#0f172a] to-primary text-on-primary overflow-hidden">
      <style>{`
        @keyframes shine-sweep {
          0% { left: -100%; opacity: 0; }
          20% { opacity: 0.5; }
          80% { opacity: 0.5; }
          100% { left: 200%; opacity: 0; }
        }
      `}</style>
      
      {/* Subtle background decoration */}
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-white rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-white rounded-full blur-[100px] translate-y-1/3 -translate-x-1/3"></div>
      </div>
      
      <div className="relative z-10 w-full container-max mx-auto px-margin-mobile md:px-margin-desktop text-center">
        <div className="relative max-w-4xl mx-auto flex flex-col items-center bg-white/5 backdrop-blur-xl border border-white/10 p-12 md:p-16 rounded-3xl ambient-shadow-lg overflow-hidden group">
          {/* Animated shine effect */}
          <div 
            className="absolute top-0 w-[50%] h-full bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-[-20deg] pointer-events-none"
            style={{ animation: 'shine-sweep 4s infinite' }}
          ></div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-semibold leading-tight mb-6 drop-shadow-md">
            Membangun Warisan, <br className="hidden md:block" />Bukan Hanya Bangunan
          </h1>
          <p className="text-lg md:text-xl font-body text-white/80 max-w-2xl drop-shadow-sm">
            Jauh melampaui kontraktor biasa, kami adalah mitra terpercaya Anda. Kami meyakini bahwa rumah mewah sejati lahir dari perpaduan harmonis antara visi ambisius, material premium, dan ketelitian tak kenal kompromi.
          </p>
        </div>
      </div>
    </section>
  );
}
