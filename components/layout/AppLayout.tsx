import { UserProfile, useUser } from '@auth0/nextjs-auth0';
import AppNavigation from '@components/AppComponents/AppNavigation';
import Text from '@components/common/Text';
import React, { useEffect, useState } from 'react';
import { supabase } from '@lib/supabase';
import HelpButton from './HelpButton';

interface AppLayout {
  children: React.ReactNode;
  view: string;
}

export default function AppLayout({ children, view }: AppLayout) {
  const { user, isLoading } = useUser();
  const [authError, setAuthError] = useState(false);

  async function checkUserInDb(user: UserProfile) {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('id')
        .eq('id', user.sub);

      if (error !== null) {
        throw error;
      }

      if (data !== null && data.length <= 0) {
        try {
          const newUser = await supabase
            .from('users')
            .insert([
              {
                id: user.sub,
                name: user.name,
                email: user.email,
                username: user.nickname,
              },
            ]);

          if (newUser.error !== null) {
            throw newUser.error;
          }
          return newUser.data;
        } catch (error) {
          setAuthError(true);
          console.error(error);
          return null;
        }
      }

      return data;
    } catch (error) {
      setAuthError(true);
      console.error(error);
      return null;
    }
  }

  useEffect(() => {
    if (window.localStorage.getItem('user-id') && user !== undefined) {
      checkUserInDb(user);
      return;
    } else if (user !== undefined) {
      checkUserInDb(user);
      window.localStorage.setItem('user-id', String(user.sub));
      return;
    }
  }, [user]);

  if (isLoading) return <div>Loading...</div>;

  if (authError) {
    return (
      <div>{`There's a problem authenticating your account. Please try refreshing the browser`}</div>
    );
  }

  if (user) {
    return (
      <main className='flex'>
        <AppNavigation view={view} />

        <section className={`w-full h-screen overflow-y-scroll py-16`}>
          <section className={`relative w-11/12 lg:w-3/4 mx-auto mb-12`}>
            {children}

            <HelpButton />
          </section>
        </section>
      </main>
    );
  }

  return <></>;
}

AppLayout.displayName = 'AppLayout';
