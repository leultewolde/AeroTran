import {AppProps} from 'next/app';
import '@/styles/global.css';

import {library} from '@fortawesome/fontawesome-svg-core';
import {fab} from '@fortawesome/free-brands-svg-icons';
import {faCoffee} from '@fortawesome/free-solid-svg-icons';
import {useRouter} from "next/router";
import React, {useCallback, useEffect, useState} from "react";
import MainLayout from "@/components/MainLayout";
import CssBaseline from "@mui/material/CssBaseline";
import {getToken} from "@/utils/tokenService";

library.add(fab, faCoffee);
export default function MyApp({Component, pageProps}: AppProps) {

  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const protectedRoutes = ["/profile"];

  const isProtectedRoute = (path: string): boolean =>
      protectedRoutes.some(route =>
          route.endsWith('/**')
              ? path.startsWith(route.slice(0, -3))
              : path === route
      );

  const checkIfLoggedIn = useCallback(async () => {
    setLoading(true);
    const token = getToken(); // Assuming getToken is imported or defined elsewhere
    const isAuthPage = router.pathname.startsWith('/auth');

    if ((!token && isProtectedRoute(router.pathname)) || (token && isAuthPage)) {
      await router.replace(
          { pathname: '/auth/login', query: {path: router.pathname, ...router.query} }, // Transfer existing query parameters
          undefined, // Keep the URL as is
          { shallow: true } // Prevent full page reload
      );
    }
    setLoading(false); // Ensure loading state is updated after check
  }, [router]);

  useEffect(() => {
    checkIfLoggedIn()
        .catch((error) => setError(error))
        .finally(() => setLoading(false));
  }, [checkIfLoggedIn]);

  return (
      <MainLayout loading={loading} error={error}>
        <Component {...pageProps} />
      </MainLayout>
  );
}