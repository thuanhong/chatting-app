import React, { useState } from 'react';
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

const uiConfig = {
  signInFlow: 'popup',
  // Redirect to / after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
  signInSuccessUrl: '/',
  // GitHub as the only included Auth Provider.
  // You could add and configure more here!
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.EmailAuthProvider.EMAIL_PASSWORD_SIGN_IN_METHOD,
  ],
  callbacks: {
    signInSuccess: (currentUser, credential, redirectUrl) => {
      const currentUsers = firebase?.app()?.auth()?.currentUser ?? {};

      CookieHandler.setCookie('access_token', currentUsers.Aa);
      Router.push('/');
      return false;
    },
  },
};

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

const LoginScreen = (props) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };
  const onSubmit = (event) => {
    event.preventDefault();
    setDisabled(true);
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((res) => {
        if (res?.user) {
          CookieHandler.setCookie('access_token', res.user.Aa);
          Router.push('/');
        } else {
          alert('taitai');
          setOpen(true);
        }
      })
      .catch(() => {
        setOpen(true);
      })
      .finally(() => {
        setDisabled(false);
      });
  };

  return (
    <React.Fragment>
      <Grid item xs={12} sm={12} md={5} component={Paper} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component='h1' variant='h5'>
            Sign in
          </Typography>
          <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
          <Snackbar
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            open={open}
            autoHideDuration={6000}
            onClose={handleClose}
          >
            <Alert onClose={handleClose} severity='error'>
              Username or password incorrect
            </Alert>
          </Snackbar>
          <form className={classes.form} onSubmit={onSubmit}>
            <TextField
              value={email}
              variant='outlined'
              margin='normal'
              required
              fullWidth
              label='Email'
              error={!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)}
              onChange={(event) => {
                setEmail(event.target.value);
              }}
            />
            <TextField
              value={password}
              variant='outlined'
              margin='normal'
              required
              fullWidth
              label='Password'
              type='password'
              onChange={(event) => {
                setPassword(event.target.value);
              }}
            />
            <FormControlLabel control={<Checkbox value='remember' color='primary' />} label='Remember me' />
            <Button
              type='submit'
              disableElevation
              disabled={disabled}
              fullWidth
              variant='contained'
              color='primary'
              className={classes.submit}
            >
              {disabled ? <CircularProgress /> : 'Sign In'}
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href='#' variant='body2'>
                  Forgot password?
                </Link>
              </Grid>
              <Grid item xs>
                <Link component='button' variant='body2' onClick={() => props.setClickedSignUp(!props.clickedSignUp)}>
                  Sign up
                </Link>
              </Grid>
            </Grid>
            <Box mt={5}>
              <Copyright />
            </Box>
          </form>
        </div>
      </Grid>
    </React.Fragment>
  );
};

export default LoginScreen;
