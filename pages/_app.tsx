import '@styles/globals.css';
import type { AppProps } from 'next/app';

// pages/_app.js
import React from 'react';
import { UserProvider } from '@auth0/nextjs-auth0';
import { NextPage } from 'next';

type Page<P = {}> = NextPage<P> & {
  getLayout?: (page: React.ReactNode) => React.ReactNode;
};

type Props = AppProps & {
  Component: Page;
};

export default function App({ Component, pageProps }: Props) {
  const getLayout = Component.getLayout || ((page: React.ReactNode) => page);

  return <UserProvider>{getLayout(<Component {...pageProps} />)}</UserProvider>;
}
