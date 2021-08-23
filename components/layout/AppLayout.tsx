import { UserProfile, useUser } from '@auth0/nextjs-auth0';
import AppNavigation from '@components/AppComponents/AppNavigation';
import Text from '@components/common/Text';
import React, { useEffect } from 'react';
import { supabase } from '@lib/supabase';

interface AppLayout {
  children: React.ReactNode;
  view: string;
}

export default function AppLayout({ children, view }: AppLayout) {
  const { user, isLoading, error } = useUser();

  async function checkUserInDb(user: UserProfile) {
    const { data } = await supabase
      .from('users')
      .select('id')
      .eq('id', user.sub);

    if (data !== null && data.length <= 0) {
      console.log('Not in the DB.');
      const { data } = await supabase
        .from('users')
        .insert([{ id: user.sub, name: user.name, email: user.email }]);
      console.log(data);
      return data;
    }

    return data;
  }

  useEffect(() => {
    if (window.localStorage.getItem('user-id') && user !== undefined) {
      return;
    } else if (user !== undefined) {
      // Set the token
      checkUserInDb(user);
      window.localStorage.setItem('user-id', String(user.sub));
      return;
    }
  }, [user]);

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

          <section className={`w-3/4 mx-auto mb-12`}>{children}</section>
        </section>
      </main>
    );
  }

  return <></>;
}

AppLayout.displayName = 'AppLayout';
