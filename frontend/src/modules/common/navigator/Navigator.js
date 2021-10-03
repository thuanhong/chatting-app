/* eslint-disable prettier/prettier */
import React, { useMemo, useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import IconButton from '@material-ui/core/IconButton';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import ChatIcon from '@material-ui/icons/Chat';
import NotificationsIcon from '@material-ui/icons/Notifications';
import PermContactCalendarIcon from '@material-ui/icons/PermContactCalendar';
import Grid from '@material-ui/core/Grid';
import ListContact from '@src/common/list-contact/ListContact';
import ListGroupChat from '@src/common/list-group-chat/ListGroupChat';
import SearchInput from '@src/common/search-input/SearchInput';
import LeftNavHeader from '@src/common/left-nav-header/LeftNavHeader';
import { styles } from './styles';

const CurrentComponent = {
  CHAT_COMPONENT: 'CHAT_COMPONENT',
  CONTACT_COMPONENT: 'CONTACT_COMPONENT',
  NOTIFICATION_COMPONENT: 'NOTIFICATION_COMPONENT',
};

function Navigator(props) {
  const { classes, ...other } = props;
  const [currentComponent, setCurrentComponent] = useState(CurrentComponent.CHAT_COMPONENT);

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
        <LeftNavHeader />
        <CardContent>
          <SearchInput />
        </CardContent>
        <CardActions disableSpacing>
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
