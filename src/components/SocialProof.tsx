import { Card, CardContent } from "@/components/ui/card";
import preorderEmails from "@/assets/preorder-emails.png";

const testimonials = [
  {
    text: "Oh wow, this is the best hot chocolate I've ever tried! The subtle taste of coconut and the creaminess were perfectly balanced — the perfect post-run treat. I had mine with pistachio oat milk… heaven!"
  },
  {
    text: "Loved that I could really taste the cocoa — rich and authentic. My partner prefers it sweeter, but for me it was perfect. So satisfying after a long bike ride"
  },
  {
    text: "So easy to mix and silky smooth — great taste too. It's smooth, easy to mix — no lumps, even with a spoon — and I like that it's made with healthier, more natural ingredients."
  }
];

export const SocialProof = () => {
  return (
    <section className="py-20" style={{ backgroundColor: '#d8c5b1' }}>
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Enhanced header section */}
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl md:text-5xl lg:text-6xl mb-4 font-bold" style={{ color: '#1c1c1c' }}>
              The First Drop Sold Out
            </h2>
            <p className="text-xl md:text-2xl" style={{ color: '#1c1c1c', opacity: 0.8 }}>
              The Haus spoke — every pack was gone in days
            </p>
          </div>

          {/* Two-column layout - Adjusted proportions: 45% testimonials / 55% screenshot */}
          <div className="grid grid-cols-1 md:grid-cols-[45%_55%] gap-8 md:gap-12 mb-16">
            {/* Left Column: Testimonials - Condensed */}
            <div className="space-y-4 order-2 md:order-1">
              {testimonials.slice(0, 3).map((testimonial, index) => (
                <Card 
                  key={index}
                  className="border-0 bg-card shadow-subtle hover:shadow-lg transition-all duration-300 animate-fade-in rounded-xl"
                  style={{ 
                    animationDelay: `${index * 0.1}s`,
                    backgroundColor: 'rgba(255, 255, 255, 0.9)'
                  }}
                >
                  <CardContent className="p-5">
                    <p className="text-sm leading-relaxed italic" style={{ color: '#1c1c1c' }}>
                      "{testimonial.text}"
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Right Column: Pre-order Screenshot - ENLARGED */}
            <div className="flex items-center justify-center md:justify-end order-1 md:order-2">
              <div className="relative group w-full">
                {/* Decorative background glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 rounded-2xl blur-2xl opacity-50 group-hover:opacity-70 transition-opacity" />
                
                {/* Screenshot Image - ENLARGED */}
                <img 
                  src={preorderEmails}
                  alt="Recent pre-order confirmations from happy customers"
                  className="relative w-full h-auto min-h-[400px] md:min-h-[600px] rounded-2xl border border-black/5 shadow-[0_20px_50px_rgba(0,0,0,0.15)] rotate-1 hover:rotate-0 hover:scale-110 hover:-translate-y-2 transition-all duration-500 ease-out object-contain"
                />
                
                {/* Caption below */}
                <p className="text-center text-sm text-muted-foreground mt-4 italic" style={{ color: '#1c1c1c', opacity: 0.7 }}>
                  Real pre-orders from our first drop
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
