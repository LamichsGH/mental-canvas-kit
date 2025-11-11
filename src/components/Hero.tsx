import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";

export const Hero = () => {
  const scrollToProducts = () => {
    document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-[600px] flex items-center justify-center bg-gradient-to-br from-secondary/30 to-background overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1511920170033-f8396924c348?q=80&w=2574')] bg-cover bg-center opacity-10" />
      
      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="max-w-3xl mx-auto text-center animate-fade-in">
          <Badge variant="secondary" className="mb-4 px-4 py-1.5 text-sm font-normal">
            Loved by our first 50 testers
          </Badge>
          <h1 className="text-5xl md:text-6xl lg:text-7xl mb-6 text-foreground">
            Hydration for Calm Moments
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-2xl mx-auto">
            Electrolyte-infused comfort drinks designed to help you recharge softly
          </p>
          <Button 
            size="lg" 
            className="text-lg px-8 py-6 rounded-xl shadow-subtle hover:shadow-xl transition-all"
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
