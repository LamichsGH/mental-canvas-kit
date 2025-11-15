import { Card, CardContent } from "@/components/ui/card";

export const SeasonalDrinksSkeleton = () => (
  <div className="py-20 bg-[#f5efea]">
    <div className="container mx-auto px-4">
      <div className="max-w-6xl mx-auto">
        {/* Section Header Skeleton */}
        <div className="text-center mb-16">
          <div className="h-12 bg-gray-200 rounded-lg w-96 mx-auto mb-6 animate-pulse"></div>
          <div className="h-6 bg-gray-200 rounded-lg w-80 mx-auto animate-pulse"></div>
        </div>

        {/* Cards Grid Skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map(i => (
            <Card 
              key={i} 
              className="rounded-2xl overflow-hidden animate-pulse"
              style={{ 
                backgroundColor: i % 2 === 0 ? "#d8c5b1" : "#c7bcb1"
              }}
            >
              {/* Image skeleton */}
              <div className="aspect-square bg-gray-300 animate-pulse" />
              
              <CardContent className="p-6 space-y-3">
                {/* Season badge skeleton */}
                <div className="flex justify-center">
                  <div className="h-6 bg-gray-300 rounded-full w-20 animate-pulse" />
                </div>
                
                {/* Product name skeleton */}
                <div className="h-7 bg-gray-300 rounded w-full animate-pulse" />
                
                {/* Description skeleton */}
                <div className="space-y-2">
                  <div className="h-4 bg-gray-300 rounded w-full animate-pulse" />
                  <div className="h-4 bg-gray-300 rounded w-3/4 animate-pulse" />
                </div>
                
                {/* Button skeleton */}
                <div className="pt-4">
                  <div className="h-12 bg-gray-300 rounded w-full animate-pulse" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  </div>
);