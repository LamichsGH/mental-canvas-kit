import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchProductByHandle, formatPrice, getProductStatus } from "@/lib/shopify";
import { ProductShowcaseSkeleton } from "@/components/ProductShowcaseSkeleton";
import cocoaLifestyle from "@/assets/cocoa-lifestyle.jpeg";

export const ProductShowcase = () => {
  const navigate = useNavigate();

  // Fetch the featured product (Recovery Cocoa) from Shopify
  const { data: product, isLoading, error } = useQuery({
    queryKey: ['featured-product', 'recovery-cocoa'],
    queryFn: () => fetchProductByHandle('recovery-cocoa'),
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes
  });

  if (isLoading) {
    return <ProductShowcaseSkeleton />;
  }

  if (error) {
    // Fallback to hardcoded content if Shopify fails
    console.warn('Failed to load product from Shopify, using fallback content');
  }

  // Use Shopify data if available, otherwise fallback
  const productData = {
    title: product?.title || "Recovery Cocoa",
    description: product?.description || "Our Recovery Cocoa blends electrolytes with silky-smooth hot chocolate, designed to hydrate as it comforts. Made with real cocoa, mineral-rich electrolytes, and natural coconut creaminess, it restores balance — without the crash or excess sugar.",
    image: cocoaLifestyle,
    handle: product?.handle || "recovery-cocoa",
    status: getProductStatus(product),
  };

  return (
    <section id="products" className="py-16 relative" style={{ backgroundColor: '#f5efea' }}>
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto bg-background rounded-xl shadow-xl overflow-hidden border-4 border-primary/20 transition-all hover:shadow-2xl hover:scale-[1.02] duration-500" style={{ backgroundColor: '#f5efea' }}>
          <div className="grid md:grid-cols-2 gap-0">
            {/* Left Column - Dynamic Text Content */}
            <div className="p-6 md:p-10 flex flex-col justify-center">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight" style={{ color: '#1c1c1c' }}>
                Where Comfort Meets Hydration
              </h2>
              <p className="text-base md:text-lg leading-relaxed" style={{ color: '#1c1c1c' }}>
                {productData.description}
              </p>
            </div>

            {/* Right Column - Dynamic Image + CTA */}
            <div className="p-6 md:p-10 flex flex-col items-center justify-center" style={{ backgroundColor: '#f5efea' }}>
              {/* Dynamic Product Image */}
              <div className="w-full aspect-square max-w-xs rounded-xl shadow-lg mb-4 overflow-hidden transform transition-transform hover:scale-105 duration-300">
                <img 
                  src={productData.image} 
                  alt={productData.title} 
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Dynamic Shop Now CTA */}
              <Button
                size="lg"
                className="w-full max-w-xs rounded-xl text-lg font-semibold transition-all hover:shadow-lg hover:scale-105 duration-300"
                style={{ backgroundColor: '#8b5e46', color: '#f5efea' }}
                onClick={() => navigate(`/product/${productData.handle}`)}
              >
                {productData.status === 'available' ? 'Shop now' : 
                 productData.status === 'sold-out' ? 'View Details' : 
                 'Learn More'}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};