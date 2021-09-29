import React, { useState } from 'react';
import { Grid, Typography, TextField, Box, Paper, Link, Button, Avatar } from '@material-ui/core';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { useStyles } from '@src/components/sign-up-page/styles';
import firebase from '@src/services/Firebase';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { AuthService } from '@src/services/AuthService';
import { Copyright } from '@src/modules/common/copy-right';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { CurrentComponentPageLogin } from '@src/modules/pages/login';

function Alert(props) {
  return <MuiAlert elevation={6} variant='filled' {...props} />;
}

const ResetPasswordScreen = (props) => {
  const classes = useStyles();

  const [open, setOpen] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [notification, setNotification] = useState('');
  const [email, setEmail] = useState('');

  const validate = () => {
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      return false;
    }

    return true;
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
      firebase
        .auth()
        .sendPasswordResetEmail(email)
        .then(() => {
          setNotification({ message: 'Please check your email', type: 'success' });
          setOpen(true);
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
            <TextField
              value={email}
              variant='outlined'
              margin='normal'
              required
              fullWidth
              label='Email'
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              error={email == '' || /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email) ? false : true}
            />

            <Button type='submit' disableElevation disabled={disabled} fullWidth variant='contained' color='primary' className={classes.submit}>
              Reset Password
            </Button>
            <Grid container>
              <Grid item xs>
                <Link component='button' variant='body2' onClick={() => props.setNavigateComponent(CurrentComponentPageLogin.LOGIN_COMPONENT)}>
                  Remember your password?
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

export default ResetPasswordScreen;
