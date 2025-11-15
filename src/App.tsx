import { Toaster } from "./components/ui/toaster";
import { Toaster as Sonner } from "./components/ui/sonner";
import { TooltipProvider } from "./components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, HashRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import ProductDetail from "./pages/ProductDetail";
import Ingredients from "./pages/Ingredients";
import Contact from "./pages/Contact";
import Install from "./pages/Install";
import NotFound from "./pages/NotFound";
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
      refetchOnWindowFocus: true,
      refetchOnMount: true,
      retry: 2,
    },
  },
});

const App = () => {
  // Use HashRouter inside the Lovable editor iframe to avoid sandbox/history issues
  const isInIframe = typeof window !== 'undefined' && window.self !== window.top;
  const Router: React.ComponentType<any> = isInIframe ? HashRouter : BrowserRouter;

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <Router>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/product/:handle" element={<ProductDetail />} />
            <Route path="/product-detail" element={<ProductDetail />} />
            <Route path="/ingredients" element={<Ingredients />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/install" element={<Install />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
