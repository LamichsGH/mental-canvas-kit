import { Link } from "react-router-dom";

export const ProductShowcase = () => {
  return (
    <section id="products" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Tan/Beige Border Container */}
        <div className="max-w-7xl mx-auto border-[12px] border-[#c9b399] rounded-lg animate-fade-in">
          {/* White/Cream Inner Background */}
          <div className="bg-[#faf8f5] p-8 md:p-12 lg:p-16">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 items-center">
              {/* LEFT COLUMN - Text Content (60% width = 3/5 columns) */}
              <div className="lg:col-span-3 space-y-6">
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-black leading-tight">
                  Where Comfort Meets Hydration
                </h2>
                
                <p className="text-base md:text-lg text-black leading-relaxed">
                  Our Recovery Cocoa blends electrolytes with silky-smooth hot chocolate, designed to hydrate as it comforts. Made with real cocoa, mineral-rich electrolytes, and natural coconut creaminess, it restores balance - without the crash or excess sugar
                </p>
              </div>

              {/* RIGHT COLUMN - Image + CTA (40% width = 2/5 columns) */}
              <div className="lg:col-span-2 flex flex-col items-center justify-center space-y-6">
                {/* Product Image Placeholder */}
                <div className="w-full aspect-square bg-[#9b7d5f] rounded-lg max-w-sm"></div>
                
                {/* Shop Now CTA */}
                <Link 
                  to="/product-detail" 
                  className="text-3xl md:text-4xl font-bold text-black hover:text-primary transition-colors"
                >
                  Shop now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
