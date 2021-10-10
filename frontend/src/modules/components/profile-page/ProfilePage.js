import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';
import UpdateInfoDialog from '@src/common/update-info-dialog/UpdateInfoDialog';

const styles = {
  root: {
    height: '100vh',
    overflowY: 'hidden',
  },
};

function ProfilePage(props) {
  const { classes } = props;

  return (
    <Grid container component='main' disablePortal='true' className={classes.root}>
      <CssBaseline />
      <UpdateInfoDialog />
    </Grid>
  );
}

export default withStyles(styles)(ProfilePage);
