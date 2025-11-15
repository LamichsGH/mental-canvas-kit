import { Leaf, Coffee, Scale } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const values = [
  {
    icon: Leaf,
    title: "Clean, Honest Ingredients",
    description: "Made with real, natural ingredients — organic wherever possible — because better hydration starts clean",
  },
  {
    icon: Coffee,
    title: "Healthy Indulgence",
    description: "Tastes like a treat, nourishes like a ritual. You'll think you're indulging — your body knows better",
  },
  {
    icon: Scale,
    title: "Balanced Nourishment",
    description: "Low in calories, rich in feel-good balance — just enough to restore, never enough to weigh you down",
  },
];

export const ValueProps = () => {
  return (
    <section className="py-20 md:py-32" style={{ backgroundColor: '#c7cbc1' }}>
      <div className="container mx-auto px-6 md:px-10 max-w-7xl">
        <div className="text-center mb-12 md:mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold" style={{ color: '#1c1c1c' }}>
            Designed to Hydrate Softly
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 max-w-6xl mx-auto">
          {values.map((value, index) => (
            <Card 
              key={index} 
              className="border hover:shadow-2xl transition-all duration-500 animate-fade-in h-full"
              style={{ 
                animationDelay: `${index * 0.1}s`,
                backgroundColor: '#FFFFFF',
                boxShadow: '0 8px 32px rgba(139, 94, 70, 0.12)',
                borderRadius: '24px',
                border: '1px solid rgba(139, 94, 70, 0.08)'
              }}
            >
              <CardContent className="p-8 md:p-12 text-center h-full flex flex-col">
                <div className="w-16 h-16 mx-auto mb-8 flex items-center justify-center">
                  <value.icon className="w-16 h-16" style={{ color: '#8b5e46' }} strokeWidth={1.5} />
                </div>
                <h3 className="text-xl md:text-2xl mb-4 font-semibold" style={{ color: '#1c1c1c' }}>
                  {value.title}
                </h3>
                <p className="text-base leading-relaxed flex-grow" style={{ 
                  color: '#4a4a4a',
                  lineHeight: '1.7'
                }}>
                  {value.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
