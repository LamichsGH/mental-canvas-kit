import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, Leaf, Award, Users } from "lucide-react";

const testimonials = [
  {
    text: "Oh wow, this is the best hot chocolate I've ever tried! The subtle taste of coconut and the creaminess were perfectly balanced — the perfect post-run treat. I had mine with pistachio oat milk… heaven! You've created something magical in this mix. The cocoa is smooth and mellow, the packaging is awesome, and the taste is a 10/10. Please don't change a thing!"
  },
  {
    text: "Loved that I could really taste the cocoa — rich and authentic. My partner prefers it sweeter, but for me it was perfect. So satisfying after a long bike ride"
  },
  {
    text: "So easy to mix and silky smooth — great taste too"
  },
  {
    text: "I really love the taste! Most healthier hot chocolates aren't sweet enough for me, but this one is perfectly balanced. It's smooth, easy to mix — no lumps, even with a spoon — and I like that it's made with healthier, more natural ingredients. I also like that you used magnesium glycinate specifically — I find that this form helps with not causing me digestive issues"
  }
];

const trustIndicators = [
  { icon: CheckCircle2, label: "Organic Certified" },
  { icon: Leaf, label: "8 Real Ingredients" },
  { icon: Award, label: "Clean Label" },
  { icon: Users, label: "5,000+ Happy Customers" }
];

export const SocialProof = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-accent/5 to-background">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Main headline */}
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-5xl md:text-6xl lg:text-7xl mb-6 font-extrabold">
              The First Drop Sold Out
            </h2>
            <p className="text-2xl md:text-3xl text-muted-foreground font-semibold">
              The Haus spoke — every pack was gone in days
            </p>
          </div>

          {/* Testimonials Grid - 2 columns on desktop */}
          <div className="grid md:grid-cols-2 gap-6 mb-16">
            {testimonials.map((testimonial, index) => (
              <Card 
                key={index}
                className="border-0 bg-card shadow-subtle hover:shadow-xl transition-all duration-300 animate-fade-in rounded-xl"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-6">
                  <p className="text-foreground leading-relaxed italic font-medium text-lg">"{testimonial.text}"</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Trust indicators */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {trustIndicators.map((indicator, index) => (
              <Card 
                key={index}
                className="border-0 bg-card hover:bg-card/90 transition-all duration-300 shadow-subtle rounded-xl"
              >
                <CardContent className="p-6 text-center">
                  <indicator.icon className="h-8 w-8 mx-auto mb-3 text-primary" strokeWidth={1.5} />
                  <p className="text-sm font-medium text-foreground">{indicator.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
