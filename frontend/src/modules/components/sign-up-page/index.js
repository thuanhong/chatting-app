import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { Grid, Avatar, TextField, Box, Paper, Link, Button } from '@material-ui/core';
import { useStyles } from '@src/components/sign-up-page/styles';
import { AuthService } from '@src/services/AuthService';
import { Copyright } from '@src/modules/common/copy-right';
import { CurrentComponentPageLogin } from '@src/modules/pages/login';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

const SignUpScreen = (props) => {
  const classes = useStyles();

  const [disabled, setDisabled] = useState(false);
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

  const showPopUpSuccess = () =>
    toast.success('Sign up successfully!', {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

  const showPopUpFail = () =>
    toast.error('This email has been register by another account!', {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

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
          showPopUpSuccess();
          props.setNavigateComponent(CurrentComponentPageLogin.LOGIN_COMPONENT);
        } else {
          showPopUpFail();
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
