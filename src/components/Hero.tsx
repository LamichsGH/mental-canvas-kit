import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export const Hero = () => {
  const scrollToProducts = () => {
    document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-[600px] flex items-center justify-center overflow-hidden" style={{ backgroundColor: '#8b5e46' }}>
      
      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="max-w-3xl mx-auto text-center animate-fade-in">
          <div className="inline-block px-4 py-1.5 rounded-full mb-6" style={{ backgroundColor: 'rgba(245, 239, 234, 0.15)', border: '1px solid rgba(245, 239, 234, 0.3)' }}>
            <p className="text-sm font-bold" style={{ color: '#f5efea' }}>Loved by our first 50 testers</p>
          </div>
          <h1 className="text-5xl md:text-6xl lg:text-7xl mb-6 font-bold" style={{ color: '#f5efea' }}>
            For when you need to refill more than your cup
          </h1>
          <p className="text-xl md:text-2xl mb-10 max-w-2xl mx-auto font-medium" style={{ color: '#f5efea' }}>
            Electrolyte-infused comfort drinks designed to help you recharge softly
          </p>
          <Button 
            size="lg" 
            className="text-lg px-8 py-6 rounded-xl shadow-subtle hover:shadow-xl transition-all"
            style={{ backgroundColor: '#f5efea', color: '#1c1c1c' }}
            onClick={scrollToProducts}
          >
            Shop now
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
};
