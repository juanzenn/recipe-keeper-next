import React, { useEffect, useState } from 'react';

import Head from 'next/head';
import Text from '@components/common/Text';
import ViewHeader from '@components/common/ViewHeader';
import { Button, ButtonOutlined } from '@components/common/Button';

import AppLayout from '@components/layout/AppLayout';
import Link from 'next/link';
import { EyeOpen, TrashCan } from 'akar-icons';
import { useUser } from '@auth0/nextjs-auth0';
import { getShoppingLists, shopRecipe, ShoppingList } from '@lib/supabase';

export default function Index() {
  const { user } = useUser();
  const [shoppingList, setShoppingList] = useState<ShoppingList[]>([]);

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
        <title>Recipe Keeper - App</title>
      </Head>

      <ViewHeader
        title='Dashboard'
        subtitle='Welcome back, glad to see you again.'
      />

      <section className=''>
        <section className='mb-12'>
          <header className='mb-8'>
            <Text type='h2'>Quick Actions</Text>
          </header>

          <section className='grid lg:grid-cols-3 gap-4'>
            <article className='w-full'>
              <Text type='h3' className='mb-1'>
                Add recipe
              </Text>
              <p className='mb-4 text-gray-600'>
                Keep expanding your collection
              </p>
              <Button className='w-full'>
                <Link href='/app/recipes/add'>
                  <a className='w-full px-6 py-2 inline-block'>Add a recipe</a>
                </Link>
              </Button>
            </article>

            <article className='w-full'>
              <Text type='h3' className='mb-1'>
                My recipes
              </Text>
              <p className='mb-4 text-gray-600'>Check and edit your recipes</p>
              <ButtonOutlined className='w-full'>
                <Link href='/app/recipes'>
                  <a className='w-full px-6 py-2 inline-block'>
                    All my recipes
                  </a>
                </Link>
              </ButtonOutlined>
            </article>

            <article className='w-full'>
              <Text type='h3' className='mb-1'>
                Bookmarked recipes
              </Text>
              <p className='mb-4 text-gray-600'>
                All your bookmarks in one place
              </p>
              <ButtonOutlined className='w-full'>
                <Link href='/app/recipes/bookmarked'>
                  <a className='w-full px-6 py-2 inline-block'>Bookmarked</a>
                </Link>
              </ButtonOutlined>
            </article>
          </section>
        </section>

        <section className='flex flex-col-reverse lg:grid lg:grid-cols-2 gap-8'>
          <section className='p-4'>
            <Text type='h3'> Tutorials</Text>

            <p className='text-gray-400'>{`There's nothing here yet...`}</p>
          </section>

          <section className='p-4 max-h-screen lg:max-h-[50vh] overflow-y-scroll'>
            <Text type='h3' className='mb-6'>
              Shopping Lists
            </Text>

            <div className='w-full flex flex-col items-center justify-center'>
              {shoppingList.length <= 0 ? (
                <>
                  <p className='text-gray-600 mb-2'>{`You don't have any shopping list. Explore more recipes`}</p>
                  <ButtonOutlined className='w-max'>
                    <Link href='/app/discover'>
                      <a className='w-max px-6 py-2 inline-block'>
                        Discover new recipes
                      </a>
                    </Link>
                  </ButtonOutlined>
                </>
              ) : (
                shoppingList.map(item => (
                  <div key={item.id} className='w-full flex justify-between'>
                    <p className='text-lg font-medium tracking-tight'>
                      {item.title}
                    </p>
                    <section className='flex gap-2'>
                      <Link href={`/app/shopping-list/${item.id}`}>
                        <a className='w-full px-6 py-2 flex gap-2 items-center font-medium hover:text-blue-500 transition-all'>
                          <EyeOpen size={20} />
                          View
                        </a>
                      </Link>
                      <button
                        onClick={() => handleDetele(item.id, user?.sub)}
                        className='p-2 text-gray-600 hover:text-primary-600 transition-all'>
                        <TrashCan size={20} />
                      </button>
                    </section>
                  </div>
                ))
              )}
            </div>
          </section>
        </section>
      </section>
    </>
  );
}

// eslint-disable-next-line react/display-name
Index.getLayout = (page: React.ReactNode) => (
  <AppLayout view='dashboard'>{page}</AppLayout>
);
