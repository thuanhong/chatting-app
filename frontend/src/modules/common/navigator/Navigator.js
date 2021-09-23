/* eslint-disable prettier/prettier */
import React, { useMemo, useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';
import InputAdornment from '@material-ui/core/InputAdornment';
import ChatIcon from '@material-ui/icons/Chat';
import NotificationsIcon from '@material-ui/icons/Notifications';
import PermContactCalendarIcon from '@material-ui/icons/PermContactCalendar';
import CallIcon from '@material-ui/icons/Call';
import Grid from '@material-ui/core/Grid';
import ListContact from '@src/common/list-contact/ListContact';
import ListGroupChat from '@src/common/list-group-chat/ListGroupChat';
import SearchInput from '@src/common/search-input/SearchInput';
import { styles } from './styles';
import { useGlobalStore } from '@src/hooks';

const CurrentComponent = {
  CHAT_COMPONENT: 'CHAT_COMPONENT',
  CONTACT_COMPONENT: 'CONTACT_COMPONENT',
  NOTIFICATION_COMPONENT: 'NOTIFICATION_COMPONENT',
};

function Navigator(props) {
  const { classes, ...other } = props;
  const [currentComponent, setCurrentComponent] = useState(CurrentComponent.CHAT_COMPONENT);
  const { userInfoStore } = useGlobalStore();

  const { lastName, firstName } = userInfoStore.currentUserInfo;

  const listContentFunctionMap = useMemo(() => {
    switch (currentComponent) {
      case CurrentComponent.CHAT_COMPONENT:
        return <ListGroupChat />;
      case CurrentComponent.CONTACT_COMPONENT:
        return <ListContact />;
      default:
        return <div />;
    }
  }, [currentComponent]);

  const handleClickEvent = (currentComponent) => setCurrentComponent(currentComponent);

  return (
    <Drawer variant='permanent' {...other}>
      <Card elevation={0} className={classes.cardStyle}>
        <CardHeader
          avatar={<Avatar aria-label='recipe'>TH</Avatar>}
          action={
            <IconButton aria-label='More'>
              <MoreVertIcon className={classes.colorTextWhite} />
            </IconButton>
          }
          title={firstName + ' ' + lastName}
          className={classes.colorTextWhite}
        />
        <CardContent>
          <SearchInput />
        </CardContent>
        <CardActions disableSpacing>
          <Grid container spacing={4}>
            <Grid item xs={3}>
              <IconButton onClick={() => handleClickEvent(CurrentComponent.CHAT_COMPONENT)} aria-label='chat'>
                <ChatIcon className={classes.colorTextWhite} />
              </IconButton>
            </Grid>
            <Grid item xs={3}>
              <IconButton onClick={() => handleClickEvent('')} aria-label='call'>
                <CallIcon className={classes.colorTextWhite} />
              </IconButton>
            </Grid>
            <Grid item xs={3}>
              <IconButton onClick={() => handleClickEvent(CurrentComponent.CONTACT_COMPONENT)} aria-label='contact'>
                <PermContactCalendarIcon className={classes.colorTextWhite} />
              </IconButton>
            </Grid>
            <Grid item xs={3}>
              <IconButton onClick={() => handleClickEvent('')} aria-label='notification'>
                <NotificationsIcon className={classes.colorTextWhite} />
              </IconButton>
            </Grid>
          </Grid>
        </CardActions>
        <Divider variant='middle' />
      </Card>
      <List className={classes.listMarginTop}>{listContentFunctionMap}</List>
    </Drawer>
  );
}

export default withStyles(styles)(Navigator);
