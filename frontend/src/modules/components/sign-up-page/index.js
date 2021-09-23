import React, { useState } from 'react';
import { Grid, Typography, TextField, Box, Paper, Link, Button } from '@material-ui/core';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { useStyles } from '@src/components/sign-up-page/styles';
import firebase from '@src/services/Firebase';
import { withAuth } from '@src/hoc/withAuth';
import { CookieHandler } from '@src/utils/Cookies';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { AuthService } from '@src/services/AuthService';
import Router from 'next/router';

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

function Alert(props) {
  return <MuiAlert elevation={6} variant='filled' {...props} />;
}

const SignUpScreen = () => {
  const classes = useStyles();

  const [open, setOpen] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [notification, setNotification] = useState('');
  const [signUpInfo, setSignUpInfo] = useState({
    email: '',
    password: '',
    displayName: '',
  });

  const validate = () => {
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(signUpInfo.email)) {
      return false;
    }

    return true;
  };

  const handleChange = (prop) => (event) => {
    setSignUpInfo({ ...signUpInfo, [prop]: event.target.value });
  };

  // const confirmPassword = (pwd)=>{

  // }
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    if (validate()) {
      AuthService.sign_up(signUpInfo).then((res) => {
        if (res.statusCode === 201) {
          setNotification({ message: 'Sign up successfully!', type: 'success' });
          setOpen(true);
        } else {
          setNotification({ message: 'This email has been register by another account!', type: 'error' });
          setOpen(true);
        }
      });
    } else {
      setNotification({ message: 'Email not validate', type: 'warning' });

      setOpen(true);
    }
  };
  return (
    <React.Fragment>
      <Grid item xs={12} sm={6} md={5} component={Paper} square>
        <Snackbar
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          open={open}
          autoHideDuration={6000}
          onClose={handleClose}
        >
          <Alert onClose={handleClose} severity={notification.type}>
            {notification.message}
          </Alert>
        </Snackbar>

        <div className={classes.paper}>
          <form className={classes.form} onSubmit={onSubmit}>
            <TextField
              value={signUpInfo.displayName}
              variant='outlined'
              margin='normal'
              required
              fullWidth
              label='Full Name'
              onChange={handleChange('displayName')}
            />

            <TextField
              value={signUpInfo.email}
              variant='outlined'
              margin='normal'
              required
              fullWidth
              label='Email'
              onChange={handleChange('email')}
              error={!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(signUpInfo.email)}
            />

            <TextField
              value={signUpInfo.password}
              variant='outlined'
              margin='normal'
              required
              fullWidth
              label='Password'
              type='password'
              onChange={handleChange('password')}
            />
            <Button
              type='submit'
              disableElevation
              disabled={disabled}
              fullWidth
              variant='contained'
              color='primary'
              className={classes.submit}
            >
              Sign Up
            </Button>
            <Link href='/login' variant='body2'>
              <Button fullWidth variant='contained' color='primary' className={classes.submit}>
                Sign In
              </Button>
            </Link>
            <Box mt={5}>
              <Copyright />
            </Box>
          </form>
        </div>
      </Grid>
    </React.Fragment>
  );
};

export default SignUpScreen;
