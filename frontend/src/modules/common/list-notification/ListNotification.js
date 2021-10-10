import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import BadgeAvatar from '@src/common/badge-avatar/BadgeAvatar';
import { GroupService } from '@src/services/GroupService';
import { useObserver } from 'mobx-react-lite';
import { useGlobalStore } from '@src/hooks';
import { styles } from './styles';

function ListNotification(props) {
  const { classes } = props;
  const { notificationStore } = useGlobalStore();

  const [listNotification, setListNotification] = useState([]);

  const getUserNotificationData = async () => {
    const response = await GroupService.get_user_notification();
    setListNotification(response?.msg.notification ?? []);
  };

  useEffect(() => {
    getUserNotificationData();
  }, []);

  return useObserver(() => {
    return (
      <div className='list-group-chat'>
        {notificationStore.newNotificationList.map((data, index) => {
          return (
            <div key={index}>
              <Card elevation={0} className={classes.cardStyle}>
                <CardHeader
                  avatar={<BadgeAvatar isActive={false} linkAvatar={data.image} />}
                  title={data.notifyDesc}
                  className={classes.colorTextWhite}
                  subheader={moment().format('MMMM Do YYYY, h:mm a')}
                  subheaderTypographyProps={{
                    style: {
                      color: 'gray',
                      display: 'inline-block',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden !important',
                      textOverflow: 'ellipsis',
                      width: '250px',
                      overflowX: 'auto',
                    },
                  }}
                  titleTypographyProps={{
                    style: {
                      fontSize: '1.1rem',
                    },
                  }}
                />
              </Card>
            </div>
          );
        })}
        {listNotification.map((data, index) => {
          return (
            <div key={index}>
              <Card elevation={0} className={classes.cardStyle}>
                <CardHeader
                  avatar={<BadgeAvatar isActive={false} linkAvatar={data.image} />}
                  title={data.notifyDesc}
                  className={classes.colorTextWhite}
                  subheader={moment(data.createdAt).format('MMMM Do YYYY, h:mm a')}
                  subheaderTypographyProps={{
                    style: {
                      color: 'gray',
                      display: 'inline-block',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden !important',
                      textOverflow: 'ellipsis',
                      width: '250px',
                      overflowX: 'auto',
                    },
                  }}
                  titleTypographyProps={{
                    style: {
                      fontSize: '1.1rem',
                    },
                  }}
                />
              </Card>
            </div>
          );
        })}
      </div>
    );
  });
}

export default withStyles(styles)(ListNotification);
