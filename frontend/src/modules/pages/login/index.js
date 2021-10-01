import React, { useState, useCallback, useMemo } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';

import { useStyles } from './styles';

import { SquareAnimation } from '@src/common/SquareAnimation';
import { withAuth } from '@src/hoc/withAuth';
import SignUpScreen from '@src/modules/components/sign-up-page';
import LoginScreen from '@src/modules/components/login-page';
import ResetPasswordScreen from '@src/modules/components/reset-password-page';

export const CurrentComponentPageLogin = {
  LOGIN_COMPONENT: 'LOGIN_COMPONENT',
  SIGN_UP_COMPONENT: 'SIGN_UP_COMPONENT',
  RESET_PASSWORD_COMPONENT: 'RESET_PASSWORD_COMPONENT',
};

const LoginPage = () => {
  const classes = useStyles();

  const [currentComponent, setCurrentComponent] = useState(CurrentComponentPageLogin.LOGIN_COMPONENT);

  const wrapperSetNavigateComponent = (val) => {
    setCurrentComponent(val);
  };

  const listContentFunctionMap = useMemo(() => {
    switch (currentComponent) {
      case CurrentComponentPageLogin.LOGIN_COMPONENT:
        return <LoginScreen setNavigateComponent={wrapperSetNavigateComponent} />;
      case CurrentComponentPageLogin.SIGN_UP_COMPONENT:
        return <SignUpScreen setNavigateComponent={wrapperSetNavigateComponent} />;
      case CurrentComponentPageLogin.RESET_PASSWORD_COMPONENT:
        return <ResetPasswordScreen setNavigateComponent={wrapperSetNavigateComponent} />;
      default:
        return <div></div>;
    }
  }, [currentComponent]);

  return (
    <Grid container component='main' disablePortal='true' className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={false} md={7} className={classes.image}>
        <div className={classes.rotated}>
          <SquareAnimation color={'#ffc107'} style={{ width: '120px', transform: 'translate(150px, -150px)', position: 'static' }} angle={60} />
          <SquareAnimation color={'#007bff'} style={{ width: '120px', transform: 'translate(-150px, 75px)', position: 'static' }} angle={100} />
          <SquareAnimation color={'#dc3545'} style={{ width: '120px', transform: 'translate(-100px, 300px)', position: 'static' }} angle={140} />
          <SquareAnimation color={'#28a745'} style={{ width: '120px', transform: 'translate(-23px, 57px)', position: 'static' }} angle={180} />
        </div>
      </Grid>
      {listContentFunctionMap}
    </Grid>
  );
};

export default withAuth(LoginPage);
