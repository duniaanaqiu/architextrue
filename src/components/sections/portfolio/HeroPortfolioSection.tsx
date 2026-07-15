import Image from "next/image";

export function HeroPortfolioSection() {
  return (
    <section className="relative w-full h-[50vh] min-h-[400px] md:h-[60vh] md:min-h-[500px] flex items-center justify-center pt-24 pb-12 md:pb-20 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="bg-cover bg-center w-full h-full bg-[url('/assets/images/portfolio/port1.jpg')]" />
        <div className="absolute inset-0 bg-background/80 backdrop-blur-sm mix-blend-multiply"></div>
        <div className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-background to-transparent"></div>
      </div>

      <div className="relative z-10 w-full container-max mx-auto px-margin-mobile md:px-margin-desktop flex flex-col items-center text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-semibold leading-tight text-on-primary mb-stack-md drop-shadow-lg max-w-4xl">
          Koleksi Mahakarya Kami
        </h1>
        <p className="text-lg md:text-xl font-body text-surface-container-low max-w-2xl drop-shadow-md">
          Eksplorasi rekam jejak dedikasi kami dalam mewujudkan desain arsitektur premium dan konstruksi berkualitas tinggi.
        </p>
      </div>
    </section>
  );
}
