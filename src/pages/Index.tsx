import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
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
import { SectionDivider } from "@/components/SectionDivider";
import { ScrollReveal } from "@/components/ScrollReveal";
import { Button } from "@/components/ui/button";
import { Search, Instagram, Facebook, Menu, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { scrollToSection } from "@/lib/scroll";

export default function Index() {
  const navigate = useNavigate();
  const location = useLocation();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    loadProducts();
  }, []);

  // Handle hash navigation from other pages
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      // Wait for page to render, then scroll
      setTimeout(() => {
        const id = hash.replace('#', '');
        scrollToSection(id);
      }, 100);
    }
  }, [location]);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const data = await fetchProducts();
      setProducts(data || []); // Ensure fallback to empty array
    } catch (error) {
      console.error('Error loading products:', error);
      // Don't show error toast to avoid crashes, just log it
      setProducts([]); // Fallback to empty array
    } finally {
      setLoading(false);
    }
  };

  // Add loading state UI
  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f5efea'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: '50px',
            height: '50px',
            border: '4px solid #d8c5b1',
            borderTop: '4px solid #8b5e46',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 16px'
          }} />
          <p style={{ color: '#1c1c1c' }}>Loading Fuel Haus...</p>
        </div>
      </div>
    );
  }

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
        <div className="container mx-auto px-6 py-4">
          {/* Top Row: Search Icon - Logo - User/Cart Icons */}
          <div className="flex items-center justify-between mb-4">
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
                className="h-28 md:h-32 w-auto object-contain"
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
                        scrollToSection('products');
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
          <nav className="hidden md:flex items-center justify-center gap-8 md:gap-12">
            <Button 
              variant="ghost" 
              className="text-base font-normal hover:text-primary hover:bg-transparent transition-colors relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-foreground after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300"
              onClick={() => scrollToSection('products')}
            >
              Shop
            </Button>
            <Button 
              variant="ghost"
              className="text-base font-normal hover:text-primary hover:bg-transparent transition-colors relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-foreground after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300"
              onClick={() => navigate('/ingredients')}
            >
              Ingredients
            </Button>
            <Button 
              variant="ghost"
              className="text-base font-normal hover:text-primary hover:bg-transparent transition-colors relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-foreground after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300"
              onClick={() => navigate('/contact')}
            >
              Contact
            </Button>
          </nav>
        </div>
      </header>

      <main>
        <Hero />
        
        <ScrollReveal>
          <ProductShowcase />
        </ScrollReveal>
        
        <SectionDivider variant="wave" topColor="#f5efea" bottomColor="#ffffff" />
        
        <ScrollReveal delay={100}>
          <ValueProps />
        </ScrollReveal>
        
        <SectionDivider variant="curve" flip topColor="#ffffff" bottomColor="#f5efea" />
        
        <ScrollReveal delay={150}>
          <SocialProof />
        </ScrollReveal>
        
        <SectionDivider variant="wave" topColor="#f5efea" bottomColor="#ffffff" />
        
        <ScrollReveal delay={100}>
          <SeasonalDrinks />
        </ScrollReveal>
        
        <SectionDivider variant="slope" flip topColor="#ffffff" bottomColor="#f5efea" />
        
        <ScrollReveal delay={150}>
          <BrandStory />
        </ScrollReveal>
        
        <SectionDivider variant="wave" topColor="#f5efea" bottomColor="#ffffff" />
        
        <ScrollReveal delay={100}>
          <HowItWorks />
        </ScrollReveal>
        
        <SectionDivider variant="curve" flip topColor="#ffffff" bottomColor="#f5efea" />
        
        <ScrollReveal delay={150}>
          <WhatsInside />
        </ScrollReveal>
        
        <SectionDivider variant="wave" topColor="#f5efea" bottomColor="#ffffff" />
        
        <ScrollReveal delay={100}>
          <FAQ />
        </ScrollReveal>
        
        <SectionDivider variant="slope" flip topColor="#ffffff" bottomColor="#8b5e46" />
        
        <ScrollReveal delay={150}>
          <Newsletter />
        </ScrollReveal>
      </main>

      {/* Footer */}
      <footer className="py-16" style={{ backgroundColor: '#f5efea' }}>
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            {/* Company Info */}
            <div className="md:col-span-2">
              <div className="flex items-center justify-center md:justify-start gap-3 mb-6">
                <img 
                  src="/logo.png?v=4" 
                  alt="Fuel Haus" 
                  className="h-28 md:h-32 w-auto object-contain"
                />
              </div>
              <div className="flex justify-center md:justify-start gap-3">
                <a 
                  href="https://www.instagram.com/shopfuelhaus/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full flex items-center justify-center transition-all"
                  style={{ 
                    backgroundColor: 'rgba(139, 94, 70, 0.15)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(139, 94, 70, 0.25)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(139, 94, 70, 0.15)';
                  }}
                >
                  <Instagram className="h-5 w-5" style={{ color: '#8b5e46' }} />
                </a>
                <a 
                  href="https://www.facebook.com/profile.php?id=61581968607899" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full flex items-center justify-center transition-all"
                  style={{ 
                    backgroundColor: 'rgba(139, 94, 70, 0.15)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(139, 94, 70, 0.25)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(139, 94, 70, 0.15)';
                  }}
                >
                  <Facebook className="h-5 w-5" style={{ color: '#8b5e46' }} />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-medium mb-4" style={{ color: '#1c1c1c' }}>
                Quick Links
              </h4>
              <ul className="space-y-3">
                <li>
                  <Button 
                    variant="ghost" 
                    className="h-auto p-0 hover:no-underline"
                    style={{ color: '#4a4a4a' }}
                    onMouseEnter={(e) => e.currentTarget.style.color = '#8b5e46'}
                    onMouseLeave={(e) => e.currentTarget.style.color = '#4a4a4a'}
                    onClick={() => scrollToSection('products')}
                  >
                    Shop
                  </Button>
                </li>
                <li>
                  <Button 
                    variant="ghost" 
                    className="h-auto p-0 hover:no-underline"
                    style={{ color: '#4a4a4a' }}
                    onMouseEnter={(e) => e.currentTarget.style.color = '#8b5e46'}
                    onMouseLeave={(e) => e.currentTarget.style.color = '#4a4a4a'}
                    onClick={() => scrollToSection('brand-story')}
                  >
                    About
                  </Button>
                </li>
                <li>
                  <Button 
                    variant="ghost" 
                    className="h-auto p-0 hover:no-underline"
                    style={{ color: '#4a4a4a' }}
                    onMouseEnter={(e) => e.currentTarget.style.color = '#8b5e46'}
                    onMouseLeave={(e) => e.currentTarget.style.color = '#4a4a4a'}
                    onClick={() => navigate('/ingredients')}
                  >
                    Ingredients
                  </Button>
                </li>
                <li>
                  <Button 
                    variant="ghost" 
                    className="h-auto p-0 hover:no-underline"
                    style={{ color: '#4a4a4a' }}
                    onMouseEnter={(e) => e.currentTarget.style.color = '#8b5e46'}
                    onMouseLeave={(e) => e.currentTarget.style.color = '#4a4a4a'}
                    onClick={() => navigate('/contact')}
                  >
                    Contact
                  </Button>
                </li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h4 className="font-medium mb-4" style={{ color: '#1c1c1c' }}>
                Legal
              </h4>
              <ul className="space-y-3">
                <li>
                  <Button 
                    variant="ghost" 
                    className="h-auto p-0 hover:no-underline"
                    style={{ color: '#4a4a4a' }}
                    onMouseEnter={(e) => e.currentTarget.style.color = '#8b5e46'}
                    onMouseLeave={(e) => e.currentTarget.style.color = '#4a4a4a'}
                  >
                    Privacy Policy
                  </Button>
                </li>
                <li>
                  <Button 
                    variant="ghost" 
                    className="h-auto p-0 hover:no-underline"
                    style={{ color: '#4a4a4a' }}
                    onMouseEnter={(e) => e.currentTarget.style.color = '#8b5e46'}
                    onMouseLeave={(e) => e.currentTarget.style.color = '#4a4a4a'}
                  >
                    Terms of Service
                  </Button>
                </li>
                <li>
                  <Button 
                    variant="ghost" 
                    className="h-auto p-0 hover:no-underline"
                    style={{ color: '#4a4a4a' }}
                    onMouseEnter={(e) => e.currentTarget.style.color = '#8b5e46'}
                    onMouseLeave={(e) => e.currentTarget.style.color = '#4a4a4a'}
                  >
                    Shipping Policy
                  </Button>
                </li>
                <li>
                  <Button 
                    variant="ghost" 
                    className="h-auto p-0 hover:no-underline"
                    style={{ color: '#4a4a4a' }}
                    onMouseEnter={(e) => e.currentTarget.style.color = '#8b5e46'}
                    onMouseLeave={(e) => e.currentTarget.style.color = '#4a4a4a'}
                  >
                    Refund Policy
                  </Button>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="pt-8 border-t text-center" style={{ borderColor: '#d8c8b1' }}>
            <p className="text-sm" style={{ color: '#6b5d52' }}>
              © {new Date().getFullYear()} Fuel Haus. All rights reserved. | Made with care for your recovery
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
