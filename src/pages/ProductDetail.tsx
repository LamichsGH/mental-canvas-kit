import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ShoppingCart } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { fetchProductByHandle, getProductStatus, getProductPrice, getProductVariantId, formatPrice } from "@/lib/shopify";
import { useCartStore } from "@/stores/cartStore";
import { toast } from "sonner";
import { useState } from "react";
import { CartDrawer } from "@/components/CartDrawer";
import { HowItWorks } from "@/components/HowItWorks";
import { WhatsInside } from "@/components/WhatsInside";
import { SocialProof } from "@/components/SocialProof";
import { BrandStory } from "@/components/BrandStory";
import { FAQ } from "@/components/FAQ";

export default function ProductDetail() {
  const { handle } = useParams<{ handle: string }>();
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCartStore();

  // Fetch product from Shopify
  const { data: product, isLoading, error } = useQuery({
    queryKey: ['product', handle],
    queryFn: () => fetchProductByHandle(handle || 'recovery-cocoa'),
    enabled: !!handle,
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes
  });

  // Fallback product data for Recovery Cocoa
  const fallbackProduct = {
    id: "recovery-cocoa",
    title: "Recovery Cocoa",
    handle: handle || "recovery-cocoa",
    description: "FuelHaus blends real cocoa with electrolytes and magnesium for hydration and calm — without excess sugar or artificial ingredients. Comfort that actually does something for your body.",
    images: [],
    price: { amount: "21.99", currencyCode: "GBP" },
    variants: [{ 
      id: "gid://shopify/ProductVariant/recovery-cocoa-default", 
      title: "Default", 
      availableForSale: true, 
      price: { amount: "21.99", currencyCode: "GBP" }, 
      selectedOptions: [] 
    }],
    options: []
  };

  // Use Shopify data if available, otherwise fallback
  const productData = product || fallbackProduct;
  const productStatus = getProductStatus(product);
  const productPrice = getProductPrice(product) || 21.99;
  const variantId = getProductVariantId(product) || "gid://shopify/ProductVariant/recovery-cocoa-default";

  const handleAddToCart = () => {
    if (!productData) return;

    const cartItem = {
      id: variantId,
      title: productData.title,
      price: productPrice,
      quantity: quantity,
      image: productData.images?.[0]?.url || '',
      variantId: variantId,
      handle: productData.handle
    };

    addItem(cartItem);
    toast.success(`Added ${quantity} ${productData.title} to cart`, { position: 'top-center' });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Loading product...</p>
      </div>
    );
  }

  if (error && !handle) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground mb-4">Product not found</p>
          <Link to="/">
            <Button variant="outline">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Store
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Store
            </Button>
          </Link>
          <img 
            src="/logo.png?v=4" 
            alt="Fuel Haus" 
            className="h-28 md:h-32 w-auto object-contain"
          />
          <CartDrawer />
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <div className="aspect-square bg-secondary/30 rounded-2xl overflow-hidden shadow-lg">
            {productData.images?.[0] ? (
              <img
                src={productData.images[0].url}
                alt={productData.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <p className="text-muted-foreground">No image available</p>
              </div>
            )}
          </div>

          <div className="flex flex-col gap-6">
            {/* Social Proof Badge */}
            <div className="inline-block px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 w-fit">
              <p className="text-sm text-muted-foreground">Loved by our first 50 testers</p>
            </div>

            {/* Dynamic Product Title */}
            <h1 className="text-4xl font-bold">{productData.title}</h1>

            {/* Dynamic Pricing */}
            <div className="flex items-center gap-3">
              <span className="text-3xl font-semibold text-primary">
                {formatPrice(productPrice, productData.price?.currencyCode || 'GBP')}
              </span>
              {productStatus === 'available' && (
                <span className="text-xl text-muted-foreground line-through">£24.99</span>
              )}
            </div>

            {/* Product Status */}
            {productStatus !== 'available' && (
              <div className="inline-block px-4 py-2 rounded-lg bg-secondary/20 w-fit">
                <p className="text-sm font-medium">
                  {productStatus === 'sold-out' ? 'Currently Sold Out' : 'Coming Soon'}
                </p>
              </div>
            )}

            {/* Product Benefits */}
            <div>
              <h2 className="text-lg font-semibold mb-3">Benefits</h2>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-muted-foreground">
                  <span className="text-primary mt-2">•</span>
                  <span>Hydrates & restores with essential electrolytes</span>
                </li>
                <li className="flex items-start gap-2 text-muted-foreground">
                  <span className="text-primary mt-2">•</span>
                  <span>Supports calm recovery after workouts or long days</span>
                </li>
                <li className="flex items-start gap-2 text-muted-foreground">
                  <span className="text-primary mt-2">•</span>
                  <span>Indulges smarter with organic cacao and natural coconut sweetness</span>
                </li>
                <li className="flex items-start gap-2 text-muted-foreground">
                  <span className="text-primary mt-2">•</span>
                  <span>Balances body and mind — rich in minerals, low in sugar</span>
                </li>
                <li className="flex items-start gap-2 text-muted-foreground">
                  <span className="text-primary mt-2">•</span>
                  <span>Smooth, silky texture that blends easily with water or your favourite milk</span>
                </li>
              </ul>
            </div>

            {/* Quantity Display */}
            <div>
              <h3 className="text-lg font-semibold mb-3">Quantity</h3>
              <div className="p-4 bg-secondary/30 rounded-lg">
                <p className="font-medium">1 Bag (10 Servings)</p>
              </div>
            </div>

            {/* Number of Bags Selector */}
            <div>
              <h3 className="text-lg font-semibold mb-3">Number of Bags</h3>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((num) => (
                  <Button
                    key={num}
                    variant={quantity === num ? "default" : "outline"}
                    size="sm"
                    className="w-12 h-12"
                    onClick={() => setQuantity(num)}
                  >
                    {num}
                  </Button>
                ))}
              </div>
            </div>

            {/* Dynamic Add to Cart Button */}
            <Button
              size="lg"
              className="w-full rounded-xl"
              onClick={handleAddToCart}
              disabled={productStatus !== 'available'}
            >
              <ShoppingCart className="w-5 h-5 mr-2" />
              {productStatus === 'available' ? 'Add to Cart' : 
               productStatus === 'sold-out' ? 'Currently Sold Out' : 
               'Coming Soon'}
            </Button>
            
            <div className="pt-6 border-t">
              <p className="text-sm text-muted-foreground">
                🌿 8 real ingredients • 118 calories • No gums or fillers
              </p>
            </div>
          </div>
        </div>

        {/* About Recovery Cocoa Section */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="bg-card rounded-xl p-8 md:p-12 shadow-subtle">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  About {productData.title}
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    {productData.description || "FuelHaus blends real cocoa with electrolytes and magnesium for hydration and calm — without excess sugar or artificial ingredients. Comfort that actually does something for your body."}
                  </p>
                  <p>
                    Each pouch makes around 10 servings (based on 40g per serving). Completely plant-based, made with organic coconut milk instead of dairy.
                  </p>
                  <p>
                    Our testers rated taste 10/10 — it's rich and smooth, lightly sweetened with coconut sugar, and naturally creamy from organic coconut milk.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Not Your Average Hot Chocolate Section */}
        <section className="py-16 bg-secondary/10">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Not Your Average Hot Chocolate
                </h2>
              </div>

              <div className="bg-card rounded-xl p-8 md:p-12 shadow-subtle">
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-primary text-sm">✓</span>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                      Hydrates & restores with essential electrolytes
                    </p>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-primary text-sm">✓</span>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                      Supports calm recovery after workouts or long days
                    </p>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-primary text-sm">✓</span>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                      Indulges smarter with organic cacao and natural coconut sweetness
                    </p>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-primary text-sm">✓</span>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                      Balances body and mind — rich in minerals, low in sugar
                    </p>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-primary text-sm">✓</span>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                      Smooth, silky texture that blends easily with water or your favourite milk
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Homepage Components */}
        <HowItWorks />
        <WhatsInside />
        <SocialProof />
        <BrandStory />
        <FAQ />
      </main>
    </div>
  );
}
