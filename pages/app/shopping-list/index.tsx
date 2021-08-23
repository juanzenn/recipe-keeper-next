import AppLayout from '@components/layout/AppLayout';
import Head from 'next/head';
import ViewHeader from '@components/common/ViewHeader';

export default function ShoppingList() {
  return (
    <>
      <Head>
        <title>Recipe Keeper - Shopping Lists</title>
      </Head>

      <ViewHeader
        title='Shopping Lists'
        subtitle='Save recipes for shopping later'
      />

      <main></main>
    </>
  );
}

// eslint-disable-next-line react/display-name
ShoppingList.getLayout = (page: React.ReactNode) => (
  <AppLayout view='shoppingList'>{page}</AppLayout>
);
