import React, { useEffect, useState, createContext } from 'react';
import { LoadingPage } from '@src/common/loading-page/LoadingPage';
import Router from 'next/router';
import { AuthService } from '@src/services/AuthService';
import ErrorBoundary from '@src/hoc/ErrorBoundary';
import firebase from '@src/services/Firebase';
import { CookieHandler } from '@src/utils/Cookies';

export const UserContext = createContext({});
export const withAuth = (PageComponent) => {
  const WithAuth = () => {
    const [loading, setLoading] = useState(true);
    useEffect(() => {
      async function fetchData() {
        // const currentUsers = firebase?.app()?.auth()?.currentUser ?? {};
        // CookieHandler.setCookie('access_token', currentUsers.Aa);
        await AuthService.check_auth()
          .then((res) => {
            if (res?.statusCode === 200) {
              localStorage.setItem('currentUser', JSON.stringify(res.msg.user));
              if (Router.pathname === '/login') {
                Router.push('/');
              } else {
                setTimeout(() => setLoading(false), 200);
              }
            } else {
              if (Router.pathname === '/login') {
                setLoading(false);
              } else {
                Router.push('/login');
              }
            }
          })
          .catch(() => {
            setLoading(false);
          });
      }

      fetchData();
    }, []);

    return (
      <ErrorBoundary>
        <div>{loading ? <LoadingPage /> : <PageComponent />}</div>
      </ErrorBoundary>
    );
  };
  return WithAuth;
};
