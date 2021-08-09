import React, { useState, useEffect } from 'react';
import { useUser } from '@auth0/nextjs-auth0';

import Head from 'next/head';
import AppNavigation from '@components/AppComponents/AppNavigation';
import Text from '@components/common/Text';
import Views from '@components/AppComponents/AppViews/Views';

export default function App() {
  const { user, error, isLoading } = useUser();

  const [open, setOpen] = useState(false);
  const [view, setView] = useState('dashboard');

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  if (user) {
    return (
      <React.Fragment>
        <Head>
          <title>Recipe Keeper - App</title>
        </Head>

        <main className='flex'>
          <AppNavigation
            open={open}
            setOpen={setOpen}
            view={view}
            setView={setView}
          />

          <section className={`w-full h-screen overflow-y-scroll`}>
            <div className='w-full px-6 py-4 flex justify-end items-center gap-4'>
              <Text type='paragraph'>Welcome back, {user.name}!</Text>
              <div className='w-8 h-8 rounded-full bg-red-500'></div>
            </div>
            <section className={`w-3/4 mx-auto`}>
              <Views view={view} setView={setView} setOpen={setOpen} />
            </section>
          </section>
        </main>
      </React.Fragment>
    );
  }
}
