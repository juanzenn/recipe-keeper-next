import AppLayout from '@components/layout/AppLayout';
import Head from 'next/head';
import ViewHeader from '@components/common/ViewHeader';
import { useUser } from '@auth0/nextjs-auth0';
import { useEffect, useState } from 'react';
import {
  getShoppingLists,
  ShoppingList as ShoppingListInterface,
  shopRecipe,
} from '@lib/supabase';
import { ButtonOutlined } from '@components/common/Button';
import Link from 'next/link';
import { EyeOpen, TrashCan } from 'akar-icons';

export default function ShoppingList() {
  const { user } = useUser();
  const [shoppingList, setShoppingList] = useState<ShoppingListInterface[]>([]);

  useEffect(() => {
    async function fetch() {
      if (user) {
        const items = await getShoppingLists(
          user.sub ? user.sub : localStorage.getItem('user-id')
        );

        if (items) {
          console.log(items);
          setShoppingList(items);
        }
      }
    }

    fetch();
  }, [user]);

  async function handleDetele(id: string, recipeId: string | null | undefined) {
    if (id) {
      const item = await shopRecipe(id, recipeId);

      if (item) {
        const newList = shoppingList.filter(list => {
          if (item[0].recipeId === list.id) {
            return false;
          }
          return true;
        });
        setShoppingList(newList);
      }
    }
  }

  return (
    <>
      <Head>
        <title>Recipe Keeper - Shopping Lists</title>
      </Head>

      <ViewHeader
        title='Shopping Lists'
        subtitle='Save recipes for shopping later'
      />

      <main>
        {shoppingList.length <= 0 ? (
          <section className='w-full text-center'>
            <p className='text-gray-600 mb-2'>{`You don't have any shopping list. Explore more recipes`}</p>
            <ButtonOutlined className='w-max'>
              <Link href='/app/discover'>
                <a className='w-max px-6 py-2 inline-block'>
                  Discover new recipes
                </a>
              </Link>
            </ButtonOutlined>
          </section>
        ) : (
          <section className='grid grid-cols-3 gap-8'>
            {shoppingList.map(item => (
              <div
                key={item.id}
                className='w-full p-4 border border-blue-100 rounded shadow-sm'>
                <p className='text-2xl font-bold tracking-tight mb-8'>
                  {item.title}
                </p>
                <section className='flex justify-end gap-2'>
                  <button
                    onClick={() => handleDetele(item.id, user?.sub)}
                    className='p-2 flex gap-2 items-center hover:text-primary-600 transition-all'>
                    <TrashCan size={20} />
                    Delete
                  </button>
                  <Link href={`/app/shopping-list/${item.id}`}>
                    <a className='px-6 py-2 flex gap-2 items-center bg-blue-500 text-white rounded hover:bg-white border border-blue-500  hover:text-blue-500 transition-all'>
                      <EyeOpen size={20} />
                      View
                    </a>
                  </Link>
                </section>
              </div>
            ))}
          </section>
        )}
      </main>
    </>
  );
}

// eslint-disable-next-line react/display-name
ShoppingList.getLayout = (page: React.ReactNode) => (
  <AppLayout view='shoppingList'>{page}</AppLayout>
);
