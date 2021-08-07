import Head from 'next/head';
import React from 'react';
import { useUser } from '@auth0/nextjs-auth0';

import { Button } from '@components/common/Button';
import Text from '@components/common/Text';

import Link from 'next/link';
import MainNavigation from '@components/Index/MainNavigation';
import FeaturesSection from '@components/Index/FeaturesSection';
import ReviewSection from '@components/Index/ReviewSection';

export default function Index() {
  const { user, error, isLoading } = useUser();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  if (user) {
    return;
  }

  return (
    <>
      <Head>
        <title>Recipe Keeper</title>
      </Head>
      <main>
        <MainNavigation user={user} />

        <header
          id='header'
          className='container mx-auto p-6 text-center pt-16 lg:pt-24'>
          <Text type='h1' className='w-full md:w-10/12 mb-6 mx-auto'>
            Save your time looking for recipes and
            <span className='text-primary-500'> cook more</span>
          </Text>
          <Text type='paragraph' className='lg:text-lg mb-2'>
            Join hundred of people that are tired of cookbooks
          </Text>
          <Button className='mb-12'>
            <Link href='/api/auth/login'>
              <a className='inline-block text-xl lg:text-2xl py-2 px-6'>
                Get Started
              </a>
            </Link>
          </Button>

          <figure className="'w-full h-[70vh] rounded-lg bg-gray-100 shadow-lg"></figure>
        </header>

        <FeaturesSection />

        <ReviewSection />

        <section
          id='footer-cta'
          className='relative overflow-hidden flex justify-center items-center py-12'>
          <section className='z-10 text-center space-y-6'>
            <Text type='h2' className='text-white'>
              Check over 100 recipes from our users and start saving time in the
              kitchen
            </Text>
            <Button className='mb-12'>
              <Link href='/api/auth/login'>
                <a className='inline-block text-lg lg:text-xl px-6 py-2'>
                  Get Started
                </a>
              </Link>
            </Button>
          </section>
        </section>

        <footer className='bg-primary-500 text-center py-2'>
          <p className='text-sm tracking-wider text-white uppercase'>
            Recipe Keeper
          </p>
        </footer>
      </main>
    </>
  );
}
