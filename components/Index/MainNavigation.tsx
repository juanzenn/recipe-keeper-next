import { Button } from '@components/common/Button';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';

import { TextAlignJustified } from 'akar-icons';
import { useUser } from '@auth0/nextjs-auth0';
import Image from 'next/image';

interface NavigationLink {
  link: string;
  label: string;
  onClick?: () => void;
}

function NavigationLink({ link, label, onClick }: NavigationLink) {
  return (
    <li>
      <Link href={link}>
        <a
          onClick={onClick}
          className='inline-block w-full text-sm font-medium tracking-wide uppercase hover:bg-primary-100 px-4 py-2 lg:hover:bg-transparent lg:hover:text-primary-600'>
          {label}
        </a>
      </Link>
    </li>
  );
}

export default function MainNavigation() {
  const links: NavigationLink[] = [
    {
      link: '/#header',
      label: 'Home',
    },
    {
      link: '/#features',
      label: 'Features',
    },
    {
      link: '/#users',
      label: 'Customers',
    },
  ];

  const { user } = useUser();

  const [active, setActive] = useState(true);

  useEffect(() => {
    if (window.innerWidth <= 768) {
      setActive(false);
      return;
    }
  }, []);

  function handleOnClick() {
    if (window.innerWidth <= 768) {
      setActive(false);
      return;
    }
  }

  return (
    <nav className='fixed top-0 w-full py-2 lg:py-0 shadow z-30 bg-white lg:flex lg:gap-4'>
      <section className='flex justify-between items-center px-4'>
        <figure className='relative inline-block rounded-full'>
          <Image
            src='/icon.png'
            width='64px'
            height='64px'
            alt='company icon'
          />
        </figure>
        <button
          name='open-or-close-menu'
          className='lg:hidden'
          onClick={() => setActive(!active)}>
          <TextAlignJustified size={24} />
        </button>
      </section>
      <section
        id='main-nav--items'
        className={
          active
            ? `lg:flex lg:justify-between lg:items-center lg:w-full`
            : `hidden`
        }>
        <ul className='space-y-2 lg:space-y-0 py-4 lg:flex lg:gap-4 flex-grow'>
          {links.map((link, index) => (
            <NavigationLink
              onClick={handleOnClick}
              key={`link-${index}`}
              link={link.link}
              label={link.label}
            />
          ))}
        </ul>

        <section className='flex flex-col-reverse lg:flex-row gap-4 px-4 w-max'>
          {user ? (
            <Button>
              <Link href='/app'>
                <a className='inline-block w-full px-6 py-2'>Dashboard</a>
              </Link>
            </Button>
          ) : (
            <>
              <Button>
                <Link href='/api/auth/login'>
                  <a className='inline-block w-full px-6 py-2'>Register</a>
                </Link>
              </Button>
            </>
          )}
        </section>
      </section>
    </nav>
  );
}
