import { Card, CardContent } from "@/components/ui/card";

export const ProductShowcaseSkeleton = () => (
  <section className="py-16" style={{ backgroundColor: '#f5efea' }}>
    <div className="container mx-auto px-4">
      <div className="max-w-5xl mx-auto bg-background rounded-xl shadow-subtle overflow-hidden border-4 border-primary/20 animate-pulse" style={{ backgroundColor: '#f5efea' }}>
        <div className="grid md:grid-cols-2 gap-0">
          {/* Left Column - Text Content */}
          <div className="p-6 md:p-10 flex flex-col justify-center space-y-4">
            {/* Headline skeleton */}
            <div className="space-y-3">
              <div className="h-8 bg-gray-300 rounded w-full animate-pulse" />
              <div className="h-8 bg-gray-300 rounded w-3/4 animate-pulse" />
            </div>
            
            {/* Description skeleton */}
            <div className="space-y-2">
              <div className="h-4 bg-gray-300 rounded w-full animate-pulse" />
              <div className="h-4 bg-gray-300 rounded w-full animate-pulse" />
              <div className="h-4 bg-gray-300 rounded w-2/3 animate-pulse" />
            </div>
          </div>

          {/* Right Column - Image + CTA */}
          <div className="p-6 md:p-10 flex flex-col items-center justify-center space-y-4" style={{ backgroundColor: '#f5efea' }}>
            {/* Product Image skeleton */}
            <div className="w-full aspect-square max-w-xs rounded-xl bg-gray-300 animate-pulse" />

            {/* Shop Now CTA skeleton */}
            <div className="w-full max-w-xs h-12 bg-gray-300 rounded-xl animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  </section>
);