export default function Loading() {
  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section Skeleton */}
      <section className="relative h-screen w-full bg-surface-container-highest animate-pulse">
        <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
          <div className="h-12 md:h-20 w-3/4 max-w-3xl bg-surface-container-high rounded-xl mb-6"></div>
          <div className="h-6 md:h-8 w-1/2 max-w-xl bg-surface-container-high rounded-lg mb-10"></div>
          <div className="flex gap-4">
            <div className="h-12 w-32 bg-surface-container-high rounded-full"></div>
            <div className="h-12 w-32 bg-surface-container-high rounded-full"></div>
          </div>
        </div>
      </section>

      {/* Sections Skeleton */}
      <section className="py-24 container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="flex flex-col items-center mb-16">
          <div className="h-6 w-32 bg-surface-container-highest rounded-full mb-4 animate-pulse"></div>
          <div className="h-10 md:h-12 w-2/3 max-w-lg bg-surface-container-highest rounded-xl animate-pulse"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex flex-col gap-4">
              <div className="aspect-square w-full bg-surface-container-highest rounded-3xl animate-pulse"></div>
              <div className="h-6 w-3/4 bg-surface-container-highest rounded-lg animate-pulse"></div>
              <div className="h-4 w-full bg-surface-container-highest rounded-lg animate-pulse"></div>
              <div className="h-4 w-5/6 bg-surface-container-highest rounded-lg animate-pulse"></div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
