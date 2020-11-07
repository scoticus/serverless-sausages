import { useCart } from 'react-use-cart';

import Link from 'next/link';
import styles from '../styles/Layout.module.css';

export default function Layout({ children }) {
  const { totalItems } = useCart();

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <nav className={styles.nav}>
          <div>
            <Link href="/">
              <a>Home</a>
            </Link>
            <Link href="/products">
              <a>Our Sausages</a>
            </Link>
          </div>
          <Link href="/cart">
            <a>Cart ({totalItems})</a>
          </Link>
        </nav>
      </header>

      <main className={styles.main}>{children}</main>
    </div>
  );
}
