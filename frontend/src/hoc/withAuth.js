import React, { useEffect, useState } from 'react';
import { LoadingPage } from '@common/loading-page/LoadingPage';
import Router from 'next/router';
import { AuthService } from '@services/AuthService';

export const withAuth = (PageComponent) => {
  const WithAuth = () => {
    const [loading, setLoading] = useState(true);
    const [group, setGroup] = useState(0);

    useEffect(() => {
      async function fetchData() {
        AuthService.check_auth()
          .then((res) => {
            if (res.statusCode === 200) {
              if (Router.pathname === '/login') {
                Router.push('/');
              } else {
                setGroup(res.msg.group_user);
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
          .catch((err) => {
            setLoading(false);
          });
      }

      fetchData();
    }, []);

    return <div>{loading ? <LoadingPage /> : <PageComponent groupNumber={group} />}</div>;
  };
  return WithAuth;
};
