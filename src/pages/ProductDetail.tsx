import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ShoppingCart, Instagram, Facebook } from "lucide-react";
import { scrollToSection } from "@/lib/scroll";
import { useQuery } from "@tanstack/react-query";
import { fetchProductByHandle, getProductStatus, getProductPrice, getProductVariantId, formatPrice } from "@/lib/shopify";
import { useCartStore } from "@/stores/cartStore";
import { toast } from "sonner";
import { useState } from "react";
import { CartDrawer } from "@/components/CartDrawer";
import { HowItWorks } from "@/components/HowItWorks";
import { WhatsInside } from "@/components/WhatsInside";
import { SocialProof } from "@/components/SocialProof";
import { FAQ } from "@/components/FAQ";
import { SectionDivider } from "@/components/SectionDivider";
import { ScrollReveal } from "@/components/ScrollReveal";
import cocoaLifestyle from "@/assets/cocoa-lifestyle-new.jpg";
import cocoaPreparation from "@/assets/cocoa-preparation.png";
import ingredientCocoa from "@/assets/ingredient-cocoa.jpg";
import ingredientCoconut from "@/assets/ingredient-coconut.jpg";
import ingredientMagnesium from "@/assets/ingredient-magnesium.jpg";
import ingredientSeaSalt from "@/assets/ingredient-sea-salt.jpg";
import ingredientVanilla from "@/assets/ingredient-vanilla.jpg";
import brandStoryImage from "@/assets/brand-story-image.png";

export default function ProductDetail() {
  const { handle } = useParams<{ handle: string }>();
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCartStore();

  // Fetch product from Shopify
  const { data: product, isLoading, error } = useQuery({
    queryKey: ['product', handle || 'recovery-cocoa'],
    queryFn: () => fetchProductByHandle(handle || 'recovery-cocoa'),
    enabled: true, // Always try to fetch, using fallback handle if needed
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes
    retry: 1, // Only retry once to avoid long loading times
  });

  // Fallback product data for Recovery Cocoa
  const fallbackProduct = {
    id: "recovery-cocoa",
    title: "Recovery Cocoa",
    handle: handle || "recovery-cocoa",
    description: "FuelHaus blends real cocoa with electrolytes and magnesium for hydration and calm — without excess sugar or artificial ingredients. Comfort that actually does something for your body.",
    images: [
      { url: cocoaLifestyle, altText: "Recovery Cocoa - Lifestyle shot" },
      { url: cocoaPreparation, altText: "Recovery Cocoa - Preparation" }
    ],
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
  const productStatus = getProductStatus(product) || 'available'; // Default to available if no Shopify data
  const productPrice = getProductPrice(product) || 21.99;
  const variantId = getProductVariantId(product) || "gid://shopify/ProductVariant/recovery-cocoa-default";
  

  const handleAddToCart = () => {
    if (!productData) return;

    const cartItem = {
      id: variantId,
      title: productData.title,
      price: productPrice,
      quantity: quantity,
      image: productData.images?.[0]?.url || cocoaLifestyle,
      variantId: variantId,
      handle: productData.handle
    };

    addItem(cartItem);
    toast.success(`Added ${quantity} ${productData.title} to cart!`);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#f5efea' }}>
        <p style={{ color: '#6b5d52' }}>Loading product...</p>
      </div>
    );
  }

  // Only show error if we have no fallback data and a critical error
  if (error && !product && !fallbackProduct) {
    console.warn('Shopify product fetch failed, but fallback available:', error);
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#f5efea' }}>
      <header className="sticky top-0 z-50 border-b backdrop-blur" 
              style={{ backgroundColor: 'rgba(245, 239, 234, 0.95)', borderColor: '#d8c8b1' }}>
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/">
            <Button 
              variant="ghost" 
              size="sm"
              style={{ color: '#4a4a4a' }}
              onMouseEnter={(e) => e.currentTarget.style.color = '#8b5e46'}
              onMouseLeave={(e) => e.currentTarget.style.color = '#4a4a4a'}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Store
            </Button>
          </Link>
          <img 
            src="/logo.png?v=4" 
            alt="Fuel Haus" 
            className="h-20 w-auto object-contain"
          />
          <CartDrawer />
        </div>
      </header>

      <main>
        {/* PRODUCT HERO SECTION - BROWN BACKGROUND */}
        <section className="py-16 md:py-20" style={{ backgroundColor: '#8b5e46' }}>
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-8 md:gap-12 max-w-6xl mx-auto items-center">
              
              {/* LEFT: Product Images */}
              <div className="space-y-4">
                {/* Main Product Image */}
                <div className="aspect-square rounded-2xl overflow-hidden shadow-xl" 
                     style={{ border: '4px solid #f5efea' }}>
                  {productData.images?.[0] ? (
                    <img
                      src={productData.images[0].url}
                      alt={productData.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <img
                      src={cocoaLifestyle}
                      alt={productData.title}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
                
                {/* Thumbnail Gallery */}
                {productData.images && productData.images.length > 1 && (
                  <div className="grid grid-cols-4 gap-3">
                    {productData.images.slice(0, 4).map((image: any, idx: number) => (
                      <div 
                        key={idx}
                        className="aspect-square rounded-lg overflow-hidden cursor-pointer hover:opacity-75 transition-opacity shadow-md"
                        style={{ border: '2px solid #f5efea' }}
                      >
                        <img
                          src={image.url}
                          alt={`${productData.title} view ${idx + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* RIGHT: Product Details */}
              <div className="flex flex-col gap-6">
                {/* Social Proof Badge - BOLDED */}
                <div className="inline-block px-4 py-2 rounded-full w-fit" 
                     style={{ backgroundColor: 'rgba(245, 239, 234, 0.2)', border: '1px solid rgba(245, 239, 234, 0.3)' }}>
                  <p className="text-sm font-bold" style={{ color: '#f5efea' }}>
                    Loved by our first 50 testers
                  </p>
                </div>

                {/* Dynamic Product Title */}
                <h1 className="text-4xl md:text-5xl font-bold" style={{ color: '#f5efea' }}>
                  {productData.title}
                </h1>

                {/* Dynamic Pricing */}
                <div className="flex items-center gap-3">
                  <span className="text-3xl font-semibold" style={{ color: '#f5efea' }}>
                    {formatPrice(productPrice, productData.price?.currencyCode || 'GBP')}
                  </span>
                  {productStatus === 'available' && (
                    <span className="text-xl line-through" style={{ color: '#f5efea', opacity: 0.6 }}>
                      £24.99
                    </span>
                  )}
                </div>


                {/* Product Status */}
                {productStatus !== 'available' && (
                  <div className="inline-block px-4 py-2 rounded-lg w-fit" 
                       style={{ backgroundColor: 'rgba(245, 239, 234, 0.2)' }}>
                    <p className="text-sm font-medium" style={{ color: '#f5efea' }}>
                      {productStatus === 'sold-out' ? 'Currently Sold Out' : 'Coming Soon'}
                    </p>
                  </div>
                )}

                {/* Product Benefits */}
                <div>
                  <h2 className="text-lg font-semibold mb-3" style={{ color: '#f5efea' }}>
                    Benefits
                  </h2>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="mt-2" style={{ color: '#f5efea' }}>•</span>
                      <span style={{ color: '#f5efea', opacity: 0.9 }}>
                        Hydrates & restores with essential electrolytes
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-2" style={{ color: '#f5efea' }}>•</span>
                      <span style={{ color: '#f5efea', opacity: 0.9 }}>
                        Supports calm recovery after workouts or long days
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-2" style={{ color: '#f5efea' }}>•</span>
                      <span style={{ color: '#f5efea', opacity: 0.9 }}>
                        Indulges smarter with organic cacao and natural coconut sweetness
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-2" style={{ color: '#f5efea' }}>•</span>
                      <span style={{ color: '#f5efea', opacity: 0.9 }}>
                        Balances body and mind — rich in minerals, low in sugar
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-2" style={{ color: '#f5efea' }}>•</span>
                      <span style={{ color: '#f5efea', opacity: 0.9 }}>
                        Smooth, silky texture that blends easily with water or your favourite milk
                      </span>
                    </li>
                  </ul>
                </div>

                {/* Quantity Display */}
                <div>
                  <h3 className="text-lg font-semibold mb-3" style={{ color: '#f5efea' }}>
                    Quantity
                  </h3>
                  <div className="p-4 rounded-lg" style={{ backgroundColor: 'rgba(245, 239, 234, 0.2)' }}>
                    <p className="font-medium" style={{ color: '#f5efea' }}>
                      1 Bag (10 Servings)
                    </p>
                  </div>
                </div>

                {/* Number of Bags Selector */}
                <div>
                  <h3 className="text-lg font-semibold mb-3" style={{ color: '#f5efea' }}>
                    Number of Bags
                  </h3>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((num) => (
                      <Button
                        key={num}
                        variant={quantity === num ? "default" : "outline"}
                        size="sm"
                        className="w-12 h-12"
                        style={
                          quantity === num
                            ? { backgroundColor: '#f5efea', color: '#8b5e46', border: 'none' }
                            : { borderColor: '#f5efea', color: '#f5efea', backgroundColor: 'transparent' }
                        }
                        onClick={() => setQuantity(num)}
                      >
                        {num}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Add to Cart Button - CREAM BACKGROUND WITH DARK TEXT */}
                <Button
                  size="lg"
                  className="w-full rounded-xl font-semibold hover:opacity-90 transition-opacity"
                  style={{ backgroundColor: '#f5efea', color: '#1c1c1c' }}
                  onClick={handleAddToCart}
                  disabled={productStatus !== 'available'}
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  {productStatus === 'available' ? 'Add to Cart' : 
                   productStatus === 'sold-out' ? 'Currently Sold Out' : 
                   'Coming Soon'}
                </Button>
                
                <div className="pt-6 border-t" style={{ borderColor: 'rgba(245, 239, 234, 0.3)' }}>
                  <p className="text-sm" style={{ color: '#f5efea', opacity: 0.9 }}>
                    🌿 8 real ingredients • 118 calories • No gums or fillers
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Component */}
        <SectionDivider variant="wave" topColor="#f5efea" bottomColor="#ffffff" />
        
        <ScrollReveal>
          <HowItWorks />
        </ScrollReveal>

        {/* What's Inside Component */}
        <SectionDivider variant="curve" flip topColor="#ffffff" bottomColor="#f5efea" />
        
        <ScrollReveal delay={100}>
          <WhatsInside />
        </ScrollReveal>

        {/* Social Proof Component */}
        <SectionDivider variant="wave" topColor="#f5efea" bottomColor="#c7cbc1" />
        
        <ScrollReveal delay={150}>
          <SocialProof />
        </ScrollReveal>

        {/* Comparison Chart Section */}
        <SectionDivider variant="slope" flip topColor="#c7cbc1" bottomColor="#c7cbc1" />
        
        <ScrollReveal delay={100}>
          <section className="py-20" style={{ backgroundColor: '#c7cbc1' }}>
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: '#1c1c1c' }}>
                  Why Choose FuelHaus?
                </h2>
                <p className="text-lg" style={{ color: '#4a4a4a' }}>
                  Not all hot chocolate is created equal
                </p>
              </div>

              <div className="overflow-x-auto rounded-2xl shadow-lg" style={{ border: '3px solid #d8c8b1' }}>
                <table className="w-full">
                  <thead>
                    <tr style={{ backgroundColor: '#8b5e46' }}>
                      <th className="p-4 text-left font-semibold" style={{ color: '#f5efea' }}>
                        Feature
                      </th>
                      <th className="p-4 text-center font-semibold" style={{ color: '#f5efea' }}>
                        FuelHaus Recovery Cocoa
                      </th>
                      <th className="p-4 text-center font-semibold" style={{ color: '#f5efea' }}>
                        Regular Hot Chocolate
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr style={{ backgroundColor: '#f5efea' }}>
                      <td className="p-4 font-medium" style={{ color: '#1c1c1c' }}>
                        Electrolytes
                      </td>
                      <td className="p-4 text-center" style={{ color: '#8b5e46', fontSize: '20px' }}>
                        ✓
                      </td>
                      <td className="p-4 text-center" style={{ color: '#6b5d52' }}>
                        ✗
                      </td>
                    </tr>
                    <tr style={{ backgroundColor: '#d8c8b1' }}>
                      <td className="p-4 font-medium" style={{ color: '#1c1c1c' }}>
                        Magnesium
                      </td>
                      <td className="p-4 text-center" style={{ color: '#8b5e46', fontSize: '20px' }}>
                        ✓
                      </td>
                      <td className="p-4 text-center" style={{ color: '#6b5d52' }}>
                        ✗
                      </td>
                    </tr>
                    <tr style={{ backgroundColor: '#f5efea' }}>
                      <td className="p-4 font-medium" style={{ color: '#1c1c1c' }}>
                        Organic Ingredients
                      </td>
                      <td className="p-4 text-center" style={{ color: '#8b5e46', fontSize: '20px' }}>
                        ✓
                      </td>
                      <td className="p-4 text-center" style={{ color: '#6b5d52' }}>
                        ✗
                      </td>
                    </tr>
                    <tr style={{ backgroundColor: '#d8c8b1' }}>
                      <td className="p-4 font-medium" style={{ color: '#1c1c1c' }}>
                        Dairy-Free
                      </td>
                      <td className="p-4 text-center" style={{ color: '#8b5e46', fontSize: '20px' }}>
                        ✓
                      </td>
                      <td className="p-4 text-center" style={{ color: '#6b5d52' }}>
                        ✗
                      </td>
                    </tr>
                    <tr style={{ backgroundColor: '#f5efea' }}>
                      <td className="p-4 font-medium" style={{ color: '#1c1c1c' }}>
                        Low Sugar
                      </td>
                      <td className="p-4 text-center" style={{ color: '#8b5e46', fontSize: '20px' }}>
                        ✓
                      </td>
                      <td className="p-4 text-center" style={{ color: '#6b5d52' }}>
                        ✗
                      </td>
                    </tr>
                    <tr style={{ backgroundColor: '#d8c8b1' }}>
                      <td className="p-4 font-medium" style={{ color: '#1c1c1c' }}>
                        No Artificial Ingredients
                      </td>
                      <td className="p-4 text-center" style={{ color: '#8b5e46', fontSize: '20px' }}>
                        ✓
                      </td>
                      <td className="p-4 text-center" style={{ color: '#6b5d52' }}>
                        ✗
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>
        </ScrollReveal>

        {/* Brand Context Section */}
        <SectionDivider variant="wave" topColor="#c7cbc1" bottomColor="#8b5e46" />
        
        <ScrollReveal delay={150}>
          <section className="py-32 md:py-40" style={{ backgroundColor: '#8b5e46' }}>
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="grid md:grid-cols-[55%_45%] gap-10 md:gap-16 items-center">
                
                {/* Text Content */}
                <div className="space-y-6">
                  <h2 
                    className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight tracking-tight"
                    style={{ color: '#f5efea' }}
                  >
                    Hydration for the Calm Moments
                  </h2>
                  
                  <div className="space-y-4 text-base md:text-lg leading-relaxed">
                    <p style={{ color: '#f5efea', opacity: 0.9 }}>
                      We believe hydration isn't just about performance — it's about presence.
                    </p>
                    
                    <p style={{ color: '#f5efea', opacity: 0.9 }}>
                      FuelHaus was created to bring balance back to everyday wellness, blending functional nutrition with emotional calm. Each drink is crafted to restore softly, using clean, natural ingredients that nourish without the noise.
                    </p>
                    
                    <p 
                      className="italic text-lg"
                      style={{ color: '#f5efea', opacity: 0.95 }}
                    >
                      This is hydration as a ritual — not a race
                    </p>
                  </div>
                </div>
                
                {/* Image - CENTERED */}
                <div className="flex items-center justify-center">
                  <img 
                    src={brandStoryImage}
                    alt="Lifestyle wellness moment"
                    className="w-full h-auto rounded-xl object-cover shadow-lg"
                    style={{ 
                      maxWidth: '420px', 
                      border: '4px solid #f5efea'
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
        </ScrollReveal>

        {/* FAQ Component */}
        <SectionDivider variant="curve" flip topColor="#8b5e46" bottomColor="#ffffff" />
        
        <ScrollReveal delay={100}>
          <FAQ />
        </ScrollReveal>
      </main>

      {/* Footer */}
      <footer className="py-16" style={{ backgroundColor: '#1c1c1c' }}>
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            {/* Company Info */}
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <img 
                  src="/logo.png?v=4" 
                  alt="Fuel Haus" 
                  className="h-20 w-auto object-contain brightness-0 invert"
                />
              </div>
              <div className="flex gap-3">
                <a 
                  href="https://www.instagram.com/shopfuelhaus/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full flex items-center justify-center transition-all"
                  style={{ backgroundColor: 'rgba(245, 239, 234, 0.1)' }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(245, 239, 234, 0.2)'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(245, 239, 234, 0.1)'}
                >
                  <Instagram className="h-5 w-5" style={{ color: '#f5efea' }} />
                </a>
                <a 
                  href="https://www.facebook.com/profile.php?id=61581968607899" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full flex items-center justify-center transition-all"
                  style={{ backgroundColor: 'rgba(245, 239, 234, 0.1)' }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(245, 239, 234, 0.2)'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(245, 239, 234, 0.1)'}
                >
                  <Facebook className="h-5 w-5" style={{ color: '#f5efea' }} />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-medium mb-4" style={{ color: '#f5efea' }}>
                Quick Links
              </h4>
              <ul className="space-y-3">
                <li>
                  <Link 
                    to="/#products" 
                    className="hover:opacity-75 transition-opacity"
                    style={{ color: '#f5efea', opacity: 0.8 }}
                    onClick={(e) => {
                      e.preventDefault();
                      window.location.href = '/';
                      setTimeout(() => scrollToSection('products'), 100);
                    }}
                  >
                    Shop
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/#whats-inside" 
                    className="hover:opacity-75 transition-opacity"
                    style={{ color: '#f5efea', opacity: 0.8 }}
                    onClick={(e) => {
                      e.preventDefault();
                      window.location.href = '/';
                      setTimeout(() => scrollToSection('whats-inside'), 100);
                    }}
                  >
                    Ingredients
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/contact" 
                    className="hover:opacity-75 transition-opacity"
                    style={{ color: '#f5efea', opacity: 0.8 }}
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h4 className="font-medium mb-4" style={{ color: '#f5efea' }}>
                Legal
              </h4>
              <ul className="space-y-3">
                <li>
                  <button 
                    className="hover:opacity-75 transition-opacity text-left"
                    style={{ color: '#f5efea', opacity: 0.8 }}
                  >
                    Privacy Policy
                  </button>
                </li>
                <li>
                  <button 
                    className="hover:opacity-75 transition-opacity text-left"
                    style={{ color: '#f5efea', opacity: 0.8 }}
                  >
                    Terms of Service
                  </button>
                </li>
                <li>
                  <button 
                    className="hover:opacity-75 transition-opacity text-left"
                    style={{ color: '#f5efea', opacity: 0.8 }}
                  >
                    Shipping Policy
                  </button>
                </li>
                <li>
                  <button 
                    className="hover:opacity-75 transition-opacity text-left"
                    style={{ color: '#f5efea', opacity: 0.8 }}
                  >
                    Refund Policy
                  </button>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="pt-8 border-t text-center" style={{ borderColor: 'rgba(245, 239, 234, 0.2)' }}>
            <p className="text-sm" style={{ color: '#f5efea', opacity: 0.6 }}>
              © {new Date().getFullYear()} Fuel Haus. All rights reserved. | Made with care for your recovery
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}