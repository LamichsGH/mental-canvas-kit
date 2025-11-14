import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import cocoaPreparation from "@/assets/cocoa-preparation.png";

export const ProductShowcase = () => {
  const navigate = useNavigate();

  return (
    <section id="products" className="py-16" style={{ backgroundColor: '#f5efea' }}>
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto bg-background rounded-xl shadow-subtle overflow-hidden border-4 border-primary/20 animate-fade-in" style={{ backgroundColor: '#f5efea' }}>
          <div className="grid md:grid-cols-2 gap-0">
            {/* Left Column - Text Content (60% width = 3/5) */}
            <div className="p-6 md:p-10 flex flex-col justify-center">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight" style={{ color: '#1c1c1c' }}>
                Where Comfort Meets Hydration
              </h2>
              <p className="text-base md:text-lg leading-relaxed" style={{ color: '#1c1c1c' }}>
                Our Recovery Cocoa blends electrolytes with silky-smooth hot chocolate, designed to hydrate as it comforts. Made with real cocoa, mineral-rich electrolytes, and natural coconut creaminess, it restores balance — without the crash or excess sugar.
              </p>
            </div>

            {/* Right Column - Image + CTA (40% width = 2/5) */}
            <div className="p-6 md:p-10 flex flex-col items-center justify-center" style={{ backgroundColor: '#f5efea' }}>
              {/* Product Image */}
              <div className="w-full aspect-square max-w-xs rounded-xl shadow-lg mb-4 overflow-hidden">
                <img 
                  src={cocoaPreparation} 
                  alt="Hand measuring cocoa powder into a cup" 
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Shop Now CTA */}
              <Button
                size="lg"
                className="w-full max-w-xs rounded-xl text-lg font-semibold"
                style={{ backgroundColor: '#8b5e46', color: '#f5efea' }}
                onClick={() => navigate('/product/recovery-cocoa')}
              >
                Shop now
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};