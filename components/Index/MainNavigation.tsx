import { Button } from '@components/common/Button';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';

interface Props {
  user: any;
}

interface NavigationLink {
  link: string;
  label: string;
}

function NavigationLink({ link, label }: NavigationLink) {
  return (
    <li>
      <Link href={link}>
        <a className='inline-block w-full hover:bg-primary-100 px-4 py-2 tracking-wide lg:hover:bg-transparent lg:hover:text-primary-600'>
          {label}
        </a>
      </Link>
    </li>
  );
}

export default function MainNavigation({ user }: Props) {
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

  const [active, setActive] = useState(true);

  useEffect(() => {
    if (window.innerWidth <= 768) {
      setActive(false);
      return;
    }
  }, []);

  return (
    <nav className='fixed top-0 w-full py-2 lg:py-0 shadow z-30 bg-white lg:flex lg:gap-4'>
      <section className='flex justify-between items-center px-4'>
        <figure className='inline-block bg-primary-500 w-8 h-8 rounded-full'></figure>
        <button
          name='open-or-close-menu'
          className='lg:hidden'
          onClick={() => setActive(!active)}>
          Open/Close
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
