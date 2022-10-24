import '../styles/globals.css';
import toast, { Toaster } from 'react-hot-toast';
import { GoogleOAuthProvider } from '@react-oauth/google';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { QueryClient, QueryClientProvider, useQuery } from 'react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false
    }
  }
});

import type { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <GoogleOAuthProvider clientId="704693722054-3v7gctb1d1al0h7c15i45l2i37231it3.apps.googleusercontent.com">
      <QueryClientProvider client={queryClient}>
        <Toaster />
        <Component {...pageProps} />
      </QueryClientProvider>
    </GoogleOAuthProvider>
  );
}

export default MyApp;
