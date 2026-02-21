import styles from "./Footer.module.css";

/**
 * Luxury Footer for Maa Jwelary
 * Gold border, tagline, social links, elegant layout
 */
export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.brandSection}>
          <span className={styles.brand}>Maa Jwelary</span>
          <span className={styles.tagline}>Timeless Elegance in Every Piece</span>
        </div>
        <div className={styles.socialSection}>
          {/* Social icons as placeholders */}
          <a href="#" className={styles.social} aria-label="Instagram" title="Instagram">
            <span className={styles.socialIcon}>IG</span>
          </a>
          <a href="#" className={styles.social} aria-label="Facebook" title="Facebook">
            <span className={styles.socialIcon}>FB</span>
          </a>
          <a href="#" className={styles.social} aria-label="Pinterest" title="Pinterest">
            <span className={styles.socialIcon}>PT</span>
          </a>
        </div>
      </div>
      <div className={styles.bottom}>
        <span className={styles.copyright}>
          © {year} Maa Jwelary. All rights reserved.
        </span>
      </div>
    </footer>
  );
}
