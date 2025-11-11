import { CheckCircle2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const ingredients = [
  {
    name: "Organic Cocoa",
    benefit: "Rich in antioxidants and natural magnesium to support relaxation and restore balance — plus that smooth, indulgent flavor you crave",
  },
  {
    name: "Organic Coconut Milk",
    benefit: "Adds creamy texture and healthy fats for comfort and satisfaction without dairy",
  },
  {
    name: "Magnesium Glycinate",
    benefit: "Known for its calming properties and gentle digestion support — helps ease tension and restore",
  },
  {
    name: "Sea Salt",
    benefit: "Naturally replenishes lost minerals to keep your body balanced and calm",
  },
  {
    name: "Vanilla Bean",
    benefit: "Rounds out the flavor with natural warmth and aroma, adding a touch of indulgence to every sip",
  },
];

export const WhatsInside = () => {
  return (
    <section className="py-20 bg-secondary/5">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl mb-4">
            What's Inside the Calm
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto mb-12">
          {ingredients.map((ingredient, index) => (
            <Card 
              key={index} 
              className="border-0 bg-card hover:bg-secondary/10 transition-all duration-300 shadow-subtle hover:shadow-md animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-8">
                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
                  <CheckCircle2 className="h-8 w-8 text-primary" strokeWidth={2} />
                </div>
                <h3 className="text-xl font-bold mb-4 text-center">{ingredient.name}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{ingredient.benefit}</p>
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
