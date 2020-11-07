import { useEffect, useState } from 'react';
import { useCart } from 'react-use-cart';

import Layout from '../components/Layout';
import CartItem from '../components/CartItem';

export default function Success() {
  const [orderItems, setOrderItems] = useState([]);
  const { emptyCart, items } = useCart();

  useEffect(() => {
    // copy cart contents into component state
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
