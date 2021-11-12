import React from 'react';
import classnames from 'classnames';
import AppBar from '@material-ui/core/AppBar';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import VideocamIcon from '@material-ui/icons/Videocam';
import CallIcon from '@material-ui/icons/Call';
import Toolbar from '@material-ui/core/Toolbar';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import { useObserver } from 'mobx-react-lite';
import { useGlobalStore } from '@src/hooks';
import { styles } from './styles';
import { ButtonBase } from '@material-ui/core';

function Header(props) {
  const { classes, setIsOpenCall, callingVideo, connectedUsers, isCalling, setIsCalling } = props;
  const { contactChatStore, groupChatStore } = useGlobalStore();

  return useObserver(() => {
    const { firstName, lastName } = contactChatStore.currentUserChattingInfo;
    const { infoUser } = groupChatStore.currentGroupChatInfo;
    return (
      <div className={classnames({ [classes.hideHeader]: !lastName })}>
        <AppBar component='div' className={classes.appBar} color='primary' position='fixed' elevation={0}>
          <Toolbar>
            <Grid container alignItems='center' spacing={1}>
              <Grid item xs>
                <Typography color='inherit' variant='h5' component='h1'>
                  {`${firstName || ''} ${lastName || ''}`}
                </Typography>
              </Grid>
              <Grid item>
                <Tooltip title='Video call'>
                  <IconButton
                    color='inherit'
                    onClick={() => {
                      setIsOpenCall(true);
                      callingVideo.createMediaStream();
                      console.log('infoUSER', infoUser.userGroups_user_id);
                      callingVideo.callUser(infoUser.userGroups_user_id);
                      setIsCalling(!isCalling);
                    }}
                  >
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
      </div>
    );
  });
}

export default withStyles(styles)(Header);
