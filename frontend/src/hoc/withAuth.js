import React, { useEffect, useState, createContext } from 'react';
import { LoadingPage } from '@src/common/loading-page/LoadingPage';
import Router from 'next/router';
import { AuthService } from '@src/services/AuthService';

export const UserContext = createContext({});
export const withAuth = (PageComponent) => {
  const WithAuth = () => {
    const [loading, setLoading] = useState(true);
    // create context

    useEffect(() => {
      async function fetchData() {
        AuthService.check_auth()
          .then((res) => {
            if (res?.statusCode === 200) {
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

    return <div>{loading ? <LoadingPage /> : <PageComponent />}</div>;
  };
  return WithAuth;
};
