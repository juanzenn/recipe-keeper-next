import React, { useEffect, useState, useRef } from 'react';

import NavigationContainer from '@components/common/NavigationContainer';
import RecipesFilter from '@components/AppComponents/RecipesFilter';
import RecipesContainer from '@components/AppComponents/RecipesContainer';
import Text from '@components/common/Text';

import { RecipeData } from '@components/AppComponents/RecipesContainer';

import { CirclePlus, Cross, Search, TrashBin } from 'akar-icons';
import Label from '@components/common/Label';
import { ButtonSecondary } from '@components/common/Button';
import Link from 'next/link';

interface Props {
  recipes: RecipeData[];
  userRecipes?: boolean;
  addRecipe?: boolean;
}

export default function Recipes({
  recipes,
  userRecipes = false,
  addRecipe = false,
}: Props) {
  const [filters, setFilters] = useState<string[]>([]);

  const [explorerRecipes, setExplorerRecipes] = useState<RecipeData[]>(recipes);
  const [searchedRecipes, setSerchedRecipes] = useState<RecipeData[]>(recipes);

  const searchValue = useRef<HTMLInputElement>(null);

  function addFilter(filter: string) {
    if (filters.indexOf(filter) < 0) {
      setFilters([...filters, filter]);
      return;
    } else {
      console.log('The filter is in the array');
      return;
    }
  }

  function deleteFilter(oldFilter: string) {
    const newFilters = filters.filter(item => {
      if (item === oldFilter) {
        return false;
      } else {
        return true;
      }
    });
    setFilters(newFilters);
  }

  function updateRecipes(filters: string[]) {
    if (filters.length <= 0) {
      setExplorerRecipes(recipes);
      setSerchedRecipes(() => {
        if (searchValue.current?.value) {
          searchRecipes(recipes);
        }
        return recipes;
      });

      return;
    }

    const afterFilter = recipes.filter(recipe => {
      for (let i = 0; i < filters.length; i++) {
        if (recipe.tags.indexOf(filters[i]) < 0) {
          return false;
        }
      }
      return true;
    });

    setExplorerRecipes(afterFilter);
    setSerchedRecipes(afterFilter);
  }

  function clearFilters() {
    setFilters([]);
    setExplorerRecipes(recipes);
  }

  function searchRecipes(arrayToSearch: RecipeData[] = explorerRecipes) {
    if (!searchValue.current?.value) {
      setSerchedRecipes(explorerRecipes);
      return;
    }

    if (searchValue.current?.value) {
      let matchTo = searchValue.current?.value;

      const search = new RegExp(matchTo, 'ig');

      const foundRecipes = arrayToSearch.filter(recipe => {
        if (search.test(recipe.title)) {
          return true;
        } else {
          return false;
        }
      });

      setSerchedRecipes(foundRecipes);
    }
  }

  // useEffect(() => {
  //   searchRecipes();
  // }, []);

  useEffect(() => {
    updateRecipes(filters);
  }, [filters]);

  // This only happens once
  useEffect(() => {
    setExplorerRecipes(recipes);
    setSerchedRecipes(recipes);
  }, [recipes]);

  return (
    <section>
      <nav className='flex flex-col lg:flex-row gap-4 mb-12'>
        {addRecipe ? (
          <NavigationContainer className='w-full py-2'>
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
        ) : null}

        <NavigationContainer className='h-16 w-full py-2'>
          <div className='w-full flex items-center border-2 border-white rounded-md pl-2 pr-4 py-1'>
            <input
              className='w-full text-base bg-transparent tracking-wide text-white placeholder-gray-50 focus:outline-none focus:border-none'
              type='text'
              placeholder={'Search...'}
              ref={searchValue}
              onChange={() => searchRecipes()}
            />
            <Search size={20} />
          </div>

          <div className='w-full text-right'>
            <RecipesFilter addFilter={addFilter} />
          </div>
        </NavigationContainer>
      </nav>

      {filters.length > 0 ? (
        <section className='flex gap-4 items-center mb-6 p-4 rounded shadow'>
          <article className='w-2/3 flex flex-wrap gap-4'>
            {filters.map((filter, index) => (
              <Label
                type={filter}
                onClick={() => deleteFilter(filter)}
                key={`index-${index}`}>
                {filter.split('')[0].toUpperCase() + filter.slice(1)}
                <Cross size={12} />
              </Label>
            ))}
          </article>
          <article className='w-1/3 flex justify-end'>
            <button
              onClick={clearFilters}
              className='flex gap-2 p-2 justify-end items-center text-gray-600 hover:text-primary-500 transition-all'>
              <TrashBin size={20} /> Clear all filters
            </button>
          </article>
        </section>
      ) : null}

      <RecipesContainer
        recipes={
          JSON.stringify(explorerRecipes) === JSON.stringify(searchedRecipes)
            ? explorerRecipes
            : searchedRecipes
        }
        userRecipe={userRecipes}
      />
    </section>
  );
}

export { Recipes };
