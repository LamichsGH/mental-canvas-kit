import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ShoppingCart } from "lucide-react";
import { fetchProductByHandle } from "@/lib/mockData";
import { Product } from "@/stores/cartStore";
import { useCartStore } from "@/stores/cartStore";
import { toast } from "sonner";
import { CartDrawer } from "@/components/CartDrawer";

export default function ProductDetail() {
  const { handle } = useParams<{ handle: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedVariant, setSelectedVariant] = useState<any>(null);
  const addItem = useCartStore(state => state.addItem);

  useEffect(() => {
    if (handle) {
      loadProduct();
    }
  }, [handle]);

  const loadProduct = async () => {
    try {
      setLoading(true);
      const data = await fetchProductByHandle(handle!);
      setProduct(data);
      if (data?.variants?.[0]) {
        setSelectedVariant(data.variants[0]);
      }
    } catch (error) {
      console.error('Error loading product:', error);
      toast.error('Failed to load product');
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    if (!product || !selectedVariant) return;

    const cartItem = {
      product: { node: product },
      variantId: selectedVariant.id,
      variantTitle: selectedVariant.title,
      price: selectedVariant.price,
      quantity: 1,
      selectedOptions: selectedVariant.selectedOptions || []
    };
    
    addItem(cartItem);
    toast.success('Added to cart', { position: 'top-center' });
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
          <div className="flex items-center gap-3">
            <div className="text-2xl">☕</div>
            <span className="font-bold text-xl">Fuel Haus</span>
          </div>
          <CartDrawer />
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <div className="aspect-square bg-secondary/30 rounded-2xl overflow-hidden shadow-lg">
            {product.images?.edges?.[0]?.node ? (
              <img
                src={product.images.edges[0].node.url}
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
            <div>
              <h1 className="text-4xl font-bold mb-2">{product.title}</h1>
              <p className="text-3xl font-semibold text-primary">
                {product.priceRange.minVariantPrice.currencyCode}{' '}
                {parseFloat(product.priceRange.minVariantPrice.amount).toFixed(2)}
              </p>
            </div>

            {product.description && (
              <div>
                <h2 className="text-lg font-semibold mb-2">Description</h2>
                <p className="text-muted-foreground">{product.description}</p>
              </div>
            )}

            {product.options && product.options.length > 0 && (
              <div className="space-y-4">
                {product.options.map((option: any) => (
                  <div key={option.name}>
                    <label className="text-sm font-medium mb-2 block">{option.name}</label>
                    <div className="flex gap-2 flex-wrap">
                      {option.values.map((value: string) => {
                        const variant = product.variants.edges.find((v: any) =>
                          v.node.selectedOptions.some((o: any) => o.name === option.name && o.value === value)
                        )?.node;
                        
                        const isSelected = selectedVariant?.selectedOptions.some(
                          (o: any) => o.name === option.name && o.value === value
                        );

                        return (
                          <Button
                            key={value}
                            variant={isSelected ? "default" : "outline"}
                            size="sm"
                            onClick={() => variant && setSelectedVariant(variant)}
                            disabled={!variant?.availableForSale}
                          >
                            {value}
                          </Button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            )}

            <Button
              size="lg"
              className="w-full rounded-xl"
              onClick={handleAddToCart}
              disabled={!selectedVariant?.availableForSale}
            >
              <ShoppingCart className="w-5 h-5 mr-2" />
              {selectedVariant?.availableForSale ? 'Add to Cart' : 'Out of Stock'}
            </Button>
            
            <div className="pt-6 border-t">
              <p className="text-sm text-muted-foreground">
                🌿 8 real ingredients • 118 calories • No gums or fillers
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
