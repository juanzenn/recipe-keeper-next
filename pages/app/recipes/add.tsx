import Input from '@components/common/Input';
import ViewHeader from '@components/common/ViewHeader';
import AppLayout from '@components/layout/AppLayout';
import Ingredients from '@components/AppComponents/Ingredients';
import Head from 'next/head';
import React, { useEffect, useState } from 'react';

import { useNumberInput, useTextInput } from '@hooks/formHooks';
import { Ingredient } from '@hooks/ingredient';

export default function Add() {
  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    console.log(ingredients);
  }

  const [recipeName, changeRecipeName] = useTextInput('');
  const [description, changeDescription] = useTextInput('');
  const [time, changeTime] = useNumberInput(0);
  const [servings, changeServings] = useNumberInput(0);
  const [tag, changeTag] = useTextInput('');
  const [unit, changeUnit] = useTextInput('metric');
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);

  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [availableTags, setAvailableTags] = useState([
    'meat',
    'vegan',
    'vegetarian',
  ]);

  useEffect(() => {
    const index = availableTags.indexOf(tag);

    if (index < 0) {
      return;
    }

    const firstHalf = availableTags.slice(0, index);
    const secondHalf = availableTags.slice(index + 1);

    setAvailableTags(firstHalf.concat(secondHalf));

    setSelectedTags([...selectedTags, tag]);
  }, [tag]);

  return (
    <>
      <Head>
        <title>Recipe Keeper - Add Recipe</title>
      </Head>

      <ViewHeader
        title='Add new recipe'
        subtitle="Fill the form with your recipe's information"></ViewHeader>

      <form className='grid grid-cols-2 gap-6' onSubmit={handleSubmit}>
        <Input
          value={recipeName}
          onChange={event => {
            changeRecipeName(event);
          }}
          type='text'
          placeholder='Tacos al pastor'
          label='Recipe name'
        />

        {/* To do */}
        <Input type='upload' label='Recipe image' />

        <div className='col-span-2'>
          <Input
            value={description}
            onChange={event => {
              changeDescription(event);
            }}
            type='textarea'
            placeholder='Tacos al pastor are the best mexican tacos'
            label='Description'
          />
        </div>
        <div className='space-y-6'>
          <Input
            value={time}
            onChange={event => {
              changeTime(event);
            }}
            type='number'
            label='Time'
            placeholder='In hours...'
          />
          <Input
            value={servings}
            onChange={event => {
              changeServings(event);
            }}
            type='number'
            label='Servings Per Recipe'
            placeholder='4'
          />
        </div>

        <div className='space-y-6'>
          <Input
            value={tag}
            onChange={event => {
              changeTag(event);
            }}
            type='select'
            label='Tags'
            placeholder='Select something'
            options={availableTags}
          />

          <section className='flex gap-4'>
            {selectedTags.length === 0
              ? 'No selected tags'
              : selectedTags.map((tag, index) => (
                  <div key={`tag-${index}`}>{tag}</div>
                ))}
          </section>

          <Input
            value={unit}
            onChange={event => {
              changeUnit(event);
            }}
            type='select'
            label='Unit System'
            placeholder='Select something'
            options={['Metric', 'Imperial']}
          />
        </div>

        <Ingredients changeIngredients={setIngredients} />

        <button type='submit' className='p-6 bg-red rounded-full'>
          {' '}
          USBMIT{' '}
        </button>
      </form>
    </>
  );
}

// eslint-disable-next-line react/display-name
Add.getLayout = (page: React.ReactNode) => (
  <AppLayout view='recipes'>{page}</AppLayout>
);
