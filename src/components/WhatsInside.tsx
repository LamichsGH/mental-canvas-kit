import { Leaf, Droplets, Sparkles, Waves, FlowerIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const ingredients = [
  {
    name: "Organic Cocoa",
    benefit: "Rich in antioxidants and natural magnesium to support relaxation and restore balance — plus that smooth, indulgent flavor you crave",
    icon: Leaf,
  },
  {
    name: "Organic Coconut Milk",
    benefit: "Adds creamy texture and healthy fats for comfort and satisfaction without dairy",
    icon: Droplets,
  },
  {
    name: "Magnesium Glycinate",
    benefit: "Known for its calming properties and gentle digestion support — helps ease tension and restore",
    icon: Sparkles,
  },
  {
    name: "Sea Salt",
    benefit: "Naturally replenishes lost minerals to keep your body balanced and calm",
    icon: Waves,
  },
  {
    name: "Vanilla Bean",
    benefit: "Rounds out the flavor with natural warmth and aroma, adding a touch of indulgence to every sip",
    icon: FlowerIcon,
  },
];

export const WhatsInside = () => {
  return (
    <section className="py-section-sm md:py-section relative overflow-hidden bg-secondary">
      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 rounded-full bg-primary/30 blur-3xl" />
        <div className="absolute bottom-10 right-10 w-40 h-40 rounded-full bg-primary/30 blur-3xl" />
      </div>
      
      <div className="container-content relative z-10">
        <div className="text-center mb-16 md:mb-20 animate-fade-in">
          <h2 className="text-3xl md:text-4xl mb-4 tracking-tight text-foreground">
            What's Inside the Calm
          </h2>
        </div>
        
        {/* First row - 2 cards centered */}
        <div className="flex flex-wrap justify-center gap-6 md:gap-8 max-w-4xl mx-auto mb-6 md:mb-8">
          {ingredients.slice(0, 2).map((ingredient, index) => (
            <Card 
              key={index} 
              className="border border-border bg-ingredient-card backdrop-blur-sm hover:bg-card hover:scale-[1.02] transition-all duration-500 shadow-m hover:shadow-l animate-fade-in group rounded-lg overflow-hidden w-full md:w-[calc(50%-1rem)] lg:w-80"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-8 md:p-10">
                <div className="mb-6 md:mb-8 relative">
                  <div className="w-20 h-20 md:w-24 md:h-24 mx-auto rounded-full flex items-center justify-center relative bg-ingredient-icon-bg group-hover:scale-105 transition-transform duration-300 shadow-s">
                    <ingredient.icon className="h-9 w-9 md:h-10 md:w-10 group-hover:scale-110 transition-transform duration-300 text-ingredient-icon" strokeWidth={1.5} />
                  </div>
                </div>
                <h3 className="text-xl md:text-2xl font-bold mb-4 md:mb-5 text-center text-foreground">
                  {ingredient.name}
                </h3>
                <p className="text-sm md:text-base leading-relaxed text-center text-muted-foreground">
                  {ingredient.benefit}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {/* Second row - 3 cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-7xl mx-auto mb-12 md:mb-16">
          {ingredients.slice(2).map((ingredient, index) => (
            <Card 
              key={index + 2} 
              className="border border-border bg-ingredient-card backdrop-blur-sm hover:bg-card hover:scale-[1.02] transition-all duration-500 shadow-m hover:shadow-l animate-fade-in group rounded-lg overflow-hidden"
              style={{ animationDelay: `${(index + 2) * 0.1}s` }}
            >
              <CardContent className="p-8 md:p-10">
                <div className="mb-6 md:mb-8 relative">
                  <div className="w-20 h-20 md:w-24 md:h-24 mx-auto rounded-full flex items-center justify-center relative bg-ingredient-icon-bg group-hover:scale-105 transition-transform duration-300 shadow-s">
                    <ingredient.icon className="h-9 w-9 md:h-10 md:w-10 group-hover:scale-110 transition-transform duration-300 text-ingredient-icon" strokeWidth={1.5} />
                  </div>
                </div>
                <h3 className="text-xl md:text-2xl font-bold mb-4 md:mb-5 text-center text-foreground">
                  {ingredient.name}
                </h3>
                <p className="text-sm md:text-base leading-relaxed text-center text-muted-foreground">
                  {ingredient.benefit}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="text-center animate-fade-in" style={{ animationDelay: "0.5s" }}>
          <Button 
            asChild 
            size="lg" 
            className="px-8 md:px-10 py-5 md:py-6 text-base md:text-lg rounded-sm shadow-m hover:shadow-l transition-all duration-300 bg-primary hover:bg-primary-hover text-primary-foreground font-medium"
          >
            <Link to="/ingredients" className="hover:scale-105 transition-transform">
              See Full Ingredient List
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};
