import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchProducts } from "@/lib/mockData";
import { Product } from "@/stores/cartStore";
import { toast } from "sonner";
import { CartDrawer } from "@/components/CartDrawer";
import { Hero } from "@/components/Hero";
import { ProductShowcase } from "@/components/ProductShowcase";
import { ValueProps } from "@/components/ValueProps";
import { SocialProof } from "@/components/SocialProof";
import { Newsletter } from "@/components/Newsletter";
import { BrandStory } from "@/components/BrandStory";
import { HowItWorks } from "@/components/HowItWorks";
import { WhatsInside } from "@/components/WhatsInside";
import { FAQ } from "@/components/FAQ";
import { SeasonalDrinks } from "@/components/SeasonalDrinks";
import { Button } from "@/components/ui/button";
import { Search, Instagram, Facebook, Menu, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export default function Index() {
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const data = await fetchProducts();
      setProducts(data);
    } catch (error) {
      console.error('Error loading products:', error);
      toast.error('Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  // Filter products based on search query
  const filteredProducts = products.filter((product) => {
    if (!searchQuery.trim()) return true;
    
    const query = searchQuery.toLowerCase();
    const title = product.title.toLowerCase();
    const description = product.description?.toLowerCase() || "";
    
    return title.includes(query) || description.includes(query);
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-2 md:py-3">
          {/* Top Row: Search Icon - Logo - User/Cart Icons */}
          <div className="flex items-center justify-between mb-2 md:mb-1">
            {/* Left: Search Icon */}
            <div className="flex items-center gap-2">
              {searchOpen ? (
                <div className="flex items-center gap-2 animate-fade-in">
                  <Input 
                    placeholder="Search products..." 
                    className="w-32 md:w-48"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onBlur={() => {
                      if (!searchQuery) setSearchOpen(false);
                    }}
                    autoFocus
                  />
                  {searchQuery && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => {
                        setSearchQuery("");
                        setSearchOpen(false);
                      }}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ) : (
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => setSearchOpen(true)}
                  className="min-w-[44px] min-h-[44px] touch-manipulation"
                  aria-label="Search"
                >
                  <Search className="h-5 w-5" />
                </Button>
              )}
            </div>

            {/* Center: Logo */}
            <div className="absolute left-1/2 -translate-x-1/2 flex items-center">
              <img 
                src="/logo.png?v=4" 
                alt="Fuel Haus" 
                className="h-16 md:h-20 w-auto object-contain"
              />
            </div>

            {/* Right: Burger Menu (Mobile) + Cart Icon */}
            <div className="flex items-center gap-3">
              {/* Mobile Menu - Visible Only on Mobile */}
              <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                <SheetTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    className="md:hidden min-w-[44px] min-h-[44px] hover:bg-transparent touch-manipulation"
                    aria-label="Menu"
                  >
                    <Menu className="h-6 w-6" style={{ color: '#2C1810' }} />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[280px] sm:w-[320px]">
                  <nav className="flex flex-col gap-6 mt-8">
                    <Button 
                      variant="ghost" 
                      className="justify-start text-lg font-normal hover:text-primary transition-colors"
                      onClick={() => {
                        document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
                        setMobileMenuOpen(false);
                      }}
                    >
                      Shop
                    </Button>
                    <Button 
                      variant="ghost"
                      className="justify-start text-lg font-normal hover:text-primary transition-colors"
                      onClick={() => {
                        navigate('/ingredients');
                        setMobileMenuOpen(false);
                      }}
                    >
                      Ingredients
                    </Button>
                    <Button 
                      variant="ghost"
                      className="justify-start text-lg font-normal hover:text-primary transition-colors"
                      onClick={() => {
                        navigate('/contact');
                        setMobileMenuOpen(false);
                      }}
                    >
                      Contact
                    </Button>
                  </nav>
                </SheetContent>
              </Sheet>
              
              <CartDrawer />
            </div>
          </div>

          {/* Bottom Row: Navigation Links - Centered, Hidden on Mobile */}
          <nav className="hidden md:flex items-center justify-center gap-6 md:gap-8">
            <Button 
              variant="ghost" 
              className="text-base font-normal hover:text-primary transition-colors relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-foreground after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300"
              onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Shop
            </Button>
            <Button 
              variant="ghost"
              className="text-base font-normal hover:text-primary transition-colors relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-foreground after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300"
              onClick={() => navigate('/ingredients')}
            >
              Ingredients
            </Button>
            <Button 
              variant="ghost"
              className="text-base font-normal hover:text-primary transition-colors relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-foreground after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300"
              onClick={() => navigate('/contact')}
            >
              Contact
            </Button>
          </nav>
        </div>
      </header>

      <main>
        <Hero />
        <ProductShowcase />
        <ValueProps />
        <SocialProof />
        <SeasonalDrinks />
        <BrandStory />
          <HowItWorks />
          <WhatsInside />
          <FAQ />
        <Newsletter />
      </main>

      {/* Footer */}
      <footer className="border-t bg-secondary/10 py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            {/* Company Info */}
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <img 
                  src="/logo.png?v=4" 
                  alt="Fuel Haus" 
                  className="h-14 w-auto object-contain"
                />
              </div>
              <p className="text-muted-foreground mb-6 max-w-md">
                Functional drinks made for rest, ritual, and nourishment. Each blend crafted to restore calm, focus, and recovery.
              </p>
              <div className="flex gap-3">
                <a 
                  href="https://instagram.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-background hover:bg-primary hover:text-primary-foreground flex items-center justify-center transition-all shadow-subtle"
                >
                  <Instagram className="h-5 w-5" />
                </a>
                <a 
                  href="https://facebook.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-background hover:bg-primary hover:text-primary-foreground flex items-center justify-center transition-all shadow-subtle"
                >
                  <Facebook className="h-5 w-5" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-medium mb-4">Quick Links</h4>
              <ul className="space-y-3">
                <li>
                  <Button 
                    variant="ghost" 
                    className="h-auto p-0 text-muted-foreground hover:text-primary"
                    onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })}
                  >
                    Shop
                  </Button>
                </li>
                <li>
                  <Button variant="ghost" className="h-auto p-0 text-muted-foreground hover:text-primary">
                    About
                  </Button>
                </li>
                <li>
                  <Button 
                    variant="ghost" 
                    className="h-auto p-0 text-muted-foreground hover:text-primary"
                    onClick={() => navigate('/ingredients')}
                  >
                    Ingredients
                  </Button>
                </li>
                <li>
                  <Button 
                    variant="ghost" 
                    className="h-auto p-0 text-muted-foreground hover:text-primary"
                    onClick={() => navigate('/contact')}
                  >
                    Contact
                  </Button>
                </li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h4 className="font-medium mb-4">Legal</h4>
              <ul className="space-y-3">
                <li>
                  <Button variant="ghost" className="h-auto p-0 text-muted-foreground hover:text-primary">
                    Privacy Policy
                  </Button>
                </li>
                <li>
                  <Button variant="ghost" className="h-auto p-0 text-muted-foreground hover:text-primary">
                    Terms of Service
                  </Button>
                </li>
                <li>
                  <Button variant="ghost" className="h-auto p-0 text-muted-foreground hover:text-primary">
                    Shipping Policy
                  </Button>
                </li>
                <li>
                  <Button variant="ghost" className="h-auto p-0 text-muted-foreground hover:text-primary">
                    Refund Policy
                  </Button>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="pt-8 border-t border-border text-center">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Fuel Haus. All rights reserved. | Made with care for your recovery
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
