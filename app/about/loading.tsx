export default function Loading() {
  return (
    <main className="min-h-screen bg-background">
      {/* Hero Skeleton */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-24 bg-surface-container-highest animate-pulse">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="h-12 md:h-16 w-1/2 max-w-2xl mx-auto bg-surface-container-high rounded-xl mb-6"></div>
          <div className="h-6 md:h-8 w-3/4 max-w-3xl mx-auto bg-surface-container-high rounded-lg"></div>
        </div>
      </section>

      {/* Content Skeleton */}
      <section className="py-16 md:py-24 container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="flex flex-col md:flex-row gap-12 items-center">
          <div className="w-full md:w-1/2 space-y-6">
            <div className="h-10 w-3/4 bg-surface-container-highest rounded-xl animate-pulse"></div>
            <div className="h-4 w-full bg-surface-container-highest rounded animate-pulse"></div>
            <div className="h-4 w-5/6 bg-surface-container-highest rounded animate-pulse"></div>
            <div className="h-4 w-11/12 bg-surface-container-highest rounded animate-pulse"></div>
            <div className="h-4 w-4/5 bg-surface-container-highest rounded animate-pulse"></div>
          </div>
          <div className="w-full md:w-1/2">
            <div className="aspect-square md:aspect-[4/3] w-full bg-surface-container-highest rounded-3xl animate-pulse"></div>
          </div>
        </div>
      </section>
    </main>
  );
}
