import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import ChatIcon from '@material-ui/icons/Chat';
import NotificationsIcon from '@material-ui/icons/Notifications';
import PermContactCalendarIcon from '@material-ui/icons/PermContactCalendar';
import Grid from '@material-ui/core/Grid';
import Badge from '@material-ui/core/Badge';
import IconButton from '@material-ui/core/IconButton';
import { useObserver } from 'mobx-react-lite';
import { useGlobalStore } from '@src/hooks';
import { styles } from './styles';

function NavigatorAction(props) {
  const { classes, CurrentComponent, setCurrentComponent } = props;
  const { notificationStore } = useGlobalStore();

  const handleClickEvent = (currentComponent) => setCurrentComponent(currentComponent);

  return useObserver(() => {
    return (
      <Grid container justifyContent='space-between' spacing={4}>
        <Grid container justifyContent='center' item xs={4}>
          <IconButton onClick={() => handleClickEvent(CurrentComponent.CHAT_COMPONENT)} aria-label='chat'>
            <ChatIcon className={classes.colorTextWhite} />
          </IconButton>
        </Grid>
        <Grid container justifyContent='center' item xs={4}>
          <IconButton onClick={() => handleClickEvent(CurrentComponent.CONTACT_COMPONENT)} aria-label='contact'>
            <PermContactCalendarIcon className={classes.colorTextWhite} />
          </IconButton>
        </Grid>
        <Grid container justifyContent='center' item xs={4}>
          <IconButton
            onClick={() => {
              notificationStore.setNumberNotification(0);
              handleClickEvent(CurrentComponent.NOTIFICATION_COMPONENT);
            }}
            aria-label='notification'
          >
            <Badge badgeContent={notificationStore.numberNotification} max={99} color='error'>
              <NotificationsIcon className={classes.colorTextWhite} />
            </Badge>
          </IconButton>
        </Grid>
      </Grid>
    );
  });
}

export default withStyles(styles)(NavigatorAction);
