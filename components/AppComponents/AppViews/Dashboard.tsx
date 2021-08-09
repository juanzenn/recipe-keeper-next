import React from 'react';
import Text from '@components/common/Text';
import { Button, ButtonOutlined } from '@components/common/Button';
import { useUser } from '@auth0/nextjs-auth0';
import ViewHeader from '@components/common/ViewHeader';

export interface ViewProps {
  setView: (value: string) => void;
}

export interface DashboardRecipeShowcaseProps {
  title: string;
  recipeTitle: string;
  recipeLink?: string;
}

function DashboardRecipeShowcase({
  title,
  recipeTitle,
  recipeLink,
}: DashboardRecipeShowcaseProps) {
  return (
    <article>
      <header className='space-y-2 mb-2'>
        <Text type='h3' className='text-primary-500'>
          {title}
        </Text>
        <figure className='w-full h-56 bg-gray-300 rounded-lg'></figure>
      </header>
      <p className='text-xl uppercase font-bold tracking-wide mb-1'>
        {recipeTitle}
      </p>
      <p className='text-sm font-light text-gray-400 mb-6'>Time: 45 minutes</p>
      <Button className='w-full px-6 py-2 text-center'>See recipe</Button>
    </article>
  );
}

export default function Dashboard({ setView }: ViewProps) {
  const { user } = useUser();

  return (
    <main>
      <ViewHeader
        title='Dashboard'
        subtitle='A recommended recipe every day.'
      />

      <section>
        <section className='grid grid-cols-3 gap-4 items-center'>
          <DashboardRecipeShowcase
            title={'What to eat?'}
            recipeTitle={'Tacos al pastor'}
          />
          <DashboardRecipeShowcase
            title={'Recommended'}
            recipeTitle={'Pepperoni pizza'}
          />

          <article>
            <header className='mb-2'>
              <Text type='h3' className='text-primary-500'>
                Quick Actions
              </Text>
            </header>

            <section className='space-y-6'>
              <Button
                className='px-6 py-2 w-full'
                onClick={() => setView('addRecipe')}>
                Add a recipe
              </Button>

              <ButtonOutlined
                className='px-6 py-2 w-full'
                onClick={() => setView('recipes')}>
                All my recipes
              </ButtonOutlined>

              <ButtonOutlined
                className='px-6 py-2 w-full'
                onClick={() => setView('mealPlanner')}>
                Meal Planner
              </ButtonOutlined>
            </section>
          </article>
        </section>
      </section>
    </main>
  );
}
