'use client';

import Link from 'next/link';
import { Product } from '@/types/product';
import styles from './product-card.module.css';

interface ProductCardProps {
  product: Product;
}

/**
 * Reusable product card component
 * Displays product summary with link to details
 */
export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <h3 className={styles.title}>{product.title}</h3>
        <span className={styles.category}>{product.category}</span>
      </div>

      <p className={styles.price}>${product.price.toFixed(2)}</p>

      <p className={styles.description}>{product.description.substring(0, 100)}...</p>

      <Link href={`/products/${product.id}`} className={styles.button}>
        View Details
      </Link>
    </div>
  );
}
