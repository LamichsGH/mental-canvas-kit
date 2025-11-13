import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export const Hero = () => {
  return (
    <section className="relative min-h-[600px] flex items-center justify-center overflow-hidden" style={{ backgroundColor: '#8b8a8e' }}>
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1544787219-7f47ccb76574?q=80&w=2574')] bg-cover bg-center opacity-20" />
      
      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="max-w-3xl mx-auto text-center animate-fade-in">
          <div className="inline-block px-6 py-2.5 rounded-full bg-white/20 border-2 border-white/40 mb-6 backdrop-blur-sm">
            <p className="text-sm font-bold text-white tracking-wide uppercase">Loved by our first 50 testers</p>
          </div>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-white leading-tight">
            For when you need to refill more than your cup
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-10 max-w-2xl mx-auto font-light">
            Electrolyte-infused comfort drinks designed to help you recharge softly
          </p>
          <Button 
            size="lg" 
            className="text-lg px-8 py-6 rounded-xl transition-all text-white font-semibold hover:opacity-90"
            style={{ backgroundColor: '#f5afa5' }}
            asChild
          >
            <Link to="/product-detail">
              Shop Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};
