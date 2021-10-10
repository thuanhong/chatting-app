import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { styles } from './styles';

function UpdateInfoDialog(props) {
  const { classes } = props;
  const { firstName, lastName, email } = JSON.parse(localStorage.getItem('currentUser'));

  return (
    <React.Fragment>
      <Grid className={classes.marginAuto} elevation={0} item xs={8} container justifyContent='center' component={Paper} square>
        <div className={classes.paper}>
          <form className={classes.form}>
            <TextField disabled variant='outlined' margin='normal' fullWidth label='First Name' defaultValue={firstName} />
            <TextField disabled variant='outlined' margin='normal' fullWidth label='Last Name' defaultValue={lastName} />
            <TextField value={email} variant='outlined' margin='normal' fullWidth label='Email' />
            <Button type='submit' disableElevation disabled={false} fullWidth variant='contained' color='primary' className={classes.submit}>
              Update
            </Button>
          </form>
        </div>
      </Grid>
    </React.Fragment>
  );
}

export default withStyles(styles)(UpdateInfoDialog);
