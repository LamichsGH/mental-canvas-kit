import { Card, CardContent } from "@/components/ui/card";
import { MessageSquareQuote, ShoppingBag, CheckCircle2, Quote, Star } from "lucide-react";
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
    <section className="py-20 relative overflow-hidden" style={{ backgroundColor: '#d8c5b1' }}>
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-amber-200/20 to-transparent rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-orange-200/20 to-transparent rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-7xl mx-auto">
          
          {/* Enhanced header section */}
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl md:text-5xl lg:text-6xl mb-4 font-bold" style={{ color: '#1c1c1c' }}>
              The First Drop Sold Out
            </h2>
            <p className="text-xl md:text-2xl mb-8" style={{ color: '#1c1c1c', opacity: 0.8 }}>
              The Haus spoke — every pack was gone in days
            </p>
            
            {/* Visual separator with icons */}
            <div className="flex items-center justify-center gap-4 mb-12">
              <div className="h-px w-20 bg-gradient-to-r from-transparent to-black/20" />
              <div className="flex gap-2">
                <div className="w-2 h-2 rounded-full bg-amber-600" />
                <div className="w-2 h-2 rounded-full bg-orange-600" />
                <div className="w-2 h-2 rounded-full bg-amber-600" />
              </div>
              <div className="h-px w-20 bg-gradient-to-l from-transparent to-black/20" />
            </div>
          </div>

          {/* Three-section layout: Reviews | Stats | Orders */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            
            {/* LEFT: Customer Reviews Section - 5 columns */}
            <div className="lg:col-span-5 space-y-6">
              {/* Section header with icon */}
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-lg bg-white/40 backdrop-blur-sm">
                  <MessageSquareQuote className="w-5 h-5" style={{ color: '#1c1c1c' }} />
                </div>
                <div>
                  <h3 className="text-lg font-bold" style={{ color: '#1c1c1c' }}>
                    What Customers Say
                  </h3>
                  <p className="text-xs opacity-70" style={{ color: '#1c1c1c' }}>
                    Real feedback from early adopters
                  </p>
                </div>
              </div>
              
              {/* Testimonial cards */}
              <div className="space-y-4">
                {testimonials.slice(0, 3).map((testimonial, index) => (
                  <Card 
                    key={index}
                    className="border-0 shadow-subtle hover:shadow-xl transition-all duration-300 animate-fade-in rounded-xl overflow-hidden group"
                    style={{ 
                      animationDelay: `${index * 0.1}s`,
                      backgroundColor: 'rgba(255, 255, 255, 0.95)'
                    }}
                  >
                    <CardContent className="p-5 relative">
                      {/* Quote icon */}
                      <Quote className="absolute top-3 right-3 w-8 h-8 opacity-10" style={{ color: '#1c1c1c' }} />
                      
                      <p className="text-sm leading-relaxed italic relative z-10" style={{ color: '#1c1c1c' }}>
                        "{testimonial.text}"
                      </p>
                      
                      {/* Rating stars (decorative) */}
                      <div className="flex gap-1 mt-3">
                        {[1, 2, 3, 4, 5].map(star => (
                          <Star key={star} className="w-3 h-3 fill-amber-500 text-amber-500" />
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* MIDDLE: Quick Stats Badge - 2 columns */}
            <div className="lg:col-span-2 flex items-center justify-center">
              <div className="text-center space-y-6 p-6 rounded-2xl bg-white/30 backdrop-blur-sm border-2 border-white/50 shadow-lg">
                {/* Sold out badge */}
                <div className="inline-flex flex-col items-center gap-3">
                  <div className="p-4 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 shadow-lg">
                    <CheckCircle2 className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <p className="text-4xl font-bold mb-1" style={{ color: '#1c1c1c' }}>
                      100%
                    </p>
                    <p className="text-xs uppercase tracking-wider font-semibold opacity-70" style={{ color: '#1c1c1c' }}>
                      Sold Out
                    </p>
                  </div>
                </div>
                
                {/* Divider */}
                <div className="h-px bg-gradient-to-r from-transparent via-black/20 to-transparent" />
                
                {/* Days to sell out */}
                <div>
                  <p className="text-3xl font-bold mb-1" style={{ color: '#1c1c1c' }}>
                    &lt;7
                  </p>
                  <p className="text-xs uppercase tracking-wider font-semibold opacity-70" style={{ color: '#1c1c1c' }}>
                    Days
                  </p>
                </div>
              </div>
            </div>

            {/* RIGHT: Pre-order Screenshots Section - 5 columns */}
            <div className="lg:col-span-5 space-y-4">
              {/* Section header with icon */}
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-lg bg-white/40 backdrop-blur-sm">
                  <ShoppingBag className="w-5 h-5" style={{ color: '#1c1c1c' }} />
                </div>
                <div>
                  <h3 className="text-lg font-bold" style={{ color: '#1c1c1c' }}>
                    Pre-Order Rush
                  </h3>
                  <p className="text-xs opacity-70" style={{ color: '#1c1c1c' }}>
                    Live order confirmations
                  </p>
                </div>
              </div>
              
              {/* Screenshot with verified badge */}
              <div className="relative group">
                {/* Verified badge overlay */}
                <div className="absolute -top-3 -right-3 z-20 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-2 rounded-full shadow-lg font-semibold text-sm flex items-center gap-2 animate-fade-in">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Verified Orders</span>
                </div>
                
                {/* Screenshot image - clean */}
                <img 
                  src={preorderEmails}
                  alt="Recent pre-order confirmations from happy customers"
                  className="w-full h-auto rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.2)] group-hover:shadow-[0_25px_60px_rgba(0,0,0,0.3)] rotate-1 group-hover:rotate-0 group-hover:scale-105 transition-all duration-500 ease-out"
                />
                
                {/* Floating order count badge */}
                <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 bg-white/95 backdrop-blur-sm px-6 py-3 rounded-full shadow-xl border border-black/5 flex items-center gap-2">
                  <div className="flex -space-x-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 border-2 border-white" />
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-400 to-red-500 border-2 border-white" />
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-red-400 to-pink-500 border-2 border-white" />
                  </div>
                  <p className="text-sm font-semibold" style={{ color: '#1c1c1c' }}>
                    50+ orders in 48 hours
                  </p>
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </section>
  );
};
