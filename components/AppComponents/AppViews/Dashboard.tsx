import React from 'react';
import Text from '@components/common/Text';
import { Button, ButtonOutlined } from '@components/common/Button';
import ViewHeader from '@components/common/ViewHeader';
import { ViewProps } from './Views';

import RecipeCard from '@components/common/RecipeCard';

export default function Dashboard({ setView, setOpen }: ViewProps) {
  return (
    <main>
      <ViewHeader
        title='Dashboard'
        subtitle='A recommended recipe every day.'
      />

      <section>
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
              <Button
                className='px-6 py-2 w-full'
                onClick={() => {
                  setOpen(false);
                  setView('addRecipe');
                }}>
                Add a recipe
              </Button>

              <ButtonOutlined
                className='px-6 py-2 w-full'
                onClick={() => {
                  setOpen(false);
                  setView('recipes');
                }}>
                All my recipes
              </ButtonOutlined>

              <ButtonOutlined
                className='px-6 py-2 w-full'
                onClick={() => {
                  setOpen(false);
                  setView('mealPlanner');
                }}>
                Meal Planner
              </ButtonOutlined>
            </section>
          </article>
        </section>
      </section>
    </main>
  );
}
