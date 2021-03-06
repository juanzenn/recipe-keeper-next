import Text from '@components/common/Text';
import React, { useEffect, useState } from 'react';

import {
  Home,
  Utensils,
  Globe,
  Book,
  Person,
  SignOut,
  ChevronLeft,
  TextAlignJustified,
  Cart,
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
  const [tooltip, setTooltip] = useState(false);

  return (
    <Link href={link}>
      <a
        onClick={handleClick}
        className={
          selected
            ? `h-8 cursor-pointer flex gap-2 items-center text-primary-500 font-medium`
            : `h-8 cursor-pointer flex gap-2 items-center hover:text-primary-500 duration-150`
        }>
        {open ? (
          <>
            {icon} {text}
          </>
        ) : (
          <div
            className='relative z-50'
            onMouseEnter={() => setTooltip(prev => !prev)}
            onMouseLeave={() => setTooltip(prev => !prev)}>
            {icon}
            {tooltip ? (
              <div className='absolute w-max -bottom-2 left-0 bg-gray-50 text-gray-400 shadow-sm text-sm px-4 py-2 rounded-full translate-x-8'>
                {text}
              </div>
            ) : null}
          </div>
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
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    if (window.innerWidth < 769) {
      setMobile(true);
      return;
    } else {
      return;
    }
  }, []);

  return (
    <>
      {mobile ? (
        <article
          className={open ? `hidden` : 'fixed top-2 left-4 h-8 mb-6 z-50'}>
          <button
            name='close-open-menu'
            onClick={() => setOpen(!open)}
            className='text-primary-500 hover:text-primary-400 bg-white/50 backdrop-blur-sm rounded-full p-2 shadow'>
            <TextAlignJustified size={24} />
          </button>
        </article>
      ) : null}

      <nav
        className={
          !open && mobile
            ? `hidden`
            : open
            ? `fixed top-0 h-screen w-full lg:w-1/5 px-4 pt-4 pb-6 flex flex-col justify-between flex-shrink-0  border-r border-gray-200 bg-white z-40`
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
              selected={
                view === 'recipes' || view === 'addRecipe' ? true : false
              }
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
            <NavigationItem
              open={open}
              text={'Shopping Lists'}
              icon={<Cart size={24} />}
              handleClick={() => {
                setOpen(false);
              }}
              selected={view === 'shoppingList' ? true : false}
              link={'/app/shopping-list'}
            />
          </ul>
        </section>
        {open ? (
          <ul className='space-y-4'>
            <li className='cursor-pointer bg-primary-500 hover:bg-primary-400 text-lg tracking-wide w-max rounded-md text-white shadow-md duration-300'>
              <Link href='/api/auth/logout'>
                <a
                  onClick={() => localStorage.removeItem('user-id')}
                  className='px-4 py-2 flex gap-4 items-center'>
                  <SignOut size={24} /> Log Out
                </a>
              </Link>
            </li>
          </ul>
        ) : null}
      </nav>
    </>
  );
}
