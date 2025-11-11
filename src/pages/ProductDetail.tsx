import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ShoppingCart } from "lucide-react";
import { fetchProductByHandle } from "@/lib/mockData";
import { useCartStore, Product } from "@/stores/cartStore";
import { toast } from "sonner";
import { CartDrawer } from "@/components/CartDrawer";
import { HowItWorks } from "@/components/HowItWorks";
import { WhatsInside } from "@/components/WhatsInside";
import { SocialProof } from "@/components/SocialProof";
import { BrandStory } from "@/components/BrandStory";
import { FAQ } from "@/components/FAQ";

export default function ProductDetail() {
  const { handle } = useParams<{ handle: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedVariant, setSelectedVariant] = useState<any>(null);
  const [quantity, setQuantity] = useState(1);
  const addItem = useCartStore(state => state.addItem);

  useEffect(() => {
    if (handle) {
      loadProduct();
    } else {
      // If no handle, create a default Recovery Cocoa product
      const defaultProduct = {
        id: "recovery-cocoa",
        title: "Recovery Cocoa",
        handle: "recovery-cocoa",
        description: "FuelHaus blends real cocoa with electrolytes and magnesium for hydration and calm",
        images: [],
        price: { amount: "21.99", currencyCode: "GBP" },
        variants: [{ id: "default", title: "Default", availableForSale: true, price: { amount: "21.99", currencyCode: "GBP" }, selectedOptions: [] }],
        options: []
      };
      setProduct(defaultProduct);
      setSelectedVariant(defaultProduct.variants[0]);
      setLoading(false);
    }
  }, [handle]);

  const loadProduct = async () => {
    try {
      setLoading(true);
      const data = await fetchProductByHandle(handle!);
      
      if (data) {
        // Use real Shopify product data if found
        setProduct(data);
        if (data?.variants?.[0]) {
          setSelectedVariant(data.variants[0]);
        }
      } else {
        // Fallback to hardcoded Recovery Cocoa if Shopify product not found
        const defaultProduct = {
          id: "recovery-cocoa",
          title: "Recovery Cocoa",
          handle: handle!,
          description: "FuelHaus blends real cocoa with electrolytes and magnesium for hydration and calm",
          images: [],
          price: { amount: "21.99", currencyCode: "GBP" },
          variants: [{ id: "default", title: "Default", availableForSale: true, price: { amount: "21.99", currencyCode: "GBP" }, selectedOptions: [] }],
          options: []
        };
        setProduct(defaultProduct);
        setSelectedVariant(defaultProduct.variants[0]);
      }
    } catch (error) {
      console.error('Error loading product:', error);
      // Even on API error, show the hardcoded product instead of failing
      const defaultProduct = {
        id: "recovery-cocoa",
        title: "Recovery Cocoa",
        handle: handle!,
        description: "FuelHaus blends real cocoa with electrolytes and magnesium for hydration and calm",
        images: [],
        price: { amount: "21.99", currencyCode: "GBP" },
        variants: [{ id: "default", title: "Default", availableForSale: true, price: { amount: "21.99", currencyCode: "GBP" }, selectedOptions: [] }],
        options: []
      };
      setProduct(defaultProduct);
      setSelectedVariant(defaultProduct.variants[0]);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    if (!product || !selectedVariant) return;

    const cartItem = {
      product: product,
      variantId: selectedVariant.id,
      variantTitle: `${quantity} Bag${quantity > 1 ? 's' : ''}`,
      price: selectedVariant.price || product.price,
      quantity: quantity,
      selectedOptions: selectedVariant.selectedOptions || []
    };

    addItem(cartItem);
    toast.success(`Added ${quantity} bag${quantity > 1 ? 's' : ''} to cart`, { position: 'top-center' });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  if (!product) {
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
            {product.images?.[0] ? (
              <img
                src={product.images[0].url}
                alt={product.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <p className="text-muted-foreground">No image</p>
              </div>
            )}
          </div>

          <div className="flex flex-col gap-6">
            {/* Social Proof Badge */}
            <div className="inline-block px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 w-fit">
              <p className="text-sm text-muted-foreground">Loved by our first 50 testers</p>
            </div>

            {/* Product Title */}
            <h1 className="text-4xl font-bold">{product.title}</h1>

            {/* Pricing */}
            <div className="flex items-center gap-3">
              <span className="text-3xl font-semibold text-primary">
                £{parseFloat(product.price?.amount || "21.99").toFixed(2)}
              </span>
              <span className="text-xl text-muted-foreground line-through">£24.99</span>
            </div>

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

            {/* Add to Cart Button */}
            <Button
              size="lg"
              className="w-full rounded-xl"
              onClick={handleAddToCart}
            >
              <ShoppingCart className="w-5 h-5 mr-2" />
              Add to Cart
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
                  About Recovery Cocoa
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    FuelHaus blends real cocoa with electrolytes and magnesium for hydration and calm — without excess sugar or artificial ingredients. Comfort that actually does something for your body.
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
