import Input from '@components/common/Input';
import ViewHeader from '@components/common/ViewHeader';
import AppLayout from '@components/layout/AppLayout';
import Ingredients from '@components/AppComponents/Ingredients';
import Head from 'next/head';
import React, { useState } from 'react';

import { useNumberInput, useTextInput } from '@hooks/formHooks';
import { Ingredient } from '@hooks/ingredient';
import TagSelector from '@components/AppComponents/TagSelector';
import Label from '@components/common/Label';
import { Button } from '@components/common/Button';

export default function Edit() {
  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    const recipe = {
      name: recipeName,
      description: description,
      cooking_time: time,
      servings_per_recipe: servings,
      tags: selectedTags,
      ingredients: ingredients,
      instructions: instructions,
      image: picture,
    };
    console.log(recipe);
  }

  const [recipeName, changeRecipeName] = useTextInput('Some recipe name');
  const [description, changeDescription] = useTextInput('Some description!!!!');
  const [time, changeTime] = useNumberInput(2);
  const [servings, changeServings] = useNumberInput(4);

  const [unit, changeUnit] = useTextInput('metric');

  const [ingredients, setIngredients] = useState<Ingredient[]>([]);

  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const [instructions, setInstructions] = useTextInput('');

  const [picture, setPicture] = useState<any>('');

  function handleTagDelete(tag: string): void {
    const index = selectedTags.indexOf(tag);

    const firstHalf = selectedTags.slice(0, index);
    const secondHalf = selectedTags.slice(index + 1);

    setSelectedTags(firstHalf.concat(secondHalf));
  }

  function handleImageUpload(event: any) {
    setPicture(event.target.files[0]);
  }

  return (
    <>
      <Head>
        <title>Recipe Keeper - Add Recipe</title>
      </Head>

      <ViewHeader
        title='Add new recipe'
        subtitle="Fill the form with your recipe's information"></ViewHeader>

      <form className='grid grid-cols-2 gap-8' onSubmit={handleSubmit}>
        <Input
          value={recipeName}
          onChange={event => {
            changeRecipeName(event);
          }}
          type='text'
          placeholder='Tacos al pastor'
          label='Recipe name'
        />

        <div className='w-full'>
          <label className='inline-block mb-2 font-bold tracking-wide text-sm text-gray-900'>
            Recipe image
          </label>
          <input
            type='file'
            onChange={e => handleImageUpload(e)}
            className='w-full text-base bg-transparent p-2 text-primary-400 focus:text-primary-500 placeholder-primary-300 focus:outline-none'
          />
        </div>

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
          <article>
            <TagSelector
              selectedTags={selectedTags}
              setSelectedTags={setSelectedTags}
            />
            <section className='flex gap-4 mt-4'>
              {selectedTags.length === 0 ? (
                <p className='text-sm text-gray-600 italic tracking-tight'>
                  No selected tags
                </p>
              ) : (
                selectedTags.map((tag, index) => (
                  <Label
                    key={`tag-${index}`}
                    onClick={() => handleTagDelete(tag)}
                    type={tag}>
                    {tag}
                  </Label>
                ))
              )}
            </section>
          </article>

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

        <Ingredients
          setIngredients={setIngredients}
          ingredients={ingredients}
          unit={unit}
        />

        <article>
          <Input
            value={instructions}
            onChange={event => {
              setInstructions(event);
            }}
            type='textarea'
            placeholder={`* Prepare the meat \n* Prepare the tacos \n* Enjoy yourselve`}
            label='Instructions'
          />
          <p className='text-sm text-gray-600 italic tracking-tight'>
            This field accepts Markdown syntax
          </p>
        </article>

        <Button
          type='submit'
          className='w-max p-4 bg-primary-500 text-white col-span-2'>
          Create new recipe
        </Button>
      </form>
    </>
  );
}

// eslint-disable-next-line react/display-name
Edit.getLayout = (page: React.ReactNode) => (
  <AppLayout view='recipes'>{page}</AppLayout>
);
