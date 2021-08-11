import { useUser } from '@auth0/nextjs-auth0';
import AppNavigation from '@components/AppComponents/AppNavigation';
import Text from '@components/common/Text';
import React from 'react';

interface AppLayout {
  children: React.ReactNode;
  view: string;
}

export default function AppLayout({ children, view }: AppLayout) {
  const { user, isLoading, error } = useUser();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  if (user) {
    return (
      <main className='flex'>
        <AppNavigation view={view} />

        <section className={`w-full h-screen overflow-y-scroll`}>
          <div className='w-full px-6 py-4 flex justify-end items-center gap-4'>
            <Text type='paragraph'>Welcome back, {user.name}!</Text>
            <div className='w-8 h-8 rounded-full bg-red-500'></div>
          </div>

          <section className={`w-3/4 mx-auto pb-12`}>{children}</section>
        </section>
      </main>
    );
  }

  return <></>;
}

AppLayout.displayName = 'AppLayout';
