import React from 'react';
import HomePage from '@components/home-page/HomePage';
import { withAuth } from '@hoc/withAuth';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

const HomeScreen = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/' render={(props) => <HomePage {...props} />} />
      </Switch>
    </BrowserRouter>
  );
};

export default withAuth(HomeScreen);
