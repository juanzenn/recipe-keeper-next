import React from 'react';

import Head from 'next/head';
import Text from '@components/common/Text';
import ViewHeader from '@components/common/ViewHeader';
import RecipeCard from '@components/common/RecipeCard';
import { ButtonSecondary } from '@components/common/Button';

import AppLayout from '@components/layout/AppLayout';
import NavigationContainer from '@components/common/NavigationContainer';
import { CirclePlus, Search } from 'akar-icons';
import Input from '@components/common/Input';
import Dropdown from '@components/common/Dropdown';
import Link from 'next/link';
import { getUserRecipe } from '@lib/supabase';

interface Props {
  recipes: {
    id: string;
    title: string;
    image: string;
    tags: string[];
    'cooking-time': string;
  }[];
}

export default function Recipes(props: Props) {
  const { recipes = [] } = props;

  return (
    <>
      <Head>
        <title>Recipe Keeper - App</title>
      </Head>

      <ViewHeader title='Recipes' subtitle='All your recipes in one place.' />

      <nav className='h-16 flex gap-2 mb-12'>
        <NavigationContainer>
          <Text type='h3' className='w-full'>
            Add a recipe
          </Text>
          <ButtonSecondary className='w-full border-2 border-transparent hover:border-white'>
            <Link href='/app/recipes/add'>
              <a className='w-full px-6 py-2 flex gap-2 items-center justify-center text-primary-500 hover:text-white transition-all'>
                Add
                <CirclePlus size={20} />
              </a>
            </Link>
          </ButtonSecondary>
        </NavigationContainer>
        <NavigationContainer>
          <Input
            type='search'
            icon={<Search size={20} />}
            placeholder='Tacos al pastor'
          />

          <div className='w-full text-right'>
            <Dropdown />
          </div>
        </NavigationContainer>
      </nav>

      {/* <pre>{JSON.stringify(recipes, null, 2)}</pre> */}

      <section className='grid grid-cols-3 gap-4 gap-y-12'>
        {recipes.map(recipe => (
          <RecipeCard
            key={recipe.id}
            recipeId={recipe.id}
            userRecipe={true}
            imageURL={recipe.image}
            recipeTitle={recipe.title}
            labels={recipe.tags}
            time={recipe['cooking-time']}
          />
        ))}
        {recipes.map(recipe => (
          <RecipeCard
            key={recipe.id}
            recipeId={recipe.id}
            userRecipe={true}
            imageURL={recipe.image}
            recipeTitle={recipe.title}
            labels={recipe.tags}
            time={recipe['cooking-time']}
          />
        ))}
        {recipes.map(recipe => (
          <RecipeCard
            key={recipe.id}
            recipeId={recipe.id}
            userRecipe={true}
            imageURL={recipe.image}
            recipeTitle={recipe.title}
            labels={recipe.tags}
            time={recipe['cooking-time']}
          />
        ))}
      </section>
    </>
  );
}

export async function getServerSideProps() {
  const recipes = await getUserRecipe('google-oauth2|117211086836143771355');

  // google-oauth2|117211086836143771355

  return {
    props: { recipes },
  };
}

// eslint-disable-next-line react/display-name
Recipes.getLayout = (page: React.ReactNode) => (
  <AppLayout view='recipes'>{page}</AppLayout>
);
