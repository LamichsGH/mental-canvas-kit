import { toast } from "sonner";

// Shopify Configuration
export const SHOPIFY_API_VERSION = '2025-07';
export const SHOPIFY_STORE_PERMANENT_DOMAIN = 'mental-canvas-kit-xj3at.myshopify.com';
export const SHOPIFY_STOREFRONT_URL = `https://${SHOPIFY_STORE_PERMANENT_DOMAIN}/api/${SHOPIFY_API_VERSION}/graphql.json`;
export const SHOPIFY_STOREFRONT_TOKEN = 'ef0fe5ffee86217dc44155b1ce409372';

// TypeScript Interfaces
export interface ShopifyProduct {
  node: {
    id: string;
    title: string;
    description: string;
    handle: string;
    priceRange: {
      minVariantPrice: {
        amount: string;
        currencyCode: string;
      };
    };
    images: {
      edges: Array<{
        node: {
          url: string;
          altText: string | null;
        };
      }>;
    };
    variants: {
      edges: Array<{
        node: {
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
        };
      }>;
    };
    options: Array<{
      name: string;
      values: string[];
    }>;
  };
}

// GraphQL Queries
const STOREFRONT_QUERY = `
  query GetProducts($first: Int!) {
    products(first: $first) {
      edges {
        node {
          id
          title
          description
          handle
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
          }
          images(first: 5) {
            edges {
              node {
                url
                altText
              }
            }
          }
          variants(first: 10) {
            edges {
              node {
                id
                title
                price {
                  amount
                  currencyCode
                }
                availableForSale
                selectedOptions {
                  name
                  value
                }
              }
            }
          }
          options {
            name
            values
          }
        }
      }
    }
  }
`;

const PRODUCT_BY_HANDLE_QUERY = `
  query GetProductByHandle($handle: String!) {
    productByHandle(handle: $handle) {
      id
      title
      description
      handle
      priceRange {
        minVariantPrice {
          amount
          currencyCode
        }
      }
      images(first: 5) {
        edges {
          node {
            url
            altText
          }
        }
      }
      variants(first: 10) {
        edges {
          node {
            id
            title
            price {
              amount
              currencyCode
            }
            availableForSale
            selectedOptions {
              name
              value
            }
          }
        }
      }
      options {
        name
        values
      }
    }
  }
`;

const CART_CREATE_MUTATION = `
  mutation cartCreate($input: CartInput!) {
    cartCreate(input: $input) {
      cart {
        id
        checkoutUrl
        totalQuantity
        cost {
          totalAmount {
            amount
            currencyCode
          }
        }
        lines(first: 100) {
          edges {
            node {
              id
              quantity
              merchandise {
                ... on ProductVariant {
                  id
                  title
                  price {
                    amount
                    currencyCode
                  }
                  product {
                    title
                    handle
                  }
                }
              }
            }
          }
        }
      }
      userErrors {
        field
        message
      }
    }
  }
`;

// Storefront API helper function
export async function storefrontApiRequest(query: string, variables: any = {}) {
  try {
    const response = await fetch(SHOPIFY_STOREFRONT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': SHOPIFY_STOREFRONT_TOKEN
      },
      body: JSON.stringify({
        query,
        variables,
      }),
    });

    if (response.status === 402) {
      console.warn("Shopify: Payment required - using fallback data");
      return null; // Return null instead of throwing
    }

    if (!response.ok) {
      console.warn(`Shopify API error: ${response.status} - using fallback data`);
      return null; // Return null instead of throwing
    }

    const data = await response.json();
    
    if (data.errors) {
      console.warn(`Shopify GraphQL errors: ${data.errors.map((e: any) => e.message).join(', ')} - using fallback data`);
      return null; // Return null instead of throwing
    }

    return data;
  } catch (error) {
    console.error('Shopify API request failed:', error);
    return null; // Return null instead of throwing
  }
}

// Transform Shopify product to app format
export function transformShopifyProduct(shopifyProduct: ShopifyProduct) {
  return {
    id: shopifyProduct.node.id,
    title: shopifyProduct.node.title,
    description: shopifyProduct.node.description,
    handle: shopifyProduct.node.handle,
    price: {
      amount: shopifyProduct.node.priceRange.minVariantPrice.amount,
      currencyCode: shopifyProduct.node.priceRange.minVariantPrice.currencyCode,
    },
    images: shopifyProduct.node.images.edges.map(edge => ({
      url: edge.node.url,
      altText: edge.node.altText,
    })),
    variants: shopifyProduct.node.variants.edges.map(edge => ({
      id: edge.node.id,
      title: edge.node.title,
      price: {
        amount: edge.node.price.amount,
        currencyCode: edge.node.price.currencyCode,
      },
      availableForSale: edge.node.availableForSale,
      selectedOptions: edge.node.selectedOptions,
    })),
    options: shopifyProduct.node.options,
  };
}

// Fetch all products
export async function fetchProducts() {
  try {
    const data = await storefrontApiRequest(STOREFRONT_QUERY, { first: 50 });
    
    if (!data?.data?.products?.edges) {
      console.warn('No products data from Shopify, returning empty array');
      return [];
    }

    return data.data.products.edges.map(transformShopifyProduct);
  } catch (error) {
    console.error('Error fetching products:', error);
    return []; // Always return empty array, never throw
  }
}

// Fetch product by handle
export async function fetchProductByHandle(handle: string) {
  try {
    const data = await storefrontApiRequest(PRODUCT_BY_HANDLE_QUERY, { handle });
    
    if (!data?.data?.productByHandle) {
      return null;
    }

    const product = data.data.productByHandle;
    return {
      id: product.id,
      title: product.title,
      description: product.description,
      handle: product.handle,
      price: {
        amount: product.priceRange.minVariantPrice.amount,
        currencyCode: product.priceRange.minVariantPrice.currencyCode,
      },
      images: product.images.edges.map((edge: any) => ({
        url: edge.node.url,
        altText: edge.node.altText,
      })),
      variants: product.variants.edges.map((edge: any) => ({
        id: edge.node.id,
        title: edge.node.title,
        price: {
          amount: edge.node.price.amount,
          currencyCode: edge.node.price.currencyCode,
        },
        availableForSale: edge.node.availableForSale,
        selectedOptions: edge.node.selectedOptions,
      })),
      options: product.options,
    };
  } catch (error) {
    console.error('Error fetching product by handle:', error);
    return null;
  }
}

// Create Shopify checkout
export async function createStorefrontCheckout(items: any[]): Promise<string> {
  try {
    const lines = items.map(item => ({
      quantity: item.quantity,
      merchandiseId: item.variantId,
    }));

    const cartData = await storefrontApiRequest(CART_CREATE_MUTATION, {
      input: {
        lines,
      },
    });

    if (cartData.data.cartCreate.userErrors.length > 0) {
      throw new Error(`Cart creation failed: ${cartData.data.cartCreate.userErrors.map((e: any) => e.message).join(', ')}`);
    }

    const cart = cartData.data.cartCreate.cart;
    
    if (!cart.checkoutUrl) {
      throw new Error('No checkout URL returned from Shopify');
    }

    const url = new URL(cart.checkoutUrl);
    url.searchParams.set('channel', 'online_store');
    return url.toString();
  } catch (error) {
    console.error('Error creating storefront checkout:', error);
    throw error;
  }
}

// Helper Functions for Dynamic Product Handling

// Check if product is available
export function isProductAvailable(product: any): boolean {
  return product?.variants?.some((v: any) => v.availableForSale) || false;
}

// Get product status
export function getProductStatus(product: any): "available" | "sold-out" | "coming-soon" {
  if (!product) return "coming-soon";
  
  const hasAvailableVariant = product.variants?.some((v: any) => v.availableForSale);
  const hasVariants = product.variants?.length > 0;
  
  if (hasAvailableVariant) return "available";
  if (hasVariants) return "sold-out";
  return "coming-soon";
}

// Get first available variant
export function getFirstAvailableVariant(product: any) {
  return product?.variants?.find((v: any) => v.availableForSale);
}

// Get cheapest price
export function getProductPrice(product: any): number | null {
  const variant = getFirstAvailableVariant(product) || product?.variants?.[0];
  return variant ? parseFloat(variant.price.amount) : null;
}

// Format price for display
export function formatPrice(amount: number | null, currency = 'GBP'): string {
  if (!amount) return 'Price unavailable';
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency,
  }).format(amount);
}

// Get product variant ID
export function getProductVariantId(product: any): string | null {
  const variant = getFirstAvailableVariant(product) || product?.variants?.[0];
  return variant?.id || null;
}

// Get available quantity for a product variant
// Note: quantityAvailable requires special API permissions, so we just check availableForSale
export function getAvailableQuantity(product: any): number {
  if (!product) return 0;
  
  const variant = getFirstAvailableVariant(product);
  return variant ? 999 : 0; // Return high number if available, 0 if not
}
