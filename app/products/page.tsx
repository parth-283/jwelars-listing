'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { getProducts, getCategories, Product } from '@/types/product';
import ProductCard from '@/app/components/ProductCard';
import styles from './page.module.css';

const ITEMS_PER_PAGE = 10;

/**
 * Products listing page with filtering, search, and pagination
 * Features: category filter, title search, pagination with memoized filtering
 */
export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [currentPage, setCurrentPage] = useState(1);

  // Load products and categories on mount
  useEffect(() => {
    const allProducts = getProducts();
    setProducts(allProducts);

    const allCategories = getCategories();
    setCategories(allCategories);

    setLoading(false);
  }, []);

  // Memoized filtering and sorting
  const filteredProducts = useMemo(() => {
    let filtered = [...products];

    // Filter by search term
    if (searchTerm.trim()) {
      filtered = filtered.filter((product) =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory) {
      filtered = filtered.filter((product) => product.category === selectedCategory);
    }

    // Sort by newest first
    filtered.sort((a, b) => b.createdAt - a.createdAt);

    return filtered;
  }, [products, searchTerm, selectedCategory]);

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedProducts = filteredProducts.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedCategory]);

  const handleClearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('');
    setCurrentPage(1);
  };

  if (loading) {
    return (
      <main className={styles.container}>
        <div className={styles.loading}>Loading products...</div>
      </main>
    );
  }

  return (
    <main className={styles.container}>
      <div className={styles.header}>
        <h1>Product Catalog</h1>
        <Link href="/admin" className={styles.adminLink}>
          Admin
        </Link>
      </div>

      {/* Filters Section */}
      <div className={styles.filtersCard}>
        <div className={styles.filterGroup}>
          <label htmlFor="search">Search Products</label>
          <input
            type="text"
            id="search"
            placeholder="Search by title..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={styles.searchInput}
          />
        </div>

        <div className={styles.filterGroup}>
          <label htmlFor="category">Category</label>
          <select
            id="category"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className={styles.selectInput}
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <button onClick={handleClearFilters} className={styles.clearButton}>
          Clear Filters
        </button>
      </div>

      {/* Results Info */}
      <div className={styles.resultsInfo}>
        <span>
          Showing <strong>{paginatedProducts.length}</strong> of{' '}
          <strong>{filteredProducts.length}</strong> products
        </span>
      </div>

      {/* Products Grid */}
      {paginatedProducts.length > 0 ? (
        <>
          <div className={styles.grid}>
            {paginatedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className={styles.pagination}>
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className={styles.pageButton}
              >
                ← Previous
              </button>

              <div className={styles.pageInfo}>
                Page <strong>{currentPage}</strong> of <strong>{totalPages}</strong>
              </div>

              <button
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className={styles.pageButton}
              >
                Next →
              </button>
            </div>
          )}
        </>
      ) : (
        <div className={styles.emptyState}>
          <p>No products found matching your criteria.</p>
          <button onClick={handleClearFilters} className={styles.clearButtonLarge}>
            Clear Filters
          </button>
        </div>
      )}
    </main>
  );
}
