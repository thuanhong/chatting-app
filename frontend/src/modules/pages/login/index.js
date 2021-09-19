import React, { useState, useCallback } from 'react';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { Paper, TextField, FormControlLabel, Checkbox, Button, Link, CircularProgress } from '@material-ui/core';
import Router from 'next/router';

import { useStyles } from './styles';

import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { SquareAnimation } from '@src/common/SquareAnimation';
import firebase from '@src/services/Firebase';
import { withAuth } from '@src/hoc/withAuth';
import { CookieHandler } from '@src/utils/Cookies';
import SignUpScreen from '@src/modules/components/sign-up-page';
import LoginScreen from '@src/modules/components/login-page';

function Alert(props) {
  return <MuiAlert elevation={6} variant='filled' {...props} />;
}

function Copyright() {
  return (
    <Typography variant='body2' color='textSecondary' align='center'>
      {'Copyright ©'}
      Thuan-Tai
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const LoginPage = () => {
  const classes = useStyles();

  const [open, setOpen] = useState(false);
  const [clickedSignUp, setClickedSignup] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const wrapperSetClickedSignup = (val) => {
    setClickedSignup(val);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setDisabled(true);
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((res) => {
        if (res.user) {
          CookieHandler.setCookie('access_token', res.user.Aa);
          Router.push('/');
        } else {
          setOpen(true);
        }
      })
      .finally(() => {
        setDisabled(false);
      });
  };

  return (
    <Grid container component='main' disablePortal='true' className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={false} md={7} className={classes.image}>
        <div className={classes.rotated}>
          <SquareAnimation
            color={'#ffc107'}
            style={{ width: '120px', transform: 'translate(150px, -150px)', position: 'static' }}
            angle={60}
          />
          <SquareAnimation
            color={'#007bff'}
            style={{ width: '120px', transform: 'translate(-150px, 75px)', position: 'static' }}
            angle={100}
          />
          <SquareAnimation
            color={'#dc3545'}
            style={{ width: '120px', transform: 'translate(-100px, 300px)', position: 'static' }}
            angle={140}
          />
          <SquareAnimation
            color={'#28a745'}
            style={{ width: '120px', transform: 'translate(-23px, 57px)', position: 'static' }}
            angle={180}
          />
        </div>
      </Grid>
      {clickedSignUp ? (
        <SignUpScreen />
      ) : (
        <LoginScreen clickedSignUp={clickedSignUp} setClickedSignUp={wrapperSetClickedSignup} />
      )}
      ;
    </Grid>
  );
};

export default withAuth(LoginPage);
