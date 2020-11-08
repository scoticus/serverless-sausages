import { useEffect, useState } from 'react';
import { useCart } from 'react-use-cart';

import Layout from '../components/Layout';
import CartItem from '../components/CartItem';

export default function Success() {
  const [orderItems, setOrderItems] = useState([]);
  const { emptyCart, items } = useCart();

  useEffect(() => {
    /**
     * After a successful transaction using Stripe Checkout, the user
     * is redirected back to our success page. This is that page.
     *
     * We're not given any data with this redirect, although we can
     * get Stripe to encode the `session_ID` into the redirect URL.
     *
     * In our case we simply want to let the customer know their
     * order has been received and show them a list of what they have
     * purchased.
     *
     * While we could use some backend magic for this, we still have
     * the cart contents in localStorage from before the user went
     * over to Stripe Checkout (react-use-cart keeps a copy of the
     * cart in localStorage).
     *
     * We're going to have to clear the cart (localStorage) anyway
     * so the user doesn't continue to see the items they've just
     * purchased in their cart, but before clearing it we could take
     * a copy and use that to show the customer their order items.
     *
     * That is what this useEffect hook does.
     *
     * It gets a copy of `items` from `useCart()` and sets the items
     * to `orderItems` state. It then calls `emptyCart()` which...
     * empties the cart!
     *
     * As if by magic, the customer can view a list of the items
     * they've just purchased but their cart is now clear so they can
     * happily go shopping all over again.
     *
     */
    setOrderItems(items);
    emptyCart();
  }, []);

  return (
    <Layout>
      <h1>Thanks for your order</h1>
      <p>
        We've received you order and we're getting to work packing it for you.
      </p>
      <p>Your order details are below</p>
      {orderItems.map((item) => (
        <CartItem item={item} key={item.id} success />
      ))}
    </Layout>
  );
}
