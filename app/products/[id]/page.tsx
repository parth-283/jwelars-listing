import Link from 'next/link';
import { getProductById, getProducts } from '@/types/product';
import styles from './page.module.css';

interface ProductDetailPageProps {
  params: {
    id: string;
  };
}

/**
 * Product detail page
 * Shows complete product information with back button
 * Handles product not found case
 */
export default function ProductDetailPage({ params }: ProductDetailPageProps) {
  const product = getProductById(params.id);

  // Product not found
  if (!product) {
    return (
      <main className={styles.container}>
        <div className={styles.notFoundCard}>
          <h1>Product Not Found</h1>
          <p>The product you're looking for doesn't exist.</p>
          <Link href="/products" className={styles.backButton}>
            ← Back to Products
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className={styles.container}>
      <div className={styles.header}>
        <Link href="/products" className={styles.backButton}>
          ← Back to Products
        </Link>
      </div>

      <article className={styles.detailCard}>
        <div className={styles.content}>
          <div className={styles.titleSection}>
            <h1 className={styles.title}>{product.title}</h1>
            <span className={styles.category}>{product.category}</span>
          </div>

          <div className={styles.priceSection}>
            <span className={styles.priceLabel}>Price</span>
            <p className={styles.price}>${product.price.toFixed(2)}</p>
          </div>

          <div className={styles.descriptionSection}>
            <h2>Description</h2>
            <p className={styles.description}>{product.description}</p>
          </div>

          <div className={styles.metaSection}>
            <div className={styles.metaItem}>
              <span className={styles.metaLabel}>Product ID</span>
              <span className={styles.metaValue}>{product.id}</span>
            </div>
            <div className={styles.metaItem}>
              <span className={styles.metaLabel}>Added</span>
              <span className={styles.metaValue}>
                {new Date(product.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>

          <Link href="/products" className={styles.continueButton}>
            Continue Shopping
          </Link>
        </div>
      </article>
    </main>
  );
}

/**
 * Generate static params for all products
 * Enables static export of all product pages
 */
export async function generateStaticParams() {
  const products = getProducts();
  return products.map((product) => ({
    id: product.id,
  }));
}
