import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { getSafeStorage } from '@/lib/safeStorage';

export interface Product {
  id: string;
  title: string;
  description: string;
  handle: string;
  price: {
    amount: string;
    currencyCode: string;
  };
  images: Array<{
    url: string;
    altText: string | null;
  }>;
  variants: Array<{
    id: string;
    title: string;
    price: {
      amount: string;
      currencyCode: string;
    };
    availableForSale: boolean;
    selectedOptions: Array<{
      name: string;
      value: string;
    }>;
  }>;
  options: Array<{
    name: string;
    values: string[];
  }>;
}

export interface CartItem {
  id: string;
  title: string;
  price: number;
  quantity: number;
  image: string;
  variantId: string;
  handle: string;
}

// Legacy interface for backward compatibility
export interface LegacyCartItem {
  product: Product;
  variantId: string;
  variantTitle: string;
  price: {
    amount: string;
    currencyCode: string;
  };
  quantity: number;
  selectedOptions: Array<{
    name: string;
    value: string;
  }>;
}

interface CartStore {
  items: CartItem[];
  cartId: string | null;
  checkoutUrl: string | null;
  isLoading: boolean;
  
  // Actions
  addItem: (item: CartItem) => void;
  updateQuantity: (variantId: string, quantity: number) => void;
  removeItem: (variantId: string) => void;
  clearCart: () => void;
  setCartId: (cartId: string) => void;
  setCheckoutUrl: (url: string) => void;
  setLoading: (loading: boolean) => void;
  createCheckout: () => Promise<void>;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      cartId: null,
      checkoutUrl: null,
      isLoading: false,

      addItem: (item) => {
        // Validate Shopify variant ID
        if (!item.variantId || !item.variantId.startsWith('gid://shopify/ProductVariant/')) {
          console.error('Invalid Shopify variant ID:', item.variantId);
          return;
        }

        const { items } = get();
        const existingItem = items.find(i => i.variantId === item.variantId);
        
        if (existingItem) {
          set({
            items: items.map(i =>
              i.variantId === item.variantId
                ? { ...i, quantity: i.quantity + item.quantity }
                : i
            )
          });
        } else {
          set({ items: [...items, item] });
        }
      },

      updateQuantity: (variantId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(variantId);
          return;
        }
        
        set({
          items: get().items.map(item =>
            item.variantId === variantId ? { ...item, quantity } : item
          )
        });
      },

      removeItem: (variantId) => {
        set({
          items: get().items.filter(item => item.variantId !== variantId)
        });
      },

      clearCart: () => {
        set({ items: [], cartId: null, checkoutUrl: null });
      },

      setCartId: (cartId) => set({ cartId }),
      setCheckoutUrl: (checkoutUrl) => set({ checkoutUrl }),
      setLoading: (isLoading) => set({ isLoading }),

      createCheckout: async () => {
        const { items, setLoading, setCheckoutUrl } = get();
        if (items.length === 0) return;

        // Filter out items with invalid Shopify variant IDs (must start with gid://shopify/)
        const validItems = items.filter(item => 
          item.variantId.startsWith('gid://shopify/ProductVariant/')
        );

        // Remove invalid items from cart
        const invalidItems = items.filter(item => 
          !item.variantId.startsWith('gid://shopify/ProductVariant/')
        );
        if (invalidItems.length > 0) {
          set({ items: validItems });
          console.log('Removed invalid cart items:', invalidItems.length);
        }

        if (validItems.length === 0) {
          console.error('No valid items in cart for checkout');
          return;
        }

        setLoading(true);
        try {
          const { createStorefrontCheckout } = await import('@/lib/shopify');
          // Transform cart items to the format expected by createStorefrontCheckout
          const checkoutItems = validItems.map(item => ({
            quantity: item.quantity,
            variantId: item.variantId,
          }));
          const checkoutUrl = await createStorefrontCheckout(checkoutItems);
          setCheckoutUrl(checkoutUrl);
          // Redirect to checkout
          window.location.href = checkoutUrl;
        } catch (error) {
          console.error('Failed to create checkout:', error);
        } finally {
          setLoading(false);
        }
      }
    }),
    {
      name: 'cart-storage',
      storage: createJSONStorage(getSafeStorage),
    }
  )
);