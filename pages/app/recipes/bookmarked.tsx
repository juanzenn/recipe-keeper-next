import { useUser } from '@auth0/nextjs-auth0';
import Recipes from '@components/AppComponents/Recipes';
import ViewHeader from '@components/common/ViewHeader';
import AppLayout from '@components/layout/AppLayout';
import { getBookmarkedRecipes } from '@lib/supabase';
import Head from 'next/head';
import React, { useEffect, useState } from 'react';

export default function Bookmarked() {
  const [recipes, setRecipes] = useState<any>([]);
  const { user } = useUser();

  useEffect(() => {
    async function fetch() {
      if (user) {
        const recipes = await getBookmarkedRecipes(
          user.sub ? user.sub : localStorage.getItem('user-id')
        );
        setRecipes(recipes);
      }
    }

    fetch();
  }, [user]);

  if (user) {
    return (
      <>
        <Head>
          <title>Recipe Keeper - Bookmarked recipes</title>
        </Head>
        <div>
          <ViewHeader title='Bookmarks' subtitle='All your bookmarks' />

          <Recipes recipes={recipes} />
        </div>
      </>
    );
  }
}

// eslint-disable-next-line react/display-name
Bookmarked.getLayout = (page: React.ReactNode) => (
  <AppLayout view='recipes'>{page}</AppLayout>
);
