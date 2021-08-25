import { Block } from '@components/AppComponents/Ingredients';
import Text from '@components/common/Text';
import AppLayout from '@components/layout/AppLayout';
import { getIngredients } from '@lib/supabase';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import React, { useEffect, useRef, useState } from 'react';
import { strToSlug } from '@lib/randomid';
import GoBack from '@components/common/GoBack';

interface CheckboxProps {
  text: string;
}

function Checkbox({ text }: CheckboxProps) {
  const [done, setDone] = useState<boolean>(false);

  useEffect(() => {
    if (localStorage.getItem(text)) {
      const value = localStorage.getItem(text);
      if (value === 'true') {
        setDone(true);
      } else {
        setDone(false);
      }
    } else {
      localStorage.setItem(text, 'false');
    }
  }, []);

  useEffect(() => {
    if (done === true) {
      localStorage.setItem(text, 'true');
    } else {
      localStorage.setItem(text, 'false');
    }
  }, [done]);

  return (
    <li className='mb-4 hover:text-gray-600 flex gap-4'>
      <input
        onChange={() => {
          setDone(prev => !prev);
        }}
        type='checkbox'
        id={strToSlug(text)}
        checked={done}
        value={''}
        className='form-checkbox rounded cursor-pointer hover:border-primary-500 text-primary-500 focus:ring-primary-200 focus:border-primary-500 transition-all'
      />
      <label
        htmlFor={strToSlug(text)}
        className={
          done ? `cursor-pointer text-gray-400 line-through` : `cursor-pointer`
        }>
        {text}
      </label>
    </li>
  );
}

export default function ShoppingList({ ingredients }: any) {
  const [recipe] = ingredients;

  return (
    <>
      <Head>
        <title>Shopping List - {recipe.title}</title>
      </Head>
      <main>
        <GoBack />

        <Text type='h1' className='mb-2'>
          {recipe.title}
        </Text>
        <p className='mb-8'>{recipe.description}</p>

        <section>
          {recipe.ingredients.map((block: Block) => (
            <div key={block.id}>
              <Text type='h3' className='mb-6 text-gray-800'>
                {block.block.blockTitle}
              </Text>
              <ul>
                {block.block.ingredients.map(ingredient => {
                  return (
                    <Checkbox
                      key={ingredient.id}
                      text={ingredient.ingredient}
                    />
                  );
                })}
              </ul>
            </div>
          ))}
        </section>
      </main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  if (params?.id !== undefined) {
    const ingredients = await getIngredients(params.id[0]);
    return {
      props: {
        ingredients,
      },
    };
  }

  return {
    notFound: true,
  };
};

// eslint-disable-next-line react/display-name
ShoppingList.getLayout = (page: React.ReactNode) => (
  <AppLayout view='shoppingList'>{page}</AppLayout>
);
