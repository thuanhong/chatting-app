import React, { useEffect, useState, createContext } from 'react';
import { LoadingPage } from '@src/common/loading-page/LoadingPage';
import Router from 'next/router';
import { AuthService } from '@src/services/AuthService';
import ErrorBoundary from '@src/hoc/ErrorBoundary';
import { useGlobalStore } from '@src/hooks';

export const UserContext = createContext({});
export const withAuth = (PageComponent) => {
  const WithAuth = () => {
    const [loading, setLoading] = useState(true);
    const { userInfoStore } = useGlobalStore();
    useEffect(() => {
      async function fetchData() {
        await AuthService.check_auth()
          .then((res) => {
            if (res?.statusCode === 200) {
              userInfoStore.setCurrentUserInfo(res.msg.user);
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
