import React, { useEffect, useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import io from 'socket.io-client';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import BadgeAvatar from '@src/common/badge-avatar/BadgeAvatar';
import { GroupService } from '@src/services/GroupService';
import { useObserver } from 'mobx-react-lite';
import { useGlobalStore } from '@src/hooks';
import { ButtonBase, Button } from '@material-ui/core';
import { styles } from './styles';

const initPagination = {
  take: 5,
  pageIndex: 0,
};

let socketGroupChat;

function ListGroupChat(props) {
  const { classes } = props;
  const [listGroupChatData, setListGroupChatData] = useState([]);
  const [pagination, setPagenation] = useState(initPagination);
  const { groupChatStore, contactChatStore, notificationStore } = useGlobalStore();
  const { id: currentUserId } = JSON.parse(localStorage.getItem('currentUser'));

  const getGroupData = async () => {
    const response = await GroupService.get_user_group_chat(pagination);
    setListGroupChatData(response?.msg.groups ?? []);
    setPagenation({ ...pagination, take: pagination.take + 5 });
  };

  useEffect(() => {
    getGroupData();
    socketGroupChat = io(`${process.env.NEXT_PUBLIC_BACKEND_URL}/notification`);
    socketGroupChat.emit('joinRoom', currentUserId, () => {});
    socketGroupChat.on('chatToClient', (msg) => {
      if (currentUserId === msg.userId) {
        notificationStore.updateNewNotificationList(msg);
      }
      getGroupData();
    });

    return () => {
      socketGroupChat.emit('leaveRoom', currentUserId, () => {});
      socketGroupChat.off();
    };
  }, []);

  return useObserver(() => {
    useEffect(() => {
      getGroupData();
    }, [groupChatStore?.currentGroupChatInfo]);
    return (
      <div className='list-group-chat'>
        {listGroupChatData.map((data, index) => {
          const [id, firstGroupName, secondGroupName] = data.groupName.split('-');
          return (
            <React.Fragment key={index}>
              <ButtonBase
                onClick={() => {
                  contactChatStore.setCurrentUserChattingInfo({ lastName: currentUserId === id ? firstGroupName : secondGroupName, isContacted: true });
                  return groupChatStore.setCurrentGroupChatInfo({ ...data });
                }}
              >
                <Card elevation={0} className={classes.cardStyle}>
                  <CardHeader
                    avatar={<BadgeAvatar isActive={false} linkAvatar={data.image} />}
                    title={currentUserId === id ? firstGroupName : secondGroupName}
                    className={classes.colorTextWhite}
                    subheader={data.lastMessage}
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
              </ButtonBase>
            </React.Fragment>
          );
        })}
        <Button style={{ width: '100%', backgroundColor: 'transparent' }} onClick={getGroupData}>
          See more
        </Button>
      </div>
    );
  });
}

export default withStyles(styles)(ListGroupChat);
