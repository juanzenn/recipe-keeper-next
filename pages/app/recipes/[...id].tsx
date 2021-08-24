import Label from '@components/common/Label';
import Text from '@components/common/Text';
import AppLayout from '@components/layout/AppLayout';
import {
  getRecipeById,
  getActionsById,
  SingleRecipe,
  bookmarkRecipe,
  shopRecipe,
} from '@lib/supabase';
import { Cart, Heart } from 'akar-icons';
import { GetServerSideProps } from 'next';
import GoBack from '@components/common/GoBack';

import Head from 'next/head';
import Image from 'next/image';
import React, { useEffect, useState, useCallback } from 'react';
import { useUser } from '@auth0/nextjs-auth0';

const marked = require('marked');

interface Props {
  recipe: SingleRecipe;
  recipeId: string;
}

export default function Recipe({ recipe, recipeId }: Props) {
  const { user } = useUser();
  const [bookmarked, setBookmarked] = useState(false);
  const [hasShoppingList, setHasShoppingList] = useState(false);

  useEffect(() => {
    async function fetchActions() {
      const actions = await getActionsById(recipeId, user?.sub);

      if (actions) {
        setBookmarked(actions.isBookmarked);
        setHasShoppingList(actions.hasShoppingList);
      }
    }
    fetchActions();
  }, []);

  const {
    title,
    imageUrl,
    slug,
    description,
    tags,
    ingredients,
    servings,
    cookingTime,
    instructions,
    author,
  } = recipe;

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>

      <main className='relative'>
        <GoBack />

        <figure className='relative w-full h-[50vh] mb-8 rounded-lg overflow-hidden shadow-lg'>
          <Image layout='fill' src={imageUrl} alt={slug} />
        </figure>

        <Text type='h2' className='mb-2'>
          {title}
        </Text>

        <Text type='paragraph' className='mb-8'>
          {description}
        </Text>

        <section className='grid grid-cols-2 gap-4 bg-white shadow p-6 w-3/4 mx-auto mb-8'>
          <article>
            <Text type='h3' className='mb-2'>
              Author
            </Text>
            <Text type='paragraph' className='text-primary-500'>
              {author.name}
            </Text>
          </article>
          <ul className='space-y-4'>
            <li className='flex gap-4 items-center'>
              <strong className='text-lg tracking-tight'>Tags</strong>
              <div className='w-full flex gap-4 flex-wrap'>
                {tags
                  ? tags.map(tag => (
                      <Label type={tag} key={`${tag}`}>
                        {tag[0].toUpperCase() + tag.slice(1)}
                      </Label>
                    ))
                  : null}
              </div>
            </li>
            <li className='flex gap-4 items-center'>
              <strong className='text-lg tracking-tight'>Time to cook</strong>
              {cookingTime}
            </li>
            <li className='flex gap-4 items-center'>
              <strong className='text-lg tracking-tight'>Servings </strong>
              {servings}
            </li>
          </ul>
        </section>

        <section id='buttons' className='w-full flex gap-4 justify-end mb-4'>
          {bookmarked ? (
            <button
              className='flex gap-2 items-center px-6 py-2 rounded border border-primary-500 bg-primary-500 text-white hover:bg-primary-600 hover:border-red-600 focus:ring focus:ring-primary-200 transition-all'
              onClick={() => {
                bookmarkRecipe(recipeId[0], user?.sub);
                setBookmarked(prev => !prev);
              }}>
              Bookmarked
              <Heart size={20} />
            </button>
          ) : (
            <button
              className='flex gap-2 items-center px-6 py-2 rounded border border-primary-500 hover:bg-primary-500 text-primary-500 hover:text-white focus:ring focus:ring-primary-200 transition-all'
              onClick={() => {
                bookmarkRecipe(recipeId[0], user?.sub);
                setBookmarked(prev => !prev);
              }}>
              Bookmark
              <Heart size={20} />
            </button>
          )}
          <button
            onClick={() => {
              shopRecipe(recipeId[0], user?.sub);
            }}
            className='flex gap-2 items-center px-6 py-2 text-gray-800 border border-gray-800 hover:bg-gray-800 hover:border-gray-800 hover:text-white shadow-sm rounded transition-all'>
            Create shopping list
            <Cart size={20} />
          </button>
        </section>

        <section className='grid grid-cols-2 gap-6'>
          <section className='bg-white p-4'>
            <Text type='h3' className='text-primary-600 mb-6'>
              Ingredients
            </Text>
            {ingredients
              ? ingredients.map(block => (
                  <article key={block.id}>
                    <strong className='inline-block text-lg text-gray-900 mb-3'>
                      {block.block.blockTitle}
                    </strong>
                    <ul className='mb-4 list-disc list-inside'>
                      {block.block.ingredients.map(ingredient => (
                        <li key={ingredient.id} className='mb-2 text-gray-600'>
                          {ingredient.ingredient}
                        </li>
                      ))}
                    </ul>
                  </article>
                ))
              : null}
          </section>
          <section className='bg-white p-4'>
            <Text type='h3' className='text-primary-600 mb-6'>
              Instructions
            </Text>

            <Text type='paragraph'>
              <span
                className='space-y-4 leading-relaxed'
                dangerouslySetInnerHTML={{
                  __html: marked(instructions),
                }}></span>
            </Text>
          </section>
        </section>
      </main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  if (params?.id !== undefined) {
    const recipe = await getRecipeById(params.id);
    const recipeId = params.id;

    if (!recipe) {
      return {
        notFound: true,
      };
    }

    return {
      props: {
        recipe,
        recipeId,
      },
    };
  }

  return {
    notFound: true,
  };
};

// eslint-disable-next-line react/display-name
Recipe.getLayout = (page: React.ReactNode) => (
  <AppLayout view='recipes'>{page}</AppLayout>
);
