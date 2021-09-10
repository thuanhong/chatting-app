import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { useStyles } from './styles';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { CookieHandler } from '@utils/Cookies';
import Router from 'next/router';
import { withAuth } from '@hoc/withAuth';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from '@services/Firebase';

const uiConfig = {
  signInFlow: 'popup',
  // Redirect to / after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
  signInSuccessUrl: '/',
  // GitHub as the only included Auth Provider.
  // You could add and configure more here!
  signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
  callbacks: {
    signInSuccess: (currentUser, credential, redirectUrl) => {
      const currentUsers = firebase?.app()?.auth()?.currentUser ?? {};

      CookieHandler.setCookie('access_token', currentUsers.Aa);
      Router.push('/');
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

const LoginScreen = () => {
  const classes = useStyles();

  const [open, setOpen] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
    <Grid container component='main' className={classes.root}>
      <CssBaseline />
      <Grid item xs={12} sm={12} md={12} square>
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
          <form className={classes.form}>
            <Box mt={5}>
              <Copyright />
            </Box>
          </form>
        </div>
      </Grid>
    </Grid>
  );
};

export default withAuth(LoginScreen);
