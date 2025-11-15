import { Leaf, Droplets, Sparkles, Waves, FlowerIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

// Custom SVG Icon Components for Each Ingredient

// Cocoa Beans Icon
const CocoaBeansIcon = ({ className, ...props }) => (
  <svg 
    viewBox="0 0 100 100" 
    className={className} 
    {...props}
    fill="currentColor"
  >
    {/* Cocoa beans arranged in circular pattern */}
    <ellipse cx="50" cy="25" rx="8" ry="15" transform="rotate(10 50 25)" fill="#8B4513"/>
    <ellipse cx="25" cy="40" rx="8" ry="15" transform="rotate(45 25 40)" fill="#A0522D"/>
    <ellipse cx="75" cy="40" rx="8" ry="15" transform="rotate(-45 75 40)" fill="#8B4513"/>
    <ellipse cx="30" cy="70" rx="8" ry="15" transform="rotate(-30 30 70)" fill="#A0522D"/>
    <ellipse cx="70" cy="70" rx="8" ry="15" transform="rotate(30 70 70)" fill="#8B4513"/>
    <ellipse cx="50" cy="50" rx="8" ry="15" transform="rotate(0 50 50)" fill="#A0522D"/>
    <ellipse cx="40" cy="35" rx="6" ry="12" transform="rotate(60 40 35)" fill="#CD853F"/>
    <ellipse cx="60" cy="35" rx="6" ry="12" transform="rotate(-60 60 35)" fill="#CD853F"/>
    <ellipse cx="45" cy="60" rx="6" ry="12" transform="rotate(-15 45 60)" fill="#CD853F"/>
    <ellipse cx="55" cy="60" rx="6" ry="12" transform="rotate(15 55 60)" fill="#CD853F"/>
  </svg>
);

// Coconut Icon
const CoconutIcon = ({ className, ...props }) => (
  <svg 
    viewBox="0 0 100 100" 
    className={className} 
    {...props}
    fill="currentColor"
  >
    {/* Coconut shell */}
    <circle cx="50" cy="50" r="35" fill="#8B4513" stroke="#654321" strokeWidth="2"/>
    {/* Coconut fiber texture */}
    <path d="M20 35 Q30 25 40 35 Q50 25 60 35 Q70 25 80 35" stroke="#A0522D" strokeWidth="1.5" fill="none"/>
    <path d="M15 45 Q25 35 35 45 Q45 35 55 45 Q65 35 75 45 Q85 35 85 45" stroke="#A0522D" strokeWidth="1.5" fill="none"/>
    <path d="M20 55 Q30 45 40 55 Q50 45 60 55 Q70 45 80 55" stroke="#A0522D" strokeWidth="1.5" fill="none"/>
    <path d="M15 65 Q25 55 35 65 Q45 55 55 65 Q65 55 75 65 Q85 55 85 65" stroke="#A0522D" strokeWidth="1.5" fill="none"/>
    {/* Coconut holes */}
    <circle cx="45" cy="35" r="3" fill="#4A4A4A"/>
    <circle cx="55" cy="35" r="3" fill="#4A4A4A"/>
    <ellipse cx="50" cy="45" rx="2" ry="4" fill="#4A4A4A"/>
  </svg>
);

// Magnesium Crystal Icon
const MagnesiumIcon = ({ className, ...props }) => (
  <svg 
    viewBox="0 0 100 100" 
    className={className} 
    {...props}
    fill="currentColor"
  >
    {/* Crystal formations */}
    <polygon points="50,15 65,35 50,55 35,35" fill="#E6E6FA" stroke="#D8BFD8" strokeWidth="1"/>
    <polygon points="25,25 40,40 25,55 10,40" fill="#DDA0DD" stroke="#DA70D6" strokeWidth="1"/>
    <polygon points="75,25 90,40 75,55 60,40" fill="#DDA0DD" stroke="#DA70D6" strokeWidth="1"/>
    <polygon points="35,60 50,75 65,60 50,85" fill="#E6E6FA" stroke="#D8BFD8" strokeWidth="1"/>
    <polygon points="20,65 35,80 20,85 15,75" fill="#F0E68C" stroke="#DAA520" strokeWidth="1"/>
    <polygon points="80,65 85,75 80,85 65,80" fill="#F0E68C" stroke="#DAA520" strokeWidth="1"/>
    {/* Sparkle effects */}
    <circle cx="30" cy="30" r="1.5" fill="#FFFFFF"/>
    <circle cx="70" cy="30" r="1.5" fill="#FFFFFF"/>
    <circle cx="50" cy="70" r="1.5" fill="#FFFFFF"/>
  </svg>
);

// Sea Salt Icon
const SeaSaltIcon = ({ className, ...props }) => (
  <svg 
    viewBox="0 0 100 100" 
    className={className} 
    {...props}
    fill="currentColor"
  >
    {/* Salt crystals scattered */}
    <rect x="20" y="25" width="8" height="8" rx="1" fill="#F5F5F5" transform="rotate(15 24 29)"/>
    <rect x="40" y="20" width="10" height="10" rx="1" fill="#FFFFFF" transform="rotate(-10 45 25)"/>
    <rect x="65" y="30" width="7" height="7" rx="1" fill="#F5F5F5" transform="rotate(25 68.5 33.5)"/>
    <rect x="30" y="45" width="9" height="9" rx="1" fill="#FFFFFF" transform="rotate(-20 34.5 49.5)"/>
    <rect x="55" y="50" width="12" height="12" rx="1" fill="#F5F5F5" transform="rotate(5 61 56)"/>
    <rect x="75" y="55" width="6" height="6" rx="1" fill="#FFFFFF" transform="rotate(30 78 58)"/>
    <rect x="25" y="65" width="8" height="8" rx="1" fill="#F5F5F5" transform="rotate(-15 29 69)"/>
    <rect x="50" y="70" width="10" height="10" rx="1" fill="#FFFFFF" transform="rotate(20 55 75)"/>
    <rect x="15" y="50" width="7" height="7" rx="1" fill="#FFFFFF" transform="rotate(45 18.5 53.5)"/>
    <rect x="80" y="40" width="9" height="9" rx="1" fill="#F5F5F5" transform="rotate(-25 84.5 44.5)"/>
    {/* Wave pattern background */}
    <path d="M10 80 Q25 75 40 80 Q55 85 70 80 Q85 75 90 80" stroke="#E0F6FF" strokeWidth="2" fill="none" opacity="0.5"/>
  </svg>
);

// Vanilla Bean Icon
const VanillaBeanIcon = ({ className, ...props }) => (
  <svg 
    viewBox="0 0 100 100" 
    className={className} 
    {...props}
    fill="currentColor"
  >
    {/* Main vanilla beans */}
    <ellipse cx="35" cy="50" rx="3" ry="25" fill="#3C1810" transform="rotate(-10 35 50)"/>
    <ellipse cx="50" cy="50" rx="3" ry="25" fill="#2C1005" transform="rotate(5 50 50)"/>
    <ellipse cx="65" cy="50" rx="3" ry="25" fill="#3C1810" transform="rotate(10 65 50)"/>
    {/* Bean details/splits */}
    <line x1="35" y1="30" x2="35" y2="70" stroke="#8B4513" strokeWidth="0.5" transform="rotate(-10 35 50)"/>
    <line x1="50" y1="30" x2="50" y2="70" stroke="#8B4513" strokeWidth="0.5" transform="rotate(5 50 50)"/>
    <line x1="65" y1="30" x2="65" y2="70" stroke="#8B4513" strokeWidth="0.5" transform="rotate(10 65 50)"/>
    {/* Vanilla flower accent */}
    <circle cx="50" cy="20" r="8" fill="#F5F5DC" stroke="#DDD" strokeWidth="1"/>
    <circle cx="46" cy="17" r="2" fill="#FFE4B5"/>
    <circle cx="54" cy="17" r="2" fill="#FFE4B5"/>
    <circle cx="50" cy="24" r="2" fill="#FFE4B5"/>
    <circle cx="43" cy="22" r="1.5" fill="#FFE4B5"/>
    <circle cx="57" cy="22" r="1.5" fill="#FFE4B5"/>
  </svg>
);

const ingredients = [
  {
    name: "Organic Cocoa",
    benefit: "Rich in antioxidants and natural magnesium to support relaxation and restore balance — plus that smooth, indulgent flavor you crave",
    icon: CocoaBeansIcon,
  },
  {
    name: "Organic Coconut Milk",
    benefit: "Adds creamy texture and healthy fats for comfort and satisfaction without dairy",
    icon: CoconutIcon,
  },
  {
    name: "Magnesium Glycinate",
    benefit: "Known for its calming properties and gentle digestion support — helps ease tension and restore",
    icon: MagnesiumIcon,
  },
  {
    name: "Sea Salt",
    benefit: "Naturally replenishes lost minerals to keep your body balanced and calm",
    icon: SeaSaltIcon,
  },
  {
    name: "Vanilla Bean",
    benefit: "Rounds out the flavor with natural warmth and aroma, adding a touch of indulgence to every sip",
    icon: VanillaBeanIcon,
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
