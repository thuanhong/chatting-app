import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import VideocamIcon from '@material-ui/icons/Videocam';
import CallIcon from '@material-ui/icons/Call';
import Toolbar from '@material-ui/core/Toolbar';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

const styles = (theme) => ({
  appBar: {
    backgroundColor: 'black',
    color: theme.palette.common.white,
    padding: theme.spacing(2),
    width: 'calc(100% - 400px)',
    borderBottom: '1px solid',
    borderColor: theme.palette.common.white,
  },
});

function Header(props) {
  const { classes, onDrawerToggle } = props;

  return (
    <React.Fragment>
      <AppBar component='div' className={classes.appBar} color='primary' position='fixed' elevation={0}>
        <Toolbar>
          <Grid container alignItems='center' spacing={1}>
            <Grid item xs>
              <Typography color='inherit' variant='h5' component='h1'>
                Tai Ho
              </Typography>
            </Grid>
            <Grid item>
              <Tooltip title='Video call'>
                <IconButton color='inherit'>
                  <VideocamIcon />
                </IconButton>
              </Tooltip>
            </Grid>
            <Grid item>
              <Tooltip title='Call'>
                <IconButton color='inherit'>
                  <CallIcon />
                </IconButton>
              </Tooltip>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
}

export default withStyles(styles)(Header);
