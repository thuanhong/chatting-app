import React, { useState } from 'react';
import { Grid, Avatar, TextField, Box, Paper, Link, Button } from '@material-ui/core';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { useStyles } from '@src/components/sign-up-page/styles';
import firebase from '@src/services/Firebase';
import { AuthService } from '@src/services/AuthService';
import { Copyright } from '@src/modules/common/copy-right';
import { CurrentComponentPageLogin } from '@src/modules/pages/login';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

function Alert(props) {
  return <MuiAlert elevation={6} variant='filled' {...props} />;
}

const SignUpScreen = (props) => {
  const classes = useStyles();

  const [open, setOpen] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [notification, setNotification] = useState('');
  const [signUpInfo, setSignUpInfo] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
  });

  const validate = () => {
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(signUpInfo.email)) {
      return false;
    }

    return true;
  };

  const handleChange = (prop) => (event) => {
    setSignUpInfo({ ...signUpInfo, [prop]: event.target.value.trim() });
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
    setDisabled(true);

    if (validate()) {
      const signUpData = {
        email: signUpInfo.email,
        password: signUpInfo.password,
        displayName: `${signUpInfo.firstName} ${signUpInfo.lastName}`,
      };
      AuthService.sign_up(signUpData).then((res) => {
        if (res.statusCode === 201) {
          setNotification({ message: 'Sign up successfully!', type: 'success' });
          setOpen(true);
          setTimeout(() => props.setNavigateComponent(!props.clickedSignUp), 1000);
        } else {
          setNotification({ message: 'This email has been register by another account!', type: 'error' });
          setDisabled(false);
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
        <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }} open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity={notification.type}>
            {notification.message}
          </Alert>
        </Snackbar>

        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <form className={classes.form} onSubmit={onSubmit}>
            <TextField value={signUpInfo.firstName} variant='outlined' margin='normal' size='medium' required label='First Name' onChange={handleChange('firstName')} />
            <TextField
              value={signUpInfo.lastName}
              variant='outlined'
              margin='normal'
              required
              label='Last Name'
              style={{ marginLeft: '20px' }}
              onChange={handleChange('lastName')}
            />

            <TextField
              value={signUpInfo.email}
              variant='outlined'
              margin='normal'
              required
              fullWidth
              label='Email'
              onChange={handleChange('email')}
              error={signUpInfo.email == '' || /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(signUpInfo.email) ? false : true}
            />

            <TextField
              value={signUpInfo.password}
              variant='outlined'
              error={signUpInfo.password == '' || signUpInfo.password.length > 7 ? false : true}
              margin='normal'
              required
              fullWidth
              label='Password'
              type='password'
              onChange={handleChange('password')}
            />
            <Button type='submit' disableElevation disabled={disabled} fullWidth variant='contained' color='primary' className={classes.submit}>
              Sign Up
            </Button>
            <Link variant='body2'>
              <Button
                fullWidth
                variant='contained'
                color='secondary'
                className={classes.submit}
                onClick={() => props.setNavigateComponent(CurrentComponentPageLogin.LOGIN_COMPONENT)}
              >
                Login
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
