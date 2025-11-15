import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { ShoppingCart, Bell, Mail } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchProducts, getProductStatus, getProductPrice, getProductVariantId, formatPrice } from "@/lib/shopify";
import { useCartStore } from "@/stores/cartStore";
import { SeasonalDrinksSkeleton } from "@/components/SeasonalDrinksSkeleton";
import seasonal1 from "@/assets/seasonal-1.png";
import seasonal2 from "@/assets/seasonal-2.png";
import seasonal3 from "@/assets/seasonal-3.png";
import seasonal4 from "@/assets/seasonal-4.png";

// Mapping configuration (only this stays hardcoded)
const SEASONAL_PRODUCT_CONFIG = [
  {
    season: "Winter",
    shopifyHandle: "recovery-cocoa",
    fallbackImage: seasonal1,
    fallbackName: "Recovery Cocoa",
    fallbackDescription: "Comforting warmth meets deep hydration",
    expectedLaunch: null,
  },
  {
    season: "Spring",
    shopifyHandle: "restore-latte",
    fallbackImage: seasonal2,
    fallbackName: "Restore Latte",
    fallbackDescription: "Smooth energy and grounding calm",
    expectedLaunch: "March 2025",
  },
  {
    season: "Summer",
    shopifyHandle: "hydration-elixir",
    fallbackImage: seasonal3,
    fallbackName: "Hydration Elixir",
    fallbackDescription: "Cool, light, and mineral-rich refreshment",
    expectedLaunch: "June 2025",
  },
  {
    season: "Autumn",
    shopifyHandle: "rebalance-chai",
    fallbackImage: seasonal4,
    fallbackName: "Rebalance Chai",
    fallbackDescription: "Spice, calm, and gentle renewal",
    expectedLaunch: "September 2025",
  },
];

export const SeasonalDrinks = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { addItem } = useCartStore();

  // Fetch all products from Shopify
  const { data: shopifyProducts, isLoading, error } = useQuery({
    queryKey: ['seasonal-products'],
    queryFn: fetchProducts,
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes
    refetchOnWindowFocus: true, // Refresh when user returns to tab
  });

  // Map config to Shopify data
  const seasons = SEASONAL_PRODUCT_CONFIG.map(config => {
    const shopifyProduct = shopifyProducts?.find(
      p => p.handle === config.shopifyHandle
    );

    // Determine status from Shopify inventory
    const status = getProductStatus(shopifyProduct);
    const price = getProductPrice(shopifyProduct);
    const variantId = getProductVariantId(shopifyProduct);

    return {
      season: config.season,
      // Use Shopify data if available, fallback to config
      name: shopifyProduct?.title || config.fallbackName,
      description: shopifyProduct?.description || config.fallbackDescription,
      image: shopifyProduct?.images?.[0]?.url || config.fallbackImage,
      handle: config.shopifyHandle,
      status,
      price,
      variantId,
      shopifyProduct,
      expectedLaunch: config.expectedLaunch,
    };
  });

  const handleCardClick = (drink: any) => {
    setSelectedProduct(drink);
    if (drink.status === 'available') {
      handleAddToCart(drink);
    } else {
      setIsDialogOpen(true);
    }
  };

  const handleAddToCart = (drink: any) => {
    if (!drink.variantId || !drink.price) {
      toast.error('Unable to add item to cart', {
        description: 'Product variant not available'
      });
      return;
    }

    addItem({
      id: drink.variantId,
      title: drink.name,
      price: drink.price,
      quantity: 1,
      image: typeof drink.image === 'string' ? drink.image : drink.image?.src || '',
      variantId: drink.variantId,
      handle: drink.handle
    });

    toast.success(`${drink.name} added to cart!`, {
      description: "Ready to checkout when you are"
    });
  };

  const handleNotificationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProduct || !email) return;

    setIsSubmitting(true);
    
    try {
      // Simulate API call - replace with your actual endpoint
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const isRestock = selectedProduct.status === 'sold-out';
      const message = isRestock 
        ? `We'll email you at ${email} when ${selectedProduct.name} is back in stock`
        : `You're on the waitlist! We'll email you when ${selectedProduct.name} launches`;
      
      toast.success(isRestock ? "You're on the list!" : "Welcome to the waitlist!", {
        description: message
      });
      
      // Reset form
      setEmail("");
      setName("");
      setIsDialogOpen(false);
      setSelectedProduct(null);
      
    } catch (error) {
      toast.error("Something went wrong", {
        description: "Please try again or contact support"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return <SeasonalDrinksSkeleton />;
  }

  if (error) {
    return (
      <div className="py-20 bg-[#f5efea]">
        <div className="container mx-auto px-4">
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4">
              Unable to load seasonal products. Please try again.
            </p>
            <Button onClick={() => window.location.reload()}>
              Retry
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <section className="py-20 bg-[#f5efea]">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Enhanced Section Header */}
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl md:text-5xl lg:text-6xl mb-6 font-bold tracking-tight" style={{ color: '#1c1c1c' }}>
              Rituals for Every Season
            </h2>
            <p className="text-lg md:text-xl max-w-3xl mx-auto leading-relaxed" style={{ color: '#1c1c1c', opacity: 0.7 }}>
              Each drink visually distinguished yet cohesive — adds rhythm and variety like a well-curated collection
            </p>
          </div>

          {/* Enhanced Seasonal Drinks Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {seasons.map((drink, index) => (
              <Card
                key={index}
                className={cn(
                  "border-0 shadow-lg hover:shadow-2xl transition-all duration-500 ease-out",
                  "rounded-2xl overflow-hidden group cursor-pointer",
                  "hover:scale-105 hover:-translate-y-2",
                  "animate-fade-in h-full flex flex-col",
                  // Alternating backgrounds
                  index % 2 === 0 ? "bg-[#d8c5b1]" : "bg-[#c7bcb1]"
                )}
                style={{ animationDelay: `${index * 0.15}s` }}
                onClick={() => handleCardClick(drink)}
              >
                {/* Enhanced Image with Overlay */}
                <div className="aspect-square overflow-hidden relative rounded-t-2xl">
                  {/* Gradient overlay for better badge visibility */}
                  <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-transparent z-10" />
                  
                  <img 
                    src={drink.image} 
                    alt={`${drink.season} - ${drink.name}`}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                  />
                  
                  {drink.status && (
                    <div className="absolute top-4 right-4 z-20">
                      <Badge 
                        variant={drink.status === "sold-out" ? "destructive" : "secondary"}
                        className={cn(
                          "text-xs font-bold uppercase tracking-wider px-3 py-1",
                          "backdrop-blur-sm shadow-lg border-0",
                          drink.status === "coming-soon" && "bg-gradient-to-r from-amber-400 to-orange-400 text-white hover:from-amber-500 hover:to-orange-500",
                          drink.status === "sold-out" && "animate-pulse"
                        )}
                        aria-label={`Product status: ${drink.status === "sold-out" ? "Sold Out" : "Coming Soon"}`}
                      >
                        {drink.status === "sold-out" ? "Sold Out" : "Coming Soon"}
                      </Badge>
                    </div>
                  )}
                </div>

                {/* Enhanced Content */}
                <CardContent className="p-6 text-center space-y-3 flex-1 flex flex-col">
                  {/* Enhanced Season Badge */}
                  <div className="inline-block">
                    <span className="text-xs uppercase tracking-widest font-semibold px-3 py-1 rounded-full"
                          style={{ 
                            color: '#1c1c1c',
                            backgroundColor: 'rgba(255, 255, 255, 0.4)' 
                          }}>
                      {drink.season}
                    </span>
                  </div>
                  
                  {/* Enhanced Product Name */}
                  <h3 className="text-xl md:text-2xl font-bold tracking-tight leading-tight group-hover:scale-105 transition-all duration-300"
                      style={{ color: '#1c1c1c' }}>
                    {drink.name}
                  </h3>
                  
                  {/* Enhanced Description */}
                  <p className="text-sm md:text-base leading-relaxed font-medium flex-1"
                     style={{ 
                       color: '#1c1c1c', 
                       opacity: 0.8,
                       lineHeight: '1.6' 
                     }}>
                    {drink.description}
                  </p>

                  {/* Dynamic Action Button */}
                  <div className="pt-4">
                    {drink.status === "available" && (
                      <Button 
                        className="w-full group-hover:scale-105 transition-transform min-h-[44px]"
                        style={{ 
                          backgroundColor: '#8b5e46', 
                          color: '#f5efea' 
                        }}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAddToCart(drink);
                        }}
                      >
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        Add to Cart - {formatPrice(drink.price)}
                      </Button>
                    )}

                    {drink.status === "sold-out" && (
                      <Button 
                        variant="secondary"
                        className="w-full group-hover:scale-105 transition-transform bg-white/60 hover:bg-white/80 min-h-[44px]"
                        style={{ color: '#1c1c1c' }}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCardClick(drink);
                        }}
                      >
                        <Bell className="w-4 h-4 mr-2" />
                        Notify Me When Back
                      </Button>
                    )}
                    
                    {drink.status === "coming-soon" && (
                      <div className="space-y-2">
                        <Button 
                          variant="outline"
                          className="w-full group-hover:scale-105 transition-transform border-2 bg-white/20 hover:bg-white/40 min-h-[44px]"
                          style={{ 
                            color: '#1c1c1c', 
                            borderColor: 'rgba(28, 28, 28, 0.3)' 
                          }}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleCardClick(drink);
                          }}
                        >
                          <Mail className="w-4 h-4 mr-2" />
                          Join Waitlist
                        </Button>
                        {drink.expectedLaunch && (
                          <p className="text-xs text-center opacity-70" style={{ color: '#1c1c1c' }}>
                            Expected: {drink.expectedLaunch}
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Notification/Waitlist Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-md mx-auto">
          <DialogHeader>
            <DialogTitle>
              {selectedProduct?.status === 'sold-out' ? 'Get Notified' : 'Join the Waitlist'}
            </DialogTitle>
            <DialogDescription>
              {selectedProduct?.status === 'sold-out' 
                ? `We'll email you as soon as ${selectedProduct?.name} is back in stock`
                : `Be the first to know when ${selectedProduct?.name} launches`
              }
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleNotificationSubmit} className="space-y-4">
            <div>
              <Label htmlFor="email">Email Address</Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mt-1"
              />
            </div>
            
            <div>
              <Label htmlFor="name">First Name (Optional)</Label>
              <Input 
                id="name" 
                type="text" 
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1"
              />
            </div>
            
            <DialogFooter className="gap-2">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setIsDialogOpen(false)}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button 
                type="submit"
                disabled={isSubmitting || !email}
                className="min-w-[120px]"
              >
                {isSubmitting ? (
                  "Adding..."
                ) : selectedProduct?.status === 'sold-out' ? (
                  'Notify Me'
                ) : (
                  'Join Waitlist'
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </section>
  );
};
