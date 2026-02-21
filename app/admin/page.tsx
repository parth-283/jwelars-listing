'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { addProduct, getProducts } from '@/types/product';
import styles from './page.module.css';

interface FormData {
  title: string;
  price: string;
  category: string;
  description: string;
}

/**
 * Admin page for adding new products
 * Features: form validation, success message, product count
 */
export default function AdminPage() {
  const [formData, setFormData] = useState<FormData>({
    title: '',
    price: '',
    category: '',
    description: '',
  });

  const [productCount, setProductCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load product count on mount
  useEffect(() => {
    const products = getProducts();
    setProductCount(products.length);
    setLoading(false);
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = (): boolean => {
    if (!formData.title.trim()) {
      setError('Title is required');
      return false;
    }
    if (!formData.price || parseFloat(formData.price) <= 0) {
      setError('Price must be greater than 0');
      return false;
    }
    if (!formData.category.trim()) {
      setError('Category is required');
      return false;
    }
    if (!formData.description.trim()) {
      setError('Description is required');
      return false;
    }
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!validateForm()) {
      return;
    }

    try {
      addProduct({
        title: formData.title.trim(),
        price: parseFloat(formData.price),
        category: formData.category.trim(),
        description: formData.description.trim(),
      });

      // Update count
      const updated = getProducts();
      setProductCount(updated.length);

      // Reset form
      setFormData({
        title: '',
        price: '',
        category: '',
        description: '',
      });

      // Show success message
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add product');
    }
  };

  if (loading) {
    return (
      <main className={styles.container}>
        <div className={styles.loading}>Loading...</div>
      </main>
    );
  }

  return (
    <main className={styles.container}>
      <div className={styles.header}>
        <h1>Product Admin</h1>
        <Link href="/products" className={styles.navLink}>
          View Products
        </Link>
      </div>

      <div className={styles.content}>
        <div className={styles.statsCard}>
          <div className={styles.stat}>
            <span className={styles.statLabel}>Total Products</span>
            <span className={styles.statValue}>{productCount}</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statLabel}>Capacity</span>
            <span className={styles.statValue}>{productCount}/5000</span>
          </div>
        </div>

        <div className={styles.formCard}>
          <h2>Add New Product</h2>

          {showSuccess && <div className={styles.successMessage}>✓ Product added successfully!</div>}

          {error && <div className={styles.errorMessage}>✕ {error}</div>}

          <form onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              <label htmlFor="title">Product Title *</label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter product title"
                maxLength={200}
              />
            </div>

            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label htmlFor="price">Price ($) *</label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="0.00"
                  step="0.01"
                  min="0"
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="category">Category *</label>
                <input
                  type="text"
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  placeholder="e.g., Electronics, Clothing"
                  maxLength={50}
                />
              </div>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="description">Description *</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Enter detailed product description"
                rows={5}
                maxLength={1000}
              />
            </div>

            <button type="submit" className={styles.submitButton}>
              Add Product
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
