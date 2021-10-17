/* eslint-disable prettier/prettier */
import React, { useMemo, useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import ListContact from '@src/common/list-contact/ListContact';
import ListGroupChat from '@src/common/list-group-chat/ListGroupChat';
import SearchInput from '@src/common/search-input/SearchInput';
import LeftNavHeader from '@src/common/left-nav-header/LeftNavHeader';
import NavigatorAction from '@src/common/navigator-action/NavigatorAction';
import ListNotification from '@src/common/list-notification/ListNotification';
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
      case CurrentComponent.NOTIFICATION_COMPONENT:
        return <ListNotification />;
      default:
        return <div />;
    }
  }, [currentComponent]);

  return (
    <Drawer variant='permanent' {...other}>
      <Card elevation={0} className={classes.cardStyle}>
        <LeftNavHeader />
        <CardContent>
          <SearchInput />
        </CardContent>
        <CardActions disableSpacing>
          <NavigatorAction CurrentComponent={CurrentComponent} setCurrentComponent={setCurrentComponent} />
        </CardActions>
        <Divider variant='middle' />
      </Card>
      <List className={classes.listMarginTop}>{listContentFunctionMap}</List>
    </Drawer>
  );
}

export default withStyles(styles)(Navigator);
