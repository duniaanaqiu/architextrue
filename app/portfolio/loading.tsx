export default function Loading() {
  return (
    <main className="min-h-screen bg-background pt-32 pb-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Header Skeleton */}
        <div className="text-center mb-16">
          <div className="h-10 md:h-14 w-1/2 max-w-lg mx-auto bg-surface-container-highest rounded-xl animate-pulse mb-6"></div>
          <div className="h-6 md:h-8 w-3/4 max-w-2xl mx-auto bg-surface-container-highest rounded-lg animate-pulse"></div>
        </div>

        {/* Filter/Tabs Skeleton */}
        <div className="flex justify-center gap-4 mb-12 flex-wrap">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-10 w-24 bg-surface-container-highest rounded-full animate-pulse"></div>
          ))}
        </div>

        {/* Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="flex flex-col gap-4 animate-pulse">
              <div className="aspect-[4/3] w-full bg-surface-container-highest rounded-3xl"></div>
              <div className="space-y-3 p-2">
                <div className="flex gap-2">
                  <div className="h-6 w-20 bg-surface-container-highest rounded-full"></div>
                </div>
                <div className="h-7 w-full bg-surface-container-highest rounded-lg"></div>
                <div className="h-7 w-3/4 bg-surface-container-highest rounded-lg"></div>
                <div className="h-4 w-full bg-surface-container-highest rounded"></div>
                <div className="h-4 w-5/6 bg-surface-container-highest rounded"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
