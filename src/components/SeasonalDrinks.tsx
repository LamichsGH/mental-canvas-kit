import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import seasonal1 from "@/assets/seasonal-1.png";
import seasonal2 from "@/assets/seasonal-2.png";
import seasonal3 from "@/assets/seasonal-3.png";
import seasonal4 from "@/assets/seasonal-4.png";

const seasons = [
  {
    season: "Winter",
    name: "Recovery Cocoa",
    description: "Comforting warmth meets deep hydration",
    color: "from-amber-900/30 to-orange-800/20",
    image: seasonal1,
    status: "sold-out" as const
  },
  {
    season: "Spring",
    name: "Restore Latte",
    description: "Smooth energy and grounding calm",
    color: "from-amber-100/50 to-yellow-50/30",
    image: seasonal2,
    status: "coming-soon" as const
  },
  {
    season: "Summer",
    name: "Hydration Elixir",
    description: "Cool, light, and mineral-rich refreshment",
    color: "from-cyan-100/40 to-teal-50/30",
    image: seasonal3,
    status: "coming-soon" as const
  },
  {
    season: "Autumn",
    name: "Rebalance Chai",
    description: "Spice, calm, and gentle renewal",
    color: "from-orange-200/40 to-amber-100/30",
    image: seasonal4,
    status: "coming-soon" as const
  }
];

export const SeasonalDrinks = () => {
  return (
    <section className="py-20 bg-secondary/10">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Headlines */}
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl md:text-5xl mb-4 font-bold">
              Rituals for Every Season
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              From cozy winter cocoas to bright summer blends — new ways to restore, hydrate, and unwind are on their way
            </p>
          </div>

          {/* Seasonal Drinks Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {seasons.map((drink, index) => (
              <Card
                key={index}
                className="border-0 bg-card shadow-subtle hover:shadow-xl transition-all duration-300 animate-fade-in rounded-xl overflow-hidden"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Drink Image */}
                <div className="aspect-square overflow-hidden relative">
                  <img 
                    src={drink.image} 
                    alt={`${drink.season} - ${drink.name}`}
                    className="w-full h-full object-cover"
                  />
                  {drink.status && (
                    <div className="absolute top-3 right-3">
                      <Badge 
                        variant={drink.status === "sold-out" ? "destructive" : "secondary"}
                        className="text-xs font-semibold uppercase tracking-wide"
                      >
                        {drink.status === "sold-out" ? "Sold Out" : "Coming Soon"}
                      </Badge>
                    </div>
                  )}
                </div>

                {/* Content */}
                <CardContent className="p-6 text-center">
                  <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2">
                    {drink.season}
                  </p>
                  <h3 className="text-xl font-bold mb-3 text-foreground">
                    {drink.name}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {drink.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
