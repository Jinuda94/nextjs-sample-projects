import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';
import 'tailwindcss/tailwind.css';
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import React from 'react';
// import '../styles/globals.css';

// if (process.env.NEXT_PUBLIC_API_MOCKING === 'enabled') {
//   require('../mocks');
// }

const MyApp = ({ Component, pageProps }: AppProps) => {
  const router = useRouter();
  const [queryClient] = React.useState(() => new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Hydrate>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
};

export default MyApp;
