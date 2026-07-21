import { ArrowLeft } from "lucide-react";

export default function Loading() {
  return (
    <main className="min-h-screen bg-background pt-24 pb-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        
        {/* Back Link Skeleton */}
        <div className="flex items-center gap-2 text-on-surface-variant mb-8 opacity-50">
          <ArrowLeft className="w-4 h-4" />
          <div className="h-5 w-32 bg-surface-container-highest animate-pulse rounded"></div>
        </div>

        {/* Article Layout Skeleton */}
        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* Main Content Skeleton */}
          <div className="lg:w-8/12">
            {/* Header Skeleton */}
            <div className="mb-8 space-y-6">
              {/* Categories */}
              <div className="flex gap-2">
                <div className="h-7 w-24 bg-surface-container-highest animate-pulse rounded-full"></div>
                <div className="h-7 w-20 bg-surface-container-highest animate-pulse rounded-full"></div>
              </div>
              
              {/* Title */}
              <div className="space-y-3">
                <div className="h-12 md:h-16 w-full bg-surface-container-highest animate-pulse rounded-xl"></div>
                <div className="h-12 md:h-16 w-3/4 bg-surface-container-highest animate-pulse rounded-xl"></div>
              </div>

              {/* Meta */}
              <div className="flex items-center gap-4">
                <div className="h-5 w-24 bg-surface-container-highest animate-pulse rounded"></div>
                <div className="h-5 w-5 bg-surface-container-highest animate-pulse rounded-full"></div>
                <div className="h-5 w-32 bg-surface-container-highest animate-pulse rounded"></div>
                <div className="h-5 w-5 bg-surface-container-highest animate-pulse rounded-full"></div>
                <div className="h-5 w-24 bg-surface-container-highest animate-pulse rounded"></div>
              </div>
            </div>

            {/* Featured Image Skeleton */}
            <div className="aspect-[21/9] w-full bg-surface-container-highest animate-pulse rounded-3xl mb-12"></div>

            {/* Prose Content Skeleton */}
            <div className="space-y-5">
              <div className="h-5 w-full bg-surface-container-highest animate-pulse rounded"></div>
              <div className="h-5 w-full bg-surface-container-highest animate-pulse rounded"></div>
              <div className="h-5 w-11/12 bg-surface-container-highest animate-pulse rounded"></div>
              <div className="h-5 w-full bg-surface-container-highest animate-pulse rounded"></div>
              <div className="h-5 w-4/5 bg-surface-container-highest animate-pulse rounded"></div>
              
              <div className="pt-6"></div>
              <div className="h-8 w-1/3 bg-surface-container-highest animate-pulse rounded mb-4"></div>
              <div className="h-5 w-full bg-surface-container-highest animate-pulse rounded"></div>
              <div className="h-5 w-5/6 bg-surface-container-highest animate-pulse rounded"></div>
              <div className="h-5 w-full bg-surface-container-highest animate-pulse rounded"></div>
            </div>
          </div>

          {/* Sidebar Skeleton */}
          <div className="lg:w-4/12 hidden lg:block">
            <div className="sticky top-24 p-6 rounded-3xl border border-surface-container bg-surface/50">
              <div className="h-6 w-40 bg-surface-container-highest animate-pulse rounded mb-6"></div>
              <div className="space-y-4">
                <div className="h-4 w-3/4 bg-surface-container-highest animate-pulse rounded"></div>
                <div className="h-4 w-full bg-surface-container-highest animate-pulse rounded"></div>
                <div className="h-4 w-5/6 bg-surface-container-highest animate-pulse rounded"></div>
                <div className="h-4 w-2/3 bg-surface-container-highest animate-pulse rounded"></div>
                <div className="h-4 w-4/5 bg-surface-container-highest animate-pulse rounded"></div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}
