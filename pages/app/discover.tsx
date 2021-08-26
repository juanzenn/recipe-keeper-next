import React, { useEffect, useState } from 'react';

import Head from 'next/head';
import AppLayout from '@components/layout/AppLayout';
import ViewHeader from '@components/common/ViewHeader';
import Recipes from '@components/AppComponents/Recipes';

import { RecipeData } from '@components/AppComponents/RecipesContainer';

import { getDiscoveryRecipes } from '@lib/supabase';
import { useUser } from '@auth0/nextjs-auth0';

export default function Discover() {
  const { user } = useUser();
  const [recipes, setRecipes] = useState<RecipeData[]>([]);

  useEffect(() => {
    async function fetch() {
      if (user) {
        const recipes = await getDiscoveryRecipes(
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

      <ViewHeader
        title='Discover'
        subtitle='New recipes from around the world'
      />

      <Recipes recipes={recipes} />
    </>
  );
}

// eslint-disable-next-line react/display-name
Discover.getLayout = (page: React.ReactNode) => (
  <AppLayout view='discover'>{page}</AppLayout>
);
