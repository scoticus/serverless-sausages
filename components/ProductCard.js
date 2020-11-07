import { useCart } from 'react-use-cart';

import styles from '../styles/ProductCard.module.css';

export default function Product({ product }) {
  const { stripeId, title, imgSrc, imgAlt, description, price } = product;

  const { addItem, inCart, getItem, updateItemQuantity } = useCart();
  const thisItem = getItem(stripeId);

  return (
    <div className={styles.card}>
      <img className={styles.img} src={imgSrc} alt={imgAlt} width="360" />

      <div className={styles.info}>
        <h2 className={styles.productTitle}>{title}</h2>
        <p className={styles.sku}>Stripe ID: {stripeId}</p>
        <p className={styles.description}>{description}</p>
        <p className={styles.price}>£{price / 100} each</p>

        <div className={styles.actions}>
          {inCart(stripeId) ? (
            <>
              <p>{thisItem.quantity} in cart</p>
              <button
                onClick={() =>
                  updateItemQuantity(stripeId, thisItem.quantity - 1)
                }
              >
                -
              </button>
              <button
                onClick={() =>
                  updateItemQuantity(stripeId, thisItem.quantity + 1)
                }
              >
                +
              </button>
            </>
          ) : (
            <button onClick={() => addItem({ id: stripeId, price, title })}>
              Add to cart
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
