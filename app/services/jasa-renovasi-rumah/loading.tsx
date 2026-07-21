export default function Loading() {
  return (
    <main className="min-h-screen bg-background">
      {/* Hero Skeleton */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-24 bg-surface-container-highest animate-pulse">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="h-12 md:h-16 w-1/2 max-w-2xl mx-auto bg-surface-container-high rounded-xl mb-6"></div>
          <div className="h-6 md:h-8 w-3/4 max-w-3xl mx-auto bg-surface-container-high rounded-lg mb-8"></div>
          <div className="h-12 w-40 mx-auto bg-surface-container-high rounded-full"></div>
        </div>
      </section>

      {/* Features/Steps Skeleton */}
      <section className="py-16 md:py-24 container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-surface-container/50 p-6 rounded-3xl border border-surface-container animate-pulse">
              <div className="h-12 w-12 bg-surface-container-highest rounded-2xl mb-6"></div>
              <div className="h-6 w-3/4 bg-surface-container-highest rounded-lg mb-4"></div>
              <div className="h-4 w-full bg-surface-container-highest rounded mb-2"></div>
              <div className="h-4 w-5/6 bg-surface-container-highest rounded"></div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
