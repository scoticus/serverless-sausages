import Head from 'next/head';
import Link from 'next/link';

import Layout from '../components/Layout';
import styles from '../styles/Home.module.css';

export default function Home() {
  return (
    <>
      <Head>
        <title>Serverless Sausages</title>
      </Head>

      <Layout>
        <h1 className={styles.title}>
          Welcome to <br />
          <span className={styles.fancy}>Serverless Sausages!</span>
        </h1>

        <Link href="/products">
          <a className={styles.link}>Peruse our Sausages</a>
        </Link>
      </Layout>
    </>
  );
}
