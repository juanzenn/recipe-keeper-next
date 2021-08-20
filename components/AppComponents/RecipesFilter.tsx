import React, { useState } from 'react';
import { ChevronDown, ArrowLeft } from 'akar-icons';

interface Props {
  addFilter: (filters: string) => void;
}

export default function RecipesFilter({ addFilter }: Props) {
  const initialMenu = ['Main Ingredient', 'Dish Style'];
  const mainIngredientMenu = [
    'vegan',
    'vegetarian',
    'meat',
    'pork',
    'fish',
    'chicken',
  ];
  const typeOfDishMenu = ['main dish', 'dessert', 'complement'];

  const [active, setActive] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string[]>(initialMenu);

  function switchMenus(reference: string) {
    const pointer = reference.toLowerCase();

    switch (pointer) {
      case 'main ingredient':
        setActiveMenu(mainIngredientMenu);
        return;
      case 'dish style':
        setActiveMenu(typeOfDishMenu);
        return;
      default:
        addFilter(pointer);
        setActive(false);
        setActiveMenu(initialMenu);
    }
  }

  return (
    <div
      className='inline-block relative'
      onMouseLeave={() => setActive(false)}>
      <div
        onClick={() => setActive(prev => !prev)}
        className='bg-white px-6 py-2 rounded cursor-pointer flex justify-center items-center gap-2 text-gray-900 hover:bg-primary-100'>
        Filter <ChevronDown size={20} />
      </div>

      <ul
        className={
          active
            ? `w-max absolute top-10 space-y-2 text-left text-gray-900 bg-white border border-gray-200 shadow-md rounded-md overflow-hidden z-20`
            : `hidden`
        }>
        {JSON.stringify(activeMenu) === JSON.stringify(initialMenu) ? null : (
          <li
            className='cursor-pointer p-2 hover:text-primary-500 transition-all'
            onClick={() => setActiveMenu(initialMenu)}>
            <ArrowLeft size={20} />
          </li>
        )}

        {activeMenu.map((menuItem, index) => (
          <li
            className='cursor-pointer hover:bg-gray-100 px-8 py-4'
            key={`${menuItem}-${index}`}
            onClick={() => switchMenus(menuItem)}>
            {menuItem.split('')[0].toUpperCase() + menuItem.slice(1)}
          </li>
        ))}
      </ul>
    </div>
  );
}
