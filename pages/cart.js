import { useState } from 'react';
import { useCart } from 'react-use-cart';
import { cloneDeep } from 'lodash';
import { loadStripe } from '@stripe/stripe-js';
import Head from 'next/head';

import Layout from '../components/Layout';
import CartItem from '../components/CartItem';
import styles from '../styles/Cart.module.css';

export default function Cart() {
  const [loading, setLoading] = useState(false);
  const { items, isEmpty, totalItems, cartTotal } = useCart();

  const handleClick = async () => {
    setLoading(true);

    let stripeItems = cloneDeep(items);
    stripeItems.forEach((item) => {
      item.price = item.id;
      delete item.id;
      delete item.itemTotal;
      delete item.title;
    });

    const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_API_KEY);

    stripe
      .redirectToCheckout({
        lineItems: stripeItems,
        billingAddressCollection: 'auto',
        shippingAddressCollection: {
          allowedCountries: ['GB', 'IE'],
        },
        mode: 'payment',
        successUrl: process.env.NEXT_PUBLIC_STRIPE_SUCCESS_URL,
        cancelUrl: process.env.NEXT_PUBLIC_STRIPE_CANCEL_URL,
      })
      .then(function (result) {
        // If `redirectToCheckout` fails due to a browser or network
        // error, display the localized error message to your customer
        // using `result.error.message`.
        console.log(result);
        setLoading(false);
      });
  };

  return (
    <>
      <Head>
        <title>Cart | Serverless Sausages</title>
      </Head>

      <Layout>
        <h1>Your Cart</h1>
        <div>
          {items.map((item) => (
            <CartItem item={item} key={item.id} />
          ))}
        </div>

        {isEmpty ? (
          <p>No Items</p>
        ) : (
          <>
            <hr className={styles.divider} />

            <div className={styles.wrap}>
              <div className={styles.totals}>
                <p>
                  <span>Items: </span>
                  {totalItems}
                </p>
                <p>
                  <span>Total: </span>£{(cartTotal / 100).toFixed(2)}
                </p>
              </div>
              <button
                role="link"
                onClick={handleClick}
                className={styles.checkout}
                disabled={loading}
              >
                {loading ? 'Loading' : 'Checkout'}
              </button>
            </div>
          </>
        )}
      </Layout>
    </>
  );
}
