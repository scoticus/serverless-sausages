import { useCart } from 'react-use-cart';

import styles from '../styles/CartItem.module.css';

export default function CartItem({ item, success }) {
  const { title, quantity, price, id } = item;
  const { removeItem } = useCart();

  return (
    <div className={styles.container}>
      <p className={styles.title}>{title}</p>
      <p>x{quantity}</p>
      <p>£{((quantity * price) / 100).toFixed(2)}</p>
      {!success && (
        <button onClick={() => removeItem(id)} className={styles.remove}>
          Remove
        </button>
      )}
    </div>
  );
}
