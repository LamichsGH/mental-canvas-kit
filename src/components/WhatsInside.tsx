import { CheckCircle2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const ingredients = [
  {
    name: "Organic Cacao",
    benefit: "Rich in antioxidants & magnesium",
  },
  {
    name: "Coconut Milk Powder",
    benefit: "Natural MCTs for sustained energy",
  },
  {
    name: "Natural Electrolytes",
    benefit: "Optimal hydration support",
  },
  {
    name: "Himalayan Pink Salt",
    benefit: "84 trace minerals",
  },
  {
    name: "Organic Coconut Sugar",
    benefit: "Low glycemic sweetness",
  },
  {
    name: "Organic Vanilla",
    benefit: "Pure, natural flavor",
  },
  {
    name: "Organic Cinnamon",
    benefit: "Anti-inflammatory properties",
  },
  {
    name: "Pure Love",
    benefit: "Crafted with care",
  },
];

export const WhatsInside = () => {
  return (
    <section className="py-20 bg-secondary/5">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl mb-4">
            Clean Ingredients, Clear Benefits
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Every ingredient serves a purpose. No fillers, no artificial anything.
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto mb-12">
          {ingredients.map((ingredient, index) => (
            <Card 
              key={index} 
              className="border-0 bg-card hover:bg-secondary/10 transition-all duration-300 shadow-sm hover:shadow-md animate-fade-in"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                  <CheckCircle2 className="h-6 w-6 text-primary" strokeWidth={2} />
                </div>
                <h3 className="text-lg font-semibold mb-2">{ingredient.name}</h3>
                <p className="text-sm text-muted-foreground">{ingredient.benefit}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="text-center animate-fade-in" style={{ animationDelay: "0.4s" }}>
          <Button asChild size="lg" variant="outline">
            <Link to="/ingredients">See Full Ingredient List</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};
