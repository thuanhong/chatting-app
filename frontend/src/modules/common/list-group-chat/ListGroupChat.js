import React, { useEffect, useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import BadgeAvatar from '@src/common/badge-avatar/BadgeAvatar';
import { GroupService } from '@src/services/GroupService';
import { useObserver } from 'mobx-react-lite';
import { useGlobalStore } from '@src/hooks';
import { ButtonBase } from '@material-ui/core';
import { styles } from './styles';

const initPagination = {
  take: 5,
  pageIndex: 0,
};

function ListGroupChat(props) {
  const { classes } = props;
  const [listGroupChatData, setListGroupChatData] = useState([]);
  const [pagination, setPagenation] = useState(initPagination);
  const { groupChatStore, contactChatStore } = useGlobalStore();
  const { id, firstName, lastName } = JSON.parse(localStorage.getItem('currentUser'));

  const getGroupData = async () => {
    const response = await GroupService.get_user_group_chat(pagination);

    // setListGroupChatData((presState) => [...presState, ...(response.msg.groups ?? [])]);
    setListGroupChatData(response.msg.groups ?? []);
    setPagenation({ ...pagination, take: pagination.take + 5 });
  };

  const onSeeMore = () => {
    GroupService.get_user_group_chat(pagination)
      .then((response) => {
        setListGroupChatData((presState) => [...presState, ...(response.msg.groups ?? [])]);
        setPagenation({ ...pagination, pageIndex: pagination.pageIndex + 1 });
      })
      .catch((err) => {
        throw err;
      });
  };

  useEffect(() => {
    // setTimeout(groupChatStore.setCurrentGroupChatInfo(listGroupChatData[0]), 1);
    // TODO: need implement socket improve performance
    const interval = setInterval(() => {
      getGroupData();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return useObserver(() => {
    useEffect(() => {
      getGroupData();
    }, [groupChatStore?.currentGroupChatInfo]);
    return (
      <div className='list-group-chat'>
        {listGroupChatData.map((data, index) => (
          <React.Fragment key={index}>
            <ButtonBase
              onClick={() => {
                contactChatStore.setCurrentUserChattingInfo({ lastName: id === data.groupName.split('-')[0] ? data.groupName.split('-')[1] : `${firstName} ${lastName}` });
                return groupChatStore.setCurrentGroupChatInfo({ ...data });
              }}
            >
              <Card elevation={0} className={classes.cardStyle}>
                <CardHeader
                  avatar={<BadgeAvatar isActive={false} linkAvatar={data.image} />}
                  title={id === data.groupName.split('-')[0] ? data.groupName.split('-')[1] : `${firstName} ${lastName}`}
                  className={classes.colorTextWhite}
                  subheader={''}
                  // subheader={data.lastMessage}
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
        ))}
        {/* <Button style={{ width: '100%', backgroundColor: 'transparent' }} onClick={getGroupData}>
          See more
        </Button> */}
      </div>
    );
  });
}

export default withStyles(styles)(ListGroupChat);
