import React, { useEffect } from 'react';
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
import { UserService } from '@src/services/UserService';
import { styles } from './styles';

function Navigator(props) {
  const { classes, ...other } = props;

  useEffect(() => {
    UserService.get_user_contact('61346cfafc13ae32c800000a')
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        throw err;
      });
  }, []);

  return (
    <Drawer variant='permanent' {...other}>
      <List>
        <Card elevation={0} className={classes.cardStyle}>
          <CardHeader
            avatar={<Avatar aria-label='recipe'>TH</Avatar>}
            action={
              <IconButton aria-label='More'>
                <MoreVertIcon className={classes.colorTextWhite} />
              </IconButton>
            }
            title='Thuan Hong'
            className={classes.colorTextWhite}
          />
          <CardContent>
            <TextField
              placeholder='People, group and message'
              variant='outlined'
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    <SearchIcon className={classes.colorTextWhite} />
                  </InputAdornment>
                ),
                classes: { input: classes.input },
              }}
              size='small'
              fullWidth
              className={classes.textFieldStyle}
            />
          </CardContent>
          <CardActions disableSpacing>
            <Grid container spacing={4}>
              <Grid item xs={3}>
                <IconButton aria-label='chat'>
                  <ChatIcon className={classes.colorTextWhite} />
                </IconButton>
              </Grid>
              <Grid item xs={3}>
                <IconButton aria-label='call'>
                  <CallIcon className={classes.colorTextWhite} />
                </IconButton>
              </Grid>
              <Grid item xs={3}>
                <IconButton aria-label='contact'>
                  <PermContactCalendarIcon className={classes.colorTextWhite} />
                </IconButton>
              </Grid>
              <Grid item xs={3}>
                <IconButton aria-label='notification'>
                  <NotificationsIcon className={classes.colorTextWhite} />
                </IconButton>
              </Grid>
            </Grid>
          </CardActions>
        </Card>
        <Divider variant='middle' />
        <ListContact />
      </List>
    </Drawer>
  );
}

export default withStyles(styles)(Navigator);
