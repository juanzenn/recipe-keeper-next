import Text from '@components/common/Text';
import React, { useState } from 'react';

import {
  Home,
  Utensils,
  Globe,
  Book,
  Person,
  SignOut,
  ChevronLeft,
  TextAlignJustified,
} from 'akar-icons';
import Link from 'next/link';

interface NavigationItemProps {
  open: boolean;
  icon: React.ReactNode;
  text: string;
  handleClick: any;
  selected: boolean;
  link: string;
}

function NavigationItem({
  open,
  icon,
  text,
  handleClick,
  selected,
  link,
}: NavigationItemProps) {
  return (
    <Link href={link}>
      <a
        onClick={handleClick}
        className={
          selected
            ? `h-8 cursor-pointer flex gap-4 items-center text-lg tracking-wide text-primary-500 font-medium`
            : `h-8 cursor-pointer flex gap-4 items-center text-lg tracking-wide hover:text-primary-500 duration-150`
        }>
        {open ? (
          <>
            {icon} {text}
          </>
        ) : (
          <>{icon}</>
        )}
      </a>
    </Link>
  );
}

interface NavigationBrandProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

function NavigationBrand({ open, setOpen }: NavigationBrandProps) {
  return (
    <div>
      {open ? (
        <article className='h-8 flex justify-between items-center mb-6'>
          <Text type='h3'>Recipe Keeper</Text>
          <button
            name='close-open-menu'
            onClick={() => setOpen(!open)}
            className='text-primary-500 hover:text-primary-400'>
            <ChevronLeft size={24} />
          </button>
        </article>
      ) : (
        <article className='h-8 mb-6'>
          <button
            name='close-open-menu'
            onClick={() => setOpen(!open)}
            className='text-primary-500 hover:text-primary-400'>
            <TextAlignJustified size={24} />
          </button>
        </article>
      )}
    </div>
  );
}

interface Props {
  view: string;
}

export default function AppNavigation({ view }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <nav
      className={
        open
          ? `fixed top-0 h-screen w-1/5 px-4 pt-4 pb-6 flex flex-col justify-between flex-shrink-0  border-r border-gray-200 bg-white z-50`
          : `fixed top-0 h-screen w-[5%] pt-4 pb-6 flex flex-col items-center flex-shrink-0  border-r border-gray-200 bg-white`
      }>
      <section>
        <NavigationBrand open={open} setOpen={setOpen} />

        <ul className='space-y-4'>
          <NavigationItem
            open={open}
            text={'Dashboard'}
            icon={<Home size={24} />}
            handleClick={() => {
              setOpen(false);
            }}
            selected={view === 'dashboard' ? true : false}
            link={'/app'}
          />

          <NavigationItem
            open={open}
            text={'Recipes'}
            icon={<Book size={24} />}
            handleClick={() => {
              setOpen(false);
            }}
            selected={view === 'recipes' || view === 'addRecipe' ? true : false}
            link={'/app/recipes'}
          />

          <NavigationItem
            open={open}
            text={'Discover'}
            icon={<Globe size={24} />}
            handleClick={() => {
              setOpen(false);
            }}
            selected={view === 'discover' ? true : false}
            link={'/app/discover'}
          />

          {/* <NavigationItem
            open={open}
            text={'Meal Planner'}
            icon={<Utensils size={24} />}
            handleClick={() => {
              setOpen(false);
            }}
            selected={view === 'mealPlanner' ? true : false}
            link={'/app'}
          /> */}
        </ul>
      </section>

      {open ? (
        <ul className='space-y-4'>
          <NavigationItem
            open={open}
            text={'User Settings'}
            icon={<Person size={24} />}
            handleClick={() => {
              setOpen(false);
            }}
            selected={view === 'userSettings' ? true : false}
            link={'/app'}
          />
          <li className='cursor-pointer bg-primary-500 hover:bg-primary-400 text-lg tracking-wide w-max rounded-md text-white shadow-md duration-300'>
            <Link href='/api/auth/logout'>
              <a className='px-4 py-2 flex gap-4 items-center'>
                <SignOut size={24} /> Log Out
              </a>
            </Link>
          </li>
        </ul>
      ) : null}
    </nav>
  );
}
