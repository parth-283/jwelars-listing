/**
 * Product type definition and localStorage utilities
 */

export interface Product {
  id: string;
  title: string;
  price: number;
  category: string;
  description: string;
  createdAt: number;
}

// localStorage key for products
const STORAGE_KEY = 'catalog_products';

/**
 * Get all products from localStorage
 */
export function getProducts(): Product[] {
  if (typeof window === 'undefined') {
    return [];
  }

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Error reading products from localStorage:', error);
    return [];
  }
}

/**
 * Save products to localStorage
 */
export function saveProducts(products: Product[]): void {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
  } catch (error) {
    console.error('Error saving products to localStorage:', error);
  }
}

/**
 * Add a new product
 */
export function addProduct(product: Omit<Product, 'id' | 'createdAt'>): Product {
  const products = getProducts();

  // Check storage limit (5000 products)
  if (products.length >= 5000) {
    throw new Error('Maximum product limit (5000) reached');
  }

  const newProduct: Product = {
    ...product,
    id: Date.now().toString(),
    createdAt: Date.now(),
  };

  products.push(newProduct);
  saveProducts(products);

  return newProduct;
}

/**
 * Get a single product by ID
 */
export function getProductById(id: string): Product | null {
  const products = getProducts();
  return products.find((p) => p.id === id) || null;
}

/**
 * Get all unique categories
 */
export function getCategories(): string[] {
  const products = getProducts();
  const categories = new Set(products.map((p) => p.category));
  return Array.from(categories).sort();
}

/**
 * Clear all products (for testing)
 */
export function clearAllProducts(): void {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Error clearing products:', error);
  }
}
