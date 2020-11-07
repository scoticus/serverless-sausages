import Head from 'next/head';

import Layout from '../components/Layout';
import ProductCard from '../components/ProductCard';

import productList from './../data/productList';

export default function Products() {
  return (
    <>
      <Head>
        <title>Our Sausages | Serverless Sausages</title>
      </Head>

      <Layout>
        {productList.map((product) => (
          <ProductCard key={product.stripeId} product={product} />
        ))}
      </Layout>
    </>
  );
}
