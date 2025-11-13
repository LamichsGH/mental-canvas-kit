import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export const Hero = () => {
  const scrollToProducts = () => {
    document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-[700px] flex items-center justify-center bg-gradient-to-br from-secondary/30 to-background overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=2669')] bg-cover bg-center opacity-15" />
      
      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          <div className="text-left animate-fade-in">
            <div className="inline-block px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <p className="text-sm text-muted-foreground">Loved by our first 50 testers</p>
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl mb-6 text-foreground font-bold leading-tight">
              For when you need to refill more than your cup
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-10">
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
          
          <div className="relative animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <img 
              src="https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=800" 
              alt="Person enjoying a peaceful moment with a warm drink" 
              className="rounded-2xl shadow-2xl w-full h-auto object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
