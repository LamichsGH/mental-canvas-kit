import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { scrollToSection } from "@/lib/scroll";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, CheckCircle2, Leaf, Shield, Award } from "lucide-react";

const ingredients = [
  {
    name: "Organic Cacao",
    benefit: "Rich in antioxidants and magnesium for muscle recovery",
    source: "Small-batch farms in Ecuador & Peru"
  },
  {
    name: "Coconut Milk Powder",
    benefit: "Natural source of MCTs for sustained energy",
    source: "Sustainable farms in Thailand"
  },
  {
    name: "Organic Coconut Sugar",
    benefit: "Low glycemic sweetener with minerals intact",
    source: "Fair-trade certified organic farms"
  },
  {
    name: "Himalayan Pink Salt",
    benefit: "84 trace minerals to support electrolyte balance",
    source: "Ancient salt deposits in Pakistan"
  },
  {
    name: "Natural Electrolytes",
    benefit: "Sodium, potassium, magnesium for optimal hydration",
    source: "Mineral-rich natural sources"
  },
  {
    name: "Organic Vanilla",
    benefit: "Antioxidants and natural flavor enhancement",
    source: "Madagascar vanilla beans"
  },
  {
    name: "Organic Cinnamon",
    benefit: "Blood sugar support and anti-inflammatory properties",
    source: "Ceylon cinnamon from Sri Lanka"
  },
  {
    name: "Pure Love",
    benefit: "The secret ingredient that makes it all come together",
    source: "Crafted with care in every batch"
  }
];

const comparisons = [
  {
    label: "Traditional Hot Chocolate",
    calories: "250-400",
    sugar: "25-40g",
    ingredients: "20+ (many artificial)",
    additives: "Yes"
  },
  {
    label: "Fuel Haus",
    calories: "118",
    sugar: "12g (natural)",
    ingredients: "8 (all real)",
    additives: "None"
  }
];

export default function Ingredients() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
        <div className="container mx-auto px-4 py-4">
          <Button
            variant="ghost"
            onClick={() => navigate("/")}
            className="gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Button>
        </div>
      </header>

      <main>
        {/* Hero */}
        <section className="py-20 bg-gradient-to-br from-secondary/20 to-background">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center animate-fade-in">
              <Badge className="mb-4 bg-primary/10 text-primary hover:bg-primary/20">
                Clean Label Certified
              </Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl mb-6">
                Just 8 Real Ingredients
              </h1>
              <p className="text-xl text-muted-foreground">
                Every ingredient has a purpose. No gums, no fillers, no nonsense. Just real food working together to restore your body.
              </p>
            </div>
          </div>
        </section>

        {/* Ingredients Breakdown */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl md:text-4xl text-center mb-12">
                Meet Your Ingredients
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                {ingredients.map((ingredient, index) => (
                  <Card 
                    key={index}
                    className="border-0 shadow-subtle hover:shadow-xl transition-all duration-300 animate-fade-in rounded-xl"
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start gap-3 mb-3">
                        <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                        <div>
                          <h3 className="text-lg font-medium mb-1">{ingredient.name}</h3>
                          <p className="text-muted-foreground text-sm mb-2">{ingredient.benefit}</p>
                          <p className="text-xs text-primary italic">Source: {ingredient.source}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Trust Indicators */}
        <section className="py-20 bg-secondary/10">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl text-center mb-12">
                Our Quality Promise
              </h2>
              <div className="grid md:grid-cols-3 gap-8">
                <Card className="border-0 shadow-subtle rounded-xl text-center">
                  <CardContent className="p-8">
                    <Leaf className="h-12 w-12 text-primary mx-auto mb-4" strokeWidth={1.5} />
                    <h3 className="text-xl mb-2">Organic First</h3>
                    <p className="text-muted-foreground text-sm">
                      USDA Organic certified ingredients whenever possible
                    </p>
                  </CardContent>
                </Card>
                <Card className="border-0 shadow-subtle rounded-xl text-center">
                  <CardContent className="p-8">
                    <Shield className="h-12 w-12 text-primary mx-auto mb-4" strokeWidth={1.5} />
                    <h3 className="text-xl mb-2">Third-Party Tested</h3>
                    <p className="text-muted-foreground text-sm">
                      Every batch tested for purity and potency
                    </p>
                  </CardContent>
                </Card>
                <Card className="border-0 shadow-subtle rounded-xl text-center">
                  <CardContent className="p-8">
                    <Award className="h-12 w-12 text-primary mx-auto mb-4" strokeWidth={1.5} />
                    <h3 className="text-xl mb-2">Sustainably Sourced</h3>
                    <p className="text-muted-foreground text-sm">
                      Fair-trade and environmentally responsible partners
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Comparison */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl text-center mb-4">
                How We Compare
              </h2>
              <p className="text-center text-muted-foreground mb-12">
                See the difference real ingredients make
              </p>
              <Card className="border-0 shadow-subtle rounded-xl overflow-hidden">
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-secondary/20">
                        <tr>
                          <th className="text-left p-4 font-medium"></th>
                          <th className="text-left p-4 font-medium">Traditional</th>
                          <th className="text-left p-4 font-medium text-primary">Fuel Haus</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-t border-border">
                          <td className="p-4 font-medium">Calories per Serving</td>
                          <td className="p-4 text-muted-foreground">{comparisons[0].calories}</td>
                          <td className="p-4 text-primary font-medium">{comparisons[1].calories}</td>
                        </tr>
                        <tr className="border-t border-border">
                          <td className="p-4 font-medium">Sugar Content</td>
                          <td className="p-4 text-muted-foreground">{comparisons[0].sugar}</td>
                          <td className="p-4 text-primary font-medium">{comparisons[1].sugar}</td>
                        </tr>
                        <tr className="border-t border-border">
                          <td className="p-4 font-medium">Ingredients</td>
                          <td className="p-4 text-muted-foreground">{comparisons[0].ingredients}</td>
                          <td className="p-4 text-primary font-medium">{comparisons[1].ingredients}</td>
                        </tr>
                        <tr className="border-t border-border">
                          <td className="p-4 font-medium">Artificial Additives</td>
                          <td className="p-4 text-muted-foreground">{comparisons[0].additives}</td>
                          <td className="p-4 text-primary font-medium">{comparisons[1].additives}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-gradient-to-br from-accent/5 to-background">
          <div className="container mx-auto px-4">
            <Card className="max-w-2xl mx-auto border-0 shadow-subtle rounded-xl">
              <CardContent className="p-8 md:p-12 text-center">
                <h2 className="text-3xl mb-4">Experience the Difference</h2>
                <p className="text-muted-foreground mb-8">
                  Taste what real ingredients can do for your recovery
                </p>
                <Button 
                  size="lg"
                  onClick={() => {
                    navigate("/");
                    setTimeout(() => scrollToSection('products'), 150);
                  }}
                  className="rounded-xl shadow-subtle"
                >
                  Shop Now
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
    </div>
  );
}
