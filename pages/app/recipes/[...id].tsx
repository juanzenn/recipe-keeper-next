import { Button } from '@components/common/Button';
import Label from '@components/common/Label';
import Text from '@components/common/Text';
import AppLayout from '@components/layout/AppLayout';
import { getRecipeById, SingleRecipe } from '@lib/supabase';
import { Cart, Download } from 'akar-icons';
import { GetServerSideProps } from 'next';
import GoBack from '@components/common/GoBack';

import Head from 'next/head';
import Image from 'next/image';
import React from 'react';
import PDF from '@components/PDF';

const marked = require('marked');

interface Props {
  recipe: SingleRecipe;
}

export default function Recipe({ recipe }: Props) {
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

        <section id='buttons' className='w-full flex gap-6 justify-end mb-4'>
          <button className='flex gap-2 items-center px-6 py-2 font-medium hover:bg-gray-100 hover:shadow rounded transition-all'>
            Create shopping list
            <Cart size={20} />
          </button>
          <Button className='flex gap-2 items-center px-6 py-2'>
            Print <Download size={20} />
          </Button>
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

      <PDF recipe={recipe} />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  if (params?.id !== undefined) {
    const recipe = await getRecipeById(params.id);

    if (!recipe) {
      return {
        notFound: true,
      };
    }

    return {
      props: {
        recipe,
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
