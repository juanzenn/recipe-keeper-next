import React, { useEffect, useState } from 'react';

import Head from 'next/head';
import Text from '@components/common/Text';
import ViewHeader from '@components/common/ViewHeader';
import { ButtonSecondary } from '@components/common/Button';

import AppLayout from '@components/layout/AppLayout';
import NavigationContainer from '@components/common/NavigationContainer';
import { CirclePlus } from 'akar-icons';
import Link from 'next/link';
import { getUserRecipe } from '@lib/supabase';
import { RecipeData } from '@components/AppComponents/RecipesContainer';

import { Recipes as RecipesSomething } from '@components/AppComponents/Recipes';
import { useUser } from '@auth0/nextjs-auth0';

export default function Recipes() {
  const { user } = useUser();
  const [recipes, setRecipes] = useState<RecipeData[]>([]);

  useEffect(() => {
    async function fetch() {
      if (user) {
        const recipes = await getUserRecipe(
          user.sub ? user.sub : localStorage.getItem('user-id')
        );
        if (recipes) setRecipes(recipes);
      }
    }

    fetch();
  }, [user]);

  return (
    <>
      <Head>
        <title>Recipe Keeper - App</title>
      </Head>

      <ViewHeader title='Recipes' subtitle='All your recipes in one place.' />

      <RecipesSomething recipes={recipes} userRecipes={true} addRecipe={true} />
    </>
  );
}

export async function getServerSideProps() {
  const recipes = await getUserRecipe('google-oauth2|117211086836143771355');

  return {
    props: { recipes },
  };
}

// eslint-disable-next-line react/display-name
Recipes.getLayout = (page: React.ReactNode) => (
  <AppLayout view='recipes'>{page}</AppLayout>
);
