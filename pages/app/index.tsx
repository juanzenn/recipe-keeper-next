import React from 'react';

import Head from 'next/head';
import Text from '@components/common/Text';
import ViewHeader from '@components/common/ViewHeader';
import RecipeCard from '@components/common/RecipeCard';
import { Button, ButtonOutlined } from '@components/common/Button';

import AppLayout from '@components/layout/AppLayout';
import Link from 'next/link';

export default function Index() {
  return (
    <>
      <Head>
        <title>Recipe Keeper - App</title>
      </Head>

      <ViewHeader
        title='Dashboard'
        subtitle='A recommended recipe every day.'
      />

      <section className='grid grid-cols-3 gap-4 items-center'>
        <RecipeCard
          type={'dashboard'}
          recipeTitle={'Tacos al pastor'}
          subtitle={'What to eat?'}
        />

        <RecipeCard
          type={'dashboard'}
          recipeTitle={'Pepperoni pizza'}
          subtitle={'Recommended'}
        />

        <article>
          <header className='mb-2'>
            <Text type='h3' className='text-primary-500'>
              Quick Actions
            </Text>
          </header>

          <section className='space-y-6'>
            <Button className='w-full'>
              <Link href='/app/recipes/add'>
                <a className='w-full px-6 py-2 inline-block'>Add a recipe</a>
              </Link>
            </Button>

            <ButtonOutlined className='w-full'>
              <Link href='/app/recipes'>
                <a className='w-full px-6 py-2 inline-block'>All my recipes</a>
              </Link>
            </ButtonOutlined>

            <ButtonOutlined className='w-full'>
              <Link href='/app/meal-planner'>
                <a className='w-full px-6 py-2 inline-block'>Meal Planner</a>
              </Link>
            </ButtonOutlined>
          </section>
        </article>
      </section>
    </>
  );
}

// eslint-disable-next-line react/display-name
Index.getLayout = (page: React.ReactNode) => (
  <AppLayout view='dashboard'>{page}</AppLayout>
);
