import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export const ProductShowcase = () => {
  return (
    <section id="products" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Headline */}
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl mb-4">
            Where Comfort Meets Hydration
          </h2>
        </div>

        {/* Featured Product Layout */}
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Product Image */}
            <div className="animate-fade-in">
              <div className="relative aspect-square rounded-2xl overflow-hidden bg-secondary/20 shadow-subtle">
                <img
                  src="https://images.unsplash.com/photo-1611686709630-45b084f85648?q=80&w=1000"
                  alt="Recovery Cocoa - Brown drink packaging"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Product Content */}
            <div className="animate-fade-in space-y-6" style={{ animationDelay: '0.1s' }}>
              <h3 className="text-3xl md:text-4xl font-semibold text-foreground">
                Recovery Cocoa
              </h3>
              
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                A mineral-rich hot chocolate made with organic cacao, coconut, and electrolytes — crafted to restore hydration and calm energy
              </p>

              <div className="pt-4">
                <Link to="/product-detail">
                  <Button 
                    size="lg" 
                    className="text-lg px-8 py-6 rounded-xl shadow-subtle hover:shadow-xl transition-all"
                  >
                    Shop Now
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
