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
    <section className="py-24 relative overflow-hidden bg-background">
      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 rounded-full bg-primary/30 blur-3xl" />
        <div className="absolute bottom-10 right-10 w-40 h-40 rounded-full bg-primary/30 blur-3xl" />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-20 animate-fade-in">
          <h2 className="text-5xl md:text-6xl mb-6 font-light tracking-tight text-foreground">
            What's Inside the Calm
          </h2>
        </div>
        
        {/* First row - 2 cards centered */}
        <div className="flex flex-wrap justify-center gap-8 max-w-4xl mx-auto mb-8">
          {ingredients.slice(0, 2).map((ingredient, index) => (
            <Card 
              key={index} 
              className="border-0 bg-card/95 backdrop-blur-sm hover:bg-card hover:scale-[1.03] transition-all duration-500 shadow-[0_20px_60px_-10px_hsl(24_33%_41%/0.12)] hover:shadow-[0_25px_70px_-10px_hsl(24_33%_41%/0.2)] animate-fade-in group rounded-2xl overflow-hidden w-full md:w-[calc(50%-1rem)] lg:w-80"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-10">
                <div className="mb-8 relative">
                  <div className="w-24 h-24 mx-auto rounded-full flex items-center justify-center relative bg-ingredient-icon-bg group-hover:scale-105 transition-transform duration-300 shadow-sm">
                    <ingredient.icon className="h-10 w-10 group-hover:scale-110 transition-transform duration-300 text-ingredient-icon" strokeWidth={1.5} />
                  </div>
                </div>
                <h3 className="text-2xl font-semibold mb-5 text-center text-foreground">
                  {ingredient.name}
                </h3>
                <p className="text-base leading-relaxed text-center text-muted-foreground">
                  {ingredient.benefit}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {/* Second row - 3 cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto mb-16">
          {ingredients.slice(2).map((ingredient, index) => (
            <Card 
              key={index + 2} 
              className="border-0 bg-card/95 backdrop-blur-sm hover:bg-card hover:scale-[1.03] transition-all duration-500 shadow-[0_20px_60px_-10px_hsl(24_33%_41%/0.12)] hover:shadow-[0_25px_70px_-10px_hsl(24_33%_41%/0.2)] animate-fade-in group rounded-2xl overflow-hidden"
              style={{ animationDelay: `${(index + 2) * 0.1}s` }}
            >
              <CardContent className="p-10">
                <div className="mb-8 relative">
                  <div className="w-24 h-24 mx-auto rounded-full flex items-center justify-center relative bg-ingredient-icon-bg group-hover:scale-105 transition-transform duration-300 shadow-sm">
                    <ingredient.icon className="h-10 w-10 group-hover:scale-110 transition-transform duration-300 text-ingredient-icon" strokeWidth={1.5} />
                  </div>
                </div>
                <h3 className="text-2xl font-semibold mb-5 text-center text-foreground">
                  {ingredient.name}
                </h3>
                <p className="text-base leading-relaxed text-center text-muted-foreground">
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
            variant="outline"
            className="px-10 py-6 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-primary bg-card hover:bg-primary hover:text-primary-foreground text-foreground font-medium"
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
