'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Header.module.css';

/**
 * Luxury Header for Maa Jwelary
 * Elegant serif logo, gold underline nav, mobile menu
 */
export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { href: '/products', label: 'Home' },
    { href: '/admin', label: 'Add Jewelry' },
  ];

  const isActive = (href: string) => {
    if (href === '/products') {
      return pathname === '/products' || pathname.startsWith('/products/');
    }
    return pathname === href;
  };

  const handleNavClick = () => setMenuOpen(false);

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        {/* Logo */}
        <Link href="/products" className={styles.logo}>
          <span className={styles.logoText}>Maa Jwelary</span>
        </Link>
        {/* Desktop Nav */}
        <nav className={styles.desktopNav} aria-label="Main navigation">
          <ul className={styles.navList}>
            {navLinks.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className={`${styles.navLink} ${
                    isActive(href) ? styles.active : ''
                  }`}
                  aria-current={isActive(href) ? 'page' : undefined}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        {/* Hamburger */}
        <button
          className={`${styles.menuButton} ${
            menuOpen ? styles.menuOpen : ''
          }`}
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
        >
          <span className={styles.bar}></span>
          <span className={styles.bar}></span>
          <span className={styles.bar}></span>
        </button>
        {/* Mobile Nav */}
        {menuOpen && (
          <nav className={styles.mobileNav} aria-label="Mobile navigation">
            <ul className={styles.mobileNavList}>
              {navLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className={`${styles.mobileNavLink} ${
                      isActive(href) ? styles.active : ''
                    }`}
                    aria-current={isActive(href) ? 'page' : undefined}
                    onClick={handleNavClick}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
}
